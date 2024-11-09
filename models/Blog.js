

import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

const blogSchema = new Schema({
    title: { type: String },
    slug: { type: String, required: true },
    images: [{ type: String }],
    description: { type: String },
    blogcategory: { type: String }, // Ensure this is a string if used in queries
    tags: [{ type: String }],
    status: { type: String },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
}, {
    timestamps: true,
});


const Blog = models.Blog || model('Blog', blogSchema);

export default Blog;
