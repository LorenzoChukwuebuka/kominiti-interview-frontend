import "./../assets/css/buttonSpinner.css";
const ButtonSpinnerComponent = () => {
  return (
      <button
          className="btn mb-2"
          type="button"
          style={{ backgroundColor: "gray", color: "white" }}
          disabled
      >
        <span role="status">Please wait...</span>
        <span
            className="spinner-border spinner-border-sm"
            aria-hidden="true"
        ></span>
      </button>
  );
};

export default ButtonSpinnerComponent;
