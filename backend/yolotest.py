# =========================================================
# AI Traffic System - YOLO Vehicle Detection + Data Storage
# =========================================================

from ultralytics import YOLO
import cv2

# -------------------------------
# 1. Load YOLO Model
# -------------------------------
# This loads pretrained YOLOv8 model (downloads first time)
model = YOLO("yolov8n.pt")


# -------------------------------
# 2. Load Input Video
# -------------------------------
cap = cv2.VideoCapture("videos/road1.mp4")

if not cap.isOpened():
    print("❌ Error: Cannot open video")
    exit()


# -------------------------------
# 3. Get Video Properties
# -------------------------------
width = int(cap.get(3))
height = int(cap.get(4))
fps = int(cap.get(5))


# -------------------------------
# 4. Setup Output Video Writer
# -------------------------------
out = cv2.VideoWriter(
    "output.mp4",
    cv2.VideoWriter_fourcc(*'mp4v'),
    fps,
    (width, height)
)


# -------------------------------
# 5. Create Data File
# -------------------------------
# This will store frame-wise vehicle count
file = open("vehicle_data.txt", "w")
file.write("Frame,VehicleCount\n")   # Header


# -------------------------------
# 6. Frame Control
# -------------------------------
frame_count = 0
MAX_FRAMES = 300   # limit processing (~10 sec)


# -------------------------------
# 7. Process Video Frames
# -------------------------------
while True:
    ret, frame = cap.read()

    if not ret:
        break

    frame_count += 1

    # Stop after max frames
    if frame_count > MAX_FRAMES:
        break

    print(f"Processing frame: {frame_count}")

    # -------------------------------
    # 8. YOLO Detection
    # -------------------------------
    results = model(frame)

    vehicle_count = 0

    # -------------------------------
    # 9. Count Vehicles
    # -------------------------------
    for r in results:
        for box in r.boxes:

            cls = int(box.cls[0])  # class id

            # COCO vehicle classes:
            # 2=car, 3=motorcycle, 5=bus, 7=truck
            if cls in [2, 3, 5, 7]:
                vehicle_count += 1

                # Draw bounding box
                x1, y1, x2, y2 = map(int, box.xyxy[0])
                cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)

    # -------------------------------
    # 10. Display Count on Frame
    # -------------------------------
    cv2.putText(
        frame,
        f"Vehicles: {vehicle_count}",
        (20, 50),
        cv2.FONT_HERSHEY_SIMPLEX,
        1,
        (0, 255, 0),
        2
    )

    # -------------------------------
    # 11. Save Data to File
    # -------------------------------
    file.write(f"{frame_count},{vehicle_count}\n")

    # -------------------------------
    # 12. Save Frame to Output Video
    # -------------------------------
    out.write(frame)


# -------------------------------
# 13. Release Resources
# -------------------------------
cap.release()
out.release()
file.close()

print("✅ Processing complete!")
print("📁 Output video: output.mp4")
print("📊 Data file: vehicle_data.txt")