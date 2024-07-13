import Global from "../../schema/postgres/global.js";
import { comparePassword, getTableByStatus } from "../../utils/index.js";

export const login = async (email, password) => {
  try {
    const user = await Global.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const { role } = user;

    const table = getTableByStatus(status);

    const checkUser = await table.findOne({
      where: {
        email: email,
        role: role,
      },
    });

    if (!checkUser) {
      throw new Error("User not found");
    }

    if (!comparePassword(password, checkUser.password)) {
      throw new Error("Invalid password");
    }

    return checkUser;
  } catch (err) {
    throw err;
  }
};

export const createUser = async (email, password, role, profilePicture) => {
  try {
    const user = await Global.create({
      email: email,
      password: password,
      role: role,
    });

    const table = getTableByStatus(role);

    const newUser = await table.create({
      email: email,
      password: password,
      role: role,
      status: 1,
      profilePicture,
    });

    return newUser;
  } catch (err) {
    throw err;
  }
};
