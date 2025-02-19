import { useState, useEffect } from 'react';

const useFetchSocialLinks = () => {
    const [socialLinks, setSocialLinks] = useState(null); // State to store fetched data
    const [loading, setLoading] = useState(true); // State for loading indicator
    const [error, setError] = useState(null); // State for error handling

    useEffect(() => {
        const fetchSocialLinks = async () => {
            try {
                console.log("Fetching social links data from API...");
                const response = await fetch('/api/SocialLink'); // Fetch from your API endpoint
                if (!response.ok) {
                    throw new Error('Failed to fetch social links');
                }
                const data = await response.json();
                console.log("Fetched social links data:", data);
                setSocialLinks(data.data); // Set fetched data to state
            } catch (err) {
                console.error("Error fetching social links:", err);
                setError(err.message); // Set error message
            } finally {
                setLoading(false); // Set loading to false
            }
        };

        fetchSocialLinks();
    }, []); // Empty dependency array to fetch data only once

    return { socialLinks, loading, error }; // Return data, loading, and error states
};

export default useFetchSocialLinks;
