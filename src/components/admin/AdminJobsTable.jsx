import React, { useEffect, useState } from 'react'
import {
  Table, TableBody, TableCaption,
  TableCell, TableHead, TableHeader, TableRow
} from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminJobsTable = () => {
  const { allAdminJobs = [], searchJobByText } = useSelector(store => store.job);

  const [filterJobs, setFilterJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredJobs = allAdminJobs.filter((job) => {
      if (!searchJobByText) return true;

      const search = searchJobByText.toLowerCase();

      return (
        job?.title?.toLowerCase().includes(search) ||
        job?.company?.name?.toLowerCase().includes(search)
      );
    });

    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  return (
    <div>
      <div className="table-wrapper">
        <table className="table">

          <caption>A list of your recently posted jobs</caption>

          <thead>
            <tr>
              <th>Company Name</th>
              <th>Role</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filterJobs.map((job) => (
              <tr key={job._id}>
                <td>{job?.company?.name}</td>
                <td>{job?.title}</td>
                <td>{job?.createdAt?.split("T")[0]}</td>

                <td className="text-right action-icon">
                  <div className="popover">

                    <div
                      onClick={() => navigate(`/admin/companies/${job._id}`)}
                      className="popover-item"
                    >
                      <Edit2 size={14} />
                      <span>Edit</span>
                    </div>

                    <div
                      onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                      className="popover-item"
                    >
                      <Eye size={14} />
                      <span>Applicants</span>
                    </div>

                  </div>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default AdminJobsTable;