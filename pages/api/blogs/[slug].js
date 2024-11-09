// import { mongooseConnect } from '@/lib/mongoose';
// import { Blog } from '@/models/Blog';
// import { Comment } from '@/models/Comment';

// export default async function handler(req, res) {

//     const { slug } = req.query

//     await mongooseConnect();

//     if (req.method === 'GET') {
//         try {
//             const blog = await Blog.findOne({ slug });

//             if (!blog) {
//                 return res.status(404).json({ message: 'Blog not found' })
//             }

//             const Comments = await Comment.find({ blog: blog._id }).sort({ createdAt: -1 });

//             res.status(200).json({ blog, Comments })
//         } catch (error) {
//             console.error(error);
//             res.status(500).json({ message: 'server error feching comments-blogs' })

//         }
//     } else if (req.method === "POST") {
//         try {
//             const { name, email, title, contentpera, maincomment, parent } = req.body;

//             const blog = await Blog.findOne({ slug });
//             if (!blog) {
//                 return res.status(404).json({ message: 'Blog not found' })
//             }

//             if (parent) {
//                 const parentComment = await Comment.findById(parent)
//                 if (parentComment) {
//                     return res.status(404).json({ message: 'parentComment not found' })
//                 }

//                 const newComment = new Comment({
//                     name,
//                     email,
//                     title,
//                     contentpera,
//                     maincomment,
//                     parent: parentComment._id,
//                     blog: blog._id,
//                     parentName: parentComment.name,

//                 })
//                 await newComment.save();
//                 parentComment.children.push(newComment)

//                 await parentComment.save();

//                 res.status(201).json(newComment);

//             } else {
//                 const newComment = new Comment({
//                     name,
//                     email,
//                     title,
//                     contentpera,
//                     maincomment,
//                     blog: blog._id,
//                 });

//                 res.status(201).json(newComment);
//             }
//         } catch (error) {
//                 console.error(error);
//                 res.status(201).json({message: 'server error'});
//     } 
// }
//    else{
//     res.setHeader('Allow', ['GET', 'POST']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//    }
// }

// import mongoose from 'mongoose';
// import Blog from '../../../models/Blog'; // Ensure the path is correct
// import Comment from '../../../models/Comment'; // Ensure the path is correct

// const mongooseConnect = async () => {
//     if (mongoose.connection.readyState === 0) {
//         await mongoose.connect(process.env.MONGODB_URI); // Check your MongoDB URI
//     }
// };

// export default async function handler(req, res) {
//     const { slug } = req.query;

//     await mongooseConnect();

//     if (req.method === 'GET') {
//         try {
//             const blog = await Blog.findOne({ slug });

//             if (!blog) {
//                 return res.status(404).json({ message: 'Blog not found' });
//             }

//             const comments = await Comment.find({ blog: blog._id }).sort({ createdAt: -1 });

//             res.status(200).json({ blog, comments });
//         } catch (error) {
//             console.error('Error fetching blog or comments:', error);
//             res.status(500).json({ message: 'Server error fetching blog or comments' });
//         }
//     } else {
//         res.setHeader('Allow', ['GET']);
//         res.status(405).end(`Method ${req.method} Not Allowed`);
//     }
// }





import mongoose from 'mongoose';
import Blog from '../../../models/Blog'; // Ensure the path is correct
import Comment from '../../../models/Comment'; // Ensure the path is correct

const mongooseConnect = async () => {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(process.env.MONGODB_URI); // Check your MongoDB URI
    }
};

export default async function handler(req, res) {
    const { slug } = req.query;

    await mongooseConnect();

    if (req.method === 'GET') {
        // Handle GET request to fetch blog and comments
        try {
            const blog = await Blog.findOne({ slug });

            if (!blog) {
                return res.status(404).json({ message: 'Blog not found' });
            }

            const comments = await Comment.find({ blog: blog._id }).sort({ createdAt: -1 });

            res.status(200).json({ blog, comments });
        } catch (error) {
            console.error('Error fetching blog or comments:', error);
            res.status(500).json({ message: 'Server error fetching blog or comments' });
        }
    } else if (req.method === 'POST') {
        // Handle POST request to submit a new comment
        try {
            const { name, email, title, contentpera, parent } = req.body;
            const blog = await Blog.findOne({ slug });

            if (!blog) {
                return res.status(404).json({ message: 'Blog not found' });
            }

            const newComment = new Comment({
                name,
                email,
                title,
                contentpera,
                blog: blog._id,
                parent: parent || null, // If it's a reply, 'parent' will be set; otherwise, it's null
                createdAt: new Date()
            });

            await newComment.save();

            res.status(201).json(newComment);
        } catch (error) {
            console.error('Error posting comment:', error);
            res.status(500).json({ message: 'Server error posting comment' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
