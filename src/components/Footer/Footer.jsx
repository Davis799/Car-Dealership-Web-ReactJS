import React from "react";

import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/footer.css";
import cfglogo from "../../assets/all-images/cars-img/cfglogo.png";

const quickLinks = [
  {
    path: "/about",
    display: "About",
  },

  {
    path: "/cars",
    display: "Car Listing",
  },
  {
    path: "/blogs",
    display: "Blog",
  },

  {
    path: "/contact",
    display: "Contact",
  },
];

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg="4" md="4" sm="12">
            <div className="logo footer__logo">
              <h1>
                <Link to="/home" className=" d-flex align-items-center gap-2">
                  <img src={cfglogo} className=" shadow-slate-800 drop-shadow-2xl" />

                  {/* <i class="ri-car-line"></i>
                  <span className=" font-serif text-2xl">
                    Cars From <br /> Germany
                  </span> */}
                </Link>
              </h1>
            </div>
            <p className="footer__logo-content font-sans">
              CFG Motors Tanzania, consectetur adipisicing elit.
              Consequuntur, distinctio, itaque reiciendis ab cupiditate harum ex
              quam veniam, omnis expedita animi quibusdam obcaecati mollitia?
              Delectus et ad illo recusandae temporibus?
            </p>
          </Col>

          <Col lg="2" md="4" sm="6">
            <div className="mb-4">
              <h5 className="footer__link-title font-sans">Quick Links</h5>
              <ListGroup>
                {quickLinks.map((item, index) => (
                  <ListGroupItem key={index} className="p-0 mt-3 quick__link font-sans">
                    <Link to={item.path}>{item.display}</Link>
                  </ListGroupItem>
                ))}
              </ListGroup>
            </div>
          </Col>

          <Col lg="3" md="4" sm="6">
            <div className="mb-4 font-sans">
              <h5 className="footer__link-title mb-4">Head Office</h5>
              <p className="office__info">34245 Dar es Salaam, Tanzania</p>
              <p className="office__info">Phone: +255 656 123 456, +255 656 123 456</p>

              <p className="office__info">Email: cfgmotorstanzania@gmail.com</p>

              <p className="office__info">Office Time: 8am - 7pm</p>
            </div>
          </Col>

          <Col lg="12">
            <div className="font-sans text-justify text-xs">
              <p className=" text-blue-900 mt-3 flex flex-col align-items-center justify-content-center gap-1 pt-4">
                <span><i class="ri-copyright-line">{"\n"}</i>Copyright {year}, CFG Motors Tanzania Comapny Limited.<br /></span>
                <span>Developed by Davis Tibenda. All rights reserved.</span>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
