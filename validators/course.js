export const validator = (body) => {
  const {
    educatorId, // this will not come from the user after authentication taken from the req.user
    title,
    description,
    thumbnail,
    price,
    duration,
    totalEnrollment = 0, // if not provided, default value is 0
    totalSession,
    sessionDetails,
    status = "active", // if not provided, default value is active
    rating = 0, // if not provided, default value is 0
  } = body;

  if (!educatorId) {
    throw new Error("Educator Id is required");
  }

  if (!title) {
    throw new Error("Title is required");
  }

  if (!description) {
    throw new Error("Description is required");
  }

  if (!thumbnail) {
    throw new Error("Thumbnail is required");
  }

  if (!price) {
    throw new Error("Price is required");
  }

  if (!duration) {
    throw new Error("Duration is required");
  }

  if (!totalSession) {
    throw new Error("Total Session is required");
  }

  if (!sessionDetails) {
    throw new Error("Session Details is required");
  }

  if (!status) {
    throw new Error("Status is required");
  }

  if (!rating) {
    throw new Error("Rating is required");
  }

  if (
    typeof educatorId !== "string" ||
    typeof title !== "string" ||
    typeof description !== "string" ||
    typeof thumbnail !== "string" ||
    typeof price !== "number" ||
    typeof duration !== "number" ||
    typeof totalEnrollment !== "number" ||
    typeof totalSession !== "number" ||
    typeof sessionDetails !== "object" ||
    typeof status !== "string" ||
    typeof rating !== "number"
  ) {
    throw new Error("Invalid data type");
  }

  if (status !== "active" && status !== "inactive") {
    throw new Error("Invalid status");
  }

  if (rating < 1 || rating > 5) {
    throw new Error("Invalid rating");
  }

  return {
    educatorId,
    title,
    description,
    thumbnail,
    price,
    duration,
    totalEnrollment,
    totalSession,
    sessionDetails,
    status,
    rating,
  };
};
