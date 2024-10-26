import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const signupHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/signup",
        {
          name,
          username,
          email,
          password,
        }
      );
      toast.success("Signed up successfully!");
      setIsSignup(false);
    } catch (error) {
      toast.error("Signup failed. Please try again.");
    }
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          username,
          password,
        }
      );
      localStorage.setItem("token", response.data.token);
      toast.success("Logged in successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        {isSignup ? (
          <div>
            <h1 className="text-2xl font-semibold text-center text-gray-700 mb-4">
              Sign Up
            </h1>
            <form className="space-y-4" onSubmit={signupHandler}>
              <input
                type="text"
                placeholder="Name"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required // Make it required
              />
              <input
                type="text"
                placeholder="Username"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required // Make it required
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required // Make it required
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required // Make it required
              />
              <button
                type="button"
                onClick={() => setIsSignup(false)}
                className="text-sm text-blue-500 hover:underline"
              >
                Already have an account?
              </button>
              <button
                type="submit"
                className="w-full py-2 mt-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Sign Up
              </button>
            </form>
          </div>
        ) : (
          <div>
            <h1 className="text-2xl font-semibold text-center text-gray-700 mb-4">
              Log In
            </h1>
            <form className="space-y-4" onSubmit={loginHandler}>
              <input
                type="text"
                placeholder="Username"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required // Make it required
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required // Make it required
              />
              <button
                type="button"
                onClick={() => setIsSignup(true)}
                className="text-sm text-blue-500 hover:underline"
              >
                Don't have an account?
              </button>
              <button
                type="submit"
                className="w-full py-2 mt-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Log In
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
