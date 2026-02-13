import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const matric = localStorage.getItem("studentMatric");
  const studentName = localStorage.getItem("studentName") || "Student";

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("studentMatric");
    localStorage.removeItem("studentName");
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <div
        style={{
          ...styles.sidebar,
          width: sidebarOpen ? "250px" : "70px",
        }}
      >
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={styles.toggleBtn}
        >
          ☰
        </button>

        {sidebarOpen && <h2>🎓 UniPortal</h2>}

        {sidebarOpen && <p>Dashboard</p>}
        {sidebarOpen && <p>Courses</p>}
        {sidebarOpen && <p>Results</p>}
        {sidebarOpen && <p>Profile</p>}

        <button onClick={handleLogout} style={styles.logoutBtn}>
          Logout
        </button>
      </div>

      <div style={styles.main}>
        <h1>Welcome {studentName} 👋</h1>

        <p>
          <strong>Matric Number:</strong> {matric}
        </p>

        <div style={styles.cardContainer}>
          <div style={styles.card}>
            <h3>Registered Courses</h3>
            <p>5 Courses</p>
          </div>

          <div style={styles.card}>
            <h3>CGPA</h3>
            <p>4.25</p>
          </div>

          <div style={styles.card}>
            <h3>Notifications</h3>
            <p>No new updates</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
  },
  sidebar: {
    backgroundColor: "#1e3a8a",
    color: "white",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    transition: "width 0.3s ease",
  },
  toggleBtn: {
    background: "transparent",
    color: "white",
    border: "none",
    cursor: "pointer",
    fontSize: "20px",
  },
  logoutBtn: {
    marginTop: "auto",
    padding: "10px",
    backgroundColor: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  main: {
    flex: 1,
    padding: "40px",
    backgroundColor: "#f3f4f6",
  },
  cardContainer: {
    display: "flex",
    gap: "20px",
    marginTop: "20px",
  },
  card: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    flex: 1,
  },
};

export default Dashboard;
