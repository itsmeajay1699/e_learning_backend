import express from "express";
import {
  getAllCourses,
  createCourse,
  getMyCourses,
} from "../../controller/course/index.js";
const courseRouter = express.Router();
import { validator } from "../../validators/course.js";
courseRouter.get("/all", async (req, res) => {
  try {
    const { limit = 10, page = 0 } = req.query;
    if (page > 1) {
      page = page - 1;
    }

    const courses = await getAllCourses(limit, page);
    res.json({
      success: true,
      message: "Success",
      data: courses,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
});

courseRouter.post("/create", async (req, res) => {
  try {
    const validatedBody = validator(req.body);

    const newCourse = await createCourse(validatedBody);
    res.json({
      success: true,
      message: "Course Created Successfully",
      data: newCourse,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
});

// this :id will remove when we implement authentication
courseRouter.get("/my-courses/:id", async (req, res) => {
  try {
    // const { id } = req.user;

    const { id } = req.params;
    const { limit = 10, page = 0 } = req.query;

    if (page > 1) {
      page = page - 1;
    }

    const courses = await getMyCourses(id, limit, page);
    res.json({
      success: true,
      message: "Success",
      data: courses,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
});

courseRouter.get("/all-course-by-educator/:educatorId", async (req, res) => {
  try {
    const { educatorId } = req.params;
    const { limit = 10, page = 0 } = req.query;

    if (page > 1) {
      page = page - 1;
    }

    const courses = await getAllCoursesByEducator(educatorId, limit, page);
    res.json({
      success: true,
      message: "Success",
      data: courses,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
});

export default courseRouter;
