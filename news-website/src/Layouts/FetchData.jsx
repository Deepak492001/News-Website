import React, { useEffect, useState } from "react";
import { getData } from "../api/fetchData";
import { Link } from "react-router-dom";

const FetchData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  async function fetchData() {
    setLoading(true);
    try {
      const response = await getData();
      console.log(data);
      console.log(response);
      setData(response.articles);
    } catch (error) {
      console.log(error.message);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="container my-4">
        <p>Top Headlines</p>
      </div>
      <div className="container d-flex justify-content-center align-items-center flex-column my-3">
        {data && data.length ? (
          data.map((item, index) => (
            <>
              <div className="container my-3" key={index}>
                <p>{item.title}</p>
                <img
                  src={item.urlToImage}
                  alt="img"
                  className="img-fluid"
                  style={{ width: "auto", height: "100px", objectfit: "cover" }}
                />
                <p>{item.content}</p>
                <p>
                  <Link to={item.url}>read more</Link>
                </p>
              </div>
            </>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};

export default FetchData;
