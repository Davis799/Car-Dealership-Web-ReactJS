import React from "react";

import HeroSlider from "../components/UI/HeroSlider";
import Helmet from "../components/Helmet/Helmet";

import { Container, Row, Col } from "reactstrap";
import FindCarForm from "../components/UI/FindCarForm";

import CarItem from "../components/UI/CarItem";



import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import BlogItem from "../components/UI/BlogItem";

const Home = () => {
  const [Cars, setCars] = useState([{}]);
  const [Blogs, setBlogs] = useState([{}]);

  useEffect(() => {
    axios.get("http://localhost:3000/cars")
      .then(res => {
        setCars(res.data.cars);
        console.log(Cars);
        axios.get("http://localhost:3000/reviews/")
          .then(res => {
            setBlogs(res.data.reviews);

          })
      })
  }, []
  );

  return (
    <Helmet title="Home">
      {/* ============= hero section =========== */}
      <section className="p-0 hero__slider-section">
        <HeroSlider />
        <div className="hero__form">
          <Container>
            <Row className="form__row">
              <Col lg="4" md="4">
                <div className="find__cars-left">
                  <h2>Find your best car here</h2>
                </div>
              </Col>

              <Col lg="8" md="8" sm="12">
                <FindCarForm />
              </Col>
            </Row>
          </Container>
        </div>
      </section>
      {/* =========== about section ================ */}
      {/* ========== services section ============ */}
      {/* <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5 text-center">
              <h6 className="section__subtitle">See our</h6>
              <h2 className="section__title">Popular Services</h2>
            </Col>

            <ServicesList />
          </Row>
        </Container>
      </section> */}
      {/* =========== car offer section ============= */}
      <Container>
        <Row>
          <Col lg="12" className="text-center mb-5">
            <h2 className="section__title">Hot Offers</h2>
          </Col>

          {Cars.sort((a, b) => parseInt(b.carid) - parseInt(a.carid)).slice(0, 8).map((item) => (
            <CarItem item={item} key={item.carid} />
          ))}
        </Row>
      </Container>

      {/* =========== become a driver section ============ */}

      {/* =========== testimonial section =========== */}
      {/* <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-4 text-center">
              <h6 className="section__subtitle">Our clients says</h6>
              <h2 className="section__title">Testimonials</h2>
            </Col>

            <Testimonial />
          </Row>
        </Container>
      </section> */}

      {/* =============== blog section =========== */}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5 text-center">
              <h6 className="text-red-600 text-3xl ">Explore our blogs</h6>
            </Col>
            {Blogs.sort((a, b) => parseInt(b.id) - parseInt(a.id)).slice(0, 4).map((item) => (
              <BlogItem item={item} key={item.id} />
            ))}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Home;
