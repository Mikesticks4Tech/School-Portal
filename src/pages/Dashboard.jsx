import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/school-logo.png"; // make sure this path is correct

function Dashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Student info
  const matric = localStorage.getItem("studentMatric") || "2023001";
  const studentName = localStorage.getItem("studentName") || "Idowu Michael";
  const department =
    localStorage.getItem("studentDepartment") || "Computer Science";
  const level = localStorage.getItem("studentLevel") || "400";
  const status = localStorage.getItem("studentStatus") || "Active";
  const session = localStorage.getItem("studentSession") || "2025/2026";
  const currentSemester =
    localStorage.getItem("studentSemester") || "2nd Semester";

  const courses = [
    "Web Development",
    "Database Systems",
    "AI & ML",
    "Networking",
    "Operating Systems",
  ];
  const cgpa = 4.25;
  const notifications = [];

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
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

        {sidebarOpen && (
          <>
            <p>Dashboard</p>
            <p>Courses</p>
            <p>Results</p>
            <p>Profile</p>
          </>
        )}

        <button onClick={handleLogout} style={styles.logoutBtn}>
          Logout
        </button>
      </div>

      {/* Main content */}
      <div style={styles.main}>
        {/* Greeting section */}
        <div style={styles.greetingSection}>
          <h1>Welcome {studentName} 👋</h1>

          <div style={styles.studentInfo}>
            <p>
              <strong>Matric Number:</strong> {matric}
            </p>
            <p>
              <strong>Department:</strong> {department}
            </p>
            <p>
              <strong>Level:</strong> {level}
            </p>
            <p>
              <strong>Status:</strong> {status}
            </p>
            <p>
              <strong>Session:</strong> {session}
            </p>
            <p>
              <strong>Current Semester:</strong> {currentSemester}
            </p>
          </div>
        </div>

        {/* Cards */}
        <div style={styles.cardContainer}>
          <div style={styles.card}>
            <h3>Registered Courses</h3>
            <ul>
              {courses.map((course, index) => (
                <li key={index}>{course}</li>
              ))}
            </ul>
          </div>

          <div style={styles.card}>
            <h3>CGPA</h3>
            <p>{cgpa}</p>
          </div>

          <div style={styles.card}>
            <h3>Notifications</h3>
            {notifications.length > 0 ? (
              <ul>
                {notifications.map((note, index) => (
                  <li key={index}>{note}</li>
                ))}
              </ul>
            ) : (
              <p>No new updates</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundColor: "rgba(0,0,0,0.4)",
    backgroundBlendMode: "darken",
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
  greetingSection: {
    backgroundColor: "rgba(30, 58, 138, 0.1)", // soft dark blue tint
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "20px",
  },
  studentInfo: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    marginBottom: "20px",
  },
  cardContainer: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
  },
  card: {
    backgroundColor: "#1e3a8a",
    color: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
    flex: 1,
    transition: "transform 0.2s, box-shadow 0.2s",
    cursor: "pointer",
  },
};

export default Dashboard;
