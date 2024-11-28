import Head from "next/head";
import Link from "next/link";
import { HiXMark } from "react-icons/hi2";
import { IoMdCheckmark } from "react-icons/io";

export default function services() {
    return <>
        <Head>
            <title>Services</title>
        </Head>

        <div className="servicespage">
            <div className="topservices">
                <div className="container">
                    <h2>My Work / Experience</h2>
                    <p>Home <span>&gt;</span>Services</p>
                </div>
            </div>
            <div className="centerservices">
                <div className="container">
                    <div className="cservicesbox">
                        <div className="csservice">
                            <span>01</span>
                            <h2>Web Development</h2>
                            <img src="/img/website_icon.svg" alt="" />

                            <ul>
                                <li>unfortunately , Not Yet !</li>
                                {/* <li></li> */}
                            </ul>
                        </div>

                        <div className="cservicesbox1">
                            <img src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExOW9jd3Yxc2cwY2ZsemI1bmwyaHcyOXA1d2xndjJud2p5Nm91ZTNlMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/OPU6wzx8JrHna/giphy.gif" />
                        </div>
                    </div>
                    <div className="pricingplansec">
                        <div className="container">
                            <div className="pricingtitles text-center">
                                <h3><img src="/img/chevron_right.png" />
                                    PRICING PLAN
                                </h3>
                                <h2>Pricing My Work</h2>

                            </div>
                            <div className="pricingcards">
                                <div className="pricingcard">
                                    <h4>Lite Plan</h4>
                                    <p>Perfect Price for Individual</p>
                                    <h2>$00.00 <span>Monthly</span></h2>
                                    <Link href='/contact'><button>Get Start Now</button></Link>

                                <h5>Lite Includes:</h5>
                                <ul>
                                    <li><IoMdCheckmark />Powerfull Admin Panel</li>
                                    <li><HiXMark/> Multi-language Support</li>
                                </ul>
                                </div>

                                <div className="pricingcard">
                                    <h4>Premium Plan</h4>
                                    <p>Perfect Price for Individual</p>
                                    <h2>$00.00 <span>Monthly</span></h2>
                                    <Link href='/contact'><button>Get Start Now</button></Link>

                                <h5>Lite Includes:</h5>
                                <ul>
                                    <li><IoMdCheckmark />Powerfull Admin Panel</li>
                                    <li><HiXMark/> Multi-language Support</li>
                                </ul>
                                </div>
                                <div className="pricingcard">
                                    <h4>Life Plan</h4>
                                    <p>Perfect Price for Individual</p>
                                    <h2>$00.00 <span>Monthly</span></h2>
                                    <Link href='/contact'><button>Get Start Now</button></Link>

                                <h5>Lite Includes:</h5>
                                <ul>
                                    <li><IoMdCheckmark />Powerfull Admin Panel</li>
                                    <li><HiXMark/> Multi-language Support</li>
                                </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </>
}