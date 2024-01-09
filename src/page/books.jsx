import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export function Book() {
  const [search, setSearch] = useState("");
  const [isData, setIsData] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [formValues, setFormValues] = useState({
    phoneNumber: "",
    email: "",
    selectedOption: "",
  });
  const [isLoadingSave, setIsLoadingSave] = useState(false);
  const [formError, setFormError] = useState(false);

  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const filterDataByName = () => {
    if (search.trim() !== "") {
      const filteredData = data.filter((book) =>
        book.name.toLowerCase().includes(search.toLowerCase())
      );
      setData(filteredData);
    }
  };


  // Add the getNextPage function
  const getNextPage = async () => {
    try {
      setLoading(true);
      const nextPageUrl = `https://www.anapioficeandfire.com/api/books?page=${currentPage + 1}&pageSize=10`;
      const response = await axios.get(nextPageUrl);
      const nextPageData = response.data;

      // Update the current page and append the new data to the existing data
      setCurrentPage((prevPage) => prevPage + 1);
      setData((prevData) => [...prevData, ...nextPageData]);
    } catch (error) {
      console.error("Error fetching next page:", error);
    } finally {
      setLoading(false);
    }
  };

  // Add the getPreviousPage function
  const getPreviousPage = async () => {
    try {
      if (currentPage > 1) {
        setLoading(true);
        const previousPageUrl = `https://www.anapioficeandfire.com/api/books?page=${currentPage - 1}&pageSize=10`;
        const response = await axios.get(previousPageUrl);
        const previousPageData = response.data;

        // Update the current page and replace the existing data with the previous page data
        setCurrentPage((prevPage) => prevPage - 1);
        setData(previousPageData);
      }
    } catch (error) {
      console.error("Error fetching previous page:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://www.anapioficeandfire.com/api/books"
        );

        setIsData(true);
        console.log(response.data, "response data");
        setData(response.data); // Assuming the data is an array in the response
      } catch (error) {
        console.error("Error fetching books:", error);
        setIsData(false);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    filterDataByName();
  }, [search]); // Re-filter when the search term changes

  function resetForm() {
    setTimeout(function () {
      location.reload();
    }, 1500);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (search.trim() !== "") {
      const filteredData = data.filter((book) =>
        book.name.toLowerCase().includes(search.toLowerCase())
      );
      setData(filteredData);
    }
  };

  return (
    <>
      <nav className="navbar shadow-sm  navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img
              src="https://img.freepik.com/free-photo/flat-lay-workplace-arrangement-purple-background-with-copy-space_23-2148404535.jpg?w=1060&t=st=1704797216~exp=1704797816~hmac=e448fa2c821de25de53c7a86043a45ce54945e872b0be35212ac51c37e164c9f" // Corrected the image path
              alt="Bootstrap"
              width="30"
              height="24"
            />
            Books
          </a>

          <Link
            className="link-dark link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
            to="/"
          >
            <strong> Log Out </strong>
          </Link>
        </div>
      </nav>

      <div className="mx-auto container" style={{ maxWidth: "50em" }}>
        <form
          className="d-flex mt-4 me-2"
          onSubmit={(e) => handleSubmit(e)}
          role="search"
        >
          <input
            className="form-control mr-2"
            type="search"
            placeholder="Enter a book name"
            aria-label="Search"
            value={search}
            onChange={handleSearchChange}
          />

          {isLoading ? (
            <button
              className="btn btn-outline-success mb-2"
              type="button"
              disabled
            >
              <span role="status"></span>
              <span
                className="spinner-border spinner-border-sm"
                aria-hidden="true"
              ></span>
            </button>
          ) : (
            <button className="btn btn-success" type="submit">
              Search
            </button>
          )}
        </form>
      </div>

      {isData ? (
        <>
          <div className="container-fluid mt-4">
            <table class="table table-responsive-sm-lg-md">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Book name</th>
                  <th scope=""> ISBN </th>
                  <th scope="col"> Author </th>
                  <th scope="col">Number of Pages</th>
                  <th scope="col"> Publisher </th>
                  <th scope="col"> country </th>
                  <th scope="col">Media type </th>
                  <th scope="col"> Date released </th>
                </tr>
              </thead>
              <tbody>
                {data.map((book, index) => (
                  <tr key={book.url}>
                    <td> {index + 1}</td>
                    <td>{book.name}</td>
                    <td>{book.isbn}</td>
                    <td>{book.authors.join(", ")}</td>
                    <td>{book.numberOfPages}</td>
                    <td>{book.publisher}</td>
                    <td>{book.country}</td>
                    <td>{book.mediaType}</td>
                    <td>{book.released}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-3">
              <button
                className="btn btn-primary me-2"
                onClick={getPreviousPage}
                disabled={currentPage === 1} // Disable when on the first page
              >
                Previous
              </button>
              <button
                className="btn btn-primary"
                onClick={getNextPage}
                disabled={currentPage === 2} // Disable when on the second page
              >
                Next
              </button>
            </div>
          </div>
        </>
      ) : (
        <> 
          
          
        
         </>
      )}
    </>
  );
}
