import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/school-logo.png";

function Home() {
  const [matric, setMatric] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const users = [
    {
      matric: "2023001",
      password: "123456",
      name: "Idowu Michael",
      department: "Computer Science",
      level: "400",
    },
    {
      matric: "2023002",
      password: "abcdef",
      name: "Jane Doe",
      department: "Software Engineering",
      level: "300",
    },
    {
      matric: "2023003",
      password: "pass123",
      name: "Daniel Adams",
      department: "Cyber Security",
      level: "200",
    },
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      // simulate network delay
      const user = users.find(
        (u) => u.matric === matric.trim() && u.password === password.trim(),
      );

      if (user) {
        setError("");
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("studentMatric", matric);
        localStorage.setItem("studentName", user.name);
        localStorage.setItem("studentDepartment", user.department);
        localStorage.setItem("studentLevel", user.level);
        navigate("/dashboard");
      } else {
        setError("Invalid matric number or password");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div style={styles.container}>
      <img src={bgImage} alt="bg" style={styles.bgImage} />
      <div style={styles.overlay}></div>

      <div style={styles.content}>
        <div style={styles.card}>
          <h2 style={{ marginBottom: "20px", color: "#1e3a8a" }}>
            Student Portal Login
          </h2>

          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Matric Number"
              value={matric}
              onChange={(e) => setMatric(e.target.value)}
              style={styles.input}
            />

            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={styles.showBtn}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <button type="submit" style={styles.button} disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: "relative",
    height: "100vh",
    width: "100%",
    overflow: "hidden",
  },

  bgImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    zIndex: -2,
  },

  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: -1,
  },

  content: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    padding: "20px",
  },

  card: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    backdropFilter: "blur(15px)",
    WebkitBackdropFilter: "blur(15px)",
    padding: "40px",
    borderRadius: "15px",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
    boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
    border: "1px solid rgba(255,255,255,0.3)",
  },

  showBtn: {
    position: "absolute",
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer",
    fontSize: "14px",
    color: "#2563eb",
    userSelect: "none",
  },
};

export default Home;
