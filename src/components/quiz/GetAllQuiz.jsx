import React, {useState, useEffect} from 'react'
import { deleteQuestion, getAllQuestion } from '../untils/ApiFunction'
import {Spinner} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import {FaPlus} from "react-icons/fa"


const GetAllQuiz = () => {
    const[questions, setQuestions] = useState([
        {id:"", question:"", correctAnswers:"", choices:[]}
    ])
    const[isLoading, setIsLoading] = useState(true)
    const[isQuestionDeleted, setIsQuestionDeleted] = useState(false)
    const[successMessage, setSuccessMessage] = useState("")
    const[errorMessage, setErrorMessage] = useState("")

    const fetchAllQuestion = async() =>{
        try {
            const data = await getAllQuestion()
            setQuestions(data)
            setIsLoading(false)
        } catch (error) {
            setErrorMessage(error)
        }
    }
    useEffect(()=> {fetchAllQuestion()}, [])

    const handleDeleteQuestion = async(id) =>{
        try {
            await deleteQuestion(id)
            setQuestions(questions.filter((question)=> question.id !== id))
            setIsQuestionDeleted(true)
            setSuccessMessage("Question deleted successfully!")
        } catch (error) {
            setErrorMessage(error)
        }
        setTimeout(() => {
            setSuccessMessage("")
        }, 4000)
    }
    if(isLoading){
        return( <Spinner animation="border" variant="primary">
                     <span>Loading...</span>
                </Spinner>
            );
    }

  return (
    <section className="container">
        <div className="row mt-5">
            <div className="col-md-6 mb-2 md-mb-0" style={{ color: "GrayText" }}>
                <h4>All Quiz Questions</h4>
            </div>
            <div className="col-md-4 d-flex justify-content-end">
                <Link to={"/create-quiz"}>
                    <FaPlus /> Add Question
                </Link>
            </div>
        </div>
        <hr />
        {isQuestionDeleted && <div className="alert alert-success">{successMessage}</div>}
        {questions.map((question, index) => (
            <div key={question.id}>
                <pre>
                    <h4 style={{ color: "GrayText" }}>{`${index + 1}. ${question.question}`}</h4>
                </pre>
                <ul>
                    {question.choices.map((choice, index) => (
                        <li key={index}>{choice}</li>
                    ))}
                </ul>
                <p className="text-success">Correct Answer: {question.correctAnswers}</p>
                <div className="btn-group mb-4">
                    <Link to={`/update-quiz/${question.id}`}>
                        <button className="btn btn-sm btn-outline-warning mr-2">Edit Question</button>
                    </Link>
                    <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDeleteQuestion(question.id)}>
                        Delete Question
                    </button>
                </div>
            </div>
        ))}
    </section>
  )
}

export default GetAllQuiz