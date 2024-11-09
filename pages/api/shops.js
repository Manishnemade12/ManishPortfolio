import { mongooseConnect } from "@/lib/mongoose"; // Ensure this file is correctly set up
import Product from "@/models/Shop"; // Make sure the import is from the correct model

export default async function handle(req, res) {
    await mongooseConnect();

    const { method } = req;

    if (method === 'GET') {
        try {
            if (req.query?.id) {
                const shop = await Product.findById(req.query.id); // Use Product model
                res.json(shop);
            } else if (req.query?.slug) {
                const shopslug = await Product.find({ slug: req.query.slug }); // Use Product model
                res.json(shopslug.reverse());
            } else {
                const shops = await Product.find(); // Ensure this is fetching the products correctly
                res.json(shops.reverse());
            }
        } catch (error) {
            console.error(error); // Log error for debugging
            res.status(500).json({ message: 'Error fetching shops', error });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
