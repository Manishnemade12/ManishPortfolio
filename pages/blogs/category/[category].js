import Spinner from '@/components/Spinner';
import useFetchData from '@/hooks/useFetchData';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';



export default function Category() {

    const router = useRouter();
    const { category } = router.query;

    const [curretPage, setCurrentPage] = useState(1);
    const [perPage] = useState(7);
    const [searchQyery, setSearchQuery] = useState('');

    const { alldata, loading } = useFetchData(`/api/blogs?blogcategory=${category}`);

    const filteredBlogs = alldata.filter((item) => item.category === item.category).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 20);

    const blogcategoryData = [...filteredBlogs].reverse();

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const allblog = alldata.length;


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
            <title>Blog category page</title>
        </Head>
        <div className="blogcategory">
            <section className="tophero">
                <div className="container">
                    <div className="toptitle">
                        <div className="toptitlecont flex">
                            <h1>Category <span>{category}</span></h1>
                        </div>
                    </div>
                </div>
            </section>
            <section className='latestpostsec'>
                <div className='container'>
                    <div className='border'> </div>
                    <div className='latestspostsdata'>
                        <div className='fetitle'>
                            <h3>{category} Articles :</h3>

                        </div>
                        <div className='latestposts'>
                            {loading ? <Spinner /> : <>
                                {publishedData.map((blog) => {
                                    return <div className='lpost' key={blog._id}>
                                        <div className='lpostimg'>
                                            <Link href={`/blogs/${blog.slug}`}> <img src={blog.images[0]} alt='' /></Link>
                                            {/* <div className='tegs'>
                                                <Link href={`/blog/${blog.title}`} className=''>
                                                    <span>{blog.title}</span>
                                                </Link>
                                            </div> */}

                                        </div>

                                        <div className='lpostinfo'>
                                            <h3><Link href={`/blogs/${blog.slug}`}>{blog.title}</Link></h3>
                                            <p>{blog.description}</p>
                                            <h4 className='flex'><img src='/img/coder.jpg' /> <span>By Manish</span></h4>

                                        </div>
                                    </div>
                                })}
                            </>}

                        </div>
                    </div>

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
            </section>
        </div>
    </>
}