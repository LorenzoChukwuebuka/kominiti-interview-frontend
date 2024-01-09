import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SuccessComponent() {
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigate("/");
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, [navigate]);

  return (
    <>
      <div
        style={{ top: "10em" }}
        className="card shadow-sm mb-3 w-25 mt-5 mx-auto"
      >
        <img
          style={{ width: "40%", height: "50%" }}
          src="https://i.gifer.com/7efs.gif"
          className="card-img-top mx-auto"
          alt="..."
        />
        <div className="card-body ">
          <p className="card-text text-center">
            <strong> Validation Successful </strong> <br />
          </p>
          <p className="card-text"></p>
        </div>
      </div>
    </>
  );
}
