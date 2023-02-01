import React from "react";
import { Col } from "reactstrap";
import "../../styles/blog-item.css";
import { Link } from "react-router-dom";


const BlogItem = ({ item }) => {
    const { id, blogimg, title, dateCreated, description } = item;
    const imgname = blogimg.name;

    return (
        <Col lg="3" md="3" sm="5" className="mb-5">
            <div className="blog__item">
                <img src={"http://localhost:3000/blogimg/" + imgname} alt="" className="w-100 rounded-xl shadow-xl shadow-slate-500" />
                <div className="blog__info p-3">
                    <Link to={`/blogs/${id}`} className=" no-underline font-sans text-blue-900 font-semibold text-2xl">
                        {title}
                    </Link>
                    <p className="section__description mt-3 font-sans text-black">
                        {description.length > 100
                            ? description.substr(0, 60)
                            : description}
                    </p>

                    <Link to={`/blogs/${id}`} className="read__more font-sans">
                        Read More
                    </Link>
                    <div className=" float-right">
                        <div className="blog__time pt-3 mt-3 d-flex align-items-center justify-content-between">
                            <div className=" d-flex align-items-center gap-3">
                                <span className=" d-flex align-items-center gap-1 section__description">
                                    <i class="ri-time-line"></i> {dateCreated}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Col>
    );
};

export default BlogItem;