import mongoose from 'mongoose';
import teamModel from './Models/teamSchema.js';
import projectModel from './Models/projectSchema.js';
import blogsModel from './Models/blogsSchema.js';
import visionModel from './Models/visionSchema.js';
import adminModel from './Models/adminSchema.js';
import bcrypt from 'bcrypt';

// Connection URL
const DB_URL = 'mongodb://localhost:27017/greencelestial';

const seedData = async () => {
    try {
        await mongoose.connect(DB_URL);
        console.log("✓ Connected to MongoDB");

        // Clear ALL existing data
        console.log("\n🗑️  Clearing all existing data...");
        await teamModel.deleteMany({});
        await projectModel.deleteMany({});
        await blogsModel.deleteMany({});
        await visionModel.deleteMany({});
        // Keep admin accounts
        console.log("✓ Old data cleared");

        // ==================== TEAM MEMBERS ====================
        console.log("\n👥 Seeding Team Members...");
        const dummyTeam = [
            {
                name: "Sarah Jenkins",
                role: "Lead Architect",
                about: "Over 15 years of experience in sustainable residential design and urban planning. Sarah leads our design team with a focus on eco-friendly architecture.",
                img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
                skills: "AutoCAD, LEED AP, Project Management, Sustainable Design"
            },
            {
                name: "Michael Chen",
                role: "Structural Engineer",
                about: "Specializes in eco-friendly materials and seismic retrofitting for high-rise buildings. Michael ensures all our projects meet the highest safety standards.",
                img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800",
                skills: "Structural Analysis, Concrete Design, Revit, Seismic Engineering"
            },
            {
                name: "Amara Okeke",
                role: "Landscape Designer",
                about: "Passionate about integrating native flora into modern architectural spaces. Amara creates stunning outdoor environments that complement our buildings.",
                img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800",
                skills: "Horticulture, Landscape Architecture, SketchUp, Native Plants"
            },
            {
                name: "David Ross",
                role: "Construction Manager",
                about: "Ensuring projects are delivered on time, within budget, and to the highest quality standards. David has managed over 50 successful projects.",
                img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800",
                skills: "Site Management, Safety Compliance, Budgeting, Quality Control"
            },
            {
                name: "Elena Rodriguez",
                role: "Interior Designer",
                about: "Creates beautiful, functional interior spaces that reflect our commitment to sustainability and modern aesthetics.",
                img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=800",
                skills: "Interior Design, 3D Visualization, Color Theory, Space Planning"
            }
        ];

        await teamModel.insertMany(dummyTeam);
        console.log(`✓ Added ${dummyTeam.length} team members`);

        // ==================== PROJECTS ====================
        console.log("\n🚀 Seeding Projects...");
        const dummyProjects = [
            {
                title: "Eco-Friendly Villa",
                description: "A modern villa powered entirely by solar energy with sustainable materials.",
                contents: "This stunning residential project features state-of-the-art solar panels, rainwater harvesting systems, and passive cooling design. The villa incorporates recycled materials and energy-efficient appliances throughout, achieving net-zero energy consumption.",
                category: "Residential",
                price: 1500000,
                image: "https://images.unsplash.com/photo-1600596542815-2a4d9fdd4055?auto=format&fit=crop&q=80&w=800"
            },
            {
                title: "Green Office Complex",
                description: "A commercial hub designed for wellness and productivity.",
                contents: "Incorporating biophilic design principles with indoor gardens, natural lighting, and open collaborative spaces. The complex features a green roof, advanced HVAC systems, and LEED Platinum certification.",
                category: "Commercial",
                price: 4500000,
                image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800"
            },
            {
                title: "Urban Park Renewal",
                description: "Revitalizing a downtown area with green spaces and community gathering areas.",
                contents: "Replacing concrete with permeable pavers and planting over 500 native trees. The project includes walking trails, community gardens, and sustainable water features that reduce urban heat island effects.",
                category: "Landscape",
                price: 800000,
                image: "https://images.unsplash.com/photo-1496417263034-38ec4f0d6b21?auto=format&fit=crop&q=80&w=800"
            },
            {
                title: "Sustainable Warehouse",
                description: "Industrial facility with zero-waste operations and renewable energy.",
                contents: "A 50,000 sq ft warehouse featuring solar panels, LED lighting, and advanced insulation. The facility includes rainwater collection for industrial use and electric vehicle charging stations.",
                category: "Industrial",
                price: 2200000,
                image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800"
            },
            {
                title: "Coastal Resort",
                description: "Luxury eco-resort blending seamlessly with the natural coastline.",
                contents: "This resort features elevated structures to preserve natural habitats, solar power generation, and desalination systems. Built with locally sourced materials and designed to withstand coastal weather.",
                category: "Commercial",
                price: 8500000,
                image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=800"
            }
        ];

        await projectModel.insertMany(dummyProjects);
        console.log(`✓ Added ${dummyProjects.length} projects`);

        // ==================== BLOGS ====================
        console.log("\n📝 Seeding Blogs...");

        // Get admin ID for blog author
        const admin = await adminModel.findOne({});
        const adminId = admin ? admin._id : new mongoose.Types.ObjectId();

        const dummyBlogs = [
            {
                admin: adminId,
                author: "Sarah Jenkins",
                title: "The Future of Sustainable Architecture",
                content: "<p>Sustainable architecture is no longer just a trend—it's the future of building design. As we face climate change and resource depletion, architects must prioritize eco-friendly materials, energy efficiency, and minimal environmental impact.</p><p>Key principles include passive solar design, renewable energy integration, and the use of recycled or locally sourced materials. Modern technology enables us to create buildings that produce more energy than they consume.</p><p>At Green Celestial, we're committed to pushing the boundaries of what's possible in sustainable design, creating spaces that are both beautiful and environmentally responsible.</p>",
                category: "Sustainability",
                img: "https://images.unsplash.com/photo-1518005052357-e984334586f9?auto=format&fit=crop&q=80&w=800",
                meta_keywords: "sustainable architecture, green building, eco-friendly design, LEED certification",
                meta_desc: "Exploring the future of sustainable architecture and how eco-friendly design principles are shaping modern buildings.",
                views: 245
            },
            {
                admin: adminId,
                author: "Michael Chen",
                title: "Structural Innovation in Modern Buildings",
                content: "<p>Modern structural engineering has evolved dramatically with new materials and computational tools. Today's engineers can design structures that are stronger, lighter, and more resilient than ever before.</p><p>Advanced materials like carbon fiber composites and high-performance concrete allow for innovative designs that were impossible just decades ago. Computer modeling enables us to simulate extreme conditions and optimize every element.</p><p>The integration of seismic protection systems and sustainable materials ensures that modern buildings are both safe and environmentally conscious.</p>",
                category: "Engineering",
                img: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800",
                meta_keywords: "structural engineering, modern construction, building materials, seismic design",
                meta_desc: "Discover how structural innovation is transforming modern building design with advanced materials and engineering techniques.",
                views: 189
            },
            {
                admin: adminId,
                author: "Amara Okeke",
                title: "Biophilic Design: Bringing Nature Indoors",
                content: "<p>Biophilic design is the practice of connecting people and nature within built environments. Research shows that incorporating natural elements into architecture improves well-being, productivity, and creativity.</p><p>This can be achieved through natural lighting, indoor plants, water features, and natural materials like wood and stone. Even views of nature through windows have been proven to reduce stress and improve mental health.</p><p>Our projects at Green Celestial always incorporate biophilic principles, creating spaces that nurture both people and the planet.</p>",
                category: "Design",
                img: "https://images.unsplash.com/photo-1463320726281-696a41320fa3?auto=format&fit=crop&q=80&w=800",
                meta_keywords: "biophilic design, nature architecture, indoor plants, wellness design",
                meta_desc: "Learn how biophilic design principles bring nature indoors to create healthier, more productive spaces.",
                views: 312
            },
            {
                admin: adminId,
                author: "David Ross",
                title: "Project Management Best Practices in Construction",
                content: "<p>Successful construction projects require meticulous planning, clear communication, and adaptive problem-solving. As a construction manager, I've learned that the key to success lies in thorough preparation and team coordination.</p><p>Modern project management tools enable real-time collaboration, budget tracking, and schedule optimization. Regular site inspections and quality control measures ensure that projects meet specifications and safety standards.</p><p>Sustainability goals must be integrated from day one, with careful material selection and waste management protocols that minimize environmental impact.</p>",
                category: "Project Management",
                img: "https://images.unsplash.com/photo-1542621334-a254cf47733d?auto=format&fit=crop&q=80&w=800",
                meta_keywords: "construction management, project planning, building safety, quality control",
                meta_desc: "Essential project management best practices for successful construction projects from planning to completion.",
                views: 156
            },
            {
                admin: adminId,
                author: "Elena Rodriguez",
                title: "Color Psychology in Interior Design",
                content: "<p>Colors have a profound psychological impact on how we feel and behave in spaces. Understanding color psychology is essential for creating interiors that support their intended purpose.</p><p>Warm colors like red and orange energize and stimulate, making them ideal for social spaces. Cool colors like blue and green promote calm and focus, perfect for bedrooms and offices. Neutral tones create versatile backdrops that allow other design elements to shine.</p><p>At Green Celestial, we carefully select color palettes that enhance both aesthetics and functionality, creating spaces that truly serve their occupants.</p>",
                category: "Interior Design",
                img: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80&w=800",
                meta_keywords: "color psychology, interior design, color theory, space design",
                meta_desc: "Explore how color psychology influences interior design and creates spaces that enhance mood and productivity.",
                views: 278
            },
            {
                admin: adminId,
                author: "Sarah Jenkins",
                title: "Net-Zero Energy Buildings: A Practical Guide",
                content: "<p>Net-zero energy buildings produce as much energy as they consume annually, representing the pinnacle of sustainable design. Achieving this requires a holistic approach combining energy efficiency and renewable generation.</p><p>Key strategies include superior insulation, high-performance windows, efficient HVAC systems, and on-site renewable energy like solar panels. Smart building systems optimize energy use in real-time.</p><p>While initial costs may be higher, net-zero buildings offer long-term savings through reduced utility bills and increased property value. They're not just environmentally responsible—they're economically smart.</p>",
                category: "Sustainability",
                img: "https://images.unsplash.com/photo-1510563800743-aed236490d08?auto=format&fit=crop&q=80&w=800",
                meta_keywords: "net-zero buildings, energy efficiency, solar power, green architecture",
                meta_desc: "A practical guide to designing and building net-zero energy buildings that produce as much energy as they consume.",
                views: 421
            },
            {
                admin: adminId,
                author: "Michael Chen",
                title: "Seismic Retrofitting for Older Buildings",
                content: "<p>Many existing buildings weren't designed to withstand earthquakes, putting occupants at risk. Seismic retrofitting strengthens structures to improve their earthquake resistance without complete reconstruction.</p><p>Common techniques include adding shear walls, strengthening foundations, and installing base isolators that absorb seismic energy. Modern materials like carbon fiber wrapping can reinforce columns and beams with minimal disruption.</p><p>Retrofitting not only saves lives but also preserves architectural heritage and reduces the environmental impact of demolition and new construction.</p>",
                category: "Engineering",
                img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800",
                meta_keywords: "seismic retrofitting, earthquake safety, building reinforcement, structural upgrade",
                meta_desc: "Learn about seismic retrofitting techniques that strengthen older buildings to withstand earthquakes and protect lives.",
                views: 167
            },
            {
                admin: adminId,
                author: "Amara Okeke",
                title: "Native Plants in Landscape Architecture",
                content: "<p>Using native plants in landscape design offers numerous benefits: they're adapted to local climate, require less water and maintenance, and support local ecosystems and wildlife.</p><p>Native plants have evolved alongside local insects, birds, and other wildlife, creating balanced ecosystems. They're naturally resistant to local pests and diseases, reducing the need for chemical treatments.</p><p>Our landscape projects prioritize native species, creating beautiful outdoor spaces that thrive with minimal intervention while supporting biodiversity and ecological health.</p>",
                category: "Landscape",
                img: "https://images.unsplash.com/photo-1589710344078-de20b8ec93ae?auto=format&fit=crop&q=80&w=800",
                meta_keywords: "native plants, landscape architecture, sustainable landscaping, biodiversity",
                meta_desc: "Discover the benefits of using native plants in landscape architecture for sustainable, low-maintenance outdoor spaces.",
                views: 203
            }
        ];

        await blogsModel.insertMany(dummyBlogs);
        console.log(`✓ Added ${dummyBlogs.length} blogs`);

        // ==================== VISION ====================
        console.log("\n🌟 Seeding Vision...");
        await visionModel.deleteMany({});

        const visionData = {
            content: "Vision: To create sustainable, innovative architectural solutions that harmonize with nature and enhance human well-being for generations to come. Mission: We design and build eco-friendly structures that minimize environmental impact while maximizing beauty, functionality, and long-term value for our clients and communities."
        };

        await visionModel.create(visionData);
        console.log("✓ Vision and mission added");

        console.log("\n✅ Seeding complete!");
        console.log("\n📊 Summary:");
        console.log(`   - Team Members: ${dummyTeam.length}`);
        console.log(`   - Projects: ${dummyProjects.length}`);
        console.log(`   - Blogs: ${dummyBlogs.length}`);
        console.log(`   - Vision: 1`);

        process.exit(0);

    } catch (error) {
        console.error("\n❌ Seeding error:", error);
        process.exit(1);
    }
};

seedData();
