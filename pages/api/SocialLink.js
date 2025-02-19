import { mongooseConnect } from '@/lib/mongoose';
import SocialLink from '@/models/SocialLink';

export default async function handle(req, res) {
    await mongooseConnect();
    const { method } = req;

    try {
      if (method === 'GET') {
        // Fetch all social links from the database
        const socialLinks = await SocialLink.find({});
        if (socialLinks.length > 0) {
          res.status(200).json({ data: socialLinks });
        } else {
          res.status(404).json({ error: 'No social links found' });
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