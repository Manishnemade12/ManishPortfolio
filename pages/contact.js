import axios from "axios";
import Head from "next/head";
import { useState } from "react";
import { FaGithub, FaInstagram, FaPhoneVolume, FaTwitter } from "react-icons/fa6";
import { GiClick } from "react-icons/gi";
import { GrLinkedin } from "react-icons/gr";
import { IoMdAttach, IoMdMail } from "react-icons/io";

export default function Contact() {
    const [name, setName] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');
    const [phone, setPhone] = useState('');
    const [country, setCountry] = useState('');
    const [project, setProject] = useState([]);
    const [price, setPrice] = useState('');  // Ensure this is an empty string
    const [description, setDescription] = useState('');
    const [messageok, setMessageOk] = useState('');

    const createProduct = async (ev) => {
        ev.preventDefault();
        setMessageOk('Sending...');

        const data = { name, lname, email, company, phone, country, project, price, description };

        try {
            await axios.post('/api/contacts', data);
            setMessageOk('✅ Message sent successfully');
            setName('');
            setLname('');
            setEmail('');
            setCompany('');
            setPhone('');
            setCountry('');
            setProject([]);
            setPrice('');
            setDescription('');
        } catch (error) {
            if (error.response) {
                console.error('Server error:', error.response.data);
                setMessageOk('❌ Server error, please try again.');
            } else if (error.request) {
                console.error('No response received from server:', error.request);
                setMessageOk('❌ Network error, please check your connection.');
            } else {
                console.error('Error:', error.message);
                setMessageOk('❌ An error occurred, please try again.');
            }
        }
    };

    const handleProjectChange = (projectName) => {
        if (project.includes(projectName)) {
            setProject(project.filter((p) => p !== projectName));
        } else {
            setProject([...project, projectName]);
        }
    };

    const handlePriceChange = (e) => {
        setPrice(e.target.value);
        console.log("Radio button clicked:", e.target.value); // Log selected value
    };

    return (
        <>
            <Head>
                <title>Contact us</title>
            </Head>

            <div className="contactpage">
                <div className="container">
                    <div className="contactformp">
                        <div className="leftcontp">
                            <h2>Get in touch</h2>
                            <h2>Let's talk about projects</h2>
                            <p>Connect with me on various platforms for open-source contribution and social projects.</p>
                            <p>I am always eager to learn new technologies.</p>
                            <p>I love questions and feedback and am always happy to help!</p>
                            <div className="leftsociinfo">
                                <ul>
                                    <li><FaPhoneVolume /> <span>Phone: <a href="tel:92#########2"></a></span></li>
                                    <li><GrLinkedin /> <span>LinkedIn: <a href="https://in.linkedin.com/in/manish-nemade-aaa69b28a" target="_blank">MANISH NEMADE <GiClick /></a></span></li>
                                    <li><IoMdMail /> <span>Email: <a href="mailto:Mnemade140@gmail.com" target="_blank">Mnemade140@gmail.com</a></span></li>
                                    <li><FaGithub /> <span>GitHub: <a href="https://github.com/Manishnemade12" target="_blank">Manishnemade12</a></span></li>
                                    <li><FaInstagram /> <span>Instagram: <a href="https://www.instagram.com/manish_nemade_190/" target="_blank">manish_nemade_190</a></span></li>
                                </ul>
                            </div>
                        </div>
                        <div className="rightcontp">
                            <form onSubmit={createProduct}>
                                <div className="rightconttitle">
                                    <h1>Your Contact Details</h1>
                                </div>
                                <div className="rightcontinputs">
                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="First Name" required />
                                    <input type="text" value={lname} onChange={(e) => setLname(e.target.value)} placeholder="Last Name" required />
                                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                                    <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company Name" />
                                    <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" required />
                                    <select value={country} onChange={(e) => setCountry(e.target.value)} required>
                                        <option value="sel">Select Country</option>
                                        <option value="ind">India</option>
                                        <option value="atl">Atlanta</option>
                                        <option value="ber">Berlin</option>
                                        <option value="bos">Boston</option>
                                        <option value="chi">Chicago</option>
                                        <option value="lon">London</option>
                                        <option value="la">Los Angeles</option>
                                        <option value="ny">New York</option>
                                        <option value="par">Paris</option>
                                        <option value="sf">San Francisco</option>
                                    </select>
                                </div>
                                <div className="rightconttitle">
                                    <h2>Why do you want to contact me?</h2>
                                </div>
                                <div className="rightcontcheckbox">
                                    {['Related Project', 'OpenSource Dev', 'Collaborative Development'].map((projectOption) => (
                                        <label key={projectOption} className="cyberpunk-checkbox-label">
                                            <input
                                                type="checkbox"
                                                className="cyberpunk-checkbox"
                                                value={projectOption}
                                                checked={project.includes(projectOption)}
                                                onChange={() => handleProjectChange(projectOption)}
                                            />
                                            {projectOption}
                                        </label>
                                    ))}
                                </div>
                                <div className="rightconttitle">
                                    <h2>Your Free Time</h2>
                                </div>
                                <div className="rightcontredio">
                                    {['9 to 12 AM', '12 to 3 PM', '3 to 6 PM', '6 to 9 PM'].map((priceRange) => (
                                        <label key={priceRange} className="radio-button">
                                            <input
                                                type="radio"
                                                id={priceRange}
                                                name="example-radio"
                                                value={priceRange}
                                                checked={price === priceRange}
                                                onChange={handlePriceChange}
                                            />
                                            <span className="radio"></span>
                                            {priceRange}
                                        </label>
                                    ))}
                                </div>
                                <div className="rightconttitle">
                                    <p>Selected time slot: {price}</p>
                                </div>
                                <div className="rightconttitle">
                                    <h2>Breif Description</h2>
                                </div>
                                <div className="rightcontpera">
                                    <textarea value={description} onChange={ev => setDescription(ev.target.value)} name="description" rows={4} id="" placeholder="Description"></textarea>
                                </div>
                                <hr />
                                <div className="righhcontsbtn flex gap-3">
                                    <button type="submit">Submit</button>
                                    <p>{messageok}</p>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
