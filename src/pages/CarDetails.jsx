import React, { useEffect, useState } from "react";

import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import { useParams } from "react-router-dom";

import "../styles/car-slideshow.css";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { EffectFade, Navigation, Pagination } from "swiper";


const CarDetails = () => {
  const { slug } = useParams();
  const [Car, setCar] = useState({});



  const getCar = () => {
    axios.get(`http://localhost:3000/cars/${slug}`)
      .then(res => {
        setCar(res.data.car[0]);
        console.log(Car.images);
      })
  }


  useEffect(() => {
    getCar();
    window.scrollTo(0, 0);
  }, [slug])


  const singleCarItem = Car

  const images = { ...Car.images }
  console.log(images[0])


  //  for (let i = 0; index < images.length; i++) {
  //     const carimages = [{url: "http://localhost:3000/images/"+images[i].imgname}]
  //   }

  // const carimages = [
  //   //   { url: "http://localhost:3000/images/" + images[0].imgname },
  //   // { url: "http://localhost:3000/images/" + images[1].imgname },
  //   // { url: "http://localhost:3000/images/" + images[2].imgname },
  //   // { url: "http://localhost:3000/images/" + images[3].imgname },
  //   // { url: "http://localhost:3000/images/" + images[4].imgname },
  //   // { url: "http://localhost:3000/images/" + images[5].imgname },
  // ]




  return (
    <Helmet title={singleCarItem.images}>
      {/* {
        carimages === null ? () => {
          for (var i = 0; i < 3; i++) {
            getCar();
          }
        }
          : */}
      <section>
        <Container>
          <Row>
            <Col lg="7">
              <div>

                <Swiper
                  spaceBetween={30}
                  effect={"fade"}
                  navigation={true}
                  pagination={{
                    clickable: true,
                  }}
                  modules={[EffectFade, Navigation, Pagination]}
                  className=" "
                >

                  <div>Got them images</div>

                  <SwiperSlide>
                    <img src={`http://localhost:3000/images/${images[0].imgname}`} />
                  </SwiperSlide>
                  {/* <SwiperSlide>
                    <img src={`http://localhost:3000/images/${images[1].imgname}`} />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src={`http://localhost:3000/images/${images[2].imgname}`} />
                  </SwiperSlide>  */}
                </Swiper>
              </div>
            </Col>
            <Col lg="5" className=" font-sans">
              <div className="car__info">
                <h2 className="font-sans font-semibold text-4xl">{singleCarItem.name}</h2>

                <div className=" d-flex align-items-center gap-5 mb-4 mt-3">
                  <h6 className="rent__price fw-bold fs-4 font-sans">
                    Tsh {singleCarItem.price}.00
                  </h6>
                </div>

                <div className="  inline-flex space-x-20 font-sans ">
                  <div className="flex-col space-y-3 font-sans">
                    <div className=" text-left">
                      <div className=" border-2 border-t-red-600"></div>
                      <div className=" font-bold">Maker
                        <br />
                        <p className=" font-normal">{singleCarItem.maker}</p></div>
                    </div>
                    <div className=" text-left">
                      <div className=" border-2 border-t-red-600"></div>
                      <div className=" font-bold">Type
                        <br />
                        <p className=" font-normal">{singleCarItem.type}</p></div>
                    </div>
                    <div className=" text-left">
                      <div className=" border-2 border-t-red-600"></div>
                      <div className=" font-bold">Chassis
                        <br />
                        <p className=" font-normal">{singleCarItem.chassis}</p></div>
                    </div>
                    <div className=" text-left">
                      <div className=" border-2 border-t-red-600"></div>
                      <div className=" font-bold">Model
                        <br />
                        <p className=" font-normal">{singleCarItem.model}</p></div>
                    </div>
                    <div className=" text-left">
                      <div className=" border-2 border-t-red-600"></div>
                      <div className=" font-bold">Engine code
                        <br />
                        <p className=" font-normal">{Car.engineCode}</p></div>
                    </div>
                    <div className=" text-left">
                      <div className=" border-2 border-t-red-600"></div>
                      <div className=" font-bold">Mileage
                        <br />
                        <p className=" font-normal">{singleCarItem.mileage}</p></div>
                    </div>
                    <div className=" text-left">
                      <div className=" border-2 border-t-red-600"></div>
                      <div className=" font-bold">Engine Size
                        <br />
                        <p className=" font-normal">{singleCarItem.engineSize}</p></div>
                    </div>
                    <div className=" text-left">
                      <div className=" border-2 border-t-red-600"></div>
                      <div className=" font-bold">Registration Year
                        <br />
                        <p className=" font-normal">{Car.registrationYear}</p></div>
                    </div>
                    <div className=" text-left">
                      <div className=" border-2 border-t-red-600"></div>
                      <div className=" font-bold">Manufacturing Year
                        <br />
                        <p className=" font-normal">{singleCarItem.manufacturingYear}</p></div>
                    </div>
                    <div className="payment text-center m-4">
                      <button className=" text-l">Buy Now</button>
                    </div>
                  </div>

                  <div className=" space-y-3 flex-col font-sans">
                    <div className=" text-left">
                      <div className=" border-2 border-t-red-600"></div>
                      <div className=" font-bold">Color
                        <br />
                        <p className=" font-normal">{singleCarItem.color}</p></div>
                    </div>
                    <div className=" text-left">
                      <div className=" border-2 border-t-red-600"></div>
                      <div className=" font-bold">Wheel Drive
                        <br />
                        <p className=" font-normal">{singleCarItem.wheelDrive}</p></div>
                    </div>
                    <div className=" text-left">
                      <div className=" border-2 border-t-red-600"></div>
                      <div className=" font-bold">Transmission
                        <br />
                        <p className=" font-normal">{Car.transmission}</p></div>
                    </div>
                    <div className=" text-left">
                      <div className=" border-2 border-t-red-600"></div>
                      <div className=" font-bold">Location
                        <br />
                        <p className=" font-normal">{singleCarItem.location}</p></div>
                    </div>
                    <div className=" text-left">
                      <div className=" border-2 border-t-red-600"></div>
                      <div className=" font-bold">Steering
                        <br />
                        <p className=" font-normal">{singleCarItem.steering}</p></div>
                    </div>
                    <div className=" text-left">
                      <div className=" border-2 border-t-red-600"></div>
                      <div className=" font-bold">Fuel
                        <br />
                        <p className=" font-normal">{singleCarItem.fuel}</p></div>
                    </div>
                    <div className=" text-left">
                      <div className=" border-2 border-t-red-600"></div>
                      <div className=" font-bold">Seats
                        <br />
                        <p className=" font-normal">{singleCarItem.seats}</p></div>
                    </div>
                    <div className=" text-left">
                      <div className=" border-2 border-t-red-600"></div>
                      <div className=" font-bold">Doors
                        <br />
                        <p className=" font-normal">{singleCarItem.doors}</p></div>
                    </div>
                    <div className=" text-left">
                      <div className=" border-2 border-t-red-600"></div>
                      <div className=" font-bold">Weight
                        <br />
                        <p className=" font-normal">{singleCarItem.weight}</p></div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default CarDetails;
