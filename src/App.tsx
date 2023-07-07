import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Header from './components/global/Header'
import Home from './Home'
import DecisionModel from './DecisionModel'
import './App.css'
import 'react-toastify/dist/ReactToastify.css'

function App() {

  return (
      <div>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/decision-model" element={<DecisionModel />} />
          </Routes>
        </Router>
        <ToastContainer />
      </div>
  )
}

export default App
