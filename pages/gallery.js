import Spinner from "@/components/Spinner";
import useFetchData from "@/hooks/useFetchData";
import useFetchProfileData from "@/hooks/useFetchProfileData";
import Head from "next/head";
import Link from "next/link";

export default function Gallery() {
    const { alldata, loading, error } = useFetchData('/api/photos');
    const { profileData, loadings } = useFetchProfileData() || { profileData: null, loadings: true };
    if (error) {
        return <div>Error fetching data: {error.message}</div>; // Error handling
    }

    // console.log(alldata); // Check the fetched data

    return (
        <>
            <Head>
                <title>Manish's Gallery</title>
            </Head>

            <div className="gallerypage">
                <div className="container">
                    <div className="gallerytopsec">
                        <div className="topphonesec">
                            <div className="lefttitlesec">
                                <h4>My Beautifully</h4>
                                <h1>Captured <br />Memories</h1>
                                <Link href='/gallery#galleryimages'>
                                    <button>VIEW MORE</button>
                                </Link>
                            </div>
                            <div className="rightimgsec">

                                <img src="/img/morpankh.png" alt="Morpankh" />

                                <div className="r_imge_top">
                                    <img src="/img/krishna.png" alt="krishna" />
                                    <img src="/img/shreeram.png" alt="shree-ram" />

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="gallerybtmphotos" id="galleryimages">
                    <div className="container">
                        <div className="gbtmtitles text-center">
                            <h3><span>My </span>Gallery</h3>
                            <h2>Beautiful Memories <span>Captured by </span><br />Manish</h2>
                        </div>
                        <div className="gallery_image_grid">
                            {loading ? <Spinner /> : (
                                alldata.map((photo) => (
                                    <div className="image-item" key={photo._id}>
                                        <img src={photo.images[0]} alt={photo.title} />
                                        <div className="galeryimgiteminfo">
                                            <h2>{photo.title}</h2>
                                              <div className="adminslug">
                                        {loadings ? (
                                            <img src="/img/loading-spinner.gif" alt="Loading..." />
                                        ) : profileData && profileData.images ? (
                                            <img src={profileData.images} alt="Profile" />
                                        ) : (
                                            <p>Image not available</p>
                                        )}
                                        <span>By Manish</span>
                                    </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}






