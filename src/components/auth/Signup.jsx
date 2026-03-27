import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Signup = () => {

    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        profilePhoto: null,   // ✅ separate
        resume: null          // ✅ new
    });

    const { loading, user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    // ✅ handle profile photo
    const changeProfileHandler = (e) => {
        setInput({ ...input, profilePhoto: e.target.files?.[0] });
    }

    // ✅ handle resume
    const changeResumeHandler = (e) => {
        setInput({ ...input, resume: e.target.files?.[0] });
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("fullName", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNo", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);

        // ✅ append files correctly
        if (input.profilePhoto) {
            formData.append("profilePhoto", input.profilePhoto);
        }

        if (input.resume) {
            formData.append("resume", input.resume);
        }

        try {
            dispatch(setLoading(true));

            const res = await fetch(`${USER_API_END_POINT}/register`, {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (data.success) {
                navigate("/login");
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [])

    return (
        <div>
            <div className="auth-container">
                <form onSubmit={submitHandler} className="auth-form">

                    <h1 className="auth-title">Sign Up</h1>

                    <div className="form-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            value={input.fullname}
                            name="fullname"
                            onChange={changeEventHandler}
                        />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                        />
                    </div>

                    <div className="form-group">
                        <label>Phone Number</label>
                        <input
                            type="text"
                            value={input.phoneNumber}
                            name="phoneNumber"
                            onChange={changeEventHandler}
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                        />
                    </div>

                    <div className="form-row">

                        <RadioGroup className="radio-group">
                            <div className="radio-item">
                                <input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === "student"}
                                    onChange={changeEventHandler}
                                />
                                <label>Student</label>
                            </div>

                            <div className="radio-item">
                                <input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === "recruiter"}
                                    onChange={changeEventHandler}
                                />
                                <label>Recruiter</label>
                            </div>
                        </RadioGroup>

                        {/* ✅ Profile Photo */}
                        <div className="profile-upload">
                            <label>Profile Photo-</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={changeProfileHandler}
                            />
                        </div>

                        {/* ✅ Resume Upload */}
                        <div className="profile-upload">
                            <label>Resume(PDF)-</label>
                            <input
                                type="file"
                                accept="application/pdf"
                                onChange={changeResumeHandler}
                            />
                        </div>

                    </div>

                    {
                        loading ? (
                            <button className="btn-loading" disabled>
                                <Loader2 className="loader-icon animate-spin" />
                                Please wait
                            </button>
                        ) : (
                            <button type="submit" className="btn btn-primary full-width">
                                Signup
                            </button>
                        )
                    }

                    <span className="text-small">
                        Already have an account?{" "}
                        <Link to="/login" className="link">
                            Login
                        </Link>
                    </span>

                </form>
            </div>
        </div>
    )
}

export default Signup;