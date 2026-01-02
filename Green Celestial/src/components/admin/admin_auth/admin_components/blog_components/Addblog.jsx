import React from 'react'
import "./addblog.css"
import { Link } from 'react-router-dom'

const Addblog = () => {
  return (
    <>

<div className="blogCreateSection">

    <div className="blogCreateSectionInner">
        <h2>SO WHAT DO YOU WANT TO DO ?</h2>
        <div className="blogCreateBtns">
            <Link to="/dashboard/blog/createBlog">CREATE A BLOG</Link>
            <Link to="/dashboard/blog/createCategory">CREATE A CATEGORY</Link>
        </div>
    </div>

</div>

    </>
  )
}

export default Addblog