# 🚦 AI-Based Smart Traffic Congestion Optimization System

## 📌 Project Overview

This project focuses on optimizing traffic signal timings using **vehicle density detection and AI-based prediction techniques**.

The system integrates:

* Computer Vision (YOLO) for vehicle detection
* Time-series prediction (LSTM) for traffic forecasting
* Dynamic signal control logic for efficient traffic flow

---

## 🎯 Objectives

* Reduce traffic congestion at intersections
* Automate signal timing based on real-time traffic density
* Predict future traffic conditions using AI
* Improve overall traffic management efficiency

---

## 🧠 System Architecture

```
Video Input (4 Roads)
        ↓
YOLO Model (Vehicle Detection)
        ↓
Vehicle Count & Classification
        ↓
Density Calculation
        ↓
Signal Timing Optimization
        ↓
LSTM Prediction (Future Traffic)
        ↓
Frontend Dashboard Display
```

---

## 🖥️ Frontend Features

* 4-road junction visualization (2×2 grid)
* Real-time traffic signal display (🔴🟢)
* Countdown timer for each road
* AI-based traffic prediction display
* Dark-themed UI with grid background
* Drag-and-drop video upload interface

---

## ⚙️ Backend Features (Planned)

* Video upload API (Flask)
* YOLO-based vehicle detection
* Vehicle counting and classification
* Density-based signal control logic
* LSTM-based traffic prediction model

---

## 🛠️ Tech Stack

### Frontend

* React.js (Vite)
* Bootstrap / Custom CSS
* React Router

### Backend

* Python (Flask)

### AI / ML

* YOLOv8 (Object Detection)
* LSTM (Traffic Prediction)

---

## 📁 Project Structure

```
frontend/
backend/

src/
 ├── pages/
 ├── components/
 ├── styles/
```

---

## 🚀 Current Status

* ✅ Frontend UI completed
* ✅ Signal logic implemented
* ✅ Routing and modular components added
* ✅ Video upload UI ready
* 🔄 Backend development in progress

---

## 🔮 Future Enhancements

* Real-time CCTV integration
* Advanced traffic analytics
* Cloud deployment
* Multi-junction scalability

---

