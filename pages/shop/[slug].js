
import Spinner from "@/components/Spinner";
import useFetchData from "@/hooks/useFetchData";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FreeMode } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css"; // Ensure Swiper styles are imported
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export default function ShopSlug() {
    const router = useRouter();
    const { slug } = router.query;
    const { alldata, loading } = useFetchData(`/api/shops?slug=${slug}`);
    const [mainimage, setmainimage] = useState('');

    useEffect(() => {
        if (alldata && alldata.length > 0 && alldata[0]?.images[0]) {
            setmainimage(alldata[0].images[0]);
        }
    }, [alldata]);

    const handleImageclick = (imagesrc) => {
        setmainimage(imagesrc);
    };

    return (
        <>
            <Head>
                <title>Shop Page</title>
            </Head>
            <div className="shopslugpage">
                <div className="shopcontent">
                    <div className="container">
                        <div className="shopcontbox">
                            <div className="leftshopimgbox">
                                <div className="leftshopmainimg">
                                    {loading ? <Spinner /> : <img src={mainimage} alt="Main image" />}
                                </div>
                                <div className="leftsimgboxlist">
                                    <Swiper
                                        slidesPerView="auto"
                                        spaceBetween={30}
                                        freeMode={true}
                                        modules={[FreeMode]}
                                        className="mySwiper"
                                    >
                                        {alldata && alldata[0]?.images.map((image, index) => (
                                            <SwiperSlide key={index}>
                                                <img 
                                                    onClick={() => handleImageclick(image)} 
                                                    src={image} 
                                                    alt={`Image ${index + 1}`} 
                                                    style={{ cursor: "pointer" }} // Add cursor style for click effect
                                                />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>
                            </div>
                            <div className="rightshopcontbox">
                                <h1>{alldata && alldata[0]?.title}</h1>
                                <h3 className="rightshopprice">Price: <span>{alldata && alldata[0]?.price}</span></h3>
                                <a  className="shopnowbtn" target="_blank" href={alldata && alldata[0]?.afilink}>Shop Now</a>
                                <div className="blogcontent">
                                    <h2 className="bctitle">Product Details</h2>
                                    <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    // components={{
                                    //     code: Code,
                                    // }}
                                    >
                                        {alldata && alldata[0]?.description}
                                    </ReactMarkdown>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
