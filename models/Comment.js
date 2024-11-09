

// import mongoose from 'mongoose';

// const { Schema, model, models } = mongoose;

// const CommentSchema = new Schema({
//     name: { type: String, required: true },
//     email: { type: String },
//     title: { type: String },
//     contentpera: { type: String },
//     maincomment: { type: Boolean },
//     createdAt: { type: Date, default: Date.now },
//     blog: { type: Schema.Types.ObjectId, ref: 'Blog', required: true },
//     parent: { type: Schema.Types.ObjectId, ref: 'Comment'},
//     children: { type: Schema.Types.ObjectId, ref: 'Comment'},
//     parentName: { type: String }

// }, {
//     timestamps: true,
// });

// const Comment = models.Comment || model('Comment', CommentSchema);

// export default Comment;

import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

const CommentSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String },
    title: { type: String },
    contentpera: { type: String },
    maincomment: { type: Boolean },
    createdAt: { type: Date, default: Date.now },
    blog: { type: Schema.Types.ObjectId, ref: 'Blog', required: true },
    parent: { type: Schema.Types.ObjectId, ref: 'Comment' },
    children: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],  // Ensure children is an array
    parentName: { type: String }
}, {
    timestamps: true,
});

const Comment = models.Comment || model('Comment', CommentSchema);

export default Comment;
