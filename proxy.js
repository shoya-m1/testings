import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/episode/:slug", async (req, res) => {
  const { slug } = req.params;
  try {
    const response = await axios.get(`https://otakudesu.cloud/episode/${slug}`);
    res.send(response.data); // Kirim raw HTML
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "Failed to fetch HTML from Otakudesu",
      error: error.message,
    });
  }
});

export default router;
