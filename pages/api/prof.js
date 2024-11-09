import { mongooseConnect } from '@/lib/mongoose';
import prof from '@/models/prof';

export default async function handle(req, res) {
    await mongooseConnect();

    const { method } = req;

    try {
        if (method === 'GET') {
            // Fetch profile by ID or the first profile if no ID is provided
            if (req.query?.id) {
                const profile = await prof.findById(req.query.id);
                if (profile) {
                    res.status(200).json(profile);
                } else {
                    res.status(404).json({ error: 'Profile not found' });
                }
            } else {
                const profile = await prof.findOne({});
                if (profile) {
                    res.status(200).json(profile);
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

