import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Ensure you have React Router for navigation
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    const payload = { email, password };
    fetch("http://localhost:5001/api/login", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.token);
        navigate("/");

      })
      .catch((err) => console.log(err));
  };

  // const handleGoogleLogin = () => {
  //   window.location.href = "http://localhost:5000/auth/google"; // Replace with your Google OAuth URL
  // };

  const navigateToRegister = () => {
    navigate("/register");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Login</h1>
      <input
        type="text"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
      />
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleSubmit} style={styles.submitButton}>
        Login
      </button>

      {/* <button onClick={handleGoogleLogin} style={styles.googleButton}>
        Login with Google
      </button> */}

      <button style={styles.googleButton}>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            const decoded = jwtDecode(credentialResponse?.credential);

            console.log(decoded);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </button>

      <p style={styles.createAccountText}>
        Don't have an account?{" "}
        <span onClick={navigateToRegister} style={styles.createAccountLink}>
          Create one
        </span>
      </p>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f4f4f9",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#333",
  },
  input: {
    width: "300px",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ddd",
    fontSize: "16px",
  },
  submitButton: {
    padding: "12px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "10px",
    width: "300px",
  },
  googleButton: {
    padding: "12px 10px",
    backgroundColor: "#db4437",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "10px",
    width: "200px",
  },
  createAccountText: {
    marginTop: "20px",
    fontSize: "16px",
    color: "#555",
  },
  createAccountLink: {
    color: "#007bff",
    cursor: "pointer",
    textDecoration: "underline",
  },
};

export default Login;
