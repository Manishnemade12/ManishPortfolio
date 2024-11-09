// import { mongooseConnect } from "@/lib/mongoose";
// import { Photo } from "@/models/Photo";


// export default async function handle(req, res) {

//     await mongooseConnect();

//     const { method } = req;

//     if (method === 'GET') {
//         try {
//             if (req.query?.id) {
//                 const photos = await Photo.findById(req.query.id);
//                 res.json(photos);
//             } else {
//                 const photos = await Photo.find();  // Corrected this line
//                 res.json(photos.reverse());
//             }
//         } catch (error) {
//             res.status(500).json({ message: 'Error fetching projects', error });
//         }
//     } else {
//         res.status(405).json({ message: 'Method not allowed' });
//     }
// }


import { mongooseConnect } from "@/lib/mongoose";
import Photo from "@/models/Photo"; // Make sure this imports correctly

export default async function handle(req, res) {
    await mongooseConnect();
    const { method } = req;

    if (method === 'GET') {
        try {
            if (req.query?.id) {
                const photos = await Photo.findById(req.query.id);
                res.json(photos);
            } else {
                const photos = await Photo.find();  // Fetch all photos
                res.json(photos.reverse());
            }
        } catch (error) {
            res.status(500).json({ message: 'Error fetching photos', error });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
