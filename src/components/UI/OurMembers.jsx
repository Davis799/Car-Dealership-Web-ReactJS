import React from "react";
import "../../styles/our-member.css";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";

import ava03 from "../../assets/all-images/ava-3.jpg";

const OUR__MEMBERS = [
  {
    name: " Name ",
    experience: " Sales Manager ",
    fbUrl: " ",
    instUrl: " ",
    twitUrl: " ",
    imgUrl: ava03,
  },

  {
    name: " Name  ",
    experience: " Director ",
    fbUrl: " ",
    instUrl: " ",
    twitUrl: " ",
    imgUrl: ava03,
  },

  {
    name: " Name ",
    experience: " Manager ",
    fbUrl: "https://m.facebook.com/people/Cfg-Motors-Tanzania/100082241418782/",
    instUrl: "https://instagram.com/cfg_tanzania_limited?igshid=YmMyMTA2M2Y=",
    twitUrl: "https://instagram.com/cfg_tanzania_limited?igshid=YmMyMTA2M2Y=",
    imgUrl: ava03,
  }
];

const OurMembers = () => {
  return (
    <>
      {OUR__MEMBERS.map((item, index) => (
        <Col lg="4" md="4" sm="5" xs="6" key={index} className="mb-4">
          <div className="single__member w-75 shadow-xl shadow-slate-400">
            <div className="single__member-img">
              <img src={item.imgUrl} alt="" className="w-100" />

              <div className="single__member-social">
                <a href={item.fbUrl}>
                  <i class="ri-facebook-line"></i>
                </a>
                <a href={item.twitUrl}>
                  <i class="ri-twitter-line"></i>
                </a>

                <a href={item.instUrl}>
                  <i class="ri-instagram-line"></i>
                </a>
              </div>
            </div>

            <h6 className="text-center mb-0 mt-3 font-sans font-semibold">{item.name}</h6>
            <p className="section__description text-center font-sans">
              {item.experience}
            </p>
          </div>
        </Col>
      ))}
    </>
  );
};

export default OurMembers;
