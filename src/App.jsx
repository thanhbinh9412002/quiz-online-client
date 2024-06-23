import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/layout/NavBar';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import '/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import AddQuestion from './components/question/AddQuestion';
import Home from "./components/home/Home"
import QuizStepper from "./components/quiz/QuizStepper"
import Quiz  from "./components/quiz/Quiz"
import QuizResult from "./components/quiz/QuizResult"
import GetAllQuiz from "./components/quiz/GetAllQuiz"
import UpdateQuestion from "./components/question/UpdateQuestion"
import Admin from "./components/admin/Admin"


function App() {
  const [count, setCount] = useState(0)

  return (
    <main className="container mt-5 mb-5">
      <Router>
        <NavBar/>
        <Routes>
          <Route path="/" element={<Home />} />
					<Route path="/quiz-stepper" element={<QuizStepper />} />
					<Route path="/take-quiz" element={<Quiz />} />
					<Route path="/admin" element={<Admin />} />

					<Route path="/create-quiz" element={<AddQuestion />} />
					<Route path="/update-quiz/:id" element={<UpdateQuestion />} />
					<Route path="/all-quiz" element={<GetAllQuiz />} />
					<Route path="/quiz-result" element={<QuizResult />} />
        </Routes>
      </Router>
    </main>
  )
}

export default App
