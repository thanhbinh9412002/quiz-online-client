import React from 'react'
import { Col, Container, Row } from "react-bootstrap"

const Footer = () => {
    let today = new Date();
  return (
    <footer className="bg-light text-dark py-3 footer ">
        <Container>
            <Row>
                <Col xs={12} md={12} className="text-center">
                    <p className="mb-0">&copy; {today.getFullYear()} Quiz online app</p>
                </Col>
            </Row>
        </Container>
    </footer>
  )
}

export default Footer