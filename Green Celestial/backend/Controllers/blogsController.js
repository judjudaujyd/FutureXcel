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
      img: req.file.filename,
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
  // ... (traffic logging)

  try {
    const blog = await blogModel.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    );
    res.status(200).json(blog);
  } catch (error) {
    res.status(404).json({ error: "Blog not found" });
  }
};

// ============= UPDATE BLOG =================
const updateBlog = async (req, res) => {
  try {
    const { title, content, category, metaDesc, metaKeywords } = req.body;
    const updateData = {
      title,
      content,
      category,
      meta_desc: metaDesc,
      meta_keywords: metaKeywords
    };

    if (req.file) {
      updateData.img = req.file.filename;
    }

    await blogModel.findByIdAndUpdate(req.params.id, updateData);
    res.status(200).json({ message: "Blog Updated Successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ============= RECENT BLOGS =================
const getRecentBlogs = async (req, res) => {
  try {
    const blogs = await blogModel.find().sort({ date: -1 }).limit(3);
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ============= DELETE BLOG =================
const delBlog = async (req, res) => {
  try {
    await blogModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Blog Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ============= BLOG STATS =================
const getBlogStats = async (req, res) => {
  try {
    const totalBlogs = await blogModel.countDocuments();
    const totalViewsAgg = await blogModel.aggregate([
      { $group: { _id: null, total: { $sum: "$views" } } }
    ]);
    const totalViews = totalViewsAgg.length > 0 ? totalViewsAgg[0].total : 0;

    // Top 5 blogs
    const topBlogs = await blogModel.find().sort({ views: -1 }).limit(5);

    res.status(200).json({
      totalBlogs,
      totalViews,
      topBlogs
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export {
  getBlogs,
  createBlog,
  updateBlog,
  getRecentBlogs,
  delBlog,
  singleBlog,
  getBlogStats
};
