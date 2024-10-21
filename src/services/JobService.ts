import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

const getAllJobs = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/jobs`);
        return response.data;
    } catch (error) {
        console.error("Error fetching jobs", error);
        return [];
    }
};

export default {
    getAllJobs
};
