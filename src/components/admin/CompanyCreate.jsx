import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '@/redux/companySlice';

const CompanyCreate = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [input, setInput] = useState({
        name: '',
        description: '',
        website: '',
        location: '',
    });

    const [file, setFile] = useState(null);

    const changeHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const fileHandler = (e) => {
        setFile(e.target.files[0]);
    };

    const registerNewCompany = async () => {
        try {
            const token = localStorage.getItem("token");

            const formData = new FormData();
            formData.append("name", input.name);
            formData.append("description", input.description);
            formData.append("website", input.website);
            formData.append("location", input.location);

            if (file) {
                formData.append("file", file); // 👈 must match multer field name
            }

            const res = await fetch(`${COMPANY_API_END_POINT}/register`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData,
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Failed to register company");
            }

            if (data.success) {
                dispatch(setSingleCompany(data.company));
                toast.success(data.message);

                const companyId = data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    return (
        <div>

            <div className="form-container">
                <div className="form-header">
                    <h1 className="form-title">🏢 Create Company</h1>
                    <p className="form-subtitle">
                        Enter your company details below
                    </p>
                </div>

                {/* NAME */}
                <Label>Company Name</Label>
                <Input
                    type="text"
                    name="name"
                    className="form-input"
                    placeholder="Microsoft, Google..."
                    value={input.name}
                    onChange={changeHandler}
                />

                {/* DESCRIPTION */}
                <Label>Description</Label>
                <Input
                    type="text"
                    name="description"
                    className="form-input"
                    placeholder="Enter company description"
                    value={input.description}
                    onChange={changeHandler}
                />

                {/* WEBSITE */}
                <Label>Website</Label>
                <Input
                    type="text"
                    name="website"
                    className="form-input"
                    placeholder="https://company.com"
                    value={input.website}
                    onChange={changeHandler}
                />

                {/* LOCATION */}
                <Label>Location</Label>
                <Input
                    type="text"
                    name="location"
                    className="form-input"
                    placeholder="India, USA..."
                    value={input.location}
                    onChange={changeHandler}
                />

                {/* LOGO UPLOAD */}
                <Label>Company Logo</Label>
                <Input
                    type="file"
                    accept="image/*"
                    className="form-input"
                    onChange={fileHandler}
                />

                {/* BUTTONS */}
                <div className="form-actions">
                    <Button
                        className="btn btn-outline"
                        onClick={() => navigate("/admin/companies")}
                    >
                        Cancel
                    </Button>

                    <Button
                        className="btn btn-primary"
                        onClick={registerNewCompany}
                    >
                        Continue
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CompanyCreate;