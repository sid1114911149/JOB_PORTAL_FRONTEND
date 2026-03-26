import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

// const skills = ["Html", "Css", "Javascript", "Reactjs"]
const isResume = true;

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);

    return (
        <div>
            <div className="profile-container">
                <div className="profile-header">

                    <div className="profile-left">
                        <div className="profile-avatar">
                            <img src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg" alt="profile" />
                        </div>

                        <div>
                            <h1 className="profile-name">{user?.fullName}</h1>
                            <p className="profile-bio">{user?.profile?.bio}</p>
                        </div>
                    </div>

                    <button onClick={() => setOpen(true)} className="edit-btn">
                        <Pen />
                    </button>
                </div>

                <div className="profile-info">
                    <div className="profile-row">
                        <Mail />
                        <span>{user?.email}</span>
                    </div>

                    <div className="profile-row">
                        <Contact />
                        <span>{user?.phoneNo}</span>
                    </div>
                </div>

                <div className="skills-section">
                    <h1>Skills</h1>

                    <div className="skills-list">
                        {user?.profile?.skills.length !== 0 ? (
                            user?.profile?.skills.map((item, index) => (
                                <span key={index} className="skill-badge">{item}</span>
                            ))
                        ) : (
                            <span>NA</span>
                        )}
                    </div>
                </div>

                <div className="resume-section">
                    <h1>Resume</h1>

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
            </div>

            <div className="applied-container">
                <h1 className="applied-title">Applied Jobs</h1>
                <AppliedJobTable />
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile