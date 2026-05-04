import { Link } from "react-router-dom";
import Layout from "../components/Layout";

export default function Home() {
  return (
    <Layout>

      {/* HERO */}
      <section className="text-center space-y-6">

        <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
         AI-based Smart Traffic Congestion Optimization System
        </h1>

        <p className="text-gray-400 max-w-xl mx-auto text-lg">
          Smart traffic control using YOLO detection and AI-based signal optimization.
        </p>

        <div className="flex justify-center gap-4">
          <Link to="/dashboard">
          <button className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium shadow-lg shadow-purple-500/40 hover:scale-105 hover:shadow-purple-500/60 transition">
  View Demo →
</button>
          </Link>

          <a href="https://github.com/vseetharama/AI-Traffic-Control-System" target="_blank">
          <button className="px-6 py-3 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-white hover:bg-white/10 hover:scale-105 transition">
  GitHub
</button>
          </a>
           <Link to="/upload">
<button className="px-6 py-3 rounded-full bg-purple-600 text-white font-medium shadow-lg shadow-purple-500/40 hover:bg-purple-700 hover:scale-105 transition">
  Upload Dataset
</button>
  </Link>
        </div>

      </section>

      {/* FEATURES */}
      <section className="text-center mt-24">
        <h2 className="text-3xl mb-10">Core Features</h2>

        <div className="grid md:grid-cols-3 gap-6">

          {[
            "🚗 Vehicle Detection",
            "📊 Traffic Analysis",
            "🚦 Smart Signals",
            "📈 AI Prediction",
            "🌐 Dashboard UI",
            "⚡ Real-Time Processing"
          ].map((f, i) => (
            <div
              key={i}
              className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10 hover:scale-105 transition"
            >
              {f}
            </div>
          ))}

        </div>
      </section>

      {/* WORKFLOW */}
      <section className="text-center mt-24">
        <h2 className="text-3xl mb-10">Workflow</h2>

        <div className="flex justify-center items-center gap-4 flex-wrap">

          {["Input", "Detection", "Counting", "Analysis", "Optimization"].map((step, i) => (
            <div key={i} className="flex items-center gap-3">

              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
                {i + 1}
              </div>

              <span className="text-gray-300">{step}</span>

              {i !== 4 && (
                <div className="w-10 h-[2px] bg-gradient-to-r from-blue-500 to-purple-500"></div>
              )}

            </div>
          ))}

        </div>
      </section>

      {/* CTA */}
      <div className="text-center mt-24">
        <Link to="/members">
          <button className="px-8 py-3 bg-green-500 rounded-full hover:bg-green-600 transition">
            Meet Our Team
          </button>
        </Link>
      </div>

      {/* FOOTER */}
      <div className="text-center mt-16 text-gray-500 text-sm">
        © 2026 AI Traffic System
      </div>

    </Layout>
  );
}