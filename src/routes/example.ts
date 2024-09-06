import express from "express";

const router = express.Router();

router.route("/")
  .post((req, res) => {
    const data = req.body;

    return res.status(200).json({
      message: "Hello World!",
      data,
    });
  });

export default router;
