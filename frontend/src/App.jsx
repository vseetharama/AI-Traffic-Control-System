import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="container text-center mt-4">
      <h1>AI Traffic Control System</h1>

      <div className="row mt-4">
        
        {/* Road 1 */}
        <div className="col-md-6 mb-3">
          <div className="card p-3">
            <h3>Road 1</h3>
            <h4 className="text-success">GREEN</h4>
            <p>Timer: 35 sec</p>
            <p>Prediction: Peak in next 10 min</p>
          </div>
        </div>

        {/* Road 2 */}
        <div className="col-md-6 mb-3">
          <div className="card p-3">
            <h3>Road 2</h3>
            <h4 className="text-danger">RED</h4>
            <p>Timer: 35 sec</p>
            <p>Prediction: Normal traffic</p>
          </div>
        </div>

        {/* Road 3 */}
        <div className="col-md-6 mb-3">
          <div className="card p-3">
            <h3>Road 3</h3>
            <h4 className="text-danger">RED</h4>
            <p>Timer: 35 sec</p>
            <p>Prediction: Low traffic</p>
          </div>
        </div>

        {/* Road 4 */}
        <div className="col-md-6 mb-3">
          <div className="card p-3">
            <h3>Road 4</h3>
            <h4 className="text-danger">RED</h4>
            <p>Timer: 35 sec</p>
            <p>Prediction: Normal traffic</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;