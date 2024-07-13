import Courses from "../../schema/mongodb/courses.js";
import educator from "../../schema/postgres/educator.js";
export const getAllCourses = async (limit, page) => {
  try {
    const courses = await Courses.find({})
      .limit(limit)
      .skip(limit * page);

    return courses;
  } catch (error) {
    throw new Error(error);
  }
};

export const createCourse = async (validatedBody) => {
  try {
    const educatorFind = await educator.findOne({
      where: {
        id: validatedBody.educatorId,
      },
    });

    const newCourse = new Courses({
      ...validatedBody,
      educatorDetails: {
        id: educatorFind.id,
        name: educatorFind.name,
        email: educatorFind.email,
      },
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
      "educatorDetails.id": id,
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
