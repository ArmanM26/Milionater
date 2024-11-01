// Login.js
import { useState } from "react"; // Importing useState for state management
import { Form, Input, Button } from "antd"; // Importing Ant Design components for form handling
import { signInWithEmailAndPassword } from "firebase/auth"; // Importing Firebase function for signing in
import { auth } from "../firebase"; // Importing Firebase authentication instance
import { Link, useNavigate } from "react-router-dom"; // Importing React Router components
// import AuthWrapper from "../../../Components/shared/AuthWrapper"; // Uncomment if using AuthWrapper
import "./index.css"; // Importing CSS styles
// import loginBanner from "../../../core/images/auth_login.jpg"; // Uncomment if using a login banner image

const Login = () => {
  const [loading, setLoading] = useState(false); // State to manage loading status
  const [form] = Form.useForm(); // Creating a form instance using Ant Design
  const navigate = useNavigate(); // Hook for programmatic navigation

  const handleLogin = async (values) => {
    setLoading(true); // Set loading to true while the login is in progress
    try {
      const { email, password } = values; // Destructure email and password from form values
      await signInWithEmailAndPassword(auth, email, password); // Firebase login
      // Redirect to home page after successful login
      navigate("/home"); // Update path as per your routing setup
    } catch (error) {
      console.error("Login error:", error); // Log error for debugging
      // Here you can add user notifications for login errors
    } finally {
      setLoading(false); // Reset loading state after login attempt
    }
  };

  return (
    // <AuthWrapper title="Sign in" banner={loginBanner}> // Uncomment if using AuthWrapper
    <Form layout="vertical" form={form} onFinish={handleLogin}>
      <Form.Item
        label="Email" // Label for the email input
        name="email" // Name for the form field
        rules={[
          {
            required: true, // Validation rule for required field
            message: "Please input your email", // Error message if validation fails
          },
        ]}
      >
        <Input type="email" placeholder="Email" /> // Email input field
      </Form.Item>
      <Form.Item
        label="Password" // Label for the password input
        name="password" // Name for the form field
        rules={[
          {
            required: true, // Validation rule for required field
            message: "Please input your password", // Error message if validation fails
          },
          {
            pattern: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/, // Password pattern
            message:
              "Password must be 6-16 characters and include a number and a special character.", // Error message for invalid password
          },
        ]}
      >
        <Input.Password placeholder="Password" /> // Password input field
      </Form.Item>
      <Button type="primary" htmlType="submit" loading={loading}>
        Sign in // Submit button with loading state
      </Button>
      <Link to="/register">Sign up</Link> // Link to the registration page
    </Form>
    // </AuthWrapper> // Uncomment if using AuthWrapper
  );
};

export default Login; // Exporting the Login component
