// src/hooks/useFetchProfileData.js

// import { useState, useEffect } from 'react';

// const useFetchProfileData = () => {
//     const [profileData, setProfileData] = useState(null);

//     useEffect(() => {
//         const fetchProfileData = async () => {
//             try {
//                 console.log("Fetching profile data from API...");
//                 const response = await fetch('/api/prof');
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 const data = await response.json();
//                 console.log("Fetched profile data:", data);
//                 setProfileData(data);
//             } catch (error) {
//                 console.error('Error fetching profile data:', error);
//             }
//         };

//         fetchProfileData();
//     }, []);

//     return profileData;
// };

// export default useFetchProfileData;
import { useState, useEffect } from 'react';

const useFetchProfileData = () => {
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                console.log("Fetching profile data from API...");
                const response = await fetch('/api/prof');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log("Fetched profile data:", data);
                setProfileData(data); // Set the fetched profile data
            } catch (error) {
                console.error('Error fetching profile data:', error);
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchProfileData();
    }, []);

    return { profileData, loading }; // Return both profileData and loading state
};

export default useFetchProfileData;
