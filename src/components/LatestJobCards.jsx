import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();
    return (
        <div
            onClick={() => navigate(`/description/${job._id}`)}
            className="simple-job-card"
        >
            <div>
                <h1 className="simple-company-name">
                    {job?.company?.name}
                </h1>
                <p className="simple-location">India</p>
            </div>

            <div>
                <h1 className="simple-job-title">
                    {job?.title}
                </h1>
                <p className="simple-job-desc">
                    {job?.description}
                </p>
            </div>

            <div className="simple-badges">
                <span className="simple-badge badge-blue">
                    {job?.position} Positions
                </span>
                <span className="simple-badge badge-orange">
                    {job?.jobType}
                </span>
                <span className="simple-badge badge-purple">
                    {job?.salary} LPA
                </span>
            </div>
        </div>
    )
}

export default LatestJobCards