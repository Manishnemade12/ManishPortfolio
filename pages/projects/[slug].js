import useFetchData from "@/hooks/useFetchData";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { FreeMode, Pagination } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";
import useFetchProfileData from "@/hooks/useFetchProfileData";


export default function ProjectSlug() {

    const router = useRouter();
    const { slug } = router.query;
    const { alldata, loading } = useFetchData(`/api/projects?slug=${slug}`);
    const { profileData, loadings } = useFetchProfileData() || { profileData: null, loadings: true };

    // Log fetched data to verify structure
    useEffect(() => {
        if (alldata) {
            console.log("Fetched Data:", alldata);
        }
    }, [alldata]);

    const createdAtDate = alldata && alldata[0]?.createdAt ? new Date(alldata[0].createdAt) : null;



    const formDate = (date) => {
        if (!date || isNaN(date)) {
            return '';
        }

        const options = {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour12: 'true',
        };

        return new Intl.DateTimeFormat('en-US', options).format(date);

    }


    const Code = ({ node, inline, className, children, ...props }) => {
        const match = /language-(\w+)/.exec(className || '');

        const handleCopyCode = () => {
            navigator.clipboard.writeText(String(children));
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 3000);
        };

        if (inline) {
            return <code>{children}</code>;
        } else if (match) {
            return (
                <div style={{ position: 'relative' }}>
                    <SyntaxHighlighter
                        style={a11yDark}
                        language={match[1]}
                        PreTag='pre'
                        {...props}
                        codeTagProps={{ style: { padding: '0', borderRadius: '5px', overflow: 'auto', whiteSpace: 'pre-wrap' } }}
                    >
                        {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                    <button
                        onClick={handleCopyCode}
                        style={{
                            position: 'absolute',
                            top: '0',
                            right: '0',
                            zIndex: '1',
                            background: '#3d3d3d',
                            color: '#fff',
                            padding: '10px',
                            cursor: 'pointer'
                          }}
                    >
                        {copied ? 'Copied' : 'Copy code'}
                    </button>
                </div>
            );
        } else {
            return <code className="md-post-code" {...props}>{children}</code>;
        }
    };



    return (
        <>
            <Head>
                <title>{slug || "Project Details"}</title>
            </Head>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="projectslug">
                    <div className="projectslugimg">
                        <div className="container">
                            <div className="proslugimg">
                                <img
                                    src={alldata && alldata[0]?.images?.[0] ? alldata[0].images[0] : "/placeholder-image.png"}
                                    alt={alldata && alldata[0]?.title || "No title available"}

                                />
                            </div>

                            <div className="projectsluginfo">
                                <div className="leftmainproinfo">
                                    <h1>{alldata && alldata[0]?.title || "No title available"}</h1>


                                    <p>look at live preview of project.</p>

                                    <a
                                        target="_blank"
                                        href={alldata && alldata[0]?.livepreview || "#"}
                                        rel="noopener noreferrer"
                                    >
                                        Live Preview
                                    </a>
                                </div>
                                <div className="rightmainproinfo">
                                    <div>
                                        <h1>Category</h1>

                                        <p>{alldata && alldata[0]?.tags?.[0] ? alldata[0].tags[0] : "No tags available"}</p>

                                        <div className="manishProfile">
                                    {/* <img  src="/img/me.png"/> */}
                                    {loadings ? (
                <img src="/img/loading-spinner.gif" alt="Loading..."/>
            ) : profileData && profileData.images ? ( // Undefined check for profileData and profileData.images
                <img src={profileData.images} alt="Profile"/>
            ) : (
                <p>Image not available</p> // Placeholder in case image is unavailable
            )}

                                        </div>
                                    </div>



                                </div>
        
                                <div className="rightmainproinfo">
                                    <div>
                                        <h3>Date</h3>
                                        <h2>{formDate(createdAtDate)}</h2>

                                    </div>
                                    <div>
                                        <h3>Developer</h3>
                                        <h2>{profileData ? profileData.name : 'Loading...'}</h2>
                                       

                                    </div>
                                </div>
                            </div>
                            <div className="projectslugsliderimg">
                                <Swiper
                                    slidesPerView="auto"
                                    spaceBetween={30}
                                    freeMode={true}
                                    grabCursor={true}
                                    modules={[FreeMode]}
                                    className="mySwiper"
                                >
                                    {alldata && alldata[0]?.images.map((image, index) => (
                                        <SwiperSlide key={index}>
                                            <img src={image} alt="Project" />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>

                        </div>
                    </div>
                    <div className="projectslugdescription">
                        <div className="container">
                            <div className="psdescri">
                                <h2>Project Description</h2>
                                    <div className="blogcontent">
                                    <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                        code: Code,
                                    }}
                                    >
                                        {alldata[0]?.description}
                                    </ReactMarkdown>
                                    </div>
                            </div>

                        </div>

                    </div>
                </div>
            )}
        </>
    );
}
