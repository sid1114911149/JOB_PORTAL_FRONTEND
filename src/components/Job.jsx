import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({ job }) => {
    const navigate = useNavigate();
    // const jobId = "lsekdhjgdsnfvsdkjf";

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    }

    return (
        <div className="job-card">
            <div className="job-header">
                <p className="job-date">
                    {daysAgoFunction(job?.createdAt) === 0
                        ? "Today"
                        : `${daysAgoFunction(job?.createdAt)} days ago`}
                </p>
                <Button variant="outline" className="job-btn">
                    <Bookmark />
                </Button>
            </div>

            <div className="job-company">
                <img src={job?.company?.logo} alt="logo" />
                <div>
                    <h1 className="job-company-name">{job?.company?.name}</h1>
                    <p className="job-location">India</p>
                </div>
            </div>

            <div>
                <h1 className="job-title">{job?.title}</h1>
                <p className="job-desc">{job?.description}</p>
            </div>

            <div className="job-badges">
                <span className="job-badge" style={{ color: "#2563eb" }}>
                    {job?.position} Positions
                </span>
                <span className="job-badge" style={{ color: "#F83002" }}>
                    {job?.jobType}
                </span>
                <span className="job-badge" style={{ color: "#7209b7" }}>
                    {job?.salary}LPA
                </span>
            </div>

            <div className="job-actions">
                <Button
                    onClick={() => navigate(`/description/${job?._id}`)}
                    className="job-btn"
                >
                    Details
                </Button>

                <Button className="job-btn job-btn-primary">
                    Save For Later
                </Button>
            </div>
        </div>
    )
}

export default Job