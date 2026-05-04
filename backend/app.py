from flask import Flask, request, jsonify
from flask_cors import CORS
import os
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


@app.route("/upload", methods=["POST"])
def upload_files():
    """
    Handle file uploads from the frontend.
    Expects up to 4 files: road1, road2, road3, road4
    """
    try:
        print("Received upload request")
        print(f"Files in request: {list(request.files.keys())}")
        
        uploaded_files = {}
        
        # Process each road's file
        for road in ["road1", "road2", "road3", "road4"]:
            if road in request.files:
                file = request.files[road]
                
                if file and file.filename:
                    # Secure the filename
                    filename = secure_filename(file.filename)
                    filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)
                    
                    # Save the file
                    file.save(filepath)
                    uploaded_files[road] = filename
                    print(f"✅ {road}: Saved as {filename}")
        
        if not uploaded_files:
            return jsonify({"message": "No files received"}), 400
        
        return jsonify({
            "message": "Files uploaded successfully",
            "files": uploaded_files
        }), 200
    
    except Exception as e:
        print(f"❌ Upload error: {str(e)}")
        return jsonify({"message": f"Upload failed: {str(e)}"}), 500


@app.route("/health", methods=["GET"])
def health():
    """Health check endpoint"""
    return jsonify({"status": "Backend is running"}), 200


if __name__ == "__main__":
    print("🚀 Starting Flask server on http://localhost:5000")
    app.run(debug=True, host="localhost", port=5000)
