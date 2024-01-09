import { useState } from "react";
import axios from "axios";
import { APIURL } from "../App";
import ButtonSpinnerComponent from "../components/buttonSpinner.component";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

export function SignUp() {
  const [formValues, setFormValues] = useState({
    full_name: "",
    phone_number: "",
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordRequirements, setPasswordRequirements] = useState([
    { text: "Not less than 8 characters", fulfilled: false },
    { text: "Must contain a number", fulfilled: false },
    { text: "Must contain a special character", fulfilled: false },
  ]);
  const [showEye, setShowEye] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const navigate = useNavigate();

  const showPasswordHandler = () => {
    setShowEye(!showEye);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let Notvalid = Object.values(formValues).some((value) => value === "");

    if (Notvalid) {
      setFormError(true);
      return;
    }
    setIsLoading(true);
    try {
      let response = await axios.post(`${APIURL}register-user`, formValues);

      console.log(response);
      setIsLoading(false);
      if (response.data.code == 1) {
        // toast.success(response.data.payload.message, {
        //   position: "top-right",
        //   autoClose: 5000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "light",
        // });

        alert("account created successfully");

        setTimeout(() => {
          navigate('/verify/user');
        }, 5000);
      }
    } catch (error) {
      setIsLoading(false);

      //   toast.error(error.response.data.error, {
      //     position: "top-right",
      //     autoClose: 5000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //     theme: "light",
      //   });

      alert(error.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="row container-fluid">
        <div
          className="col-sm-12 col-md-8 col-lg-8 overflow-y-auto"
          style={{ paddingRight: "16px" }}
        >
          <div className="card border-0 mx-auto mt-5 mb-1">
            <h1 className=" text-success text-center">Sign Up</h1>
            <h3 className="text-center mt-2">Create an account</h3>
            <p className="text-center lead mt-1">
              Get set up in just a few minutes. Already a member?
              <Link className="text-decoration-none " to="/user/login">
                Sign in
              </Link>
            </p>
            <form className="mt-4" onSubmit={handleSubmit}>
              <div className="mb-3 mx-auto w-50">
                <label className="form-label">
                  <strong> Full name </strong>
                  <span style={{ color: "red" }}> * </span>
                </label>
                <br />

                <input
                  type="text"
                  name="firstname"
                  className="form-control "
                  placeholder=""
                  onChange={(event) => {
                    setFormValues({
                      ...formValues,
                      full_name: event.target.value,
                    });
                  }}
                  required
                />
                {formError && formValues.firstname == "" && (
                  <div>
                    <small className="text-danger mb-2">
                      fullname is required!
                    </small>
                  </div>
                )}

                <label className="form-label">
                  <strong> phone number </strong>
                  <span style={{ color: "red" }}> * </span>
                </label>
                <br />

                <input
                  type="text"
                  name="lastname"
                  className="form-control "
                  placeholder=""
                  required
                  onChange={(event) => {
                    setFormValues({
                      ...formValues,
                      phone_number: event.target.value,
                    });
                  }}
                />

                <label className="form-label">
                  <strong> Email </strong>
                  <span style={{ color: "red" }}> * </span>
                </label>
                <br />

                <input
                  type="email"
                  name="email"
                  className="form-control "
                  placeholder=""
                  required
                  onChange={(event) => {
                    setFormValues({
                      ...formValues,
                      email: event.target.value,
                    });
                  }}
                />
                {formValues.email !== "" &&
                  !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(
                    formValues.email
                  ) && (
                    <div>
                      {" "}
                      <small className="text-danger mb-2">
                        Invalid email address
                      </small>
                    </div>
                  )}

                <label className="form-label ">
                  <strong> Password </strong>
                  <span style={{ color: "red" }}> * </span>
                </label>
                <br />
                <div className="input-group">
                  <input
                    type={showEye ? "text" : "password"}
                    name="password"
                    className="form-control"
                    placeholder=""
                    required
                    onFocus={() => setIsPasswordFocused(true)}
                    onBlur={() => setIsPasswordFocused(false)}
                    onChange={(event) => {
                      const newPassword = event.target.value;
                      setFormValues({
                        ...formValues,
                        password: newPassword,
                      });

                      // Check password requirements only when focused
                      if (isPasswordFocused) {
                        const updatedRequirements = passwordRequirements.map(
                          (requirement) => {
                            switch (requirement.text) {
                              case "Not less than 8 characters":
                                return {
                                  ...requirement,
                                  fulfilled: newPassword.length >= 8,
                                };
                              case "Must contain a number":
                                return {
                                  ...requirement,
                                  fulfilled: /\d/.test(newPassword),
                                };
                              case "Must contain a special character":
                                return {
                                  ...requirement,
                                  fulfilled: /[!@#$%^&*(),.?":{}|<>]/.test(
                                    newPassword
                                  ),
                                };
                              default:
                                return requirement;
                            }
                          }
                        );

                        setPasswordRequirements(updatedRequirements);
                      }

                      setIsLoading(false);
                    }}
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
                <br />

                {isPasswordFocused &&
                  passwordRequirements.some(
                    (requirement) => !requirement.fulfilled
                  ) && (
                    <div className="error-container">
                      <small className="text-danger mb-2">
                        Password requirements not met:
                        <ul>
                          {passwordRequirements
                            .filter((requirement) => !requirement.fulfilled)
                            .map((unfulfilledRequirement, index) => (
                              <li key={index}>{unfulfilledRequirement.text}</li>
                            ))}
                        </ul>
                      </small>
                    </div>
                  )}
                {isLoading ? (
                  <ButtonSpinnerComponent />
                ) : (
                  <button
                    className="btn"
                    type="submit"
                    style={{ backgroundColor: "gray", color: "white" }}
                  >
                    Create Account
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
        <div
          className="col-md-4 d-none d-md-block"
          style={{
            position: "fixed",
            top: "0",
            right: "0",
            height: "100vh",
            overflowY: "auto",
          }}
        >
          <img
            className="mt-5"
            style={{ width: "90%", height: "80%" }}
            src="https://img.freepik.com/free-photo/flat-lay-workplace-arrangement-purple-background-with-copy-space_23-2148404535.jpg?w=1060&t=st=1704797216~exp=1704797816~hmac=e448fa2c821de25de53c7a86043a45ce54945e872b0be35212ac51c37e164c9f"
            alt="Email Marketing"
          />
        </div>
      </div>
    </>
  );
}
