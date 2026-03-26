import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'

const Companies = () => {
    useGetAllCompanies();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchCompanyByText(input));
    }, [input]);
    return (
        <div>
            <div className="container">
                <div className="top-bar">
                    <Input
                        className="input"
                        placeholder="Filter by name"
                        onChange={(e) => setInput(e.target.value)}
                    />

                    <Button
                        className="admin-btn"
                        onClick={() => navigate("/admin/companies/create")}
                    >
                        New Company
                    </Button>
                </div>

                <CompaniesTable />
            </div>
        </div>
    )
}

export default Companies