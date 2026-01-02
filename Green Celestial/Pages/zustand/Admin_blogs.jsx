import { create } from "zustand";

const adminBlogs = create((state) => ({
    blogs : [{
        _id : '',
        author : '',
        title : '',
        content : '',
        meta_keywords : '',
        meta_desc : '',
        category : '',
        date : ''
    }],
    setBlogs : (val) => state((temp) => ({
        blogs : val
    })),
    removeBlog : (val) => state((temp) => ({
        blogs : temp.blogs.filter((target) => target._id !== val )
    }))

}))

export default adminBlogs;