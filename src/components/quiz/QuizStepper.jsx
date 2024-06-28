import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { getSubjects } from '../untils/ApiFunction'
import { FaHandPointRight, FaRegQuestionCircle} from "react-icons/fa";
import { GiPreviousButton, GiNextButton } from "react-icons/gi";
import { MdStart } from "react-icons/md";
import {Button} from 'react-bootstrap'

const QuizStepper = () => {

    const [currentStep, setCurrentStep] = useState(1)
    const [selectedSubject, setSelectedSubject] = useState("")
    const [selectedNumQuestions, setSelectedNumQuestions] = useState("")
    const [subjects, setSubjects] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        fetchSubjectData()
    }, [])

    const fetchSubjectData = async () => {
        try {
            const subjectsData = await getSubjects()
            setSubjects(subjectsData)
        } catch (error) {
            console.error(error)
        }
    }

    const handleNext = () => {
        if (currentStep === 3) {
            if (selectedSubject && selectedNumQuestions) {
                navigate("/take-quiz", { state: { selectedNumQuestions, selectedSubject } })
            } else {
                alert("Please select a subject and number of questions.")
            }
        } else {
            setCurrentStep((prevStep) => prevStep + 1)
        }
    }

    const handlePrevious = () => {
        setCurrentStep((prevStep) => prevStep - 1)
    }

    const handleSubjectChange = (event) => {
        setSelectedSubject(event.target.value)
    }

    const handleNumQuestionsChange = (event) => {
        setSelectedNumQuestions(event.target.value)
    }

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className='font-family'>
                        <h2 className="text-secondary mb-2">I want to take a quiz on:</h2>
                        <select
                            className="form-select fs-5 "
                            value={selectedSubject}
                            onChange={handleSubjectChange}>
                            <option value="">Select a subject</option>
                            {subjects.map((subject) => (
                                <option key={subject} value={subject}>
                                    {subject}
                                </option>
                            ))}
                        </select>
                    </div>
                )
            case 2:
                return (
                    <div className='font-family'>
                        <h2 className="text-secondary mb-2 font-family">How many questions would you like to attempt ?</h2>
                        <input
                            type="number"
                            className="form-control fs-5"
                            value={selectedNumQuestions}
                            onChange={handleNumQuestionsChange}
                            placeholder="Enter the number of questions"
                        />
                    </div>
                )
            case 3:
                return (
                    <div className='font-family'>
                        <h2 className='text-secondary mb-2'>  Confirmation <FaRegQuestionCircle /> </h2>
                        <p className="fs-5 ms-3 text-info"> <FaHandPointRight /> Subject: {selectedSubject}</p>
                        <p className="fs-5 ms-3 text-info"> <FaHandPointRight /> Number of Questions: {selectedNumQuestions}</p>
                    </div>
                )
            default:
                return null
        }
    }

    const renderProgressBar = () => {
        const progress = currentStep === 3 ? 100 : ((currentStep - 1) / 2) * 100
        return (
            <div className="progress font-family fs-5">
                <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: `${progress}%` }}
                    aria-valuenow={progress}>
                    Step {currentStep}
                </div>
            </div>
        )
    }

  return (
    <section className="mt-5">
        <h1 className="mt-5 text-center text-primary fw-bold font-family">
            WELCOME TO QUIZ ONLINE
        </h1>
        {renderProgressBar()}
        <div className="card">
            <div className="card-body">
                {renderStepContent()}
                <div className="d-flex justify-content-between mt-4">
                    {currentStep > 1 && (
                        <Button variant="outline-warning" size='lg' onClick={handlePrevious}>
                            <GiPreviousButton /> Previous
                        </Button>
                    )}
                    {currentStep < 3 && (
                        <Button
                            variant="outline-primary" size='lg'
                            onClick={handleNext}
                            disabled={
                                (currentStep === 1 && !selectedSubject) ||
                                (currentStep === 2 && !selectedNumQuestions)
                            }>
                            <GiNextButton /> Next
                        </Button>
                    )}
                    {currentStep === 3 && (
                        <Button variant="outline-success" size='lg' onClick={handleNext}>
                            <MdStart /> Start Quiz
                        </Button>
                    )}
                </div>
            </div>
        </div>
    </section>
  )
}

export default QuizStepper