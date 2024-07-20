import mongoose from "mongoose";
import Courses from "../../schema/mongodb/courses.js";
import enrollment from "../../schema/mongodb/enrollment.js";
import educator from "../../schema/postgres/educator.js";

import user from "../../schema/postgres/user.js";
export const getAllCourses = async (limit, page, categoryId) => {
  try {
    const courses = await Courses.find({
      status: "1",
      ...(categoryId && { categoryId }),
    })
      .limit(limit)
      .skip(limit * page);

    const totalCourseCount = await Courses.countDocuments({
      status: "1",
      ...(categoryId && { categoryId }),
    });

    return {
      courses,
      totalCourseCount,
    };
  } catch (error) {
    throw new Error(error);
  }
};

export const createCourse = async (validatedBody, educatorId) => {
  try {
    const educatorFind = await educator.findOne({
      where: {
        id: educatorId,
      },
    });

    const newCourse = new Courses({
      ...validatedBody,
      educatorId,
      educatorDetails: educatorFind.dataValues,
    });

    await newCourse.save();

    return newCourse;
  } catch (err) {
    throw new Error(err);
  }
};

export const getMyCourses = async (id, limit, page) => {
  try {
    const courses = await Courses.find({
      educatorId: id,
    })
      .limit(limit)
      .skip(limit * page);

    return courses;
  } catch (error) {
    throw new Error(error);
  }
};

export const getAllCoursesByEducator = async (educatorId, limit, page) => {
  try {
    const courses = await Courses.find({
      educatorId: educatorId,
    })
      .limit(limit)
      .skip(limit * page);

    return courses;
  } catch (error) {
    throw new Error(error);
  }
};

export async function getCoursesByEducator(educatorId) {
  try {
    // const result = await Courses.aggregate([
    //   { $match: { educatorId: educatorId } },
    //   {
    //     $lookup: {
    //       from: "categories",
    //       localField: "categoryId",
    //       foreignField: "_id",
    //       as: "category",
    //     },
    //   },
    // ]);

    const result = await Courses.aggregate([
      { $match: { educatorId: educatorId } },
      {
        $addFields: {
          categoryId: { $toObjectId: "$categoryId" },
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "categoryId",
          foreignField: "_id",
          as: "category",
        },
      },
      { $unwind: "$category" },
      {
        $group: {
          _id: "$category.categoryName",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          categoryName: "$_id",
          count: 1,
        },
      },
    ]);

    return result;
  } catch (error) {
    console.error("Error fetching courses by educator:", error);
    throw error;
  }
}

export const enrollCourse = async (courseId, useId, educatorId) => {
  try {
    if (!courseId || !useId || !educatorId) {
      throw new Error("Invalid data");
    }

    const studentDetails = await user.findOne({
      where: {
        id: useId,
        role: "1",
      },

      attributes: ["id", "email", "profilePicture"],
    });

    const findExist = await enrollment.findOne({
      courseId,
      studentId: useId,
      eductorId: educatorId,
    });

    if (findExist) {
      throw new Error("Already enrolled");
    }

    const courseFind = await Courses.findOne({
      _id: courseId,
    });

    if (!courseFind) {
      throw new Error("Course not found");
    }

    const educatorDetails = await educator.findOne({
      where: {
        id: educatorId,
      },
    });

    courseFind.totalEnrollment += 1;
    await courseFind.save();

    const enrollCoursed = await enrollment.create({
      courseId,
      studentDetails: studentDetails.dataValues,
      eductorId: educatorId,
      status: "1",
      studentId: useId,
      courseDetails: courseFind,
      educatorDetails: educatorDetails.dataValues,
    });
    return enrollCoursed;
  } catch (err) {
    throw new Error(err);
  }
};

export const changeCourseStatus = async (courseId, status) => {
  try {
    const course = await Courses.findOne({
      _id: courseId,
    });

    if (!course) {
      throw new Error("Course not found");
    }

    course.status = status;
    await course.save();

    return course;
  } catch (error) {
    throw new Error(error);
  }
};

export const myEnrolledCourses = async (userId, limit, page) => {
  try {
    const courses = await enrollment
      .find({
        studentId: userId,
      })
      .limit(limit)
      .skip(limit * page);

    return courses;
  } catch (error) {
    throw new Error(error);
  }
};

export const changeStatusOfEnrollCourse = async (enrollId, status) => {
  try {
    const enrollCourse = await enrollment.findOne({
      _id: enrollId,
    });

    if (!enrollCourse) {
      throw new Error("Course not found");
    }

    if (status === "2") {
      const courseFind = await Courses.findOne({
        _id: enrollCourse.courseId,
      });

      if (!courseFind) {
        throw new Error("Course not found");
      }

      courseFind.totalComplete += 1;
      await courseFind.save();
    }

    enrollCourse.status = status;
    await enrollCourse.save();

    return enrollCourse;
  } catch (error) {
    throw new Error(error);
  }
};
