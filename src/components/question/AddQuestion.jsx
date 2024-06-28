import React, {useEffect, useState} from 'react'
import { getSubjects, createQuestion } from '../untils/ApiFunction';
import { Link } from 'react-router-dom';
import { FaHandPointRight, FaRegQuestionCircle, FaSave, FaBackspace} from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const AddQuestion = () => {
	
    const [question, setQuestionText] = useState("")
    const[questionType, setQuestionType] = useState("single")
    const[choices, setChoices] = useState([""])
    const[correctAnswers, setCorrectAnswers] = useState([""])
    const[subject, setSubject] = useState("")
    const[newSubject, setNewSubject] = useState("")
    const[subjectOptions, setSubjectOptions] = useState([""])
    const[successMessage, setSuccessMessage] = useState("")
    const[errorMessage, setErrorMessage] = useState("")

    const fetchSubject = async() =>{
        try {
            const subjectData = await getSubjects();
            setSubjectOptions(subjectData)
        } catch (error) {
            setErrorMessage(error);
        }
    }

	useEffect(() =>{
		fetchSubject()
	},[])

    const handleAddChoice = async() =>{
        const lastChoice = choices[choices.length-1];
        const lastChoiceLetter = lastChoice ? lastChoice.charAt(0) :"A"
        const newChoiceLetter = String.fromCharCode(lastChoiceLetter.charCodeAt(0)+1)
        const newChoice = `${newChoiceLetter}.`
        setChoices([...choices, newChoice])
    }

    const handleRemoveChoice = (index) =>{
        setChoices(choices.filter((choice, i)=>i !== index))

    }

    const handleChoiceChange = (index, value) =>{
        setChoices(choices.map((choice, i) => (i === index ? value: choice)))
    }

    const handleCorrectAnswerChange = (index, value) =>{
        setCorrectAnswers(correctAnswers.map((answer, i) => (i === index ? value : answer)))
    }

    const handleAddCorrectAnswer = () => {
		setCorrectAnswers([...correctAnswers, ""])
	}

    const handleRemoveCorrectAnswer = () =>{
        setCorrectAnswers(correctAnswers.filter((answer, i) => i !== index))
    }

    const handleSubmit = async(e) =>{
        e.preventDefault()
        try {
            const result = {question, questionType, choices, 
                correctAnswers:correctAnswers.map((answer)=>{
                    const choiceLetter = answer.charAt(0).toUpperCase()
                    const choiceIndex = choiceLetter.charCodeAt(0) - 65
                    return choiceIndex >= 0 && choiceIndex < choices.length ? choiceLetter: null
                }),
                subject
            }
            await createQuestion(result)
            setQuestionText("")
            setQuestionType("single")
            setChoices([""])
            setCorrectAnswers([""])
            setSubject("")
        } catch (error) {
            setErrorMessage(error)
        }
    }

    const handleAddSubject = () =>{
        if(newSubject.trim() != ""){
            setSubject(newSubject.trim())
            setSubjectOptions([... subjectOptions, newSubject.trim()])
            setNewSubject("")
        }
    }

	const handleCancelAddSubject = () => {
		setSubject("");
		setNewSubject("");
	}

  return (
    <div className="container font-family">
		<div className="row justify-content-center">
			<div className="col-md-6  mt-5">
				<div className="card">
					<div className="card-header">
						<h4 className="card-title text-center text-primary fw-bold fs-2">ADD NEW QUESTIONS</h4>
					</div>
					<div className="card-body fs-4">
						<form onSubmit={handleSubmit} className="p-2">
							<div className="mb-3">
								<label htmlFor="subject" className="form-label text-info">
									<FaHandPointRight/> Select a Subject
								</label>
								<select
									id="subject"
									value={subject}
									onChange={(e) => setSubject(e.target.value)}
									className="form-control fs-5">
									<option value="">Select subject</option>
									<option className='text-danger' value={"New"}>Add New</option>
									{subjectOptions.map((option) => (
										<option key={option} value={option}>
											{option}
										</option>
									))}
								</select>
							</div>

							{subject === "New" && (
								<div className="mb-3">
									<label htmlFor="new-subject" className="form-label text-info fs-4">
										<FaHandPointRight/> Add New Subject
									</label>
									<input
										type="text"
										id="new-subject"
										value={newSubject}
										onChange={(event) => setNewSubject(event.target.value)}
										className="form-control fs-5"
									/>
									<button
										type="button"
										onClick={handleAddSubject}
										className="btn btn-outline-primary mt-2 me-2">
										Add Subject
									</button>
									<button
										type="button"
										onClick={handleCancelAddSubject}
										className="btn btn-outline-danger mt-2">
										Cancel
									</button>
								</div>
							)}
							<div className="mb-3">
								<label htmlFor="question-text" className="form-label text-info">
									<FaHandPointRight/> Question
								</label>
								<textarea
									className="form-control"
									rows={4}
									value={question}
									onChange={(e) => setQuestionText(e.target.value)}></textarea>
							</div>
							<div className="mb-3">
								<label htmlFor="question-type" className="form-label text-info">
								 <FaHandPointRight/> Question type
								</label>
								<select
									id="question-type"
									value={questionType}
									onChange={(event) => setQuestionType(event.target.value)}
									className="form-control">
									<option value="single">Single Answer</option>
									<option value="multiple">Multiple Answer</option>
								</select>
							</div>
							<div className="mb-3">
								<label htmlFor="choices" className="form-label text-primary">
									<FaHandPointRight/> Choices
								</label>
								{choices.map((choice, index) => (
									<div key={index} className="input-group mb-3">
										<input
											type="text"
											value={choice}
											onChange={(e) => handleChoiceChange(index, e.target.value)}
											className="form-control me-2"
										/>
										<button
											type="button"
											onClick={() => handleRemoveChoice(index)}
											className="btn btn-outline-danger">
											<MdDeleteForever />
										</button>
									</div>
								))}
								<button
									type="button"
									onClick={handleAddChoice}
									className="btn btn-outline-primary">
									Add Choice
								</button>
							</div>
							{questionType === "single" && (
								<div className="mb-3">
									<label htmlFor="answer" className="form-label text-success">
										<FaHandPointRight/> Correct Answer
									</label>
									<input
										type="text"
										className="form-control"
										id="answer"
										value={correctAnswers[0]}
										onChange={(e) => handleCorrectAnswerChange(0, e.target.value)}
									/>
								</div>
							)}
							{questionType === "multiple" && (
								<div className="mb-3">
									<label htmlFor="answer" className="form-label text-success">
										Correct Answer(s)
									</label>
									{correctAnswers.map((answer, index) => (
										<div key={index} className="d-flex mb-2">
											<input
												type="text"
												className="form-control me-2"
												value={answer}
												onChange={(e) => handleCorrectAnswerChange(index, e.target.value)}
											/>
											{index > 0 && (
												<button
													type="button"
													className="btn btn-danger"
													onClick={() => handleRemoveCorrectAnswer(index)}>
													Remove
												</button>
											)}
										</div>
									))}
									<button
										type="button"
										className="btn btn-outline-info"
										onClick={handleAddCorrectAnswer}>
										Add Correct Answer
									</button>
								</div>
							)}

							{!correctAnswers.length && <p>Please enter at least one correct answer.</p>}

							<div className="btn-group">
								<button type="submit" className="btn btn-outline-success mr-2 me-2">
									<FaSave />
								</button>
								<Link to={"/admin"} className="btn btn-outline-primary ml-2">
									<FaBackspace />
								</Link>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
  )
}

export default AddQuestion