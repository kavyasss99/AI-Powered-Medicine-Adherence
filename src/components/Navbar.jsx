import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  useAuth,
} from "../context/AuthContext";

export default function Navbar() {
  const { logout, user } =
    useAuth();

  const navigate =
    useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">
        Smart Medicine Adherence
      </h1>

      <div className="flex gap-4 items-center">
        {user && (
          <>
            <Link to="/">
              Dashboard
            </Link>

            <Link to="/patients">
              Patients
            </Link>

            <Link to="/medicines">
              Medicines
            </Link>
          </>
        )}

        {user ? (
          <>
            <span className="text-sm">
              Welcome, {user.name}
            </span>

            <button
              onClick={
                handleLogout
              }
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-green-500 px-3 py-1 rounded hover:bg-green-600 transition"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-indigo-500 px-3 py-1 rounded hover:bg-indigo-600 transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}