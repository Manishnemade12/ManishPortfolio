import { mongooseConnect } from '@/lib/mongoose';
import Education from '@/models/education';

export default async function handle(req, res) {
    await mongooseConnect();

    const { method } = req;

    try {
        if (method === 'GET') {
            // Fetch profile by ID or the first profile if no ID is provided
            if (req.query?.id) {
                const EducationDetails = await Education.findById(req.query.id);
                if (EducationDetails) {
                    res.status(200).json(EducationDetails);
                } else {
                    res.status(404).json({ error: 'Profile not found' });
                }
            } else {
                const EducationDetails = await Education.findOne({});
                if (EducationDetails) {
                    res.status(200).json(EducationDetails);
                } else {
                    res.status(404).json({ error: 'Profile not found' });
                }
            }
        } else {
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Method ${method} Not Allowed`);
        }
    } catch (error) {
        console.error('Error handling request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
