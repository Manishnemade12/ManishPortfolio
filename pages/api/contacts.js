// import { mongooseConnect } from "@/lib/mongoose";
// import { Contact } from "@/models/contact";

// export default async function handle(req, res) {
//     await mongooseConnect();

//     const { method } = req;

//     if (method === 'POST') {
//         // Handle POST request to create a new contact
//         try {
//             const { name, lname, email, company, phone, country, project, price, description } = req.body;

//             const contactDoc = Contact.create({
//                 name,
//                 lname,
//                 email,
//                 company,
//                 phone,
//                 country,
//                 project,
//                 price,
//                 description,
//                 // submittedAt: new Date(),
//             });     
//             res.status(201).json(contactDoc);   
//         } catch (error) {
//             console.error('Error saving contact:', error);
//             res.status(500).json({ message: 'Failed to save contact, please try again', error });
//         }
//     }  else {
//         res.setHeader('Allow', ['POST']);
//         res.status(405).end(`method ${method} not allowed` );
//     }
// }


// import { mongooseConnect } from "@/lib/mongoose"; // Make sure this line appears only once
// import { Contact } from "@/models/contact";


// export default async function handle(req, res) {
//     await mongooseConnect();

//     const { method } = req;

//     if (method === 'POST') {
//         try {
//             const { name, lname, email, company, phone, country, project, price, description } = req.body;

//             // Await the promise
//             const contactDoc = await Contact.create({
//                 name,
//                 lname,
//                 email,
//                 company,
//                 phone,
//                 country,
//                 project,
//                 price,
//                 description,
//             });

//             res.status(201).json(contactDoc);   
//         } catch (error) {
//             console.error('Error saving contact:', error);
//             res.status(500).json({ message: 'Failed to save contact, please try again', error });
//         }
//     } else {
//         res.setHeader('Allow', ['POST']);
//         res.status(405).end(`Method ${method} not allowed`);
//     }
// }
// import { mongooseConnect } from "@/lib/mongoose";
// import { Contact } from "@/models/contact";

// export default async function handle(req, res) {
//     await mongooseConnect();

//     const { method } = req;

//     if (method === 'POST') {
//         try {
//             const { name, lname, email, company, phone, country, project, price, description } = req.body;

//             // Await the promise
//             const contactDoc = await Contact.create({
//                 name,
//                 lname,
//                 email,
//                 company,
//                 phone,
//                 country,
//                 project,
//                 price,
//                 description,
//             });

//             res.status(201).json(contactDoc);   
//         } catch (error) {
//             console.error('Error saving contact:', error);
//             res.status(500).json({ message: 'Failed to save contact, please try again', error });
//         }
//     } else {
//         res.setHeader('Allow', ['POST']);
//         res.status(405).end(`Method ${method} not allowed`);
//     }
// }
import { mongooseConnect } from "@/lib/mongoose"; // Ensure this is only present once
import { Contact } from "@/models/contact";

export default async function handle(req, res) {
    await mongooseConnect();

    const { method } = req;

    if (method === 'POST') {
        try {
            const { name, lname, email, company, phone, country, project, price, description } = req.body;

            // Await the promise
            const contactDoc = await Contact.create({
                name,
                lname,
                email,
                company,
                phone,
                country,
                project,
                price,
                description,
            });

            res.status(201).json(contactDoc);   
        } catch (error) {
            console.error('Error saving contact:', error);
            res.status(500).json({ message: 'Failed to save contact, please try again', error });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${method} not allowed`);
    }
}
