import React, { useEffect, useState } from "react"

import { Link, useNavigate, useParams } from "react-router-dom"
import {Spinner} from 'react-bootstrap'
import {getQuestionById, updateQuestion} from "../untils/ApiFunction"

const UpdateQuestion = () => {

  const {id} = useParams()
  const navigate = useNavigate()
  const [question, setQuestion] = useState("")
  const [choices, setChoices] = useState([""])
  const [correctAnswers, setCorrectAnswers] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const[successMessage, setSuccessMessage] = useState("")
  const[errorMessage, setErrorMessage] = useState("")

  const fetchQuestion = async() =>{
    try {
      const questionToUpdate = await getQuestionById(id)
      if(questionToUpdate){
        setQuestion(questionToUpdate.question)
        setChoices(questionToUpdate.choices)
        setCorrectAnswers(questionToUpdate.correctAnswers)
      }
      setIsLoading(false)
    } catch (error) {
      setErrorMessage(error)
    }
  }

  useEffect(() =>{
    fetchQuestion()
  },[])
    
  const handleQuestionChange = (e) =>{
    setQuestion(e.target.value)
  }

  const handleChoiceChange = (index, e) =>{
    const updatedChoices = [...choices]
    updatedChoices[index] = e.target.value
    setChoices(updatedChoices)
  }

  const handleCorrectAnswerChange = (e) =>{
    setCorrectAnswers(e.target.value)
  }

  const handleSubmitUpdate = async(e) => {
    e.preventDefault()
    try {
      const UpdateQuestion = {
        question, choices, 
        correctAnswers: correctAnswers.toString().split(",").map((answer) => answer.trim())
      } 
      await updateQuestion(id, updatedQuestion)
      navigate("/all-quiz")
    } catch (error) {
      setErrorMessage(error)
    }
  }

  if(isLoading){
    return( <Spinner animation="border" variant="primary">
                 <span>Loading...</span>
            </Spinner>
        );
  }

  return (
    <div className="container">
			<h4 className="mt-5" style={{ color: "GrayText" }}>
				Update Quiz Question
			</h4>
			<div className="col-8">
				<form onSubmit={handleSubmitUpdate}>
					<div className="form-group">
						<label className="text-info">Question:</label>
						<textarea
							className="form-control"
							rows={4}
							value={question}
							onChange={handleQuestionChange}></textarea>
					</div>

					<div className="form-group">
						<label className="text-info">Choices:</label>
						{choices.map((choice, index) => (
							<input
								key={index}
								type="text"
								className="form-control mb-4"
								value={choice}
								onChange={(e) => handleChoiceChange(index, e)}
							/>
						))}
					</div>
					<div className="form-group">
						<label className="text-info">Correct Answer(s):</label>
						<input
							type="text"
							className="form-control mb-4"
							value={correctAnswers}
							onChange={handleCorrectAnswerChange}
						/>
					</div>

					<div className="btn-group">
						<button type="submit" className="btn btn-sm btn-outline-warning">
							Update question
						</button>
						<Link to={"/all-quiz"} className="btn btn-outline-primary ml-2">
							Back to all questions
						</Link>
					</div>
				</form>
			</div>
		</div>
  )
}

export default UpdateQuestion