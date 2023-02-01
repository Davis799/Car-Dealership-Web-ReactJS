import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup, Input } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import "../styles/contact.css";
import axios from "axios";
import { useState } from "react";


const Contact = () => {
  const [email, setEmail] = useState(" ");
  const [message, setMessage] = useState(" ");

  const handleChange1 = (e) => {
    setEmail({
      email: e.target.value
    }
    )
  }

  const handleChange2 = (e) => {
    setMessage({
      message: e.target.value
    }
    )
  }


  const handleSubmit = (event) => {
    axios.post("http://localhost:3000/messages", {
      email: email.email,
      message: message.message
    })
      .then(res => {
        console.log(res.data)
      })

  }

  return (
    <Helmet title="Contact">
      <CommonSection title="Contact" />
      <section>
        <Container>
          <Row>
            <Col lg="7" md="7">
              <h6 className="fw-bold mb-4">Get In Touch</h6>

              <Form onSubmit={handleSubmit}>
                <FormGroup className="contact__form">
                  <Input placeholder="Email" type="email" value={message.email} onChange={handleChange1} />
                </FormGroup>
                <FormGroup className="contact__form">
                  <Input placeholder="Message" rows="5" type="textarea" value={message.message} onChange={handleChange2} />
                </FormGroup>

                <button className=" contact__btn" type="submit">
                  Send Message
                </button>
              </Form>
            </Col>

            <Col lg="5" md="5">
              <div className="contact__info font-sans">
                <h6 className="fw-bold">Contact Information</h6>
                <p className="section__description mb-0">
                  34245 Dar es Salaam, Tanzania
                </p>
                <div className=" d-flex align-items-center gap-2">
                  <h6 className="fs-6 mb-0">Phone:</h6>
                  <p className="section__description mb-0">+255 656 123 456, +255 656 123 456</p>
                </div>

                <div className=" d-flex align-items-center gap-2">
                  <h6 className="mb-0 fs-6">Email:</h6>
                  <p className="section__description mb-0">cfgmotorstanzania@gmail.com</p>
                </div>

                <h6 className="fw-bold mt-4">Follow Us</h6>

                <div className=" d-flex align-items-center gap-4 mt-3">
                  <a href="https://m.facebook.com/people/Cfg-Motors-Tanzania/100082241418782/"
                    className="social__link-icon">
                    <i class="ri-facebook-line"></i>
                  </a>
                  <a href="https://instagram.com/cfg_tanzania_limited?igshid=YmMyMTA2M2Y="
                    className="social__link-icon">
                    <i class="ri-instagram-line"></i>
                  </a>
                  <a href="https://instagram.com/cfg_tanzania_limited?igshid=YmMyMTA2M2Y="
                    className="social__link-icon">
                    <i class="ri-twitter-line"></i>
                  </a>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Contact;
