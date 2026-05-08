// ===============================
// IMPORT PACKAGES
// ===============================
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());


// ===============================
// DATABASE CONNECTION
// ===============================
mongoose.connect("mongodb://127.0.0.1:27017/schoolDB")
.then(() => console.log("MongoDB Connected ✅"))
.catch(err => console.log(err));


// ===============================
// SCHEMA + MODEL (STUDENT)
// ===============================
const studentSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    location: String,
    gender: String,
    telephone: String,
    trade: { type: String, required: true },
    class: String,
    unique_code: { type: String, unique: true }
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);


// ===============================
// AUTO UNIQUE CODE GENERATOR
// ===============================
async function generateUniqueCode(trade) {

  const year = new Date().getFullYear();

  const tradeCode = trade.substring(0, 3).toUpperCase();

  const count = await Student.countDocuments({ trade });

  const number = String(count + 1).padStart(3, "0");

  return `${year}${tradeCode}${number}A`;
}


// ===============================
// CREATE STUDENT (REGISTER)
// ===============================
app.post("/register", async (req, res) => {

  try {

    const {
      first_name,
      last_name,
      email,
      location,
      gender,
      telephone,
      trade,
      class: studentClass
    } = req.body;

    // check email
    const exist = await Student.findOne({ email });

    if (exist) {
      return res.status(400).json({
        message: "Email already exists"
      });
    }

    // generate code
    const unique_code = await generateUniqueCode(trade);

    const student = new Student({
      first_name,
      last_name,
      email,
      location,
      gender,
      telephone,
      trade,
      class: studentClass,
      unique_code
    });

    await student.save();

    res.status(201).json({
      message: "Student Registered ✅",
      student
    });

  } catch (error) {
    res.status(500).json(error);
  }
});


// ===============================
// READ ALL STUDENTS
// ===============================
app.get("/students", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});


// ===============================
// READ ONE STUDENT
// ===============================
app.get("/students/:id", async (req, res) => {
  const student = await Student.findById(req.params.id);
  res.json(student);
});


// ===============================
// UPDATE STUDENT
// ===============================
app.put("/students/:id", async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: "Missing ID" });
    }

    const updated = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// ===============================
// DELETE STUDENT
// ===============================
app.delete("/students/:id", async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);

  res.json({
    message: "Student Deleted ✅"
  });
});
//==============================
//get and delete registered 
//=============================
app.get("/register", async (req, res) => {
  const data = await Student.find();
  res.json(data);
});

app.delete("/register/:id", async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});
// ======================
// TEACHER SCHEMA
// ======================
const teacherSchema = new mongoose.Schema({

  fullnames: {
    type: String,
    required: true
  },

  id_number: {
    type: String,
    required: true
  },

  location: String,

  trade_that_teach: String,

  email: {
    type: String,
    required: true,
    unique: true
  },

  telephone: String,

  module_teaches: String,

  password: {
    type: String,
    required: true
  }

}, { timestamps: true });

const Teacher = mongoose.model("Teacher", teacherSchema);


// ================= ROUTES =================
// CREATE
app.post("/teachers", async (req, res) => {
  const teacher = await Teacher.create(req.body);
  res.json(teacher);
});

// READ ALL
app.get("/teachers", async (req, res) => {
  const teachers = await Teacher.find();
  res.json(teachers);
});

// UPDATE
app.put("/teachers/:id", async (req, res) => {
  const teacher = await Teacher.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(teacher);
});

// DELETE
app.delete("/teachers/:id", async (req, res) => {
  await Teacher.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

// ===============================
// SERVER START
// ===============================
app.listen(5000, () => {
  console.log("Server running on port 5000 🚀");
});