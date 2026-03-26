import { setAllJobs } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const { searchedQuery } = useSelector(store => store.job);
    useEffect(() => {
        const fetchAllJobs = async () => {
            try {

                const res = await fetch(
                    `${JOB_API_END_POINT}/getAllJobs?keyword=${searchedQuery || ""}`,
                    {
                        method: "GET",
                    }
                );

                const data = await res.json();

                if (!res.ok) {
                    throw new Error("Failed to fetch jobs");
                }

                if (data.success) {
                    dispatch(setAllJobs(data.jobs));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllJobs();
    }, [])
}

export default useGetAllJobs