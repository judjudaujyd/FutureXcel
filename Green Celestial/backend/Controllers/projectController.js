import projectModel from "../Models/projectSchema.js";

// Get all projects with filtering, sorting, and pagination
export const getAllProjects = async (req, res) => {
    try {
        const { category, search, sort, page = 1, limit = 10 } = req.query;

        // Build query object
        const query = {};

        if (category) {
            query.category = category;
        }

        if (search) {
            query.title = { $regex: search, $options: 'i' }; // Case-insensitive search
        }

        // Build sort object
        const sortOptions = {};
        if (sort) {
            const [field, order] = sort.split('_');
            sortOptions[field] = order === 'asc' ? 1 : -1;
        } else {
            sortOptions.date = -1; // Default sort by date desc
        }

        // Pagination
        const skip = (page - 1) * limit;

        const projects = await projectModel.find(query)
            .sort(sortOptions)
            .skip(skip)
            .limit(Number(limit));

        const total = await projectModel.countDocuments(query);

        res.status(200).json({
            projects,
            currentPage: Number(page),
            totalPages: Math.ceil(total / limit),
            totalProjects: total
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new project
export const createProject = async (req, res) => {
    try {
        const { title, description, contents, category, price } = req.body;

        // Handle image upload
        let image = null;
        if (req.file) {
            image = `/uploads/${req.file.filename}`;
        }

        if (!image) {
            return res.status(400).json({ error: "Image is required" });
        }

        const newProject = new projectModel({
            title,
            description,
            contents,
            category,
            price,
            image
        });

        await newProject.save();
        res.status(201).json(newProject);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get single project
export const getProjectById = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await projectModel.findById(id);
        if (!project) {
            return res.status(404).json({ error: "Project not found" });
        }
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete project
export const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;
        await projectModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Project deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
