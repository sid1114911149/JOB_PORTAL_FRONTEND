import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplicants } from '@/redux/applicationSlice'

const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { applicants } = useSelector(store => store.application);

    useEffect(() => {
        const fetchAllApplicants = async () => {
            const token = localStorage.getItem("token");
            try {
                const res = await fetch(
                    `${APPLICATION_API_END_POINT}/getApplicants/${params.id}`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`, 
                        },
                    }
                );

                const data = await res.json();

                dispatch(setAllApplicants(data.applicants));

            } catch (error) {
                console.error("Error fetching applicants:", error);
            }
        };

        if (params.id) {
            fetchAllApplicants();
        }

    }, [params.id, dispatch]);

    return (
        <div>
            <div className="container">
                <h1 className="heading">
                    Applicants ({applicants?.applications?.length || 0})
                </h1>

                <ApplicantsTable applications={applicants?.applications} />
            </div>
        </div>
    )
}

export default Applicants;