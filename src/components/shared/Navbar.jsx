import React, { useState, useRef, useEffect } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT ,BASE_API_END_POINT} from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import AppliedJobTable from '../AppliedJobTable'
import UpdateProfileDialog from '../UpdateProfileDialog'

const isResume = true;

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showProfile, setShowProfile] = useState(false);
    const [showAppleiedJobs, setShowAppledJobs] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [open, setOpen] = useState(false);

    // ✅ NEW: wrapper ref (covers avatar + popover)
    const profileRef = useRef(null);

    // ✅ NEW: click outside logic
    useEffect(() => {
        const handleClickOutside = (event) => {
            // ✅ allow clicks inside popover content
            const popover = document.querySelector(".popover-content");

            if (
                profileRef.current &&
                !profileRef.current.contains(event.target) &&
                !(popover && popover.contains(event.target))
            ) {
                setShowProfile(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const logoutHandler = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${USER_API_END_POINT}/logout`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            const data = await res.json();
            if (data.success) {
                dispatch(setUser(null));
                localStorage.clear();
                navigate("/");
                toast.success(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    return (
        <div className="navbar">
            <div className="navbar-container">

                {/* LEFT - NAV LINKS */}
                <ul className="nav-links">
                    {
                        user && user.role === "recruiter" ? (
                            <>
                                <li><Link to="/admin/companies">Companies</Link></li>
                                <li><Link to="/admin/jobs">Jobs</Link></li>
                            </>
                        ) : (
                            <>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/jobs">Jobs</Link></li>
                                <li><Link to="/browse">Browse</Link></li>
                                {user && <li><Link to="/AppliedJobs">Applied Jobs</Link></li>}
                            </>
                        )
                    }
                </ul>

                {/* CENTER - LOGO */}
                <div className="logo-wrapper">
                    <img src='../logo_image.jpg' alt='JOB Portal' />
                </div>

                {/* RIGHT - AUTH / USER */}
                <div className="nav-right">

                    {
                        !user ? (
                            <div className="auth-buttons">
                                <Link to="/login">
                                    <button className="btn btn-outline">Login</button>
                                </Link>
                                <Link to="/signup">
                                    <button className="btn btn-primary">Signup</button>
                                </Link>
                            </div>
                        ) : (
                            <div ref={profileRef}>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Avatar
                                            className="navbar-avatar"
                                            onClick={(e) => {
                                                e.stopPropagation(); // ✅ prevent instant close
                                                setShowProfile(!showProfile);
                                            }}
                                        >
                                            <AvatarImage
                                                src={
                                                    user?.profile?.profilePhoto
                                                        ? `${BASE_API_END_POINT}${user.profile.profilePhoto}`
                                                        : "/user_icon.jpg"
                                                }
                                            />
                                        </Avatar>
                                    </PopoverTrigger>

                                    <PopoverContent className="popover-content" align="end">
                                        <div className="popover-container">

                                            {showProfile && (
                                                <div className="profile-panel">

                                                    <div className="user-info">
                                                        {/* <Avatar className="panel-avatar">
                                                            <AvatarImage
                                                                src={
                                                                    user?.profile?.profilePhoto
                                                                        ? user.profile.profilePhoto
                                                                        : "/user_icon.avif"
                                                                }
                                                            />
                                                        </Avatar> */}

                                                        <div className='user-Details'>
                                                            <h3>Hi! {user?.fullName}</h3>
                                                            <p>{user?.profile?.bio}</p>
                                                        </div>
                                                    </div>

                                                    <div className="menu">
                                                        {user?.email && <p>📧 {user.email}</p>}
                                                        {user?.phoneNo && <p>📱 {user.phoneNo}</p>}
                                                        {user?.role && <p>🎓 {user.role}</p>}

                                                        {user?.profile?.skills?.length > 0 && (
                                                            <p>💡 {user.profile.skills.join(", ")}</p>
                                                        )}
                                                    </div>

                                                    <div className="menu-item resume" >
                                                        <h3>Resume</h3>

                                                        {isResume ? (
                                                            <a
                                                                target="blank"
                                                                href={user?.profile?.resume}
                                                                className="resume-link"
                                                            >
                                                                {user?.profile?.resumeOriginalName}
                                                            </a>
                                                        ) : (
                                                            <span>NA</span>
                                                        )}
                                                    </div>

                                                    <div
                                                        className="menu-item applied"
                                                        onClick={() => navigate("/AppliedJobs")}
                                                    >
                                                        <h3>Applied Jobs</h3>
                                                    </div>

                                                    <div
                                                        className="menu-item update"
                                                        onClick={() => navigate("/profile/update")}
                                                    >
                                                        <h3>Edit Profile</h3>
                                                    </div>

                                                    <button className="logout-btn" onClick={logoutHandler}>
                                                        Logout
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </div>
                        )
                    }

                </div>
            </div>
        </div>
    )
}

export default Navbar;