import Link from "next/link";
import { CiInstagram } from "react-icons/ci";
import { FaFacebookF, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa6";
import { GrLinkedinOption } from "react-icons/gr";
import { LiaBasketballBallSolid } from "react-icons/lia";

export default function Footer() {
    return <>
        <footer className="footer">
            <div className="footersec flex flex-center flex-col gap-2">
                <div className="logo">
                    {/* <img src="/img/logo3.png" alt="" /> */}

                </div>
                {/* <div className="ul flex gap-2">
                        <li><Link href='/resume'>resume</Link></li>
                        <li><Link href='/skills'>Skills</Link></li>
                        <li><Link href='/projects'>Projects</Link></li>
                        <li><Link href='/services'>Education</Link></li>
                        <li><Link href='/contact'>Contact</Link></li>
                        
                </div> */}
                <ul className="hero_social">
                <li><a href="" target="_blank"><FaTwitter /></a></li>
                <li><a href="" target="_blank"><LiaBasketballBallSolid /></a></li>
                <li><a href="https://in.linkedin.com/in/manish-nemade-aaa69b28a" target="_blank"><GrLinkedinOption /></a></li>
                <li><a href="https://github.com/Manishnemade12" target="_blank"><FaGithub /></a></li>
                <li><a href="https://www.instagram.com/manish_nemade_190/" target="_blank"><FaInstagram /></a></li>
                </ul>

                <div className="copyrights">
                                &copy; 2024 All copyrights Reserved By <span>Manish</span>
                </div>

            </div>
        </footer>
    </>
}