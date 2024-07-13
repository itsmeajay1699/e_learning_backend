import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    educatorId: {
      type: mongoose.Schema.Types.String,
      required: true,
    },

    educatorDetails: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },

    title: {
      type: mongoose.Schema.Types.String,
      required: true,
    },

    description: {
      type: mongoose.Schema.Types.String,
      required: true,
    },

    thumbnail: {
      type: mongoose.Schema.Types.String,
      required: true,
    },

    price: {
      type: mongoose.Schema.Types.Number,
      required: true,
    },

    duration: {
      type: mongoose.Schema.Types.Number,
      required: true,
    },

    totalEnrollment: {
      type: mongoose.Schema.Types.Number,
      required: true,
    },

    totalSession: {
      type: mongoose.Schema.Types.Number,
      required: true,
    },

    sessionDetails: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },

    status: {
      type: mongoose.Schema.Types.String, // 1: active, 2: inactive
      required: true,
    },

    rating: {
      type: mongoose.Schema.Types.Number, // 1 - 5 (star rating)
      required: true,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

export default mongoose.model("Course", courseSchema);
