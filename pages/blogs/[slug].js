import { SlCalender } from "react-icons/sl";
import { CiRead } from "react-icons/ci";
import { RiFacebookFill } from "react-icons/ri";
import { FaTwitter } from "react-icons/fa";
import { RiWhatsappFill } from "react-icons/ri";
import { BiLogoLinkedin } from "react-icons/bi";
import { BsCopy, BsSearch } from "react-icons/bs";
import Link from "next/link";
import Head from "next/head";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import axios from "axios";
import { useRouter } from "next/router";
import { Children, useEffect, useRef, useState } from "react";
import Spinner from "@/components/Spinner";
import Blogsearch from "@/components/Blogsearch";
import useFetchData from "@/hooks/useFetchData";
import { FreeMode } from "swiper/modules";
import useFetchProfileData from "@/hooks/useFetchProfileData";

const BlogPage = () => {
    const router = useRouter();
    const { slug } = router.query;

    const { alldata } = useFetchData('/api/blogs');
    const [searchinput, setSearchInput] = useState(false);
    const { profileData, loadings } = useFetchProfileData() || { profileData: null, loadings: true };


    const handleSearchOpen = () => {
        setSearchInput(!searchinput);
    }
    const handleSearchClose = () => {
        setSearchInput(false);
    }

    const [blogData, setBlogData] = useState({ blog: {}, comments: [] });
    const [messageok, setMessageOk] = useState('');
    const [newComment, setNewComment] = useState({
        name: '',
        email: '',
        title: '',
        contentpera: '',
        maincomment: true,
        parent: null,
        parentName: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // Define state for error
    const [copied, setCopied] = useState(false);

    // Fetch blog data based on the slug
    useEffect(() => {
        const fetchBlogData = async () => {
            if (slug) {
                try {
                    const response = await axios.get(`/api/blogs/${slug}`);
                    console.log('Fetched blog data:', response.data); // Debug response
                    setBlogData(response.data);
                } catch (error) {
                    console.error('Error fetching blog data:', error); // Log error
                    setError('Failed to fetch blog data'); // Update error state
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchBlogData();
    }, [slug]);





    const handleCommentSubmit = async (e) => {
        e.preventDefault();

        try {
            // Ensure slug is defined to avoid 404 errors
            if (!slug) {
                setMessageOk('❌ Error: Slug is not defined.');
                return;
            }

            // Log slug and newComment data for debugging
            console.log("Slug:", slug);
            console.log("New Comment Data:", newComment);

            // Updated axios call with full URL
            const response = await axios.post(`/api/blogs/${slug}`, newComment);




            if (newComment.parent) {
                // Update the existing comment's children
                setBlogData(prevData => {
                    const updatedComments = updateChildrenComments(prevData.comments, newComment.parent, response.data);
                    return {
                        ...prevData,
                        comments: updatedComments
                    };
                });
            } else {
                // Add the new comment as a main comment
                setBlogData(prevData => ({
                    ...prevData,
                    comments: [response.data, ...prevData.comments] // Ensure response.data is formatted correctly
                }));
            }

            setMessageOk('✅ Comment posted successfully');
            setTimeout(() => setMessageOk(''), 5000);

            // Reset new comment form fields
            setNewComment({
                name: '',
                email: '',
                title: '',
                contentpera: '',
                maincomment: true,
                parent: null,
                parentName: ''
            });
        } catch (error) {
            // Log full error details to the console
            console.error("Error posting comment:", error);

            if (error.response) {
                console.error("Error Details:", {
                    status: error.response.status,
                    statusText: error.response.statusText,
                    data: error.response.data,
                });
                setMessageOk(`❌ Error ${error.response.status}: ${error.response.statusText}`);
            } else if (error.request) {
                console.error("No response received:", error.request);
                setMessageOk('❌ No response from server. Check server status.');
            } else {
                console.error("Error setting up request:", error.message);
                setMessageOk(`❌ Error: ${error.message}`);
            }

            setTimeout(() => setMessageOk(''), 5000);
        }
    };



    const replyFormRef = useRef(null);

    const handleReply = (parentCommentId, parentName) => {
        setNewComment({
            ...newComment,
            parent: parentCommentId,
            parentName: parentName,
            maincomment: false
        })

        if (replyFormRef.current) {
            replyFormRef.current.scrollIntoView({ behavior: 'smooth' });
        }


    }

    const handleRemoveReply = () => {
        setNewComment({
            ...newComment,
            parent: null,
            parentName: null,
            maincomment: true
        })
    }

    // Recursive function to update children comments
    const updateChildrenComments = (children, parentId, newComment) => {
        return children.map(comment => {
            if (comment._id === parentId) {
                return {
                    ...comment,
                    children: [...comment.children, newComment]
                };
            } else if (comment.children && comment.children.length > 0) {
                return {
                    ...comment,
                    children: updateChildrenComments(comment.children, parentId, newComment)
                };
            }
            return comment;
        });
    };



    // Handling loading state
    if (loading) {
        return <div className="flex flex-center wh_100"><Spinner /></div>;
    }

    // Handling error state
    if (error) {
        return <p>Error: {error}</p>;
    }

    const createdAtDate = blogData?.blog?.createdAt ? new Date(blogData.blog.createdAt) : null;

    // Formatting the date
    const formatDate = (date) => {
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
    };

    const blogurl = `https://portfolio-mansh.vercel.app/blogs/${slug}`;

    // Copy URL function
    const handlecopyUrl = (url) => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 3000);
    };

    // Code block handling with copy feature
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

    const renderComments = (comments) => {
        if (!comments || comments.length === 0) {
            return <p>No comments available.</p>; // Handle empty comments array
        }

        const commentsMap = new Map();

        // Populate the map for main comments
        comments.forEach(comment => {
            if (comment.parent === null) { // Check for main comments
                commentsMap.set(comment._id, {
                    ...comment,
                    children: []
                });
            }
        });

        // Populate children for each parent comment
        comments.forEach(comment => {
            if (comment.parent) {
                if (commentsMap.has(comment.parent)) {
                    commentsMap.get(comment.parent).children.push(comment);
                }
            }
        });

        // Map over parent comments
        return Array.from(commentsMap.values()).map(parentComment => (
            <div className="blogComment-m" key={parentComment._id}>
                <p1>{new Date(parentComment.createdAt).toLocaleString()}</p1>
                <h3>
                    <span>Name :</span>    {parentComment.name}
                </h3>
                <h4>
                    Title: <span>{parentComment.title}</span>
                </h4>
                <p>{parentComment.contentpera}</p>
                {/* <h5>Description: </h5>
     */}
                <button onClick={() => handleReply(parentComment._id, parentComment.name)}>
                    Reply
                </button>

                <   div className="children-comments">
                    {parentComment.children.map(childComment => (
                        <div className="child-comment" key={childComment._id}>
                           <span> <p1>{new Date(childComment.createdAt).toLocaleString()}</p1></span>
                           <h3>{childComment.name}</h3>
                            <h4>Title: <span>{childComment.title}</span></h4>
                            <p>{childComment.contentpera}</p>
                        </div>
                    ))}
                </div>
            </div>
        ));
    };


    return (
        <>
            <Head>
                <title>{slug}</title>
            </Head>

            <div className="blogslugpage">
                <div className="container">
                    <div className="blogslugpagecont">
                        <div className="leftsitedetails">
                            <div className="leftbloginfoimg">
                                <img src={blogData?.blog?.images?.[0] || '/img/noimg.png'} alt={blogData && blogData.title} />
                            </div>
                            <div className="slugbloginfopub">
                                <div className="flex gap-2">
                                    <div className="adminslug">
                                        {/* <img src='/img/coder.jpg' alt="" /> */}
                                        {loadings ? (
                                            <img src="/img/loading-spinner.gif" alt="Loading..." />
                                        ) : profileData && profileData.images ? (
                                            <img src={profileData.images} alt="Profile" />
                                        ) : (
                                            <p>Image not available</p>
                                        )}
                                        <span>By Manish</span>
                                    </div>
                                    <div className="adminslug">
                                        <SlCalender />
                                        <span>{createdAtDate ? formatDate(createdAtDate) : 'Pending'}</span>
                                    </div>
                                    <div className="adminslug">
                                        <CiRead />
                                        <span>{blogData.comments.length} Comments</span>
                                    </div>
                                </div>
                                <div className="shareblogslug">
                                    <div className="Copy URL" onClick={() => handlecopyUrl(blogurl)} style={{ cursor: 'pointer' }}>
                                        <BsCopy /> <span>{copied ? 'Copied' : ""}</span>
                                    </div>
                                    <a target="_blank" href={`http://www.facebook.com/sharer.php?u=${encodeURIComponent(blogurl)}`} rel="noopener noreferrer">
                                        <RiFacebookFill />
                                    </a>
                                    <a target="_blank" href={`http://www.twitter.com/intent/tweet?text=${encodeURIComponent('Check Out This blog post: ' + blogurl)}`} rel="noopener noreferrer">
                                        <FaTwitter />
                                    </a>
                                    <a target="_blank" href={`http://wa.me/?text=Check out this Blog Post:${encodeURIComponent(blogurl)}`} rel="noopener noreferrer">
                                        <RiWhatsappFill />
                                    </a>
                                    <a target="_blank" href={`http://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(blogurl)}`} rel="noopener noreferrer">
                                        <BiLogoLinkedin />
                                    </a>
                                </div>
                            </div>
                            <h1>{blogData.blog.title}</h1>
                            {loading ? <Spinner /> : (
                                <div className="blogcontent">
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        components={{ code: Code }}
                                    >
                                        {blogData.blog.description || ''}
                                    </ReactMarkdown>
                                </div>
                            )}

                            <div className="blogslugtags">
                                <div className="blogstegs">
                                    <h2>Tags:</h2>
                                    <div className="flex flex-wrap gap-1">
                                        {blogData && blogData.blog.tags.map((cat) => {
                                            return <span key={cat}>{cat}</span>
                                        })}

                                    </div>
                                </div>
                            </div>
                            <div className="blogusecomments">
                                <h2>Comments</h2>
                                {renderComments(blogData.comments)}
                            </div>
                            <div className="blogslugcomments" ref={replyFormRef}>
                                {newComment.parentName && (
                                    <h2>Leave a Reply To <span className="parentname">{newComment.parentName} </span> <button onClick={handleRemoveReply} className="removereplybtn">Remove Reply</button></h2>
                                )}
                                {!newComment.parentName && (
                                    <h2>Leave a Reply </h2>
                                )}




                                <p>Your Email Address will not Publish. Required fileds are marked*</p>
                                <form className="leaveareplyform" onSubmit={handleCommentSubmit}>
                                    <div className="nameemailcomment">
                                        <input type="text"
                                            placeholder="Enter your name"
                                            value={newComment.name}
                                            onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
                                        />

                                        <input type="email"
                                            placeholder="Enter your email"
                                            value={newComment.email}
                                            onChange={(e) => setNewComment({ ...newComment, email: e.target.value })}
                                        />
                                    </div>

                                    <input type="text"
                                        placeholder="Enter Title"
                                        value={newComment.title}
                                        onChange={(e) => setNewComment({ ...newComment, title: e.target.value })}
                                    />

                                    <textarea
                                        rows={4}
                                        placeholder="Enter Your Comment"
                                        id="textcomments"
                                        value={newComment.contentpera}
                                        onChange={(e) => setNewComment({ ...newComment, contentpera: e.target.value })}
                                    ></textarea>

                                    <div className="flex gap-2">
                                        <button type="submit">Post Comment</button>
                                        <p>{messageok}</p>
                                    </div>
                                </form>



                            </div>
                        </div>

                        <div className="rightsitedetails">
                            <div className="rightslugsearchbar">
                                <input
                                    onClick={handleSearchOpen}
                                    type="text"
                                    placeholder="Search.."
                                />
                                <button><BsSearch /></button>

                            </div>
                            <div className="rightslugcategory">
                                <h2>CATERORIES</h2>
                                <ul>
                                    <Link href="/blogs/category/Next Js"><li>Next Js<span>{alldata.filter(ab => ab.tags[0] === 'Next Js').length}</span></li></Link>
                                    <Link href="/blogs/category/Database"><li>Database<span>{alldata.filter(ab => ab.tags[0] === "Database").length}</span></li></Link>
                                    <Link href="/blogs/category/React Js"><li>React Js<span>{alldata.filter(ab => ab.tags[0] === 'React Js').length}</span></li></Link>
                                    <Link href="/blogs/category/Full Stack"><li>FullStack WebDev<span>{alldata.filter(ab => ab.tags[0] === 'Full Stack').length}</span></li></Link>
                                    <Link href="/blogs/category/Backend"><li>Backend WebDev<span>{alldata.filter(ab => ab.tags[0] === 'Backend').length}</span></li></Link>

                                </ul>
                            </div>
                            <div className="rightrecentpost">
                                <h2>RECENT POST</h2>
                                {alldata.slice(0, 3).map((blog) => {
                                    return <Link key={blog._id} href={`/blogs/${blog.slug}`} className="rightrecentp">
                                        <img src={blog.images[0]}
                                        //  alt={blog._id}
                                        />
                                        <div>
                                            <h3>{blog.title}</h3>
                                            <h4 className="mt-4">
                                                {blog.tags.map((cat) => {
                                                    return <span key={cat}>{cat}</span>
                                                })}
                                            </h4>
                                        </div>
                                    </Link>
                                })}
                            </div>
                        </div>
                    </div>
                    {searchinput ? <Blogsearch cls={handleSearchClose} /> : null}
                </div>

            </div>
        </>
    );
};



export default BlogPage;

