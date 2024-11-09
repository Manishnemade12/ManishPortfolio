// import { mongooseConnect } from "@/lib/mongoose";
// import { Comment } from "@/models/Comment";
// import { Children } from "react";

// export default async function handle(req, res) {
 
//     await mongooseConnect();

//     if (req.method === "POST") {
//         try {
//             const { name, email, title, contentpera, parent } = req.body;
//       let commentDoc;
//             if (parent) {
//                  commentDoc = await Comment.create({
//                     name, email, title, contentpera, parent: parent
//                 });

//                 await Comment.findByIdAndUpdate(parent,{
//                     $push: { Children: commentDoc._id}
//                 })
//             }  else {
//                 commentDoc = await Comment.create({
//                     name, email, title, contentpera
//                 });
//             }

//             res.status(201).json(commentDoc);
//         } catch(error){
//                     console.log('error creting comment', error);
//                     res.status(500).json({error:'Failed to create comment'});
//         }
//     } else {
//         res.setHeader('Allow', ['POST']);
//         res.status(405).end(`Method ${method} Not Allowed`);
//     }
// }


import { mongooseConnect } from "@/lib/mongoose";
import { Comment } from "@/models/Comment";

export default async function handle(req, res) {
    await mongooseConnect();

    if (req.method === "POST") {
        try {
            const { name, email, title, contentpera, parent } = req.body;
            let commentDoc;

            if (parent) {
                const parentComment = await Comment.findById(parent);
                if (!parentComment) {
                    return res.status(404).json({ message: 'Parent comment not found' });
                }

                commentDoc = await Comment.create({
                    name, email, title, contentpera, parent: parentComment._id
                });

                await Comment.findByIdAndUpdate(parent, {
                    $push: { children: commentDoc._id }
                });
            } else {
                commentDoc = await Comment.create({
                    name, email, title, contentpera
                });
            }

            res.status(201).json(commentDoc);
        } catch (error) {
            console.log('Error creating comment:', error);
            res.status(500).json({ error: 'Failed to create comment' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
