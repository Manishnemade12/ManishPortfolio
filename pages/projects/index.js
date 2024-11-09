import Spinner from "@/components/Spinner";
import useFetchData from "@/hooks/useFetchData";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GoArrowUpRight } from "react-icons/go";

export default function Projects() {
    const { alldata, loading } = useFetchData('/api/projects');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [filteredProjects, setFilteredProjects] = useState([]);

    useEffect(() => {
        if (selectedCategory === 'All') {
            setFilteredProjects(alldata.filter(pro => pro.status === 'publish'));
        } else {
            setFilteredProjects(
                alldata.filter(
                    pro => pro.status === 'publish' && pro.tags.includes(selectedCategory)
                )
            );
        }
    }, [selectedCategory, alldata]);

    return (
        <>
            <Head>
                <title>Projects</title>
            </Head>
            <div className="projectpage">
                <div className="projects">
                    <div className="container">
                        <div className="project_titles">
                            <h2>My Recent Projects</h2>
                            <p>I put my ideas in the form of beautiful webpages</p>
                        </div>

                        <div className="project_buttons">
                            <button 
                                className={selectedCategory === 'All' ? 'active' : ''} 
                                onClick={() => setSelectedCategory('All')}
                            >
                                All
                            </button>
                            <button 
                                className={selectedCategory === 'Full Stack' ? 'active' : ''} 
                                onClick={() => setSelectedCategory('Full Stack')}
                            >
                                WebDev
                            </button>
                            <button 
                                className={selectedCategory === 'Next Js' ? 'active' : ''} 
                                onClick={() => setSelectedCategory('Next Js')}
                            >
                                NextJs
                            </button>
                            <button 
                                className={selectedCategory === 'Database' ? 'active' : ''} 
                                onClick={() => setSelectedCategory('Database')}
                            >
                                Database
                            </button>
                            <button 
                                className={selectedCategory === 'Kubernetes' ? 'active' : ''} 
                                onClick={() => setSelectedCategory('Kubernetes')}
                            >
                                Kubernetes
                            </button>
                        </div>

                        <div className="projects_cards">
                            {loading ? (
                                <div className="flex flex-center wh_50">
                                    <Spinner />
                                </div>
                            ) : filteredProjects.length === 0 ? (
                                <h1>No Project Found</h1>
                            ) : (
                                filteredProjects.map((pro) => (
                                    <Link href={`/projects/${pro.slug}`} key={pro._id} className="procard">
                                        <div className="proimgbox">
                                            <img src={pro.images[0]} alt={pro.title} />
                                        </div>
                                        <div className="procontentbox">
                                            <h2>{pro.title}</h2>
                                            <GoArrowUpRight />
                                        </div>
                                    </Link>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
