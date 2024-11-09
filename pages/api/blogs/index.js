import { mongooseConnect } from "@/lib/mongoose";
import Blog from "@/models/Blog";

export default async function handle(req, res) {
    await mongooseConnect();

    const { method } = req;

    if (method === 'GET') {
        try {
            if (req.query?.id) {
                const BlogS = await Blog.findById(req.query.id);
                res.json(BlogS);
            } else if (req.query?.blogcategory) {
                const BlogS = await Blog.find({ blogcategory: req.query.blogcategory });
                res.json(BlogS);
            } else if (req.query?.slug) {
                const BlogS = await Blog.find({ slug: req.query.slug });
                res.json(BlogS.reverse());
            } else {
                const BlogS = await Blog.find();  // Corrected this line
                res.json(BlogS.reverse());
            }Z
        } catch (error) {
            res.status(500).json({ message: 'Error fetching projects', error });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
