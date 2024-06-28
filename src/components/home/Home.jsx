import React from 'react'
import { Carousel } from 'react-bootstrap'
import Footer from '../layout/Footer.jsx';

const Home = () => {
  return (
    <>
      <Carousel>
        <Carousel.Item interval={1000}>
          <img className="d-block w-100" src='./src/assets/slide1.jpg' text="First slide"/>
          <Carousel.Caption>
            <h3>ONLINE QUIZ APP</h3>
            <p>Welcome to online quiz for everyone.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={500}>
          <img className="d-block w-100" src='./src/assets/slide2.png' text="Second slide"/>
          <Carousel.Caption>
            <h3>ONLINE QUIZ APP</h3>
            <p>Welcome to online quiz for everyone.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src='./src/assets/slide3.jpg' text="Third slide"/>
          <Carousel.Caption>
            <h3>ONLINE QUIZ APP</h3>
            <p>Welcome to online quiz for everyone.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <Footer/>
    </>
  )
}

export default Home