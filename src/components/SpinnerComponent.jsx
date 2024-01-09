import "./../assets/css/spinner.css";
export default function Spinner() {
  return (
    <>
      <button className="btn btn-primary mb-2" type="button" disabled>
        <span role="status">Please wait...</span>
        <span
          className="spinner-border spinner-border-sm"
          aria-hidden="true"
        ></span>
      </button>
    </>
  );
}
