import { useEffect, useState, lazy } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ButtonSpinnerComponent from "../components/buttonSpinner.component";
import { APIURL } from "../App";
import { toast } from "react-toastify";

export function Login() {
  const [formError, setFormError] = useState(false);
  const [formValues, setFormValues] = useState({
    phone_number: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const [showEye, setShowEye] = useState(false);
  const navigate = useNavigate();

  const showPasswordHandler = () => {
    setShowEye(!showEye);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    let Notvalid = Object.values(formValues).some((value) => value === "");

    if (Notvalid) {
      setFormError(true);
      return;
    }
    setIsLoading(true);

    try {
      let response = await axios.post(`${APIURL}login-user`, formValues);
      setIsLoading(false);

      if (response.data.code == 1) {
        alert(response.data.message);
        const token = response.data.payload.token;
        localStorage.setItem("token", token);

        navigate("/books");
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="container">
        <div
          className="card border-0 mx-auto mt-5"
          style={{ maxWidth: "35em" }}
        >
          <div className="card-body">
            <h3 className="card-title text-center">Login</h3>

            <form onSubmit={handleLogin}>
              <div className="mb-3 mx-auto">
                <label htmlFor="otpInput" className="form-label">
                  <strong>Phone number</strong>
                  <span style={{ color: "red" }}> *</span>
                </label>
                <input
                  type="text"
                  className="form-control mb-1"
                  placeholder=""
                  onChange={(event) => {
                    setFormValues({
                      ...formValues,
                      phone_number: event.target.value,
                    });
                  }}
                  required
                />
                {formError && formValues.email == "" && (
                  <div>
                    <small className="text-danger mb-2">
                      phone_number is required
                    </small>
                  </div>
                )}

                <label htmlFor="password" className="form-label">
                  <strong>Password</strong>
                  <span style={{ color: "red" }}> *</span>
                </label>

                <div className="input-group flex-nowrap">
                  <input
                    type={showEye ? "text" : "password"}
                    className="form-control"
                    placeholder=""
                    onChange={(event) => {
                      setFormValues({
                        ...formValues,
                        password: event.target.value,
                      });
                    }}
                    required
                  />

                  <span
                    onClick={showPasswordHandler}
                    className="input-group-text"
                  >
                    {showEye ? (
                      <i className="bi bi-eye"></i>
                    ) : (
                      <i className="bi bi-eye-slash"></i>
                    )}
                  </span>
                </div>

                {formError && formValues.password == "" && (
                  <div>
                    <small className="text-danger mb-2">
                      password is required!
                    </small>
                  </div>
                )}
              </div>

              <div className="text-center">
                {isLoading ? (
                  <ButtonSpinnerComponent />
                ) : (
                  <button
                    className="btn mt-3"
                    type="submit"
                    style={{ backgroundColor: "gray", color: "white" }}
                  >
                    Login
                  </button>
                )}
              </div>
            </form>

            <div className="text-center mt-3">
              <p>
                <Link
                  to="/"
                  className="link-dark link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
                  style={{ marginLeft: "15px" }}
                >
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
