import {
  Box,
  Button,
  Card,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";

import LoginIcon from "@mui/icons-material/Login";
import { Link, useNavigate } from "react-router-dom";
import { authStore, isLoginRegister } from "../state/auth";
import {  useState } from "react";
import { loginUser } from "../api/axiosInstances";
import useToast from "../hooks/useToast";
function Login() {
  const setNavbar = isLoginRegister((state: any) => state.setState);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const {notify,ToastContainer}=useToast();
  const [loading, setLoading] = useState(false);
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const authState:any=authStore();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const data = await loginUser(form.email, form.password);
    setLoading(false);
    if(data.message){
      notify(data.message,"error")
    }
    
    if (data.token) {
      localStorage.setItem("token", data.token);
      authState.setAuth(true);
      navigate("/");
    }
  };
 

  setNavbar(false);
  return (
    <div className="Login">
      {/* <Navbar /> */}
      <ToastContainer />
      <Box
        sx={{
          minHeight: "calc(100vh - 64px)",
          backgroundImage:
            "url(https://www.newsclick.in/sites/default/files/2019-06/ir_0.PNG)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card
          sx={{
            height: "fit-content",
            width: 300,
            marginLeft: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 3,
            gap: 4,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
            fontWeight={400}
          >
            Login <LoginIcon />
          </Typography>
          <Box
            component="form"
            onSubmit={(e) => handleSubmit(e)}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: "100%",
            }}
          >
            <TextField
              label="Email"
              name="email"
              type="email"
              variant="outlined"
              onChange={(e) => handleChange(e)}
              required
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              onChange={(e) => handleChange(e)}
              variant="outlined"
              required
            />

            <Button variant="contained" sx={{ width: "100%" }} type="submit">
              {loading ? (
                <CircularProgress size={20} color="secondary" />
              ) : (
                "Login"
              )}
            </Button>
          </Box>
          <Typography variant="body2" fontWeight={400}>
            Don't have an account? <Link to="/register">Register</Link>
          </Typography>
        </Card>
      </Box>
    </div>
  );
}

export default Login;
