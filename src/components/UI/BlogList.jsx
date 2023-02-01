import React, { useMemo } from "react";
import "../../styles/blog-item.css";
import axios from 'axios'
import { useState } from "react";
import { useEffect } from "react";
import BlogItem from "./BlogItem";
import { calculateRange, sliceData } from '../../utils/table-pagination';

const BlogList = () => {
  const [Blogs, setBlogs] = useState([]);
  const [AllBlogs, setAllBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [pagination, setPagination] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/reviews/")
      .then(res => {
        setPagination(calculateRange(res.data.reviews.sort((a, b) => parseInt(b.id) - parseInt(a.id)), 16));
        setAllBlogs(res.data.reviews.sort((a, b) => parseInt(b.id) - parseInt(a.id)));
        setBlogs(sliceData(res.data.reviews.sort((a, b) => parseInt(b.carid) - parseInt(a.id)), page, 16));
        console.log("checking.....")
        setBlogs(res.data.reviews);
      })
  }, []);

  const __handleChangePage = (new_page) => {
    setPage(new_page);
    axios.get("http://localhost:3000/reviews/")
      .then(res => {
        setBlogs(sliceData(res.data.reviews.sort((a, b) => parseInt(b.id) - parseInt(a.id)), new_page, 16));
        window.scrollTo(0, 0);
        console.log("checking.....")
      })
  }
  const __handleSearch = (event) => {
    setSearch(event.target.value);
    if (event.target.value !== '') {
      const search_results = AllBlogs.filter((item) =>
        item.title.toString().toLowerCase().includes(search.toLowerCase()) ||
        item.description.toString().toLowerCase().includes(search.toLowerCase())
      );
      setBlogs(search_results);
    }
    else {
      __handleChangePage(page);
    }
  };

  return (
    <>
      <div className=" flex justify-center">
        <div className="search__box bg-blue-700 w-1/2 justify-between">
          <input type="text" className=" justify-self-stretch" value={search} onChange={__handleSearch} placeholder="Search" />
          <span>
            <i class="ri-search-line"></i>
          </span>
        </div>
      </div>
      <div className=" mb-3"> <br /></div>
      {Blogs.map((item) => (
        <BlogItem item={item} key={item.id} />
      ))}
      {Blogs.length !== 0 ?
        <div className=' flex flex-row justify-center'>
          {pagination.map((Blogs, index) => (
            <span
              key={index}
              className={Blogs === Blogs ? ' p-2 m-1 border-r-4 bg-blue-700 text-white cursor-pointer' : ' p-2 m-1 border-r-4 bg-slate-300 cursor-pointer'}
              onClick={() => { __handleChangePage(Blogs) }}>
              {Blogs}
            </span>
          ))}
        </div>
        :
        <div className=' flex flex-row justify-center'>
          <span className=' m-0 text-base text-gray-700 font-bold border-white'>No Blogs Posted</span>
        </div>
      }
    </>
  );
};

export default BlogList;
