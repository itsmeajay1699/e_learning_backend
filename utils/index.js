import bcrypt from "bcrypt";
import User from "../schema/postgres/user.js";
import Educator from "../schema/postgres/educator.js";
const stringToNumber = (str) => {
  try {
    return parseInt(str);
  } catch (e) {
    throw new Error("Invalid input");
  }
};

const saltRounds = 10;

const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
  } catch (e) {
    throw new Error("Error hashing password");
  }
};

const comparePassword = async (password, hash) => {
  try {
    return await bcrypt.compare(password, hash); // returns true or false
  } catch (e) {
    throw new Error("Error comparing password");
  }
};

const getTableByStatus = (role) => {
  switch (role) {
    case 1:
      return User;
    case 2:
      return Educator;
    default:
      throw new Error("Invalid status");
  }
};

export { stringToNumber, comparePassword, hashPassword, getTableByStatus };
