import useFetchSocialLinks from "@/hooks/LinksFetch";
import { FaGithub, FaInstagram, FaTwitter } from "react-icons/fa6";
import { GrLinkedinOption } from "react-icons/gr";
import { LiaBasketballBallSolid } from "react-icons/lia";
import React from "react";

export default function Footer() {
    const { socialLinks, loading, error } = useFetchSocialLinks('/api/SocialLink');

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    // Combine all social links into a single object
    const uniqueLinks = socialLinks && socialLinks.length > 0
        ? socialLinks.reduce((acc, link) => {
            return {
                Twitter: link.Twitter || acc.Twitter,
                Instagram: link.Instagram || acc.Instagram,
                Linkedin: link.Linkedin || acc.Linkedin,
                Github: link.Github || acc.Github,
                personalweb: link.personalweb || acc.personalweb,
            };
        }, {})
        : {};

    return (
        <footer className="footer">
            <div className="footersec flex flex-center flex-col gap-2">
                <ul className="hero_social">
                    {uniqueLinks.Twitter && (
                        <li>
                            <a href={uniqueLinks.Twitter} target="_blank" rel="noopener noreferrer">
                                <FaTwitter />
                            </a>
                        </li>
                    )}
                    {uniqueLinks.Instagram && (
                        <li>
                            <a href={uniqueLinks.Instagram} target="_blank" rel="noopener noreferrer">
                                <FaInstagram />
                            </a>
                        </li>
                    )}
                    {uniqueLinks.Linkedin && (
                        <li>
                            <a href={uniqueLinks.Linkedin} target="_blank" rel="noopener noreferrer">
                                <GrLinkedinOption />
                            </a>
                        </li>
                    )}
                    {uniqueLinks.Github && (
                        <li>
                            <a href={uniqueLinks.Github} target="_blank" rel="noopener noreferrer">
                                <FaGithub />
                            </a>
                        </li>
                    )}
                    {uniqueLinks.personalweb && (
                        <li>
                            <a href={uniqueLinks.personalweb} target="_blank" rel="noopener noreferrer">
                                <LiaBasketballBallSolid />
                            </a>
                        </li>
                    )}
                </ul>

                <div className="copyrights">
                    &copy; 2024 All copyrights Reserved By <span>Manish</span>
                </div>
            </div>
        </footer>
    );
}

