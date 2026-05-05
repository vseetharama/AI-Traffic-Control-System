# 🚦 AI-Based Smart Traffic Control System

## 📌 Project Overview

An intelligent traffic management system that uses **YOLO tracking** for accurate vehicle detection and counting, combined with **real-time analytics** and **dynamic traffic signal optimization**.

The system provides:
- ✅ **Unique Vehicle Tracking** (not frame-based counts)
- ✅ **Real-time Vehicle Analytics Dashboard**
- ✅ **Traffic Insights & Predictions**
- ✅ **Professional Data Visualization** (Charts, Graphs, Tables)
- ✅ **4-Road Junction Management**
- ✅ **Dynamic Traffic Status Badges**

---

## 🎯 Key Features

### 🚗 Vehicle Detection & Tracking
- **YOLOv8 Tracking** with unique vehicle ID persistence
- **Real unique vehicle counts** (not misleading frame sums)
- **Vehicle type classification**: Cars, Bikes, Buses, Trucks
- **Accurate tracking** across entire video duration

### 📊 Analytics Dashboard
- **Vehicle Summary**: Real-time unique vehicle counts
- **Traffic Insights**: Peak frame, traffic level, dominant vehicle
- **Traffic Status Badge**: Dynamic Low/Medium/High indicators
- **Vehicle Distribution Pie Chart**: Type breakdown with percentages
- **Frame-by-Frame Data Table**: Detailed temporal analysis
- **Interactive Line Graph**: Vehicle count trends with peak highlighting

### 🎬 Multi-Road Management
- **4 Fixed Roads**: road1, road2, road3, road4
- **Per-Road Results**: Independent data collection and analysis
- **Road Navigation**: Easy switching between roads
- **Persistent Data**: Summary and frame data for each road

---

## 🖥️ Frontend Features

### Dashboard Components
- 🚗 **Vehicle Summary Card**: Shows unique tracked vehicle counts
- 📊 **Traffic Insights**: Peak frame, traffic level, dominant vehicle type
- 📈 **Line Chart**: Vehicle count trends (first 100 frames)
- 📋 **Data Table**: Detailed frame-by-frame breakdown (first 50 frames)
- 🍰 **Pie Chart**: Vehicle distribution by type with percentages
- 🚦 **Status Badge**: Dynamic traffic level indicator

### User Interface
- Dark-themed professional dashboard (Tailwind CSS)
- Responsive grid layouts
- Glass-morphism design (backdrop blur + transparency)
- Gradient text headers
- Interactive hover effects
- Mobile-friendly responsive design
- Hover tooltips on all visualizations

### Video Upload
- Drag-and-drop file upload interface
- Support for MP4 video format
- Real-time processing status
- Automatic file naming (road1.mp4, road2.mp4, etc.)
- "View Results" button after processing

---

## ⚙️ Backend Features

### Video Processing
- Flask REST API
- Video upload handling (500 MB max)
- Automatic YOLO processing trigger
- Frame extraction and analysis (up to 300 frames)

### Data Endpoints
- `POST /upload`: File upload with automatic YOLO processing
- `GET /data/<road>`: Frame-by-frame vehicle data
- `GET /summary/<road>`: Unique vehicle count summary
- `GET /health`: Health check endpoint

### YOLO Processing
- Unique vehicle tracking with IDs
- Per-frame detections for temporal analysis
- Vehicle type classification (COCO classes)
- Output video generation with tracking visualization
- JSON summary export with unique counts

---

## 🛠️ Tech Stack

### Frontend
- **React 19.2.5** (Vite 8.0.10)
- **Tailwind CSS 3.4.19** (Utility-first styling)
- **React Router 7.14.2** (SPA routing)
- **Recharts 2.15.4** (Interactive visualizations)

### Backend
- **Python 3**
- **Flask** (REST API framework)
- **CORS** (Cross-origin support)

### AI/ML
- **YOLOv8n** (Object detection with tracking)
- **OpenCV** (Video processing)
- **COCO Dataset** (Pre-trained detection model)

---

## 📁 Project Structure

```
AI-Traffic-Control-System/
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Upload.jsx
│   │   │   ├── Results.jsx (📊 Main analytics dashboard)
│   │   │   └── Members.jsx
│   │   ├── components/
│   │   │   ├── Layout.jsx
│   │   │   ├── RoadCard.jsx
│   │   │   ├── SignalLight.jsx
│   │   │   └── UploadBox.jsx
│   │   ├── styles/
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── app.py (Flask API server)
│   ├── yolotest.py (YOLO tracking + summary export)
│   ├── requirements.txt
│   ├── yolov8n.pt (YOLOv8 model)
│   ├── uploads/ (Video files)
│   ├── vehicle_data_*.txt (Frame-by-frame data)
│   └── vehicle_summary_*.json (Unique vehicle counts)
│
├── README.md
├── UPLOAD_SETUP.md
├── DATA_DISPLAY_SETUP.md
└── REALISTIC_TRACKING_FIX.md
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16+)
- Python (v3.8+)
- Git

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Runs on: `http://localhost:5173`

### Backend Setup

```bash
cd backend
pip install -r requirements.txt
python app.py
```

Runs on: `http://localhost:5000`

---

## 📊 Data Flow

```
Video Upload (road1.mp4, road2.mp4, etc.)
        ↓
Backend /upload endpoint
        ↓
YOLO Tracking Processing (yolotest.py)
        ↓
Unique Vehicle Tracking (Track IDs)
        ↓
Generate 2 Files:
├─ vehicle_data_road1.txt (Frame-by-frame)
└─ vehicle_summary_road1.json (Unique counts)
        ↓
Frontend Fetches:
├─ /data/road1 (Frame data for graphs/tables)
└─ /summary/road1 (Unique counts for summary)
        ↓
Analytics Dashboard Display
```

---

## 🎯 Usage Guide

### 1. Upload Video
1. Click "Upload" in navigation
2. Select video file for specific road
3. Video processes automatically with YOLO tracking
4. See "Processing complete" confirmation

### 2. View Results
1. Click "View Results" button
2. See Vehicle Summary with unique vehicle counts
3. Explore Traffic Insights
4. Analyze frame-by-frame data in table
5. View vehicle trends in graph
6. Check vehicle distribution in pie chart

### 3. Switch Roads
1. Use Road navigation buttons (Road1-Road4)
2. Each road has independent data
3. Seamless switching between results

---

## 📈 Example Output

### Vehicle Summary (Unique Counts)
```
🚗 Vehicle Summary
Unique vehicle count using AI tracking

Total Vehicles: 47
🚙 Cars: 28
🏍️ Bikes: 12
🚌 Buses: 5
🚚 Trucks: 2
```

### Traffic Insights
```
Peak Frame: 12
Peak Vehicles: 8
Traffic Level: Medium
Dominant Vehicle: Cars
```

### API Response (/summary/road1)
```json
{
  "totalVehicles": 47,
  "cars": 28,
  "bikes": 12,
  "buses": 5,
  "trucks": 2
}
```

---

## 📊 Current Status

### ✅ Completed Features
- [x] Frontend React dashboard with Vite & Tailwind
- [x] YOLO vehicle detection & tracking
- [x] Unique vehicle counting (not frame sums)
- [x] Per-road video processing
- [x] Vehicle Summary with accurate counts
- [x] Traffic Insights section
- [x] Vehicle Distribution Pie Chart
- [x] Frame-by-frame data table
- [x] Interactive line graphs with peak highlighting
- [x] Dynamic traffic status badges
- [x] Professional UI/UX with glass-morphism
- [x] Responsive mobile design
- [x] Multi-road management (4 roads)
- [x] Summary API endpoint
- [x] Data visualization with Recharts
- [x] Dynamic Y-axis scaling
- [x] Clean, production-ready dashboard

### 🔄 In Progress
- [ ] Real-time CCTV integration
- [ ] LSTM traffic prediction model
- [ ] Advanced traffic analytics
- [ ] Cloud deployment (AWS/Google Cloud)

### 🔮 Future Enhancements
- [ ] Multi-junction scalability
- [ ] Advanced ML predictions
- [ ] Automated signal optimization
- [ ] Historical data analysis
- [ ] API rate limiting & authentication
- [ ] Database integration (PostgreSQL)
- [ ] Real-time notifications

---

## 🔍 Vehicle Classification

COCO Dataset Classes Used:
| Vehicle Type | YOLO Class | Icon |
|---|---|---|
| Cars | 2 | 🚙 |
| Bikes/Motorcycles | 3 | 🏍️ |
| Buses | 5 | 🚌 |
| Trucks | 7 | 🚚 |

---

## 🛡️ Key Improvements

### Accuracy
- ✅ **YOLO Tracking**: Unique vehicle IDs prevent duplicate counting
- ✅ **Real Counts**: Accurate vehicle numbers (not frame sums)
- ✅ **300 Frame Limit**: ~10 second videos for optimal processing

### User Experience
- ✅ **Professional Dashboard**: Analytics-grade visualization
- ✅ **Dynamic Scaling**: Y-axis adapts to data range
- ✅ **Interactive Charts**: Hover tooltips and legends
- ✅ **Clean Layout**: No misleading metrics or confusion

### Performance
- ✅ **Efficient Processing**: Optimized YOLO frame handling
- ✅ **Fast API**: RESTful endpoints with CORS
- ✅ **Responsive UI**: Smooth animations and transitions

---

## 📝 API Reference

### Upload Video
```
POST /upload
Content-Type: multipart/form-data

Parameters:
- road1: File (video/mp4)
- road2: File (video/mp4)
- road3: File (video/mp4)
- road4: File (video/mp4)

Response:
{
  "message": "Files uploaded and processing started",
  "files": {"road1": "road1.mp4", ...},
  "videos": ["road1", "road2", ...]
}
```

### Get Frame Data
```
GET /data/<road>

Response:
{
  "data": [
    {
      "frame": 1,
      "total": 5,
      "car": 3,
      "bike": 1,
      "bus": 1,
      "truck": 0
    },
    ...
  ]
}
```

### Get Summary
```
GET /summary/<road>

Response:
{
  "totalVehicles": 47,
  "cars": 28,
  "bikes": 12,
  "buses": 5,
  "trucks": 2
}
```

---

## 🐛 Troubleshooting

### Issue: "No data available"
- ✅ Check if video uploaded successfully
- ✅ Wait for YOLO processing to complete
- ✅ Refresh the page
- ✅ Check browser console for errors

### Issue: Graph not displaying
- ✅ Ensure video has been processed
- ✅ Check if summary endpoint returns data
- ✅ Verify Recharts library is installed

### Issue: Incorrect vehicle counts
- ✅ YOLO tracking requires clear vehicle footage
- ✅ Ensure good lighting conditions
- ✅ Use videos with vehicles in frame (10+ seconds recommended)

---

## 📚 Documentation Files

- `UPLOAD_SETUP.md` - Video upload & processing guide
- `DATA_DISPLAY_SETUP.md` - Results display implementation
- `REALISTIC_TRACKING_FIX.md` - Unique vehicle counting details

---

## 👥 Contributors

- **Project Lead**: [Your Name]
- **Frontend**: React/Vite development
- **Backend**: Python/Flask API
- **AI/ML**: YOLO tracking integration

---

## 📄 License

[License Information Here]

---

## 🙏 Acknowledgments

- YOLOv8 by Ultralytics
- Recharts for data visualization
- React & Tailwind CSS communities
- COCO Dataset contributors

---

**Last Updated**: May 5, 2026
**Status**: ✅ Production Ready

