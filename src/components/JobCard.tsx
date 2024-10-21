interface JobCardProps {
    job: {
        id: string;
        name: string;
        experience: string;
    };
}

const JobCard = ({ job }: JobCardProps) => (
    <div className="job-card">
        <h2>{job.name}</h2>
        <p>{job.experience}</p>
    </div>
);

export default JobCard;