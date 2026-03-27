import React from 'react'
import {
  Table, TableBody, TableCaption,
  TableCell, TableHead, TableHeader, TableRow
} from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { MoreHorizontal } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'sonner'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { setAllApplicants } from '@/redux/applicationSlice'

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector(store => store.application);
  const dispatch = useDispatch();

  const statusHandler = async (status, id) => {
    try {
      const token = localStorage.getItem("token");
      
      const res = await fetch(
        `${APPLICATION_API_END_POINT}/update/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json", 
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status:status })
        }
      );
      const data=await res.json();
      if (data.success) {
        toast.success(data.message);

        // 🔥 Update UI instantly (no reload)
        const updatedApplications = applicants.applications.map(app =>
          app._id === id ? { ...app, status } : app
        );

        dispatch(setAllApplicants({
          ...applicants,
          applications: updatedApplications
        }));
      }

    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div>
      <Table>
        <TableCaption>A list of recent applicants</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {
            applicants?.applications?.length > 0 ? (
              applicants.applications.map((item) => (
                <TableRow key={item._id} className="table-body-row">
                  <TableCell className="table-cell">
                    {item?.applicant?.fullName}
                  </TableCell>

                  <TableCell className="table-cell">
                    {item?.applicant?.email}
                  </TableCell>

                  <TableCell className="table-cell">
                    {item?.applicant?.phoneNo}
                  </TableCell>

                  <TableCell className="table-cell">
                    {
                      item?.applicant?.profile?.resume ? (
                        <a
                          className="resume-link"
                          href={item.applicant.profile.resume}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.applicant.profile.resumeOriginalName}
                        </a>
                      ) : (
                        <span>NA</span>
                      )
                    }
                  </TableCell>

                  <TableCell className="table-cell">
                    {item?.createdAt?.split("T")[0]}
                  </TableCell>

                  <TableCell className="table-cell">
                    <span
                      className={`status ${item?.status === "accepted"
                        ? "accepted"
                        : item?.status === "rejected"
                          ? "rejected"
                          : "pending"
                        }`}
                    >
                      {item?.status || "Pending"}
                    </span>
                  </TableCell>

                  <TableCell className="action-cell">
                    <Popover>
                      <PopoverTrigger>
                        <MoreHorizontal className="cursor-pointer" />
                      </PopoverTrigger>

                      <PopoverContent className="w-32">
                        {
                          shortlistingStatus.map((status, index) => (
                            <div
                              key={index}
                              onClick={() =>
                                statusHandler(status.toLowerCase(), item._id)
                              }
                              className="popover-item"
                            >
                              {status}
                            </div>
                          ))
                        }
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="no-data">
                  No applicants found
                </TableCell>
              </TableRow>
            )
          }
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;