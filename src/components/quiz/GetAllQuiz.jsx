import React, {useState, useEffect} from 'react'
import { deleteQuestion, getAllQuestion } from '../untils/ApiFunction'
import {Button, Spinner} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import {FaPlus, FaEdit} from "react-icons/fa"
import { MdDeleteForever } from "react-icons/md";


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
        return( <Spinner animation="border" variant="primary"/>);
    }

  return (
    <section className="container">
        <h1 className="mt-5 text-center text-primary fw-bold font-family">All Quiz Questions</h1>
        <hr />
        <Link to={"/create-quiz"}>
            <Button variant='outline-primary my-3' size='lg'>
                <FaPlus /> Add Question
            </Button>
        </Link>
        {isQuestionDeleted && <div className="alert alert-success">{successMessage}</div>}
        {questions.map((question, index) => (
            <div key={question.id}>
                <pre>
                    <h4 className='text-secondary fw-bold'>{`${index + 1}. ${question.question}`}</h4>
                </pre>
                <ul className='fs-5 '>
                    {question.choices.map((choice, index) => (
                        <li key={index}>{choice}</li>
                    ))}
                </ul>
                <p className="text-success fs-5">Correct Answer: {question.correctAnswers}</p>
                <div className=" mb-4 ">
                    <Link to={`/update-quiz/${question.id}`}>
                        <Button variant='warning mr-2 me-2' size='lg' > <FaEdit /> Edit</Button>
                    </Link>
                    <Button
                        variant='danger mr-2 me-2'  size='lg'
                        onClick={() => handleDeleteQuestion(question.id)}>
                        <MdDeleteForever /> Delete
                    </Button>
                </div>
            </div>
        ))}
    </section>
  )
}

export default GetAllQuiz