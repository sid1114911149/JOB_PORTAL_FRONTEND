import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const { loading, user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await fetch(`${USER_API_END_POINT}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(input),   
            });
            const data = await res.json();
            if (data.success) {
                if (data?.token) {
                    localStorage.setItem("token", data.token);
                }
                localStorage.setItem("user",data.user);
                dispatch(setUser(data.user));
                navigate("/");
                toast.success(data.message);
            }else{
                toast.error(data.message);
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

                    <h1 className="auth-title">Login</h1>

                    <div className="form-group">
                        <label>Email</label>
                        <br></br>
                        <input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="reddy@gmail.com"
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <br></br>
                        <input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="reddy@gmail.com"
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
                    </div>

                    {
                        loading ? (
                            <button className="btn-loading" disabled>
                                <Loader2 className="loader-icon animate-spin" />
                                Please wait
                            </button>
                        ) : (
                            <button type="submit" className="btn btn-primary full-width">
                                Login
                            </button>

                        )
                    }

                    <span className="text-small">
                        <br></br>
                        Don't have an account?{" "}
                        <Link to="/signup" className="link">
                            Signup
                        </Link>
                    </span>

                </form>
            </div>
        </div>
    )
}

export default Login