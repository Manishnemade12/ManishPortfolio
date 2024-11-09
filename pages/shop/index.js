import Spinner from "@/components/Spinner";
import useFetchData from "@/hooks/useFetchData";
import Head from "next/head";
import Link from "next/link";

export default function shop() {

    const { alldata, loading } = useFetchData('/api/shops');

    const publishdata = alldata.filter(ab => ab.status === 'publish');

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

    return <>

        <Head>
            <title>Shop</title>
        </Head>
        <div className="shoppage">
            <div className="shoppagetoptitle">
                <div className="container">
                    <h3>SHOP ONLINE</h3>
                    <h2>OUR PRODUCTS</h2>
                </div>
            </div>
            <div className="shopproducts">
                <div className="container">
                    <div className="shopprocards">
                        {loading ? <Spinner /> : <>
                            {publishdata.map((pro) => (
                                <Link href={`/shop/${pro.slug}`} key={pro._id} className="spprocard">
                                    <div className="spprocardimg">
                                        {/* spprocardimg for css */}
                                        <img src={pro.images[0]} alt={pro.name} />

                                    </div>
                                    <div className="spprocinfo">
                                        <h2>{pro.title}</h2>
                                        <h3>{pro.price}</h3>
                                        {pro.tags.map((tag) => {
                                            return <span key={tag}>{tag}</span>
                                        })}
                                        {console.log(alldata)}
                                    </div>
                                    <p>{formDate(createdAtDate)}</p>

                                </Link>
                            ))}
                        </>
                        }
                    </div>

                </div>
            </div>
        </div>
    </>
}
