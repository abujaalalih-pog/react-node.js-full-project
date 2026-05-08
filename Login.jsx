import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const login = () => {
    localStorage.setItem("token", "admin123");
    navigate("/dashboard");
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <button
        onClick={login}
        className="bg-blue-600 text-white p-4 rounded"
      >
        Login
      </button>
    </div>
  );
}

export default Login;