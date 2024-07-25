import express from "express";
import {
  getAllCourses,
  createCourse,
  getMyCourses,
  getAllCoursesByEducator,
  getCoursesByEducator,
  enrollCourse,
  changeCourseStatus,
  myEnrolledCourses,
  changeStatusOfEnrollCourse,
} from "../../controller/course/index.js";
const courseRouter = express.Router();
import { validator } from "../../validators/course.js";
import passport from "passport";
import enrollment from "../../schema/mongodb/enrollment.js";
import { emitSocketEvent } from "../../socket/index.js";

courseRouter.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      let { limit = 10, page = 0, categoryId } = req.query;
      if (page >= 1) {
        page = page - 1;
      }

      const { totalCourseCount, courses } = await getAllCourses(
        limit,
        page,
        categoryId
      );
      res.json({
        success: true,
        message: "Success",
        data: courses,
        totalCourseCount,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: err.message,
      });
    }
  }
);

courseRouter.get(
  "/courseCount",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { user_id: id } = req.user;

      const coursesCount = await getCoursesByEducator(id);

      res.json({
        success: true,
        message: "Success",
        data: coursesCount,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: err.message,
      });
    }
  }
);

courseRouter.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const validatedBody = validator(req.body);
      const { user_id: educatorId } = req.user;
      const newCourse = await createCourse(validatedBody, educatorId);
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
  }
);

// this :id will remove when we implement authentication
courseRouter.get(
  "/my-courses/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { user_id: id } = req.user;
      console.log(id);
      console.log(req.id);
      const { limit = 10, page = 0 } = req.query;

      if (page >= 1) {
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
  }
);

courseRouter.post(
  "/enrolled-course/:courseId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { courseId } = req.params;
      const { user_id: userId } = req.user;
      const { educatorId } = req.body;
      const course = await enrollCourse(courseId, userId, educatorId, req);
      res.json({
        success: true,
        message: "Course Enrolled Successfully",
        data: course,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: err.message,
      });
    }
  }
);

courseRouter.get(
  "/student-enrolled-courses",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { limit = 10, page = 0 } = req.query;

      const { user_id: userId } = req.user;

      if (page >= 1) {
        page = page - 1;
      }

      const courses = await myEnrolledCourses(userId, limit, page);

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
  }
);

courseRouter.post(
  "/update-status/:courseId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { courseId } = req.params;
      const { status } = req.body;
      const course = await changeCourseStatus(courseId, status);
      res.json({
        success: true,
        message: "Course Status Changed Successfully",
        data: course,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: err.message,
      });
    }
  }
);

courseRouter.post(
  "/change-status/:enrollId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { enrollId } = req.params;
      const { status } = req.body;

      if (status === "3") {
        const deleteData = await enrollment.deleteOne({
          _id: enrollId,
        });

        res.json({
          success: true,
          message: "Course Deleted Successfully",
          data: deleteData,
        });
      } else {
        const data = await changeStatusOfEnrollCourse(enrollId, status);
        res.json({
          success: true,
          message: "Course Status Changed Successfully",
          data: data,
        });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: err.message,
      });
    }
  }
);

export default courseRouter;
