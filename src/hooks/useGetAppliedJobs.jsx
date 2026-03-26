import { setAllAppliedJobs } from "@/redux/jobSlice";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

const useGetAppliedJobs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await fetch(`${APPLICATION_API_END_POINT}/getAppliedJobs`, {
                    method: "GET",
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                });
                const data = await res.json();

                if (data.success) {
                    dispatch(setAllAppliedJobs(data.applications));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAppliedJobs();
    }, [])
};
export default useGetAppliedJobs;