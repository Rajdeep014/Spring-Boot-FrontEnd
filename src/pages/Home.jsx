import axios from "axios"; // Make sure to import axios
import React, { useEffect, useState } from "react";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error state

  // Fetch users from the API
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve the token
      console.log(token); // Log the token to see if it's correctly retrieved
      const response = await axios.get("http://localhost:8080/api/auth/users", {
        headers: {
          Authorization: `Bearer ${token}`, // Include the JWT in the Authorization header
        },
      });
      setUsers(response.data); // Set the users state with the fetched data
    } catch (err) {
      setError("Error fetching users"); // Set error message if fetching fails
      console.error(err); // Log the error for debugging
    } finally {
      setLoading(false); // Set loading to false once done
    }
  };

  // UseEffect to fetch users when component mounts
  useEffect(() => {
    fetchUsers(); // Call the fetchUsers function
  }, []);

  const LogoutHandler = () => {
    console.log("Logout");
    localStorage.removeItem("token"); // Remove the token
    window.location.href = "/login"; // Redirect to login page
  };

  // Render loading state or error if applicable
  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <button
        onClick={LogoutHandler}
        className="mb-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        Logout
      </button>
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-gray-700 text-center mb-6">
          User Data
        </h1>
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Username</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="text-center">
                <td className="py-2 px-4 border-b">{user.id}</td>
                <td className="py-2 px-4 border-b">{user.name}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">{user.username}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
