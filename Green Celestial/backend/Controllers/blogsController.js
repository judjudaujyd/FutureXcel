import blogModel from "../Models/blogsSchema.js";
import trafficModel from "../Models/trafficSchema.js";

// ============= FETCH BLOGS WITH PAGINATION & FILTERING =================
// controllers/blogsController.js
const getBlogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const skip = (page - 1) * limit;

    const { category, search } = req.query; // <-- new filter query params

    let filter = {};

    if (category) filter.category = category;
    if (search) filter.title = { $regex: search, $options: "i" };

    const totalBlogs = await blogModel.countDocuments(filter);
    const blogs = await blogModel
      .find(filter)
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      blogs,
      currentPage: page,
      totalPages: Math.ceil(totalBlogs / limit),
      totalBlogs,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};



// ============= CREATE BLOG =================
const createBlog = async (req, res) => {
  try {
    const { title, content, category, metaDesc, metaKeywords } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image upload is required." });
    }

    const record = new blogModel({
      author: req.user?.name || "Blank",
      title,
      img: req.file.filename, // ✅ FIXED
      content,
      meta_keywords: metaKeywords,
      meta_desc: metaDesc,
      category,
    });

    await record.save();
    res.status(200).json({ msg: "Record Has Been Saved" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ============= SINGLE BLOG + TRAFFIC =================
const singleBlog = async (req, res) => {
  try {
    await new trafficModel({
      device: req.body.device,
      ip: req.ip,
      preview_id: req.params.id,
      userAgent: req.get("User-Agent"),
    }).save();
  } catch (error) {
    console.log("Traffic log failed");
  }

  try {
    const blog = await blogModel.findById(req.params.id);
    res.status(200).json(blog);
  } catch (error) {
    res.status(404).json({ error: "Blog not found" });
  }
};

// ============= UPDATE BLOG =================
const updateBlog = async (req, res) => {
  try {
    const { title, content, category, metaDesc, metaKeywords } = req.body;
    let newBlog = {};

    if (title) newBlog.title = title;
    if (category) newBlog.category = category;
    if (content) newBlog.content = content;
    if (metaDesc) newBlog.meta_desc = metaDesc;
    if (metaKeywords) newBlog.meta_keywords = metaKeywords;
    if (req.file) newBlog.img = req.file.filename; // ✅ FIXED

    const blog = await blogModel.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    await blogModel.findByIdAndUpdate(req.params.id, { $set: newBlog });
    res.status(200).json({ msg: "Blog Updated Successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ============= RECENT BLOGS =================
const getRecentBlogs = async (req, res) => {
  try {
    const result = await blogModel.find().sort({ date: -1 }).limit(2);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).json({ msg: "Something Went Wrong" });
  }
};

// ============= DELETE BLOG =================
const delBlog = async (req, res) => {
  try {
    await blogModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "The Blog Was Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Something Went Wrong" });
  }
};

export {
  getBlogs,
  createBlog,
  updateBlog,
  getRecentBlogs,
  delBlog,
  singleBlog,
};
