import React from "react";
import { Container, Row, Col } from "reactstrap";
import "../../styles/about-section.css";
import aboutImg from "../../assets/all-images/cars-img/cfglogo2.png";

const AboutSection = ({ aboutClass }) => {
  return (
    <section
      className="about__section"
      style={
        aboutClass === "aboutPage"
          ? { marginTop: "0px" }
          : { marginTop: "280px" }
      }
    >
      <Container>
        <Row>
          <Col lg="6" md="6">
            <div className="about__section-content">
              <h4 className=" text-red-500 text-xl font-sans font-bold">About Us</h4>
              <h2 className=" font-bold font-sans">Welcome to CFG Motors Tanzania</h2>
              <p className=" text-slate-800 justify-evenly text-l font-sans">
                CFG Motors Tanzania, adipisicing elit.
                Voluptatum blanditiis esse accusantium dignissimos labore
                laborum. Veniam, corporis mollitia temporibus, in quaerat vero
                deleniti amet dolorem repudiandae, pariatur nam dolore! Impedit
                neque sit ad temporibus quam similique dolor ipsam praesentium
                sunt.
              </p>

              <div className="about__section-item d-flex space-x-5 align-items-center">
                <p className=" text-slate-800 font-sans d-flex align-items-center gap-2">
                  <i class="ri-checkbox-circle-line"></i> Quality cars
                </p>

                <p className="text-slate-800  font-sans d-flex align-items-center gap-2">
                  <i class="ri-checkbox-circle-line"></i> Quality cars
                </p>
              </div>

              <div className="about__section-item d-flex space-x-5 align-items-center">
                <p className="text-slate-800  font-sans d-flex align-items-center gap-2">
                  <i class="ri-checkbox-circle-line"></i> Quality cars
                </p>

                <p className="text-slate-800  font-sans d-flex align-items-center gap-2">
                  <i class="ri-checkbox-circle-line"></i> Quality cars
                </p>
              </div>
            </div>
          </Col>

          <Col lg="6" md="6">
            <div className="about__img">
              <img src={aboutImg} alt="" className="w-100" />
              <h2 className=" text-center pt-2 font-sans font-bold text-black text-4xl">Company Limited</h2>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutSection;
