import React, { useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useSelector } from 'react-redux'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '../ui/select'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experienceLevel: "",
        position: "",
        companyName: ""   // ✅ IMPORTANT
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { companies } = useSelector(store => store.company);

    // HANDLE INPUT CHANGE
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    // SUBMIT
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);

            const token = localStorage.getItem("token");

            const res = await fetch(`${JOB_API_END_POINT}/postJob`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(input)
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Failed to post job");
            }

            if (data.success) {
                toast.success(data.message);
                navigate("/admin/jobs");
            }

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="job-container">
            <form onSubmit={submitHandler} className="job-form">

                <div className="form-grid">

                    <div className="form-group">
                        <Label>Title</Label>
                        <Input name="title" value={input.title} onChange={changeEventHandler} />
                    </div>

                    <div className="form-group">
                        <Label>Description</Label>
                        <Input name="description" value={input.description} onChange={changeEventHandler} />
                    </div>

                    <div className="form-group">
                        <Label>Requirements</Label>
                        <Input name="requirements" value={input.requirements} onChange={changeEventHandler} />
                    </div>

                    <div className="form-group">
                        <Label>Salary</Label>
                        <Input name="salary" value={input.salary} onChange={changeEventHandler} />
                    </div>

                    <div className="form-group">
                        <Label>Location</Label>
                        <Input name="location" value={input.location} onChange={changeEventHandler} />
                    </div>

                    <div className="form-group">
                        <Label>Job Type</Label>
                        <Input name="jobType" value={input.jobType} onChange={changeEventHandler} />
                    </div>

                    <div className="form-group">
                        <Label>Position</Label>
                        <Input name="position" value={input.position} onChange={changeEventHandler} />
                    </div>

                    <div className="form-group">
                        <Label>Experience Level</Label>
                        <Input
                            type="number"
                            name="experienceLevel"
                            value={input.experienceLevel}
                            onChange={changeEventHandler}
                        />
                    </div>

                    {/* ✅ COMPANY SELECT */}
                    {
                        companies && companies.length > 0 && (
                            <div className="form-group full-width">
                                <Label>Company</Label>
                                <select
                                    name="companyName"
                                    value={input.companyName}
                                    onChange={changeEventHandler}
                                    className="custom-select"
                                >
                                    <option value="">-- Select Company --</option>

                                    {companies && companies.map((company) => (
                                        <option key={company._id} value={company.name}>
                                            {company.name}
                                        </option>
                                    ))}
                                </select>
                            </div>


                        )
                    }

                </div>

                {/* BUTTON */}
                {
                    loading ? (
                        <button className="btn-loading" disabled>
                            <Loader2 className="loader-icon animate-spin" />
                            Please wait
                        </button>
                    ) : (
                        <button type="submit" className="btn-submit">
                            Post New Job
                        </button>
                    )
                }

                {/* WARNING */}
                {
                    companies && companies.length === 0 && (
                        <p className="warning-text">
                            *Please register a company first
                        </p>
                    )
                }

            </form>
        </div>
    );
};

export default PostJob;