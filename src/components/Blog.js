import React, { useState, useEffect } from "react";
import axios from "axios";
import { selectSearchInput, setBlogData } from "../features/userSlice";
import { useSelector, useDispatch } from "react-redux";
import "../styling/blog.css";

const Blog = () => {
  const searchInput = useSelector(selectSearchInput);
  const blog_url = `https://gnews.io/api/v4/search?q=${searchInput}&token=94d0a6c22762ab1bd5609e1e9314fdf7`;
  const dispatch = useDispatch();
  const [blogs, setBlogs] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(blog_url)
      .then((response) => {
        dispatch(setBlogData(response.data));
        setBlogs(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [searchInput]);

  return (
    <div className="blog__page">
      <h1 className="blog__page__header">Noticias</h1>
      {loading ? <h3 className="loading">Cargando...</h3> : ""}
      <div className="blogs">
        {blogs?.articles?.map((blog) => (
          <a
            className="blog"
            target="_blank"
            rel="noreferrer"
            href={blog.url}
            key={blog.publishedAt}>
            <img src={blog.image} alt={blog.title} />
            <div>
              <h3 className="sourceName">
                <span>{blog.source.name}</span>
                <p>{blog.publishedAt}</p>
              </h3>
              <h1>{blog.title}</h1>
              <p>{blog.description}</p>
            </div>
          </a>
        ))}
        {blogs?.totalArticles == 0 && (
          <h1 className="no__blogs">
            No hay noticias disponibles con ese término de búsqueda. Ingresa
            otro por favor.
          </h1>
        )}
      </div>
    </div>
  );
};

export default Blog;
