import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.String,
      required: true,
    },

    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    status: {
      type: mongoose.Schema.Types.String, // 1: enrolled, 2: completed, 3: dropped
      required: true,
    },

    studentDetails: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },

    eductorId: {
      type: mongoose.Schema.Types.String,
      required: true,
    },

    educatorDetails: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },

    courseDetails: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

export default mongoose.model("Enrollment", enrollmentSchema);
