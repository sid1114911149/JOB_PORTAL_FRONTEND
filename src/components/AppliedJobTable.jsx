import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '../hooks/useGetAppliedJobs'
const AppliedJobTable = () => {
    useGetAppliedJobs();
    const { allAppliedJobs } = useSelector(store => store.job);
    return (
        <div>
            <Table>
                <TableCaption>A list of your applied jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {!allAppliedJobs || allAppliedJobs.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center">
                                You haven't applied any job yet.
                            </TableCell>
                        </TableRow>
                    ) : (
                        allAppliedJobs.map((appliedJob) => (
                            <TableRow key={appliedJob._id}>
                                <TableCell>
                                    {appliedJob?.createdAt?.split("T")[0]}
                                </TableCell>
                                <TableCell>{appliedJob.job?.position}</TableCell>
                                <TableCell>{appliedJob.job?.company?.name}</TableCell>
                                <TableCell >{appliedJob.status}</TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedJobTable