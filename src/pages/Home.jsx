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
    { matric: "2023001", password: "123456", name: "Idowu Michael" },
    { matric: "2023002", password: "abcdef", name: "Jane Doe" },
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
        localStorage.setItem("studentName", user.name || "Student"); // for dynamic name
        navigate("/dashboard");
      } else {
        setError("Invalid matric number or password");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Login</h2>

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
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                fontSize: "14px",
                color: "#2563eb",
                userSelect: "none",
              }}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button
            type="submit"
            style={styles.button}
            disabled={loading}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#1d4ed8")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#2563eb")}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    overflow: "hidden",
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(15px)",
    WebkitBackdropFilter: "blur(15px)",
    padding: "40px",
    borderRadius: "15px",
    width: "350px",
    textAlign: "center",
    boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
    border: "1px solid rgba(255,255,255,0.3)",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    boxSizing: "border-box",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "10px",
    transition: "all 0.3s ease",
  },
};

export default Home;
