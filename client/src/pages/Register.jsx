import { useState } from "react";
import { useNavigate } from "react-router";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState("");
    const navigate = useNavigate();

    const handleSubmit = () => {

        const payload = { name, email, password, age };
        
        fetch("https://culterx-assignment-api.onrender.com/register", {
            method: "POST",
            body: JSON.stringify(payload),
            headers: { "Content-type": "application/json" }
        })
        .then(res => res.json())
        .then(res =>{
          alert(" Successfull!")
          console.log(res)})
        .then(res=>navigate("/login"))
        .catch(err => console.log(err));
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Register</h1>
            <input 
                type="text" 
                placeholder="Enter name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                style={styles.input}
            />
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
            <input 
                type="text" 
                placeholder="Enter age" 
                value={age} 
                onChange={(e) => setAge(e.target.value)} 
                style={styles.input}
            />
            <button onClick={handleSubmit} style={styles.submitButton}>Register</button>
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
        backgroundColor: "#f4f4f9"
    },
    title: {
        fontSize: "2rem",
        fontWeight: "bold",
        marginBottom: "20px",
        color: "#333"
    },
    input: {
        width: "300px",
        padding: "12px",
        margin: "10px 0",
        borderRadius: "5px",
        border: "1px solid #ddd",
        fontSize: "16px"
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
        width: "300px"
    }
};

export default Register;
