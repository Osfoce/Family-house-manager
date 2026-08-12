import { Router } from "express";
import { sendSuccess } from "../common/response/response.js";

const router = Router();

router.get("/", (_, res) => {
  sendSuccess(res, null, "Server is running 🚀");
  // res.send("Server is running 🚀");
});



export default router;
