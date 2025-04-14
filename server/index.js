const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const app = express();
const UserModel = require("./modules/Users"); // ⬅️ Adjust the path accordingly



app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/resume_uplode", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log("MongoDB Error:", err));

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// Upload route
app.post("/upload", upload.single("resumeFile"), async (req, res) => {
  try {
    const { userName, email, uploadDate } = req.body;
    const resumePath = req.file.path;

    const newUser = new UserModel({
      userName,
      email,
      resumePath,
      uploadDate: new Date(uploadDate),
    });

    await newUser.save();
    res.json({ message: "Resume uploaded and saved to MongoDB!" });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Failed to upload resume" });
  }
});


app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find().sort({ _id: -1 }); // Latest first
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err });
  }
});



// Start server
app.listen(3001, () => {
  console.log("Server running on port 3001");
});
