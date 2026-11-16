const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5050;

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static assets from public/
app.use(express.static(path.join(__dirname, "public"), {
  maxAge: "1d",
  etag: true
}));

// API Health check for monitoring and Railway health check probes
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    developer: "S S Manikanda Prabu",
    role: "Full Stack Software Engineer",
    links: {
      github: "https://github.com/SSManikandaprabu",
      email: "ssmanikandaprabu@gmail.com"
    }
  });
});

// Contact message endpoint (handles hiring inquiries)
app.post("/api/contact", (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: "Please provide name, email, and message." });
  }

  console.log(`[New Inquiry] From: ${name} <${email}> | Subject: ${subject || "General"}`);
  return res.status(200).json({
    success: true,
    message: "Thank you for reaching out! I will get back to you shortly."
  });
});

// Fallback to index.html for SPA-style routing
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Full-Stack Resume web app running on port ${PORT}`);
});
