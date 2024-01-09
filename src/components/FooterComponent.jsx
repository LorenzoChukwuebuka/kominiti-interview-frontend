import "./../assets/css/footer.css"

export default function Footer() {
  return (
    <footer className="bg-tertiary  text-dark text-center py-2 mt-2">
      <div className="container mx-auto text-center">
        <p className="text-center  mx-auto">
          &copy; {new Date().getFullYear()} Enugu Electricity Distribution Company. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
