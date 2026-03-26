import { setCompanies } from '@/redux/companySlice'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllCompanies = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await fetch(`${COMPANY_API_END_POINT}/getAll`, {
                    method: "GET",
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                });
                const data = await res.json();
                console.log("called");

                if (!res.ok) {
                    throw new Error("Failed to fetch companies");
                }


                if (data.success) {
                    dispatch(setCompanies(data.companies));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchCompanies();
    }, [])
}

export default useGetAllCompanies