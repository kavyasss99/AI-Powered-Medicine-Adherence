import {
  useState,
} from "react";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import {
  login as loginUser,
} from "../services/authService";

import {
  useAuth,
} from "../context/AuthContext";

const Login = () => {
  const navigate =
    useNavigate();

  const { login } =
    useAuth();

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        setLoading(true);
        setError("");

        const data =
          await loginUser(
            formData
          );

        login(data);

        navigate("/");
      } catch (err) {
        setError(
          err.response?.data
            ?.message ||
            "Login failed"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="mb-4 text-center">
                Login
              </h2>

              {error && (
                <div className="alert alert-danger">
                  {error}
                </div>
              )}

              <form
                onSubmit={
                  handleSubmit
                }
              >
                <div className="mb-3">
                  <label>
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={
                      formData.email
                    }
                    onChange={
                      handleChange
                    }
                    required
                  />
                </div>

                <div className="mb-3">
                  <label>
                    Password
                  </label>

                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={
                      formData.password
                    }
                    onChange={
                      handleChange
                    }
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={
                    loading
                  }
                >
                  {loading
                    ? "Logging in..."
                    : "Login"}
                </button>
              </form>

              <div className="text-center mt-3">
                <span>
                  Don't have an
                  account?
                </span>

                <Link
                  to="/register"
                  className="ms-2"
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;