// proxy.js
import express from "express";
import axios from "axios";
import * as cheerio from "cheerio";

const app = express();
const PORT = process.env.PORT || 8080;

app.get("/episode/:slug", async (req, res) => {
  const { slug } = req.params;
  try {
    const response = await axios.get(`https://otakudesu.cloud/${slug}`, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        Referer: "https://otakudesu.cloud/",
      },
    });

    const html = response.data;
    const $ = cheerio.load(html);

    const title = $("h1").text().trim();
    const slugId = $('.flir a[href*="/anime/"]').attr("href")?.split("/anime/")[1]?.replace(/\/$/, "");

    const urlId = slug;

    res.json({
      ok: true,
      title,
      slugId,
      urlId,
    });
  } catch (error) {
    console.error("❌ Proxy Error:", error.message);
    res.status(500).json({
      ok: false,
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Proxy running on port ${PORT}`);
});
