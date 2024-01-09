import { useState } from "react";
import axios from "axios";
import { APIURL } from "../App";
import { toast } from "react-toastify";
import { useNavigate, Link, useLocation } from "react-router-dom";

export function VerifyUser() {
  const [value, setValue] = useState({ token: "" });
  const [formError, setFormError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (value.token === "") {
      setFormError(true);
      return;
    }
    setIsLoading(true);

    try {
      let response = await axios.post(`${APIURL}verify-user`, value);
      setIsLoading(false);
      if (response.data.code == 1) {

        alert(response.data.payload)

        // toast.success(response.data.payload, {
        //   position: "top-right",
        //   autoClose: 5000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "light",
        // });

        setTimeout(() => {
          navigate("/user/login");
        }, 5000);
      }
    } catch (error) {
        alert(error.response.data.error)
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
            <h3 className="card-title text-center">Verify Account</h3>

            <form onSubmit={handleSubmit}>
              <div className="mb-3 mx-auto">
                <label htmlFor="otpInput" className="form-label">
                  <strong>OTP</strong>
                  <span style={{ color: "red" }}> *</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="otpInput"
                  placeholder="Enter your OTP"
                  value={value.token}
                  maxLength={8}
                  onChange={(e) =>
                    setValue({ ...value, token: e.target.value })
                  }
                  required
                />
                {formError && value.token === "" && (
                  <small className="text-danger text-center mb-2">
                    OTP is required!
                  </small>
                )}
              </div>
              <div className="text-center">
                <button
                  className="btn mt-3"
                  type="submit"
                  style={{ backgroundColor: "gray", color: "white" }}
                >
                  Verify User
                </button>
              </div>
            </form>

            {/* <div className="text-center mt-3">
              <p>
                Didn't receive the OTP?
                <button
                  className="btn-link border-0 ml-3"
                  style={{ cursor: "pointer", marginLeft: "8px" }}
                  onClick={handleResendOTP}
                >
                  Resend OTP
                </button>
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
