import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const [isApplied, setIsApplied] = useState(false);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async (req, response) => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${APPLICATION_API_END_POINT}/apply/${jobId}`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            const data = await res.json();
            if (data.success) {
                setIsApplied(true); // Update the local state
                const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }
                dispatch(setSingleJob(updatedSingleJob)); // helps us to real time UI update
                toast.success(data.message);

            }
        } catch (error) {
            console.log(error);
            toast.error(error);
        }
    }

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const token = localStorage.getItem("token");
                if (token) {
                    const res = await fetch(`${JOB_API_END_POINT}/getJobById/${jobId}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        }
                    });

                    const data = await res.json();

                    if (data.success) {
                        dispatch(setSingleJob(data.job));
                        setIsApplied(data.isApplied);
                    }
                    console.log(isApplied);
                } else {
                    const res = await fetch(`${JOB_API_END_POINT}/getJobByIdNotLOgged/${jobId}`, {
                        method: "GET",
                    });

                    const data = await res.json();

                    if (data.success) {
                        dispatch(setSingleJob(data.job));
                        setIsApplied(true);
                    }
                }

            } catch (error) {
                console.log(error);
            }
        };

        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    return (
        <div className="job-details-container">

            {/* HEADER */}
            <div className="job-header">
                <div>
                    <h1 className="job-title">{singleJob?.title}</h1>

                    <div className="job-badges">
                        <span className="job-badge badge-blue">
                            {singleJob?.position} Positions
                        </span>
                        <span className="job-badge badge-orange">
                            {singleJob?.jobType}
                        </span>
                        <span className="job-badge badge-purple">
                            {singleJob?.salary / 100000} LPA
                        </span>
                    </div>
                </div>

                <button
                    onClick={isApplied ? null : applyJobHandler}
                    disabled={isApplied}
                    className={`apply-btn ${isApplied ? "disabled" : "active"}`}
                >
                    {isApplied ? "Applied" : "Apply Now"}
                </button>
            </div>

            {/* DESCRIPTION */}
            <div className="job-description-box">
                <h2 className="section-title">Job Description</h2>

                <div className="job-info-grid">

                    <div className="job-item">
                        <span>Role</span>
                        <p>{singleJob?.title}</p>
                    </div>

                    <div className="job-item">
                        <span>Location</span>
                        <p>{singleJob?.location}</p>
                    </div>

                    <div className="job-item full">
                        <span>Description</span>
                        <p>{singleJob?.description}</p>
                    </div>

                    <div className="job-item">
                        <span>Experience</span>
                        <p>{singleJob?.experience} yrs</p>
                    </div>

                    <div className="job-item">
                        <span>Salary</span>
                        <p>{singleJob?.salary} Per Annum</p>
                    </div>

                    <div className="job-item">
                        <span>Applicants</span>
                        <p>{singleJob?.applications?.length}</p>
                    </div>

                    <div className="job-item">
                        <span>Posted</span>
                        <p>{singleJob?.createdAt.split("T")[0]}</p>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default JobDescription