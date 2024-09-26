import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Liquidacao from './components/Liquidacao';
import Header from './components/ui/Header';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="container">
        <Header title='Eqseed - Liquidações' />
          <Routes>
            <Route path="/eqseed" element={<Navigate to="/liquidacao" />} />
            <Route path="/liquidacao" element={<Liquidacao />} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;
