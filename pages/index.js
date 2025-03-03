import Head from "next/head";
import Link from "next/link";
import { BiDownload } from "react-icons/bi";
import { FaCalendarDays, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa6";
import { GrLinkedinOption } from "react-icons/gr";
import { LiaBasketballBallSolid } from "react-icons/lia";
import { GoArrowUpRight } from "react-icons/go";
import { useEffect, useState } from "react";
import Spinner from "@/components/Spinner";
import { CiInstagram } from "react-icons/ci";
import { PiGraduationCap } from "react-icons/pi";
import useFetchSocialLinks from "@/hooks/LinksFetch";
export default function Home() {
  const [activeIndex, setactiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [alldata, setAlldata] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [allwork, setAllwork] = useState([]);
  const [profileData, setProfileData] = useState(null);
  const [skillData, setSkillData] = useState([]);
  const [educationData, setEducationData] = useState(null);

  const handlehover = (index) => {
    setactiveIndex(index);
  };

  const handlleMouseout = () => {
    setactiveIndex(0);
  };

  // Services data
  useEffect(() => {
    const fetchEducationData = async () => {
      try {
        const response = await fetch('/api/education');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setEducationData(data);  // Save the fetched education data
      } catch (error) {
        console.error('Error fetching education data:', error);
      } finally {
        setLoading(false);  // Once the data is fetched, set loading to false
      }
    };
    fetchEducationData();
  }, []);

  // blogs data
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        console.log("Fetching blogs from API...");
        const response = await fetch('/api/blogs');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log("Fetched blogs data: ", data);
        setAllwork(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  // project data
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);  // Start loading when fetching data
      try {
        const projectResponse = await fetch("/api/projects");
        if (!projectResponse.ok) {
          throw new Error("Failed to fetch project data");
        }
        const projectData = await projectResponse.json();
        setAlldata(projectData);
      } catch (error) {
        console.error("Error fetching project data", error);
      } finally {
        setLoading(false);  // Stop loading after data is fetched or error occurs
      }
    };
    fetchProjects();
  }, []);

  // profile data
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        console.log("Fetching blogs from API...");
        const response = await fetch('/api/prof');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log("Fetched blogs data: ", data);
        setProfileData(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchProfileData();
  }, []);

  // skills data
  useEffect(() => {
    const fetchSkillData = async () => {
      try {
        console.log("Fetching blogs from API...");
        const response = await fetch('/api/skill');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log("Fetched skill data: ", data);
        setSkillData(data); // Save the fetched array in state
      } catch (error) {
        console.error('Error fetching skill:', error);
      }
    };

    fetchSkillData();
  }, []);

  
  // Fetch social links

  const { socialLinks } = useFetchSocialLinks('/api/SocialLink');
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

  // // Filter projects based on selected category
  // useEffect(() => {
  //   if (alldata.length > 0) {
  //     if (selectedCategory === 'All') {
  //       setFilteredProjects(alldata.filter(pro => pro.status === 'publish'));
  //     } else {
  //       setFilteredProjects(
  //         alldata.filter(
  //           pro => pro.status === 'publish' && pro.tags.includes(selectedCategory)
  //         )
  //       );
  //     }
  //   }
  // }, [selectedCategory, alldata]); 
  useEffect(() => {
    if (alldata.length > 0) {
      if (selectedCategory === 'All') {
        setFilteredProjects(alldata.filter(pro => pro.status === 'publish'));
      } else {
        setFilteredProjects(
          alldata.filter(
            pro => pro.status === 'publish' && pro.tags.includes(selectedCategory)
          )
        );
      }
    }
  }, [selectedCategory, alldata]); 


  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  }

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

  return (
    <>
      <Head>
        <title>Manish's - Personal Portfolio </title>

        <meta name="description" content="manish - Personal Portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" type="image/png" href="/img/logo1.png" />
      </Head>

      {/* Hero Section */}
      <section className="hero">
        <div className="intro_text">
          <svg viewBox="0 0 1320 300">
            <text x="50%" y="50%" textAnchor="middle" className="animate-stroke">
              HI
            </text>
          </svg>
        </div>
        <div className="container">
          <div className="flex w-100">
            <div className="heroinfoleft">

              {profileData ? (
                <span className="hero_sb_title" data-aos="fade-right">I am {profileData.name}</span>
              )
                : (<Spinner />
                )}
              <h1 className="hero_title">
                {/* Full Stack <br />
                <span className="typed-text" data-aos="fade-right">
                  {profileData ? profileData.profession : <Spinner />}
                </span> */}
                <span
                  className="typed-text"
                  data-aos="fade-right"
                  dangerouslySetInnerHTML={{
                    __html: profileData
                      ? profileData.profession.replace(" ", "<br>")
                      : <Spinner />,
                  }}
                ></span>

              </h1>
              {/* 36 */}

              <div className="hero_img_box heroimgbox" data-aos="fade-left" data-aos-easing='ease-out-cubic' data-aos-duration='2000'>
              <img src={profileData ? profileData.images : <Spinner />} />

              </div>
              <div className="lead" data-aos='fade-up'>
                {profileData ? profileData.description : <Spinner />}
              </div>
              <div className="hero_btn_box">
                <Link href="/" download="/img/resume.pdf" className="download_cv">
                  Download CV <BiDownload />
                </Link>
                {/* <ul className="hero_social">
                  <li>
                    <a href="https://www.instagram.com/manish_nemade_190/">
                      <CiInstagram />
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <LiaBasketballBallSolid />
                    </a>
                  </li>
                  <li>
                    <a href="https://in.linkedin.com/in/manish-nemade-aaa69b28a">
                      <GrLinkedinOption />
                    </a>
                  </li>
                  <li>
                    <a href="https://github.com/Manishnemade12">
                      <FaGithub />
                    </a>
                  </li>
                </ul> */}
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




              </div>
            </div>

           

            <div className="heroimageright">
              <div className="hero_img_box" data-aos="fade-left" data-aos-easing='ease-out-cubic' data-aos-duration='2000'>
                <img src={profileData ? profileData.images : <Spinner />} />
              </div>
            </div>
          </div>
          <div className="funfect_area flex flex-sb">
            <div className="funfect_item" data-aos="fade-right">
              <h3>6+</h3>
              <h4>
              Months of <br />
              Hands-on Experience
              </h4>
            </div>
            <div className="funfect_item" data-aos="fade-up">
              <h3>4+</h3>
              <h4>
                Projects <br />
                Completed
              </h4>
            </div>
            <div className="funfect_item" data-aos="fade-left">
              <h3>1+</h3>
              <h4>
                Open Source <br />
                Library
              </h4>
            </div>
          </div>
        </div>
      </section>

      {/* Technical stack */}
      <section className="services">
        <div className="container">
          <div className="services_titles">
            <h2>My Technical Stack Qualities</h2>
            <p> </p>
          </div>
          <div className="services_menu">
            <div className="services_item"
              onMouseOver={(e) => e.currentTarget.classList.add("sactive")} // Add "sactive" class on hover
              onMouseOut={(e) => e.currentTarget.classList.remove("sactive")} // Remove "sactive" class on mouse out
            >
              <div className="left_s_box">
                <span>1</span>
                <h3>{profileData ? profileData.work1Title : <Spinner />}</h3>
              </div>
              <div className="right_s_box">
                <p>{profileData ? profileData.work1Description : <Spinner />}</p>
              </div>
              <GoArrowUpRight />
            </div>

            <div className="services_item"
              onMouseOver={(e) => e.currentTarget.classList.add("sactive")} // Add "sactive" class on hover
              onMouseOut={(e) => e.currentTarget.classList.remove("sactive")} // Remove "sactive" class on mouse out
            >
              <div className="left_s_box">
                <span>2</span>
                <h3>{profileData ? profileData.work2Title : <Spinner />}</h3>
              </div>
              <div className="right_s_box">
                <p>{profileData ? profileData.work2Description : <Spinner />}</p>
              </div>
              <GoArrowUpRight />
            </div>

            <div className="services_item"
              onMouseOver={(e) => e.currentTarget.classList.add("sactive")} // Add "sactive" class on hover
              onMouseOut={(e) => e.currentTarget.classList.remove("sactive")} // Remove "sactive" class on mouse out
            >
              <div className="left_s_box">
                <span>3</span>
                <h3>{profileData ? profileData.work3Title : <Spinner />}</h3>
              </div>
              <div className="right_s_box">
                <p>{profileData ? profileData.work3Description : <Spinner />}</p>
              </div>
              <GoArrowUpRight />
            </div>

            <div className="services_item"
              onMouseOver={(e) => e.currentTarget.classList.add("sactive")} // Add "sactive" class on hover
              onMouseOut={(e) => e.currentTarget.classList.remove("sactive")} // Remove "sactive" class on mouse out
            >
              <div className="left_s_box">
                <span>4</span>
                <h3>{profileData ? profileData.work4Title : <Spinner />}</h3>
              </div>
              <div className="right_s_box">
                <p>{profileData ? profileData.work4Description : <Spinner />}</p>
              </div>
              <GoArrowUpRight />
            </div>
          </div>
        </div>
      </section>


      {/* Experience study recentblogs */}
      <section className="exstudy">
        <div className="container flex flex-left flex-sb">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="education">
              <div className="experience_title flex gap-1">
                <PiGraduationCap />
                <h2>My Education Details</h2>

              </div>
              <div className="exper_cards">
                {educationData?.education?.length ? (
                  educationData.education.map((edu, index) => (
                    <div key={index} className="exper_card">
                      <span>{edu.year}</span>
                      <h3>{edu.school}</h3>
                      <p>{edu.educationDescription}</p>
                    </div>
                  ))
                ) : (
                  <p>No education data available.</p>
                )}
              </div>
            </div>
          )}
          <div className="experience flex-center">
            <img src="/img/download.png" alt="coder" className="hacker" />
          </div>
        </div>
      </section>



      {/* Projects  it s main */}
      {/* <section className="projects">
        <div className="container">
          <div className="project_titles">
            <h2>My Recent Projects</h2>
            <div className="project_buttons">
              <button className={selectedCategory === 'All' ? 'active' : ''} onClick={() => setSelectedCategory('All')}>All</button>
              <button className={selectedCategory === 'Full Stack' ? 'active' : ''} onClick={() => setSelectedCategory('Full Stack')}>WebDev</button>
              <button className={selectedCategory === 'Next Js' ? 'active' : ''} onClick={() => setSelectedCategory('Next Js')}>NextJs</button>
              <button className={selectedCategory === 'Database' ? 'active' : ''} onClick={() => setSelectedCategory('Database')}>Database</button>
              <button className={selectedCategory === 'Kubernetes' ? 'active' : ''} onClick={() => setSelectedCategory('Kubernetes')}>Kubernetes</button>
            </div>

            <div className="projects_cards">
              {loading ? (
                <div className="flex flex-center wh_50">
                  <Spinner />
                </div>
              ) : filteredProjects.length === 0 ? (
                <h1>No Project Found</h1>
              ) : (
                filteredProjects.slice(0, 4).map((pro) => (
                  <Link href="/" key={pro._id} className="procard">
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
      </section> */}

      {/* projects  */}
      <section className="recentblogs">
        <div className="container">
          <div className="myskills_title">
            <h2>Recent Projects</h2>
            <p>See my all Projects in section. click below !</p>
          </div>
          <div className="project_buttons">
            <button className={selectedCategory === 'All' ? 'active' : ''} onClick={() => setSelectedCategory('All')}>All</button>
            <button className={selectedCategory === 'Full Stack' ? 'active' : ''} onClick={() => setSelectedCategory('Full Stack')}>Full-Stack</button>
            <button className={selectedCategory === 'Next Js' ? 'active' : ''} onClick={() => setSelectedCategory('Next Js')}>NextJs</button>
            <button className={selectedCategory === 'Frontend' ? 'active' : ''} onClick={() => setSelectedCategory('Frontend')}>Frontend</button>
            <button className={selectedCategory === 'Backend' ? 'active' : ''} onClick={() => setSelectedCategory('Backend')}>Backend</button>
            {/* <button className={selectedCategory === 'Kubernetes' ? 'active' : ''} onClick={() => setSelectedCategory('Kubernetes')}>Kubernetes</button> */}
          </div>

          <div className="projects_cards">
            {loading ? (
              <div className="flex flex-center wh_50">
                <Spinner />
              </div>
            ) : filteredProjects.length === 0 ? (
              <h1>No Project Found</h1>
            ) : (
              filteredProjects.slice(0, 4).map((project) => (
                <Link href={`/projects/${project.slug}`} key={project._id} className="procard">
                  <div className="proimgbox">
                    <img src={project.images[0]} alt={project.title} />
                  </div>
                  <div className="procontentbox">
                    <h2>{project.title}</h2>
                    <GoArrowUpRight />
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>



      {/* <section>
      <h1>Skills</h1>
      <div className="skills-container">
        {skillData.length > 0 ? (
          skillData.map((skill, index) => (
            <div key={index} className="skill-card">
              <img
                src={skill.images[0]} 
                alt={`${skill.title} image`}
                className="skill-image"
              />
              <h2>{skill.title}</h2>
              <p>{skill.description}</p>
            </div>
          ))
        ) : (
          <p>Loading skills...</p> 
        )}
      </div>
    </section> */}

<section className="myskills">
  <div className="container">
    <div className="myskills_title">
      <h2>My Skills</h2>
      <p>Here are some of my technical skills.</p>
    </div>

    <div className="myskills_cards">
      {skillData.length > 0 ? (
        skillData.map((skill, index) => (
          <div key={index} className="mys_card">
            <div className="mys_inner">
              {/* Dynamically fetched image */}
              <img
                src={skill.images[0]} // Fetch the first image from the API
                alt={`${skill.title} image`}
                className="skill-image"
              />
              {/* Skill description */}
              <h3>{skill.description}</h3>
            </div>
            {/* Skill title */}
            <p className="text-center">{skill.title}</p>
          </div>
        ))
      ) : (
        <p>Loading skills...</p>
      )}
    </div>
  </div>
</section>


      {/* My Skills
      <section className="myskills">
        <div className="container">
          <div className="myskills_title">
            <h2>My Skills</h2>
            <p></p>

          </div>

          <div className="myskils_cards">
            <div className="mys_card">
              <div className="mys_inner">
                <img src="/img/react.png" alt="react" />
                <h3>80%</h3>
              </div>
              <p className="text-center">ReactJs</p>
            </div>
            </div>


           
          <span>

            <div className="myskils_cards">
              <div className="mys_card">
                <div className="mys_inner">
                  <img src="/img/express1.png" alt="express" />
                  <h3>78%</h3>
                </div>
                <p className="text-center">ExpressJs</p>
              </div>


              <div className="mys_card">
                <div className="mys_inner">
                  <img src="/img/nodejs.png" alt="node" />
                  <h3>95%</h3>
                </div>
                <p className="text-center">NodeJs</p>
              </div>

              <div className="mys_card">
                <div className="mys_inner">
                  <img src="/img/sql.png" alt="SQL" />
                  <h3>76%</h3>
                </div>
                <p className="text-center">SQL Database</p>
              </div>


              <div className="mys_card">
                <div className="mys_inner">
                  <img src="/img/post.png" alt="PostgreSQL" />
                  <h3>80%</h3>
                </div>
                <p className="text-center">PostgreSQL</p>
              </div>



            </div>
          </span>


          <span>

            <div className="myskils_cards">
              <div className="mys_card">
                <div className="mys_inner">
                  <img src="/img/types.png" alt="typescript" />
                  <h3>88%</h3>
                </div>
                <p className="text-center">TypescriptJs</p>
              </div>


              <div className="mys_card">
                <div className="mys_inner">
                  <img src="/img/next.png" alt="next" />
                  <h3>75%</h3>
                </div>
                <p className="text-center">NextJs</p>
              </div>

            </div>
          </span>


        </div>

      </section> */}

      <section className="recentblogs">
        <div className="container">
          <div className="myskills_title">
            <h2>Recent Blogs</h2>
            <p>Read my latest articles on web development and tech trends.</p>
          </div>

          <div className="recent_blogs">
            {Array.isArray(allwork) && allwork.length > 0 ? (
              allwork.slice(0, 3).map((blog) => (
                <Link href={`/blogs/${blog.slug}`} key={blog._id} className="re_blog">
                  <div className="re_blogimg">
                    <img src={blog.images[0] || '/img/noimage.png'} alt={blog.title} />
                    {/* <span>{blog.blogcategory[0]}</span>  */}
                  </div>

                  <div className="re_bloginfo">
                    <div className="re_topdate flex gap-1">
                      <div className="res_date">
                        <FaCalendarDays /> <span>{formDate(new Date(blog.createdAt))}</span>
                      </div>
                    </div>
                    <h2>{blog.title}</h2>
                  </div>
                </Link>
              ))
            ) : (
              <p>No blogs available.</p>
            )}
          </div>
        </div>
      </section>

    </>
  );
}



