
import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true },
    company: { type: String },
    phone: { type: String, required: true },
    country: { type: String, required: true },
    project: { type: [String] },  // Assuming project is an array of strings
    price: { type: String },
    description: { type: String },
}, { timestamps: true });

export const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);
