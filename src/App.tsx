import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import DecisionModel from './DecisionModel';
import { Icon } from './components/icons';
import './App.css'

function App() {

  return (
      <div>
        <Icon />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/decision-model" element={<DecisionModel />} />
          </Routes>
        </Router>
      </div>
  )
}

export default App
