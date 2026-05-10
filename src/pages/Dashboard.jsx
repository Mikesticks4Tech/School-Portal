import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/school-logo.png";

const API_URL = "https://school-backend-e1w9.onrender.com"; // <-- Updated backend URL

function Dashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // --- Dashboard student info ---
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

  // --- All Students state ---
  const [students, setStudents] = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(true);

  // Fetch students on mount
  useEffect(() => {
    fetch(`${API_URL}/students`)
      .then((res) => res.json())
      .then((data) => {
        setStudents(data);
        setLoadingStudents(false);
      })
      .catch((err) => {
        console.error("Error fetching students:", err);
        setLoadingStudents(false);
      });
  }, []);

  // --- Add Student Form state ---
  const [newName, setNewName] = useState("");
  const [newMatric, setNewMatric] = useState("");
  const [newDepartment, setNewDepartment] = useState("");

  // --- Add student function ---
  const addStudent = async () => {
    if (!newName || !newMatric || !newDepartment) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/add-student`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newName,
          matric: newMatric,
          department: newDepartment,
        }),
      });

      const data = await response.json();
      console.log("Saved:", data);

      // Live update
      setStudents((prev) => [...prev, data]);

      // Clear form
      setNewName("");
      setNewMatric("");
      setNewDepartment("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // --- Delete student function ---
  const deleteStudent = async (id) => {
    try {
      const response = await fetch(`${API_URL}/delete-student/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      console.log("Deleted:", data);

      // Live update
      setStudents((prev) => prev.filter((s) => s._id !== id));
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  // --- Logout ---
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  // --- Check login ---
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) navigate("/");
  }, [navigate]);

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={{ ...styles.sidebar, width: sidebarOpen ? "250px" : "70px" }}>
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
        {/* Greeting */}
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
          <div
            style={styles.card}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 5px 15px rgba(0,0,0,0.2)";
            }}
          >
            <h3>Registered Courses</h3>

            <ul>
              {courses.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>
          <div
            style={styles.card}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 5px 15px rgba(0,0,0,0.2)";
            }}
          >
            <h3>CGPA</h3>
            <p>{cgpa}</p>
          </div>
          <div
            style={styles.card}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 5px 15px rgba(0,0,0,0.2)";
            }}
          >
            <h3>Notifications</h3>
            {notifications.length > 0 ? (
              <ul>
                {notifications.map((n, i) => (
                  <li key={i}>{n}</li>
                ))}
              </ul>
            ) : (
              <p>No new updates</p>
            )}
          </div>
        </div>

        {/* Add Student Form */}
        <div
          style={{
            marginTop: "30px",
            background: "white",
            padding: "25px",
            borderRadius: "15px",
            boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
          }}
        >
          <h3>Add New Student</h3>
          <input
            type="text"
            placeholder="Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Matric"
            value={newMatric}
            onChange={(e) => setNewMatric(e.target.value)}
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Department"
            value={newDepartment}
            onChange={(e) => setNewDepartment(e.target.value)}
            style={styles.input}
          />
          <button onClick={addStudent} style={styles.addBtn}>
            Add Student
          </button>
        </div>

        {/* All Students List */}
        <div style={{ marginTop: "40px" }}>
          <h3>All Students</h3>
          {loadingStudents ? (
            <p style={{ marginTop: "20px" }}>Loading students...</p>
          ) : students.length > 0 ? (
            students.map((student) => (
              <div
                key={student._id}
                style={{
                  background: "white",
                  padding: "15px",
                  borderRadius: "10px",
                  marginBottom: "15px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                }}
              >
                <h4>{student.name}</h4>
                <p>Matric: {student.matric}</p>
                <p>Department: {student.department}</p>

                <button
                  onClick={() => deleteStudent(student._id)}
                  style={{
                    padding: "8px 12px",
                    backgroundColor: "#ef4444",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    marginTop: "10px",
                  }}
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p>No students yet</p>
          )}
        </div>
      </div>
    </div>
  );
}

// --- Styles ---
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
    padding: "20px",
    backgroundColor: "#f3f4f6",
    overflowY: "auto",
  },
  greetingSection: {
    backgroundColor: "rgba(30, 58, 138, 0.1)",
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
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
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
  input: {
    display: "block",
    marginBottom: "15px",
    padding: "12px",
    width: "100%",
    maxWidth: "400px",
    borderRadius: "10px",
    border: "1px solid #d1d5db",
    outline: "none",
    fontSize: "15px",
    transition: "0.3s",
  },
  addBtn: {
    padding: "12px 20px",
    background: "linear-gradient(135deg, #2563eb, #1e3a8a)",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "15px",
    transition: "0.3s ease",
  },
};

export default Dashboard;
