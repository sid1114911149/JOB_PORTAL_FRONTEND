import { setAllAdminJobs } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllAdminJobs = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAllAdminJobs = async () => {
            try {
                const res = await fetch(`${JOB_API_END_POINT}/getAllJobs`, {
                    method: "GET",
                });

                if (!res.ok) {
                    throw new Error("Failed to fetch jobs");
                }

                const data = await res.json();

                if (data.success) {
                    dispatch(setAllAdminJobs(data.jobs));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllAdminJobs();
    }, [])
}

export default useGetAllAdminJobs