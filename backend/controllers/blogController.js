import Blog from "../models/Blog.js";
import Ad from "../models/Ad.js";

// Helper function to clean malformed Cloudinary URLs
const cleanImageUrl = (url) => {
  if (!url) return null;
  // Remove double Cloudinary base URLs
  const cloudinaryBase = 'https://res.cloudinary.com/';
  if (url.includes(cloudinaryBase) && url.split(cloudinaryBase).length > 2) {
    const parts = url.split(cloudinaryBase);
    const cloudName = parts[1].split('/')[0];
    const remainingPath = url.split('/image/upload/').pop();
    return `${cloudinaryBase}${cloudName}/image/upload/${remainingPath}`;
  }
  return url;
};

export const getBlogs = async (req, res) => {
  try {
    const { page = 1, limit = 10, year, month, day } = req.query;
    const query = { published: true };

    if (year) {
      let startDate, endDate;
      if (day) {
        // Specific day
        startDate = new Date(year, month ? month - 1 : 0, day);
        endDate = new Date(year, month ? month - 1 : 0, day + 1);
      } else if (month) {
        // Specific month
        startDate = new Date(year, month - 1, 1);
        endDate = new Date(year, month, 1);
      } else {
        // Whole year
        startDate = new Date(year, 0, 1);
        endDate = new Date(year + 1, 0, 1);
      }
      query.date = { $gte: startDate, $lt: endDate };
    }

    const blogs = await Blog.find(query)
      .sort({ date: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Blog.countDocuments(query);

    // Clean image URLs for frontend display
    const cleanedBlogs = blogs.map(blog => ({
      ...blog.toObject(),
      image: cleanImageUrl(blog.image)
    }));

    res.json({
      blogs: cleanedBlogs,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ message: "Error fetching blogs" });
  }
};

export const getRecentBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ published: true })
      .sort({ date: -1 })
      .limit(3);

    // Clean image URLs for frontend display
    const cleanedBlogs = blogs.map(blog => ({
      ...blog.toObject(),
      image: cleanImageUrl(blog.image)
    }));

    res.json({ blogs: cleanedBlogs });
  } catch (error) {
    console.error("Error fetching recent blogs:", error);
    res.status(500).json({ message: "Error fetching recent blogs" });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog || !blog.published) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json({ blog });
  } catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).json({ message: "Error fetching blog" });
  }
};

export const createBlog = async (req, res) => {
  try {
    const { title, content, published } = req.body;
    let image = null;
    if (req.file) {
      // Handle different multer-storage-cloudinary versions
      if (req.file.url && typeof req.file.url === 'string') {
        image = req.file.url;
      } else if (req.file.path && req.file.path.startsWith('http')) {
        image = req.file.path;
      } else if (req.file.path) {
        image = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/${req.file.path}`;
      }
    }

    const blog = new Blog({
      title,
      content,
      image,
      published: published || false,
    });

    await blog.save();
    res.status(201).json({ message: "Blog created successfully", blog });
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ message: "Error creating blog" });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    if (req.file) {
      // Handle different multer-storage-cloudinary versions
      if (req.file.url && typeof req.file.url === 'string') {
        updates.image = req.file.url;
      } else if (req.file.path && req.file.path.startsWith('http')) {
        updates.image = req.file.path;
      } else if (req.file.path) {
        updates.image = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/${req.file.path}`;
      }
    }

    const blog = await Blog.findByIdAndUpdate(id, updates, { new: true });
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json({ message: "Blog updated successfully", blog });
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ message: "Error updating blog" });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ message: "Error deleting blog" });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json({ blogs });
  } catch (error) {
    console.error("Error fetching all blogs:", error);
    res.status(500).json({ message: "Error fetching all blogs" });
  }
};

export const getBlogByIdAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    const ads = await Ad.find({ blogId: id });
    res.json({ blog, ads });
  } catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).json({ message: "Error fetching blog" });
  }
};

export const uploadBlogImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }
    res.json({ imageUrl: req.file.path });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ message: "Error uploading image" });
  }
};
