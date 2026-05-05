from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import subprocess
import json
from werkzeug.utils import secure_filename

# Initialize Flask app
app = Flask(__name__)

# Enable CORS
CORS(app)

# Configure upload folder
UPLOAD_FOLDER = "uploads"
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
app.config["MAX_CONTENT_LENGTH"] = 500 * 1024 * 1024  # 500 MB max file size


def run_yolo(video_path):
    """
    Run YOLO processing on uploaded video
    Generates vehicle_data_{video_name}.txt
    """
    try:
        print(f"🚀 Running YOLO on {video_path}")
        subprocess.run(["python", "yolotest.py", video_path], check=True)
        print("✅ YOLO processing completed")
    except Exception as e:
        print(f"❌ YOLO error: {e}")


@app.route("/upload", methods=["POST"])
def upload_files():
    """
    Handle file uploads from the frontend.
    Expects up to 4 files: road1, road2, road3, road4
    Automatically triggers YOLO processing
    """
    try:
        print("Received upload request")
        print(f"Files in request: {list(request.files.keys())}")
        
        uploaded_files = {}
        video_names = []
        
        # Process each road's file
        for road in ["road1", "road2", "road3", "road4"]:
            if road in request.files:
                file = request.files[road]
                
                if file and file.filename:
                    # Force filename to be roadX.mp4 for consistency
                    filename = f"{road}.mp4"
                    filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)
                    
                    # Save the file with fixed road name
                    file.save(filepath)
                    uploaded_files[road] = filename
                    video_names.append(road)  # Use road name directly
                    print(f"✅ {road}: Saved as {filename}")
                    
                    # Trigger YOLO processing
                    print(f"🎬 Triggering YOLO for {filepath}")
                    run_yolo(filepath)
        
        if not uploaded_files:
            return jsonify({"message": "No files received"}), 400
        
        return jsonify({
            "message": "Files uploaded and processing started",
            "files": uploaded_files,
            "videos": video_names
        }), 200
    
    except Exception as e:
        print(f"❌ Upload error: {str(e)}")
        return jsonify({"message": f"Upload failed: {str(e)}"}), 500


@app.route("/health", methods=["GET"])
def health():
    """Health check endpoint"""
    return jsonify({"status": "Backend is running"}), 200


@app.route("/data", methods=["GET"])
def get_data():
    """
    Fetch vehicle data from vehicle_data.txt
    """
    try:
        filepath = "vehicle_data.txt"
        if not os.path.exists(filepath):
            return jsonify({"message": "No data available", "data": ""}), 200
        
        with open(filepath, "r") as f:
            data = f.read()
        
        print(f"✅ Data fetched: {len(data)} characters")
        return jsonify({"data": data}), 200
    
    except Exception as e:
        print(f"❌ Data fetch error: {str(e)}")
        return jsonify({"message": "Error reading data", "data": "", "error": str(e)}), 500


@app.route("/data/<video_name>", methods=["GET"])
def get_video_data(video_name):
    """
    Fetch vehicle data for a specific video
    Returns parsed JSON with frame count and vehicle type breakdown
    """
    try:
        # Only look for the specific video data file
        filepath = f"vehicle_data_{video_name}.txt"
        
        if not os.path.exists(filepath):
            print(f"⚠️ No data file found for: {video_name} (expected: {filepath})")
            return jsonify({"message": "Data not found", "data": []}), 200
        
        rows = []
        with open(filepath, "r") as f:
            next(f)  # Skip header
            for line in f:
                try:
                    frame, total, car, bike, bus, truck = line.strip().split(",")
                    rows.append({
                        "frame": int(frame),
                        "total": int(total),
                        "car": int(car),
                        "bike": int(bike),
                        "bus": int(bus),
                        "truck": int(truck)
                    })
                except ValueError:
                    continue  # Skip malformed lines
        
        print(f"✅ Video data fetched: {video_name} ({len(rows)} frames) from {filepath}")
        return jsonify({"data": rows}), 200
    
    except Exception as e:
        print(f"❌ Video data fetch error: {str(e)}")
        return jsonify({"message": "Error reading data", "data": [], "error": str(e)}), 500


@app.route("/summary/<video_name>", methods=["GET"])
def get_video_summary(video_name):
    """
    Fetch UNIQUE vehicle count summary for a specific video
    Returns JSON with unique vehicle counts (from tracking)
    """
    try:
        # Look for the summary JSON file
        filepath = f"vehicle_summary_{video_name}.json"
        
        if not os.path.exists(filepath):
            print(f"⚠️ No summary file found for: {video_name} (expected: {filepath})")
            return jsonify({"message": "Summary not found", "totalVehicles": 0, "cars": 0, "bikes": 0, "buses": 0, "trucks": 0}), 200
        
        with open(filepath, "r") as f:
            summary = json.load(f)
        
        print(f"✅ Summary fetched: {video_name} - {summary}")
        return jsonify(summary), 200
    
    except Exception as e:
        print(f"❌ Summary fetch error: {str(e)}")
        return jsonify({"message": "Error reading summary", "totalVehicles": 0, "cars": 0, "bikes": 0, "buses": 0, "trucks": 0, "error": str(e)}), 200


if __name__ == "__main__":
    print("🚀 Starting Flask server on http://localhost:5000")
    app.run(debug=True, host="localhost", port=5000)
