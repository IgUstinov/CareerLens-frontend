import { useEffect, useState } from 'react';
import JobList from '../components/JobList';
import JobService from '../services/JobService';

export default function Home() {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        JobService.getAllJobs().then(data => setJobs(data));
    }, []);

    return (
        <div>
            <h1>Welcome to CareerLens</h1>
            <JobList jobs={jobs} />
        </div>
    );
}
