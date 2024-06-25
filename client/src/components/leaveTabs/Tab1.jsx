import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addLeaveRecord,
  updateFormData,
  updateLeaveBalance,
  resetFormData,
  updateTotalDays,
} from "../../redux/slices/leaveSlice";
import {
  useGetLeavesQuery,
  useCreateLeaveMutation,
} from "../../redux/slices/api/leaveApiSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Tab1 = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { formData, totalDays, totalLeaveBalance } = useSelector(
    (state) => state.leave
  );
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const {
    data: leaveData,
    isLoading,
    refetch,
  } = useGetLeavesQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [createLeave, { isLoading: isCreatingLeave }] =
    useCreateLeaveMutation();

  const startDate = formData.startDate ? new Date(formData.startDate) : null;
  const endDate = formData.endDate ? new Date(formData.endDate) : null;

  const calculateDays = (start, end) => {
    if (!start || !end) {
      return 0;
    }
    const timeDiff = end.getTime() - start.getTime();
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
    return diffDays;
  };

  useEffect(() => {
    if (startDate && endDate) {
      const days = calculateDays(startDate, endDate);
      dispatch(updateTotalDays(days));
    }
  }, [startDate, endDate, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateFormData({ [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.startDate ||
      !formData.endDate ||
      !formData.leaveType ||
      !formData.approver ||
      !formData.reason
    ) {
      toast.error("Please fill out all required fields.");
      return;
    }

    if (totalDays > totalLeaveBalance) {
      toast.error("You do not have enough leave balance.");
      return;
    }

    try {
      const leaveData = {
        startDate: formData.startDate,
        endDate: formData.endDate,
        leaveType: formData.leaveType,
        approver: formData.approver,
        reason: formData.reason,
        totalDays,
      };

      const leaveResponse = await createLeave(leaveData).unwrap();
      if (leaveResponse) {
        dispatch(addLeaveRecord(leaveResponse));
        dispatch(updateLeaveBalance(totalLeaveBalance - totalDays));
        dispatch(resetFormData());
        toast.success("Leave applied successfully...");
        refetch();
      } else {
        toast.error("Error creating leave...");
      }
    } catch (error) {
      console.error("Error creating leave:", error);
      toast.error("Error creating leave.");
    }
  };

  const paginatedLeaveRecords = leaveData?.data?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil((leaveData?.data?.length || 0) / pageSize);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    return formattedDate;
  };

  return (
    <div className="bg-white mt-5 p-5 rounded-2xl">
      <ToastContainer />
      <h2 className="text-2xl font-semibold mb-4">Apply for Leave</h2>
      <form onSubmit={handleSubmit} className="mt-5">
        <div className=" grid grid-cols-2  ">
          <div className="mb-4 gap-6">
            <label className="block text-gray-700">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="mt-1 block w-46 rounded-2xl border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2 "
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">End Date</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="mt-1 block w-46 rounded-2xl  border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Leave Type</label>
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="leaveType"
                  value="paid"
                  checked={formData.leaveType === "paid"}
                  onChange={handleChange}
                />
                <span className="ml-2">Paid</span>
              </label>
              <label className="inline-flex items-center ml-6">

                
                <input
                  type="radio"
                  className="form-radio"
                  name="leaveType"
                  value="unpaid"
                  checked={formData.leaveType === "unpaid"}
                  onChange={handleChange}
                />
                <span className="ml-2">Unpaid</span>
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Total days</label>
            <input
              type="number"
              name="totaldays"
              value={totalDays}
              onChange={handleChange}
              className="mt-1 block w-46 rounded-2xl border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Approver </label>
            <input
              type="text"
              name="approver"
              value={formData.approver}
              onChange={handleChange}
              className="mt-1 block w-46 rounded-2xl border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Reason</label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              className="mt-1 block w-66 rounded-2xl border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
            />
            <div className="text-end mt-7">
              <button
                type="submit"
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded-2xl hover:bg-blue-700"
                disabled={isCreatingLeave}
              >
                {isCreatingLeave ? "Applying..." : "Apply"}
              </button>
            </div>
          </div>
        </div>
      </form>
      <div className="max-w-screen-lg mt-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-gray-700 mt-6">Leave Records</h2>
            <span className="text-xs text-gray-500">
              View all your leave records
            </span>
          </div>
        </div>
        <div className="overflow-y-hidden rounded-lg border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-blue-600 text-left text-xs font-semibold uppercase tracking-widest text-white">
                  <th className="px-5 py-3">User name</th>
                  <th className="px-5 py-3">Start date</th>
                  <th className="px-5 py-3">End date</th>
                  <th className="px-5 py-3">Total days</th>
                  <th className="px-5 py-3">Reason </th>
                  <th className="px-5 py-3">Leave Type</th>
                  <th className="px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="text-gray-500">
                {isLoading ? (
                  <tr key="loading">
                    <td colSpan="6" className="text-center py-5">
                      Loading...
                    </td>
                  </tr>
                ) : paginatedLeaveRecords?.length > 0 ? (
                  paginatedLeaveRecords.map((record) => (
                    <tr key={record.id}>
                      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <p className="whitespace-no-wrap">{user?.name}</p>
                      </td>
                      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <p className="whitespace-no-wrap">
                          {formatDate(record.startDate)}
                        </p>
                      </td>
                      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <p className="whitespace-no-wrap">
                          {formatDate(record.endDate)}
                        </p>
                      </td>
                      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <p className="whitespace-no-wrap">{record.totalDays}</p>
                      </td>
                      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <p className="whitespace-no-wrap">{record.reason}</p>
                      </td>
                      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <p className="whitespace-no-wrap">{record.leaveType}</p>
                      </td>
                      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            record.status === "Approved"
                              ? "bg-green-200 text-green-900"
                              : record.status === "Pending"
                              ? "bg-yellow-200 text-yellow-900"
                              : "bg-red-200 text-red-900"
                          }`}
                        >
                          {record.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr key="no-records">
                    <td colSpan="6" className="text-center py-5">
                      No leave records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded"
          >
            Previous
          </button>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 rounded"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tab1;
