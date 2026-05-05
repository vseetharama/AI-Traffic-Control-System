import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  ReferenceDot
} from "recharts";

export default function Results() {
  const { road } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch road data and summary
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");
        console.log(`Fetching data for: ${road}`);
        
        // Fetch frame-by-frame data
        const response = await fetch(`http://localhost:5000/data/${road}`);
        const result = await response.json();
        
        if (result.data && Array.isArray(result.data) && result.data.length > 0) {
          setData(result.data);
          console.log(`✅ Loaded ${result.data.length} frames for ${road}`);
        } else {
          setData([]);
          console.log(`⏳ No data available for ${road}`);
        }
        
        // Fetch unique vehicle summary
        const summaryResponse = await fetch(`http://localhost:5000/summary/${road}`);
        const summaryResult = await summaryResponse.json();
        setSummary(summaryResult);
        console.log(`✅ Summary loaded:`, summaryResult);
        
      } catch (err) {
        console.error("Fetch error:", err);
        setError(`Error loading data: ${err.message}`);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    if (road) {
      fetchData();
    }
  }, [road]);

  // Traffic Insights Calculations (using frame data for temporal analysis)
  const peak = data.length > 0 ? Math.max(...data.map(d => d.total)) : 0;
  const peakFrame = data.length > 0 ? data.find(d => d.total === peak)?.frame : null;
  const avgFrameVehicles = data.length > 0 ? (data.reduce((a, b) => a + b.total, 0) / data.length).toFixed(1) : 0;
  
  let trafficLevel = "Low";
  if (avgFrameVehicles > 5) trafficLevel = "High";
  else if (avgFrameVehicles > 2) trafficLevel = "Medium";
  
  const dominantVehicle = data.length > 0 ? 
    ["car", "bike", "bus", "truck"].reduce((a, b) =>
      data.reduce((sum, d) => sum + d[a], 0) >
      data.reduce((sum, d) => sum + d[b], 0) ? a : b
    ) : "N/A";
  
  const trafficBadgeColor = trafficLevel === "High" ? "red" : trafficLevel === "Medium" ? "yellow" : "green";
  const trafficBadgeBg = `bg-${trafficBadgeColor}-500/20`;
  const trafficBadgeText = `text-${trafficBadgeColor}-400`;
  
  // Vehicle Distribution for Pie Chart (using frame totals for visualization)
  const vehicleTotals = data.length > 0 ? [
    { name: "Cars", value: data.reduce((sum, d) => sum + d.car, 0) },
    { name: "Bikes", value: data.reduce((sum, d) => sum + d.bike, 0) },
    { name: "Buses", value: data.reduce((sum, d) => sum + d.bus, 0) },
    { name: "Trucks", value: data.reduce((sum, d) => sum + d.truck, 0) }
  ] : [];

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-6 py-16">
        
        {/* HEADER WITH BACK BUTTON AND ROAD NAVIGATION */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            {/* BACK BUTTON */}
            <button
              onClick={() => navigate("/upload")}
              className="px-4 py-2 text-gray-400 hover:text-white transition font-medium text-sm"
            >
              ← Back
            </button>

            {/* ROAD NAVIGATION BUTTONS */}
            <div className="flex gap-2">
              {["road1", "road2", "road3", "road4"].map((roadBtn) => (
                <button
                  key={roadBtn}
                  onClick={() => navigate(`/results/${roadBtn}`)}
                  disabled={roadBtn !== road && data.length === 0}
                  className={`px-4 py-2 rounded-full transition text-sm font-medium ${
                    roadBtn === road
                      ? "bg-purple-600 text-white shadow-lg shadow-purple-500/40"
                      : data.length > 0
                      ? "bg-white/10 hover:bg-purple-600 text-gray-300 hover:text-white"
                      : "bg-gray-700/30 text-gray-500 cursor-not-allowed"
                  }`}
                  title={roadBtn !== road && data.length === 0 ? "No data available for this road" : ""}
                >
                  {roadBtn.charAt(0).toUpperCase() + roadBtn.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text mb-3 flex items-center gap-4">
            📊 Results: {road}
            {summary && summary.totalVehicles > 0 && (
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${trafficBadgeBg} ${trafficBadgeText}`}>
                {trafficLevel.toUpperCase()} TRAFFIC
              </span>
            )}
          </h1>
          <p className="text-gray-400 text-lg">
            Vehicle detection analysis and traffic flow insights
          </p>
        </div>

        {/* GLOW BACKGROUND */}
        <div className="absolute -top-40 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-purple-500/20 blur-3xl -z-10"></div>

        {/* LOADING STATE */}
        {loading && (
          <div className="text-center py-12">
            <p className="text-gray-400">⏳ Loading data...</p>
          </div>
        )}

        {/* ERROR STATE */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6 text-red-400 text-sm">
            <p className="font-semibold mb-1">❌ Error loading data</p>
            <p>{error}</p>
            <p className="text-xs mt-2 text-red-300">Try refreshing the page or selecting a different road</p>
          </div>
        )}

        {/* STATISTICS CARDS */}
        {summary && summary.totalVehicles > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-white">
              🚗 Vehicle Summary
            </h2>
            <p className="text-gray-400 text-sm mb-6">
              Unique vehicle count using AI tracking
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Total Vehicles - Highlighted */}
              <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10 text-center hover:scale-105 transition col-span-1 md:col-span-3 lg:col-span-1">
                <div className="text-4xl mb-2">🎯</div>
                <p className="text-gray-400 text-sm mb-2">Total Vehicles</p>
                <p className="text-4xl font-bold text-purple-400">{summary.totalVehicles}</p>
              </div>

              {/* Cars */}
              <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10 text-center hover:scale-105 transition">
                <div className="text-3xl mb-2">🚙</div>
                <p className="text-gray-400 text-sm mb-2">Cars</p>
                <p className="text-2xl font-bold text-green-400">{summary.cars}</p>
              </div>

              {/* Bikes */}
              <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10 text-center hover:scale-105 transition">
                <div className="text-3xl mb-2">🏍️</div>
                <p className="text-gray-400 text-sm mb-2">Bikes</p>
                <p className="text-2xl font-bold text-yellow-400">{summary.bikes}</p>
              </div>

              {/* Buses */}
              <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10 text-center hover:scale-105 transition">
                <div className="text-3xl mb-2">🚌</div>
                <p className="text-gray-400 text-sm mb-2">Buses</p>
                <p className="text-2xl font-bold text-red-400">{summary.buses}</p>
              </div>

              {/* Trucks */}
              <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10 text-center hover:scale-105 transition">
                <div className="text-3xl mb-2">🚚</div>
                <p className="text-gray-400 text-sm mb-2">Trucks</p>
                <p className="text-2xl font-bold text-blue-400">{summary.trucks}</p>
              </div>
            </div>
          </div>
        )}

        {/* TRAFFIC INSIGHTS SECTION */}
        {data.length > 0 && (
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 mb-12 shadow-lg shadow-purple-500/20">
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
              📊 Traffic Insights
            </h2>

            <div className="grid md:grid-cols-4 gap-6 mb-6">
              {[
                { label: "Peak Frame", value: peakFrame, icon: "🎯", color: "purple" },
                { label: "Peak Vehicles", value: peak, icon: "📈", color: "red" },
                { label: "Traffic Level", value: trafficLevel, icon: "🚦", color: trafficBadgeColor },
                { label: "Dominant Vehicle", value: dominantVehicle.toUpperCase(), icon: "🚙", color: "blue" },
              ].map((insight, i) => (
                <div
                  key={i}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center"
                >
                  <div className="text-2xl mb-2">{insight.icon}</div>
                  <p className="text-gray-400 text-xs mb-1 uppercase">{insight.label}</p>
                  <p className="text-xl font-bold text-white">{insight.value}</p>
                </div>
              ))}
            </div>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10 text-center">
              <p className="text-gray-300 text-sm">
                🚦 Traffic is mostly <span className="font-semibold text-white">{trafficLevel.toLowerCase()}</span> with occasional peaks. Average frame vehicles: <span className="font-semibold text-purple-400">{avgFrameVehicles}</span>
              </p>
            </div>
          </div>
        )}

        {/* DATA TABLE */}
        {data.length > 0 && (
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 mb-12 shadow-lg shadow-purple-500/20">
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
              📋 Frame-by-Frame Data
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-white/10">
                  <tr className="text-gray-400">
                    <th className="text-left py-3 px-4">Frame</th>
                    <th className="text-left py-3 px-4">Total</th>
                    <th className="text-left py-3 px-4">Cars</th>
                    <th className="text-left py-3 px-4">Bikes</th>
                    <th className="text-left py-3 px-4">Buses</th>
                    <th className="text-left py-3 px-4">Trucks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {data.slice(0, 50).map((row, i) => (
                    <tr key={i} className="hover:bg-white/5 transition">
                      <td className="py-3 px-4 text-gray-300">{row.frame}</td>
                      <td className="py-3 px-4">
                        <span className="inline-block bg-purple-600/30 px-3 py-1 rounded-full text-purple-300 font-semibold">
                          {row.total}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-block bg-green-600/30 px-3 py-1 rounded-full text-green-300 font-semibold">
                          {row.car}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-block bg-yellow-600/30 px-3 py-1 rounded-full text-yellow-300 font-semibold">
                          {row.bike}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-block bg-red-600/30 px-3 py-1 rounded-full text-red-300 font-semibold">
                          {row.bus}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-block bg-blue-600/30 px-3 py-1 rounded-full text-blue-300 font-semibold">
                          {row.truck}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {data.length > 50 && (
                <div className="text-center py-4 text-gray-500 text-sm">
                  Showing 50 of {data.length} frames
                </div>
              )}
            </div>
          </div>
        )}

        {/* GRAPH SECTION */}
        {data.length > 0 && (
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-lg shadow-purple-500/20">
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
              📈 Vehicle Count Trend
            </h2>

            {/* Recharts LineChart */}
            <div className="bg-black/30 rounded-lg p-6 overflow-auto">
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={data.slice(0, 100)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis 
                    dataKey="frame"
                    label={{ value: "Frame Number", position: "insideBottom", offset: -5, fill: "#999" }}
                    stroke="#666"
                  />
                  <YAxis 
                    domain={[0, Math.max(...data.map(d => d.total)) + 2]}
                    tickCount={6}
                    label={{ value: "Vehicle Count", angle: -90, position: "insideLeft", fill: "#999" }}
                    stroke="#666"
                  />
                  <Tooltip 
                    contentStyle={{backgroundColor: "#1a1a2e", border: "1px solid #444", borderRadius: "8px"}}
                    labelStyle={{color: "#fff"}}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="total" stroke="#8b5cf6" name="Total" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="car" stroke="#22c55e" name="Cars" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="bike" stroke="#facc15" name="Bikes" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="bus" stroke="#ef4444" name="Buses" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="truck" stroke="#3b82f6" name="Trucks" strokeWidth={2} dot={false} />
                  {peakFrame && <ReferenceDot x={peakFrame} y={peak} r={6} fill="red" />}
                </LineChart>
              </ResponsiveContainer>
              <p className="text-gray-400 text-sm mt-4 text-center">
                Showing first 100 frames - Hover over chart for detailed values • Red dot marks peak traffic
              </p>
            </div>
          </div>
        )}

        {/* PIE CHART - VEHICLE DISTRIBUTION */}
        {vehicleTotals.length > 0 && vehicleTotals.some(v => v.value > 0) && (
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 mb-12 shadow-lg shadow-purple-500/20">
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
              🍰 Vehicle Distribution
            </h2>

            <div className="bg-black/30 rounded-lg p-6">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={vehicleTotals} dataKey="value" outerRadius={100} label>
                    <Cell fill="#22c55e" />
                    <Cell fill="#facc15" />
                    <Cell fill="#ef4444" />
                    <Cell fill="#3b82f6" />
                  </Pie>
                  <Tooltip 
                    contentStyle={{backgroundColor: "#1a1a2e", border: "1px solid #444", borderRadius: "8px"}}
                    labelStyle={{color: "#fff"}}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="grid md:grid-cols-4 gap-4 mt-6">
              {vehicleTotals.map((item, i) => (
                <div key={i} className="text-center p-4 bg-white/5 rounded-lg border border-white/10">
                  <p className="text-gray-400 text-sm mb-1">{item.name}</p>
                  <p className="text-2xl font-bold text-white">{item.value}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {((item.value / vehicleTotals.reduce((sum, v) => sum + v.value, 0)) * 100).toFixed(1)}%
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* NO DATA STATE */}
        {!loading && !summary && data.length === 0 && !error && (
          <div className="text-center py-16 bg-white/5 rounded-2xl border border-white/10">
            <div className="text-5xl mb-4">⏳</div>
            <p className="text-gray-400 mb-2 text-lg font-semibold">Processing or No Data</p>
            <p className="text-gray-500 text-sm mb-6">No results available for {road} yet</p>
            <div className="text-gray-500 text-xs space-y-1">
              <p>• Upload a video for {road} from the Upload page</p>
              <p>• YOLO processing will generate vehicle_summary_{road}.json</p>
              <p>• Return here to view results</p>
            </div>
          </div>
        )}

      </div>
    </Layout>
  );
}
