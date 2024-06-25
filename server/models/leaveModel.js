import mongoose, { Schema } from "mongoose";

const leaveSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User", // Assuming you have a User model
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    leaveType: {
      type: String,
      enum: ["paid", "unpaid"],
      required: true,
    },
    approver: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    totalDays: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Leave = mongoose.model("leaveRequest", leaveSchema);

export default Leave;
