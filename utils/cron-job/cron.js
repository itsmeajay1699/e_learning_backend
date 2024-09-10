import cron from "node-cron";
import dotenv from "dotenv";

dotenv.config();

cron.schedule("*/8 * * * *", async () => {
  try {
    const backendUrl = process.env.BACKEND_URI_PROD;
    const res = await fetch(backendUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status === 200) {
      console.log("Backend restarted successfully");
    }
  } catch (err) {
    console.log(err);
  }
});
