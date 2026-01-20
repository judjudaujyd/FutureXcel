import React from "react";
import { Link } from "react-router-dom";
import "./blog_card.css";
import { getImageUrl } from "../../../config/api";

const BlogCard = ({ data }) => {
  const stripHtml = (html) => {
    let tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    let tmpHold = tmp.textContent || tmp.innerText || "";
    let limitedText = tmpHold.substr(0, 100);
    return limitedText + "...";
  };

  const stripDate = (val) => {
    let nDate = val.substr(0, 10);
    return nDate;
  }

  return (
    <>
      <div className="blogCardMain">
        <img src={getImageUrl(data.img)} alt="" />
        <div className="blogCardInner">
          <small>{data.author}</small>
          <h2>{data.title}</h2>
          <p>{stripHtml(data.content)}</p>
          <small>{stripDate(data.date)}</small>
          <div className="blogCardWidget">
            <small>{data.category}</small>
            <button><Link to={`/blog/${data._id}`}>Read More</Link></button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogCard;
