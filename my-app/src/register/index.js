// Register.js
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { notification } from "antd"; // For displaying notifications
import { auth, db } from "../../../services/firebase"; // Adjust the path as necessary
import { setDoc, doc } from "firebase/firestore"; // For Firestore database
import "./styles.css"; // Ensure you import your CSS

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false); // For loading state

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate form data
  const validate = () => {
    const errors = {};
    if (!formData.name) errors.name = "Name is required";
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }
    return errors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setLoading(true); // Set loading state to true
      try {
        // Create user with Firebase
        const response = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        const { uid } = response.user;

        // Create a document in Firestore
        const userDoc = doc(db, "users", uid); // Adjust Firestore path as necessary
        await setDoc(userDoc, {
          uid,
          name: formData.name,
          email: formData.email,
        });

        // Reset form and show success message
        setFormData({ name: "", email: "", password: "" });
        setIsSubmitted(true);
        notification.success({ message: "Registration successful!" });
      } catch (error) {
        // Handle registration errors
        notification.error({
          message: "Registration Failed",
          description:
            error.message || "An error occurred during registration.",
        });
      } finally {
        setLoading(false); // Reset loading state
      }
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      {isSubmitted ? (
        <p>Registration successful!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {formErrors.name && (
              <span className="error">{formErrors.name}</span>
            )}
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {formErrors.email && (
              <span className="error">{formErrors.email}</span>
            )}
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {formErrors.password && (
              <span className="error">{formErrors.password}</span>
            )}
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      )}
    </div>
  );
};

export default Register;
