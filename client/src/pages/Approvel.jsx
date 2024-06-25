import React from "react";
import { useDispatch } from "react-redux";
import { approveLeave, rejectLeave } from "../redux/slices/leaveSlice";
import img from "../assets/pexel.jpg"

const LeaveRequest = ({ leave }) => {
  const dispatch = useDispatch();

z

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6 w-full max-w-md">
      <div className="flex items-center mb-4">
        <img
          className="w-10 h-10 rounded-full mr-4"
          src={img}
          alt="User avatar"
        />
        <div>
          <p className="text-lg font-semibold">{leave.user.name}</p>
          <p className="text-gray-600">
            You have <span className="font-bold">{leave.leaveBalance}</span>{" "}
            leave in your account
          </p>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Leave Type</label>
        <div className="mt-2">
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio"
              name="leaveType"
              value="leave"
              checked
            />
            <span className="ml-2">{leave.leaveType}</span>
          </label>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Start Date</label>
        <input
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          value={leave.startDate}
          readOnly
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">End Date</label>
        <input
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          value={leave.endDate}
          readOnly
        />
      </div>
      <div className="flex justify-between">
        <button
          onClick={handleApprove}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
        >
          Approve
        </button>
        <button
          onClick={handleReject}
          className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded hover:bg-gray-400"
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default LeaveRequest;
