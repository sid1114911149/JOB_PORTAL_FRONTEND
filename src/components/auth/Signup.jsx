import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
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
        file: ""
    });
    const { loading, user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();    //formdata object
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await fetch(`${USER_API_END_POINT}/register`, {
                method: "POST",
                body: formData,
            });

            const data = await res.json(); // ✅ must convert

            if (data.success) {
                navigate("/login");
                toast.success(data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
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
                            placeholder="patel"
                        />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="patel@gmail.com"
                        />
                    </div>

                    <div className="form-group">
                        <label>Phone Number</label>
                        <input
                            type="text"
                            value={input.phoneNumber}
                            name="phoneNumber"
                            onChange={changeEventHandler}
                            placeholder="8080808080"
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="patel@gmail.com"
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
                                    className="cursor-pointer"
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
                                    className="cursor-pointer"
                                />
                                <label>Recruiter</label>
                            </div>
                        </RadioGroup>

                        <div className="profile-upload">
                            <label>Profile</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={changeFileHandler}
                                className="cursor-pointer"
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

export default Signup