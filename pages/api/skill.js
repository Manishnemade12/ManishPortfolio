import { mongooseConnect } from "@/lib/mongoose"; // Ensure this file is correctly set up
import Skills from "@/models/Skills"; // Make sure the import is from the correct model

export default async function handle(req, res) {
    await mongooseConnect();

    const { method } = req;

    if (method === 'GET') {
        try {
            if (req.query?.id) {
                const Skill = await Skills.findById(req.query.id); // Use Product model
                res.json(Skill);
            }  else {
                const Skill = await Skills.find(); // Ensure this is fetching the Skills correctly
                res.json(Skill.reverse());
            }
        } catch (error) {
            console.error(error); // Log error for debugging
            res.status(500).json({ message: 'Error fetching Skills', error });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
