import { Router } from "express";

const studentRouter = Router();

studentRouter.get("/all", async (req, res) => {
  return res.json({
    message: "Sucess",
  });
});

export default studentRouter;
