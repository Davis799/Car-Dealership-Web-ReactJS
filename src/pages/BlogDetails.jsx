import React, { useEffect } from "react";
import { Container, Row, Col, Form, FormGroup, Input } from "reactstrap";

import { useParams } from "react-router-dom";
import blogData from "../assets/data/blogData.js";
import Helmet from "../components/Helmet/Helmet";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import "../styles/blog-details.css";

const BlogDetails = () => {
  const { slug } = useParams();
  const [Blog, setBlog] = useState({});
  const [Img, setImg] = useState({});
  useEffect(() => {
    axios.get("http://localhost:3000/reviews/" + slug)
      .then(res => {
        setBlog(res.data.Blog[0]);
        setImg(res.data.Blog[0].blogimg.name);
      })
  }, [])

  //const img = Blog.blogimg.name;
  //console.log(img);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Helmet title={Blog.title}>
      <section>
        <Container>
          <Row>
            <div className=" justify-center">
              <Col lg="8" md="8">
                <div className=" ">
                  <img src={"http://localhost:3000/blogimg/" + Img} alt="" className=" w-full h-4/6 rounded-xl shadow-xl shadow-slate-500" />
                  <h2 className="mt-4 font-sans text-blue-900 font-semibold text-4xl">{Blog.title}</h2>

                  <div className="blog__publisher d-flex align-items-center gap-4 mb-4">

                    <span className=" d-flex align-items-center gap-1 section__description">

                    </span>

                    <span className=" d-flex align-items-center gap-1 section__description">
                      <i class="ri-time-line"></i> {Blog.dateCreated}
                    </span>
                  </div>

                  <p className="section__description font-sans text-black">{Blog.description}</p>

                </div>

                <div className=" ">


                  {/* =============== comment form ============ */}
                  {/* <div className="leave__comment-form mt-5">
                  <h4>Leave a Comment</h4>
                  <p className="section__description">
                    You must sign-in to make or comment a post
                  </p>

                  <Form>
                    <FormGroup className=" d-flex gap-3">
                      <Input type="text" placeholder="Full name" />
                      <Input type="email" placeholder="Email" />
                    </FormGroup>

                    <FormGroup>
                      <textarea
                        rows="5"
                        className="w-100 py-2 px-3"
                        placeholder="Comment..."
                      ></textarea>
                    </FormGroup>

                    <button className="btn comment__btn mt-3">
                      Post a Comment
                    </button>
                  </Form>
                </div> */}
                </div>
              </Col>
            </div>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default BlogDetails;
