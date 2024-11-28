import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { IoMoonSharp } from "react-icons/io5";
import Spinner from "./Spinner";


export default function Header() {

    const [darkMode, setDarkMode] = useState(false);
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                console.log("Fetching profile data from API...");
                const response = await fetch('/api/prof');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log("Fetched profile data: ", data);
                setProfileData(data);
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };
        fetchProfileData();
    }, []);

    
    useEffect(() => {
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        setDarkMode(isDarkMode)
    }, [])


    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark');
            localStorage.setItem('darkMode', true)
        } else {
            document.body.classList.remove('dark');
            localStorage.setItem('darkMode', false)
        }
    }, [darkMode])

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    }

    const router = useRouter();

    const [clicked, setClicked] = useState(false);
    const [activeLink, setActiveLink] = useState('/');

    const handleLinkClick = (link) => {
        setActiveLink(link);
        setClicked(false)
    }

    useEffect(() => {
        setActiveLink(router.pathname); // Jab router.pathname change ho, activeLink ko update kar do
    }, [router.pathname]);

    const [mobile, setMobile] = useState(false);

    const handleMobileOpen = () => {
        setMobile(!mobile)
    }
    const handleMobileClose = () => {
        setMobile(false)
    }

    return (
        <>
            <header>
                <nav className="container flex flex-sb">
                    <div className="logo flex gap-2">
                        <div className="logom">
                        <Link href="/">
                            <img src={`/img/${darkMode ? 'logo2' : 'logo1'}.png`} alt="logo" />
                            {/* <img src={`/img/${darkMode ? 'white' : 'logo'}.png`} alt="logo" /> */}
                        </Link>
                        </div>
                        {profileData ? (
                          <h2> {profileData.email}</h2>
                        ) : (
                            <Spinner />
                        )}
                      
                    </div>

                    <div className="navlist flex gap-2">
                        <ul className="flex gap-1" onClick={handleMobileClose}>
                            <li>
                                <Link href="/" className={activeLink === '/' ? "active" : ""}>Home</Link>
                            </li>
                            <li>
                                <Link href="/blogs" className={activeLink === '/blogs' ? "active" : ""}>Blogs</Link>
                            </li>
                            <li>
                                <Link href="/projects" className={activeLink === '/projects' ? "active" : ""}>Projects</Link>
                            </li>
                            <li>
                                <Link href="/services" className={activeLink === '/services' ? "active" : ""}>Services</Link>
                            </li>
                            {/* <li>
                                <Link href="/shop" className={activeLink === '/shop' ? "active" : ""}>Shop</Link>
                            </li> */}
                            <li>
                                <Link href="/gallery" className={activeLink === '/gallery' ? "active" : ""}>Gallery</Link>
                            </li>
                            <li>
                                <Link href="/contact" className={activeLink === '/contact' ? "active" : ""}>Contact</Link>
                            </li>
                        </ul>
                        <div className="darkmodetoggle" onClick={toggleDarkMode}>
                            <IoMoonSharp />
                        </div>

                        <button>  <Link href="/contact">Contact me!</Link> </button>
                        {/* Moved outside the ul for better visibility */}
                        <div className="mobiletogglesvg" onClick={handleMobileOpen}>
                            <HiMiniBars3BottomRight />
                        </div>

                    </div>
                    <div className={mobile ? "mobilenavlist active" : "mobilenavlist"}>
                        <span onClick={handleMobileClose} className={mobile ? "active" : ' '}></span>
                        <div className="mobilelogo">
                            <img src="img/white.png" alt="logo" />
                            <h2>Manish Nemade</h2>
                        </div>
                        <ul className="flex gap-1 flex-col flex-left mt-1" onClick={handleMobileClose}>
                            <li>
                                <Link href="/" className={activeLink === '/' ? "active" : ""}>Home</Link>
                            </li>
                            <li>
                                <Link href="/blogs" className={activeLink === '/blogs' ? "active" : ""}>Blogs</Link>
                            </li>
                            <li>
                                <Link href="/projects" className={activeLink === '/projects' ? "active" : ""}>Projects</Link>
                            </li>
                            <li>
                                <Link href="/services" className={activeLink === '/services' ? "active" : ""}>Services</Link>
                            </li>
                            {/* <li>
                                <Link href="/shop" className={activeLink === '/shop' ? "active" : ""}>Shop</Link>
                            </li> */}
                            <li>
                                <Link href="/gallery" className={activeLink === '/gallery' ? "active" : ""}>Gallery</Link>
                            </li>
                            <li>
                                <Link href="/contact" className={activeLink === '/contact' ? "active" : ""}>Contact</Link>
                            </li>

                        </ul>
                        {/* <div className="adjustment">
                        <p>Copyright &copy; 2024 | Manish_Nemade</p>
                        </div> */}
                       <p>.</p>
                    </div>
                </nav>
            </header>
        </>
    );
}


