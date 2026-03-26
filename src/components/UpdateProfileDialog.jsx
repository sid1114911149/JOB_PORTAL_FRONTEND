import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const UpdateProfileDialog = () => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);

    const [input, setInput] = useState({
        fullName: user?.fullName || "",
        email: user?.email || "",
        phoneNo: user?.phoneNo || 0,
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.join(", ") || "",
        file: ""
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullName", input.fullName);
        formData.append("email", input.email);
        formData.append("phoneNo", input.phoneNo);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const token = localStorage.getItem("token");

            const res = await fetch(`${USER_API_END_POINT}/update`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });
            const data=await res.json();
            if (data.success) {
                dispatch(setUser(data.user));
                navigate('/');
                toast.success(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Details Are not Updated');
        } finally {
            setLoading(false);
        }
        console.log(input);
    }



    return (
        <div>
            <Dialog >
                <div className="dialog-overlay">

                    <div className="dialog-box" onClick={(e) => e.stopPropagation()}>

                        <h2 className="dialog-title">Update Profile</h2>

                        <form onSubmit={submitHandler}>
                            <div className="form-grid">

                                <div className="form-row">
                                    <label className="form-label">Name</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={input.fullName}
                                        onChange={changeEventHandler}
                                        className="form-input"
                                        placeholder='Enter New Name'
                                    />
                                </div>

                                <div className="form-row">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={input.email}
                                        onChange={changeEventHandler}
                                        className="form-input"
                                    />
                                </div>

                                <div className="form-row">
                                    <label className="form-label">Number</label>
                                    <input
                                        type="text"
                                        name="number"
                                        value={input.phoneNo}
                                        onChange={changeEventHandler}
                                        className="form-input"
                                    />
                                </div>

                                <div className="form-row">
                                    <label className="form-label">Bio</label>
                                    <input
                                        type="text"
                                        name="bio"
                                        value={input.bio}
                                        onChange={changeEventHandler}
                                        className="form-input"
                                        placeholder='Enter New Bio'
                                    />
                                </div>

                                <div className="form-row">
                                    <label className="form-label">Skills</label>
                                    <input
                                        type="text"
                                        name="skills"
                                        value={input.skills}
                                        onChange={changeEventHandler}
                                        className="form-input"
                                        placeholder='Enter New Skills(,)'
                                    />
                                </div>

                                <div className="form-row">
                                    <label className="form-label">Resume</label>
                                    <input
                                        type="file"
                                        name="file"
                                        accept="application/pdf"
                                        onChange={fileChangeHandler}
                                        className="form-input"
                                        placeholder='Enter New Resume'
                                    />
                                </div>

                            </div>

                            <div className="dialog-footer">
                                {loading ? (
                                    <button className="submit-btn" disabled>
                                        Please wait...
                                    </button>
                                ) : (
                                    <div>
                                        <button
                                            type="button"
                                            className="cancel-btn"
                                            onClick={() => navigate('/')}
                                        >
                                            Cancel
                                        </button>

                                        <button type="submit" className="submit-btn">
                                            Update
                                        </button>
                                    </div>
                                )}
                            </div>

                        </form>
                    </div>
                </div>
            </Dialog>
        </div>
    )
}

export default UpdateProfileDialog