import { useState } from "react";
import axios from "axios";

export default function CreateTeacher() {

  const [form, setForm] = useState({
    fullnames: "",
    email: "",
    phonenumber: "",
    password: "",
    confirmPassword: "",
  });

  const [activeTrades, setActiveTrades] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [passwordStrength, setPasswordStrength] = useState("");

  // ======================
  // SUBJECT DATA
  // ======================
  const subjectsData = {
    swd: {
      L3: ["Photoshop", "Web Development", "JavaScript"],
      L4: ["PHP", "Node.js", "MySQL"],
      L5: ["React", "DevOps", "Blockchain"]
    },
    accounting: {
      Year1: ["Tax", "Management"],
      Year2: ["Advanced Tax"],
      Year3: ["Auditing"]
    },
    o_level: {
      S1: ["Maths", "English", "Physics"],
      S2: ["Maths", "English"],
      S3: ["Biology", "History"]
    }
  };

  // ======================
  // INPUT CHANGE
  // ======================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    if (e.target.name === "password") {
      checkPasswordStrength(e.target.value);
    }
  };

  // ======================
  // PASSWORD STRENGTH
  // ======================
  const checkPasswordStrength = (pwd) => {
    let score = 0;
    if (/[a-z]/.test(pwd)) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    if (pwd.length >= 10 && score === 4) setPasswordStrength("Strong");
    else if (pwd.length >= 8 && score >= 3) setPasswordStrength("Medium");
    else setPasswordStrength("Weak");
  };

  // ======================
  // TRADE SELECT
  // ======================
  const toggleTrade = (trade) => {
    if (activeTrades.includes(trade)) {
      setActiveTrades(activeTrades.filter(t => t !== trade));
    } else {
      setActiveTrades([...activeTrades, trade]);
    }
  };

  // ======================
  // SUBJECT SELECT
  // ======================
  const toggleSubject = (value) => {
    if (selectedSubjects.includes(value)) {
      setSelectedSubjects(selectedSubjects.filter(s => s !== value));
    } else {
      setSelectedSubjects([...selectedSubjects, value]);
    }
  };

  // ======================
  // SUBMIT
  // ======================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword)
      return alert("Passwords do not match");

    const data = {
      ...form,
      tradeTaught: activeTrades,
      subjectsTaught: selectedSubjects,
      role: "teacher"
    };

    try {
      await axios.post("http://localhost:5000/api/accounts", data);
      alert("Account created successfully");
    } catch (err) {
      console.log(err);
      alert("Error creating account");
    }
  };

  return (
    <div className="container">

      <h1>Create Teacher Account</h1>

      <form onSubmit={handleSubmit}>

        <input name="fullnames" placeholder="Full Names"
          onChange={handleChange} required />

        <input name="email" placeholder="Email"
          onChange={handleChange} required />

        <input name="phonenumber" placeholder="Phone Number"
          onChange={handleChange} required />

        {/* TRADES */}
        <h3>Select Trade</h3>

        {Object.keys(subjectsData).map(trade => (
          <button
            type="button"
            key={trade}
            onClick={() => toggleTrade(trade)}
            style={{
              margin: 5,
              background: activeTrades.includes(trade)
                ? "#007bff"
                : "#ccc"
            }}
          >
            {trade}
          </button>
        ))}

        {/* SUBJECTS */}
        {activeTrades.map(trade => (
          <div key={trade}>
            <h4>{trade.toUpperCase()}</h4>

            {Object.entries(subjectsData[trade]).map(([level, subs]) => (
              <div key={level}>
                <strong>{level}</strong>

                {subs.map(sub => (
                  <label key={sub}>
                    <input
                      type="checkbox"
                      onChange={() =>
                        toggleSubject(`${trade}-${level}-${sub}`)
                      }
                    />
                    {sub}
                  </label>
                ))}
              </div>
            ))}
          </div>
        ))}

        {/* PASSWORD */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <p>Password Strength: {passwordStrength}</p>

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={handleChange}
          required
        />

        <button type="submit">Create Account</button>

      </form>
    </div>
  );
}