import React from 'react'
import './blogcard.css'
import bin from "/common/delete.svg";
import update from "/common/update.svg";

const BlogCard = ({data , index , removeBlog}) => {
    if(data.id == ''){
        return <></>
    }
    // ===============CHECK FOR AUTH TOKEN======================
    if(!localStorage.getItem('authToken')){
      window.location.href = '/';
    }

    // ==============CREATING DATE FORMATS FOR FUTURE USE=================
    let dateBefore = new Date(data.date);

    // ==============DELETE A RECORD=====================
    const delOpts = {
      method : "DELETE",
      headers : {
        'Content-Type' : 'application/json',
        'auth-token' : localStorage.getItem('authToken')
      }
    }

    const delBlog = async(id) => {
      let request = await fetch(`http://localhost:8000/blogs/${id}`,delOpts);
      if(request.ok){
        console.log("Blog Has Been Deleted");
        removeBlog(id);
      }else{
        console.error("Error Deleting The Blog");
      }

    }

  return (
    <>
    <div className="adminBlogCards" key={index}>
          {/* ===========START OF CARD HEAD================ */}
          <div className="adminBlogCardsHeader">
            <div className="adminBlogCardsHeaderLeft">
              <b>{data.title}</b>
            </div>
            <div className="adminBlogCardsHeaderRight">
              {dateBefore.getFullYear()}/
              {dateBefore.getMonth() + 1}/
              {dateBefore.getDay()}
            </div>
          </div>
          {/* =========END OF CARD HEAD===================== */}

          {/* ===========START OF CARD BODY================= */}
          <div className="adminBlogCardsBody" dangerouslySetInnerHTML={{ __html: data.content }}>
          </div>
          {/* ============END OF BODY CARD=================== */}

          {/* =============START OF CARDS META DATA====================== */}
          <div className="adminBlogCardsMeta">
            <div className="adminBlogCardsMetaLeft">
              <b>Keywords: </b><p>{data.meta_keywords}</p>
            </div>
            <div className="adminBlogCardsMetaRight">
              <b>Desc: </b><p>{data.meta_desc}</p>
            </div>
          </div>
          {/* ===========END OF CARDS META DATA===========================  */}

          <div className="adminBlogCardAction">
            <div className="adminBlogCardActionLeft">
              <p>Published By, <b>{data.author}</b></p>
            </div>
            <div className="adminBlogCardActionRight">
              <button className="adminBlogCardActionButton" onClick={() => delBlog(data._id)}>
                <img src={bin} alt="Delete" /> DELETE
              </button>
              <button className="adminBlogCardActionButton" onClick={() => { window.location.href = `/dashboard/blog/updateBlog/${data._id}` }}>
                <img src={update} alt="Update" /> UPDATE
              </button>
            </div>
          </div>
        </div>
    </>
    )
}

export default BlogCard