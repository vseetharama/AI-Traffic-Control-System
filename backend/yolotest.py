# =========================================================
# AI Traffic System - YOLO Tracking + Data Storage
# =========================================================

from ultralytics import YOLO
import cv2
import sys
import os
import json

# -------------------------------
# 0. INPUT VIDEO PATH
# -------------------------------
# Take video path from command line OR default
if len(sys.argv) > 1:
    video_path = sys.argv[1]
else:
    video_path = "videos/road1.mp4"

print(f"🎬 Processing video: {video_path}")

# Extract video name (road1, road2, etc.)
video_name = os.path.splitext(os.path.basename(video_path))[0]

# Output files
output_data_file = f"vehicle_data_{video_name}.txt"
output_video_file = f"output_{video_name}.mp4"

# -------------------------------
# 1. VEHICLE TYPE MAPPING
# -------------------------------
# COCO dataset class IDs
vehicle_map = {
    2: "car",
    3: "bike",
    5: "bus",
    7: "truck"
}

# -------------------------------
# 2. LOAD YOLO MODEL
# -------------------------------
model = YOLO("yolov8n.pt")

# -------------------------------
# 3. LOAD VIDEO
# -------------------------------
cap = cv2.VideoCapture(video_path)

if not cap.isOpened():
    print(f"❌ Error: Cannot open video: {video_path}")
    exit()

# -------------------------------
# 4. VIDEO PROPERTIES
# -------------------------------
width = int(cap.get(3))
height = int(cap.get(4))
fps = int(cap.get(5))

# -------------------------------
# 5. OUTPUT VIDEO WRITER
# -------------------------------
out = cv2.VideoWriter(
    output_video_file,
    cv2.VideoWriter_fourcc(*'mp4v'),
    fps,
    (width, height)
)

# -------------------------------
# 6. CREATE DATA FILE
# -------------------------------
# Frame-wise vehicle counts
file = open(output_data_file, "w")
file.write("Frame,Total,Car,Bike,Bus,Truck\n")

# -------------------------------
# 7. TRACKING STORAGE
# -------------------------------
# Stores UNIQUE vehicle IDs
unique_ids = set()

# -------------------------------
# 8. FRAME CONTROL
# -------------------------------
frame_count = 0
MAX_FRAMES = 300  # limit processing (~10 sec)

# -------------------------------
# 9. PROCESS VIDEO FRAMES
# -------------------------------
while True:
    ret, frame = cap.read()

    if not ret:
        break

    frame_count += 1

    if frame_count > MAX_FRAMES:
        break

    print(f"Processing frame: {frame_count}")

    # -------------------------------
    # 10. YOLO TRACKING (IMPORTANT)
    # -------------------------------
    # Instead of model(frame), we use TRACKING
    results = model.track(frame, persist=True)

    # Initialize per-frame counts
    vehicle_counts = {
        "car": 0,
        "bike": 0,
        "bus": 0,
        "truck": 0
    }

    # -------------------------------
    # 11. PROCESS DETECTIONS + TRACKING
    # -------------------------------
    for r in results:
        if r.boxes.id is not None:

            # Loop through boxes + track IDs
            for box, track_id in zip(r.boxes, r.boxes.id):

                cls = int(box.cls[0])
                track_id = int(track_id)

                # Only count vehicle classes
                if cls in vehicle_map:
                    vehicle_type = vehicle_map[cls]

                    # Frame-wise count (for graph)
                    vehicle_counts[vehicle_type] += 1

                    # Unique vehicle tracking (REAL COUNT)
                    unique_ids.add((track_id, vehicle_type))

                    # Draw bounding box
                    x1, y1, x2, y2 = map(int, box.xyxy[0])
                    cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)

                    # Display tracking ID
                    cv2.putText(
                        frame,
                        f"ID:{track_id}",
                        (x1, y1 - 10),
                        cv2.FONT_HERSHEY_SIMPLEX,
                        0.5,
                        (0, 255, 0),
                        2
                    )

    # -------------------------------
    # 12. TOTAL VEHICLES (FRAME)
    # -------------------------------
    total_vehicles = sum(vehicle_counts.values())

    # Display count on frame
    cv2.putText(
        frame,
        f"Vehicles: {total_vehicles}",
        (20, 50),
        cv2.FONT_HERSHEY_SIMPLEX,
        1,
        (0, 255, 0),
        2
    )

    # -------------------------------
    # 13. SAVE FRAME DATA
    # -------------------------------
    file.write(
        f"{frame_count},{total_vehicles},{vehicle_counts['car']},{vehicle_counts['bike']},{vehicle_counts['bus']},{vehicle_counts['truck']}\n"
    )

    # -------------------------------
    # 14. SAVE OUTPUT VIDEO
    # -------------------------------
    out.write(frame)

# -------------------------------
# 15. RELEASE RESOURCES
# -------------------------------
cap.release()
out.release()
file.close()

# -------------------------------
# 16. UNIQUE VEHICLE SUMMARY
# -------------------------------
# Extract unique IDs only
unique_vehicle_count = len(set([vid for vid, _ in unique_ids]))

# Count per type
type_summary = {
    "car": 0,
    "bike": 0,
    "bus": 0,
    "truck": 0
}

for _, vtype in unique_ids:
    type_summary[vtype] += 1

# Write UNIQUE vehicle summary to JSON
summary_file = f"vehicle_summary_{video_name}.json"
summary_data = {
    "totalVehicles": unique_vehicle_count,
    "cars": type_summary["car"],
    "bikes": type_summary["bike"],
    "buses": type_summary["bus"],
    "trucks": type_summary["truck"]
}

with open(summary_file, "w") as f:
    json.dump(summary_data, f, indent=2)

print(f"📊 Summary saved to: {summary_file}")

# Print final results
print("\n🚗 UNIQUE VEHICLE COUNT (REAL WORLD):")
print(f"Total Vehicles: {unique_vehicle_count}")
print("Breakdown:", type_summary)

print("\n✅ Processing complete!")
print(f"📁 Output video: {output_video_file}")
print(f"📊 Data file: {output_data_file}")