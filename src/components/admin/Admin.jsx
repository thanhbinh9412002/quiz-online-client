import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, Row, Col} from "react-bootstrap";
import { FaArrowAltCircleRight } from "react-icons/fa";

const CardInfo = ({to, imgSrc, title}) =>(
	<Col className="d-flex justify-content-center mb-3" sm="6">
		<Card style={{ width: '18rem' }}>
			<Link to={to} className="nav-link">
				<Card.Img src={imgSrc} />
				<Card.Body className="text-center text-success">
					<Card.Title className='fw-bold'>{title}</Card.Title>
					<div className="d-flex justify-content-center">
						<Button variant="outline-info" size="lg"><FaArrowAltCircleRight /> Access</Button>
					</div>
				</Card.Body>
			</Link>
		</Card>
	</Col>
)

const Admin = () => {
  return (
    <section className="container font-family">
		<h1 className="mt-5 text-center text-primary fw-bold">WELCOME TO ADMIN PAGE</h1>
		<hr />
		<Row className="justify-content-center">
			<CardInfo
				to="/create-quiz"
				imgSrc="./src/assets/create_question.png"
				title="Create a New Quiz"
			/>
			<CardInfo
				to="/all-quiz"
				imgSrc="./src/assets/manage_question.png"
				title="Manage Existing Quizzes"
			/>
		</Row>
	</section>
  )
}

export default Admin