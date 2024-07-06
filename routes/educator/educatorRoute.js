import { Router } from "express";

const educatorRouter = Router();

educatorRouter.get("/all", async (req, res) => {
  return res.json({
    message: "Sucess",
  });
});

export default educatorRouter;
