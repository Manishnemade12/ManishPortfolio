import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { FreeMode } from 'swiper/modules';
import Head from 'next/head';
import { useState } from 'react';
import useFetchData from '@/hooks/useFetchData';
import Spinner from '@/components/Spinner';
import Link from 'next/link';
import Blogsearch from '@/components/Blogsearch';
import useFetchProfileData from '@/hooks/useFetchProfileData';

export default function blogs() {

    const [curretPage, setCurrentPage] = useState(1);
    const [perPage] = useState(7);
    const [searchQyery, setSearchQuery] = useState('');
    
    // Fetch blog data
    const { profileData, loadings } = useFetchProfileData() || { profileData: null, loadings: true };
    const { alldata, loading } = useFetchData('/api/blogs');
    

    const [searchinput, setSearchInput] = useState(false);

    const handleSearchOpen = () => {
        setSearchInput(!searchinput);
    }
    const handleSearchClose = () => {
        setSearchInput(false);
    }


    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const allblog = alldata.length;

    // Filter all data based on search query
    const filteredBlogs = searchQyery.trim() === ''
        ? alldata
        : alldata.filter(blog => blog.title.toLowerCase().includes(searchQyery.toLowerCase()));

    const indexOfFirstBlog = (curretPage - 1) * perPage;
    const indexOfLastblog = curretPage * perPage;

    const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastblog);
    const publishedData = currentBlogs.filter(ab => ab.status === 'publish');

    const sliderpubdata = alldata.filter(ab => ab.status === 'publish')

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(allblog / perPage); i++) {
        pageNumbers.push(i);
    }

    return <>
        <Head>
            <title>Blogs</title>
        </Head>
        <div className="blogpage">
            <section className="tophero">
                <div className="container">
                    <div className="toptitle">
                        <div className="toptitlecont flex">
                            <h1>Welcome to <span>Manish's Blogs!</span></h1>
                            <p>i write about my works , about new technologies, i hangging out </p>
                            <div className="subemail">
                                <form className='flex' >
                                    <input onClick={handleSearchOpen} placeholder='Search Blogs' type='text' />
                                    <button className="">Search Blogs..</button>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className='featured'>

                        <div className='container'>
                            <div className='border'> </div>
                            <div className='featuredposts'>
                                <div className='fetitle flex'>
                                    <h3>Featured Posts :</h3>

                                </div>
                                <div className='feposts flex'>
                                    <Swiper
                                        slidesPerView={'auto'}
                                        freeMode={true}
                                        spaceBetween={30}
                                        className='mySwiper'
                                        modules={[FreeMode]}

                                    >
                                        {/* {loading ? <Spinner /> : <>{sliderpubdata.slice(0,6).map((blog) => {
                                            return <SwiperSlide key={blog._id} >
                                                <div className='fpost' key={blog._id}>
                                                    <Link href={`/blogs${blog.slug}`}>
                                                    <img src={blog.images[0]} alt={blog.title} />
                                                    </Link>
                                                    <div className='fpostinfo'>
                                                        <div className='tegs flex'>
                                                            { blog.blogcategory.map((cat) => {
                                                                return <Link href={`/blog/category${cat}`} className='ai'><span></span>{cat}</Link>
                                                            }) }

                                                        </div>

                                                    </div>

                                                </div>
                                                </SwiperSlide>
                                        })}</> }
                                         */}

                                        {loading ? <Spinner /> : (
                                            <>
                                                {sliderpubdata.slice(0, 6).map((blog) => (
                                                    <SwiperSlide key={blog._id}>
                                                        <div className='fpost' key={blog._id}>
                                                            <Link href={`/blogs/${blog.slug}`}>
                                                                <img src={blog.images[0]} alt={blog.title} />
                                                            </Link>
                                                            <div className='fpostinfo'>
                                                                <div className='tegs flex'>
                                                                    {/* blogcategory */}
                                                                    {Array.isArray(blog.tags) && blog.tags.length > 0 ? (
                                                                        blog.tags.map((cat) => (
                                                                            <Link href={`/blog/category${cat}`} className='ai' key={cat}>
                                                                                <span></span>{cat}
                                                                            </Link>
                                                                        ))
                                                                    ) : ''}
                                                                </div>
                                                                <h2><Link href={`/blogs${blog.slug}`}>{blog.title}</Link></h2>
                                                                <div className='fpostby flex'>
                                                                    {/* <img src='/img/coder.jpg' alt='' /> */}
                                                                    {loadings ? (
                                                                        <img src="/img/loading-spinner.gif" alt="Loading..." />
                                                                    ) : profileData && profileData.images ? (
                                                                        <img src={profileData.images} alt="Profile" />
                                                                    ) : (
                                                                        <p>Image not available</p>
                                                                    )}
                                                                    <p>By Manish</p>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </SwiperSlide>
                                                ))}
                                            </>
                                        )}


                                    </Swiper>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            <section className='populartegssec'>
                <div className='container'>
                    <div className='border'></div>
                    <div className='populartegsdata'>
                        <div className='fetitle'>
                            <h3>Popular Tegs</h3>

                        </div>
                        <div className='poputegs'>
                            <Link href='/blogs/category/Next Js' className='pteg'>
                                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdhEg7GiIpEQaREFAcm2DPzVvQRfLwlNU-mA&s' alt='' />
                                <div className='tegs'>
                                    <div className=''><span>NextJs</span></div>
                                </div>
                            </Link>
                            <Link href='/blogs/category/ReactJs' className='pteg'>
                                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6VmbbJ1oNHy0hSWsJbYHRTHMJq8ns341Bdw&s' alt='' />
                                <div className='tegs'>
                                    <div className=''><span>ReactJs</span></div>
                                </div>
                            </Link>
                            <Link href='/blogs/category/NodeJs' className='pteg'>
                                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl0eyy5Bpqd_R-oLHsiDl-NzZR2e99iUzTJQ&s' alt='' />
                                <div className='tegs'>
                                    <div className=''><span>NodeJs</span></div>
                                </div>
                            </Link>
                            <Link href='/blogs/category/Docker' className='pteg'>
                                <img src='data:image/jpeg;base64,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' alt='' />
                                <div className='tegs'>
                                    <div className=''><span>Docker</span></div>
                                </div>
                            </Link>
                            <Link href='/blogs/category/Kubernates' className='pteg'>
                                <img src='data:image/jpeg;base64,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' alt='' />
                                <div className='tegs'>
                                    <div className=''><span>Kubernates</span></div>
                                </div>
                            </Link>
                            <Link href='/blogs/category/Sql-NoSql' className='pteg'>
                                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7-0_wnH-wYtFvFwi51Lh1eXYqUbtioK59bg&shttps://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7-0_wnH-wYtFvFwi51Lh1eXYqUbtioK59bg&s' alt='' />
                                <div className='tegs'>
                                    <div className=''><span>Sql-NoSql</span></div>
                                </div>
                            </Link>

                        </div>
                    </div>
                </div>

            </section>

            <section className='latestpostsec'>
                <div className='container'>
                    <div className='border'></div>
                    <div className='latestpostsdata'>
                        <div className='fetitle'>
                            <h3>Latest Articles :</h3>

                        </div>
                        <div className='latestposts'>
                            {loading ? <Spinner /> : <>
                                {publishedData.map((blog) => {
                                    return <div className='lpost' key={blog._id}>
                                        <div className='lpostimg'>
                                            <Link href={`/blogs/${blog.slug}`}> <img src={blog.images[0]} alt='' /></Link>
                                        </div>

                                        <div className='lpostinfo'>
                                            <h3><Link href={`/blogs/${blog.slug}`}>{blog.title}</Link></h3>
                                            <p>{blog.description}</p>
                                            <h4 className='flex'>  {loadings ? (
                                            <img src="/img/loading-spinner.gif" alt="Loading..." />
                                        ) : profileData && profileData.images ? (
                                            <img src={profileData.images} alt="Profile" />
                                        ) : (
                                            <p>Image not available</p>
                                        )} <span>By Manish</span></h4>

                                        </div>
                                    </div>
                                })}
                            </>}

                        </div>

                    </div>

                    {/* {publishedData.length === 0 ? (" ") : (
                        <div className="blogspaginationbtn flex flex-center mt-3 ">
                            <button onClick={() => paginate(curretPage - 1)} disabled={curretPage === 1}>previous</button>
                            {pageNumbers.slice(Math.max(curretPage - 3, 0), Math.min(curretPage + 2, pageNumbers.length)).map(number => {
                                <button key={number}
                                    onClick={() => paginate(number)}
                                    className={`${curretPage === number ? 'active' : ''}`}
                                >
                                    {number}
                                </button>
                            })}
                            <button onClick={() => paginate(curretPage + 1)} disabled={currentBlogs.length < perPage}>Next</button>
                        </div>  
                    )} */}


                    {publishedData.length === 0 ? (
                        " "
                    ) : (
                        <div className="blogspaginationbtn flex flex-center mt-3">
                            <button onClick={() => paginate(curretPage - 1)} disabled={curretPage === 1}>
                                Previous
                            </button>

                            {pageNumbers.slice(Math.max(curretPage - 3, 0), Math.min(curretPage + 2, pageNumbers.length)).map(number => (
                                <button key={number}
                                    onClick={() => paginate(number)}
                                    className={`${curretPage === number ? 'active' : ''}`}
                                >
                                    {number}
                                </button>
                            ))}

                            {/* <span>{curretPage}</span>*/}

                            <button onClick={() => paginate(curretPage + 1)} disabled={currentBlogs.length < perPage}>
                                Next
                            </button>
                        </div>
                    )}
                </div>
                {searchinput ? <Blogsearch cls={handleSearchClose} /> : null}
            </section>

        </div>
    </>
}