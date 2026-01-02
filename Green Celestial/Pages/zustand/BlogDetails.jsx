import { create } from "zustand";

const blogDetails = create((state) => ({
    blog : {},
    setBlog : (val) => state((temp) => ({
        blog : val
    }))
}))

export default blogDetails;