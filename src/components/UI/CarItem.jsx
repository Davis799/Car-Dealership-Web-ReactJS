import React from "react";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/car-item.css";
import axios from "axios";
import { useState, useEffect } from "react";

const CarItem = (props) => {

  const [image1, setImg] = useState()


  useEffect(() => {
    async function getimage() {
      const img = await ("http://localhost:3000/images/" + images[0].imgname)
      setImg(img);
      return img;
    }
    getimage()

  }, [])



  const { name,
    carid,
    chassis,
    maker,
    type,
    model,
    engineCode,
    mileage,
    engineSize,
    registrationYear,
    manufacturingYear,
    color,
    wheelDrive,
    transmission,
    locatio,
    steering,
    fuel,
    seats,
    doors,
    weight,
    images,
    availability,
    price,
    totalPrice } = props.item;


  return (
    <Col lg="3" md="3" sm="5" className="mb-3">
      <div className="car__item">
        <div className="car__img">
          <img src={image1} height="100" alt="" className=" w-100" />
        </div>

        <div className="car__item-content mt-4">
          <h4 className="section__title text-center">{name}</h4>
          <h6 className="rent__price text-center">
            Tsh {price}
          </h6>



          <button className=" w-100 car__item-btn car__btn-rent">
            <Link to={{
              pathname: `/cars/${carid}`,
            }}
            >Buy</Link>
          </button>
        </div>
      </div>
    </Col>
  );
};

export default CarItem;
