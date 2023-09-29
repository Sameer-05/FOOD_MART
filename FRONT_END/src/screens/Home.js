import React, { useEffect, useState } from "react";
import Card from "../components/Card";
// import Craousel from "../components/Craousel";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [search,setSearch]=useState("");

  const loadData = async () => {
    try {
      let response = await fetch("http://localhost:5200/api/foodData", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }
      });
      response = await response.json();
      setFoodItem(response[0]);
      setFoodCat(response[1]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
     <div><Navbar /></div>
     <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade "
        data-bs-ride="carousel"
      >
        <div className="carousel-inner " id="carousel">
<div class=" carousel-caption  " style={{ zIndex: "9" }}>
            <div className=" d-flex justify-content-center">
              {" "}
             
              <input
                className="form-control me-2 w-75 bg-white text-dark"
                type="search"
                placeholder="Type in..."
                aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}
              />
              {/* <button className="btn text-white bg-success" type="submit">
                Search
              </button> */}
            </div>   </div>
          <div className="carousel-item active">
            <img
              src="https://source.unsplash.com/random/900x700/?burger"
              className="d-block w-100  "
              
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://source.unsplash.com/random/900x700/?pastry"className="d-block w-100 "
              
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://source.unsplash.com/random/900x700/?barbeque"
              className="d-block w-100 "alt="..."
              
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className='container'>
        {foodCat.length !== 0 ? (
          foodCat.map((data, index) => (
            <div key={index} className='row mb-3'>
              <div className="fs-3 m-3">{data.CategoryName}</div>
              <hr />
              {foodItem.length !== 0 ? (
                foodItem
                  .filter((item) =>( item.CategoryName === data.CategoryName)&& (item.name.toLowerCase().includes(search.toLowerCase()))) 
                  .map((filterItems) => (
                    <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                      <Card foodItem={filterItems}
                      options={filterItems.options[0]} imgSrc={filterItems.img}></Card>
                    </div>
                  ))
              ) : (
                <div>no such</div>
              )}
            </div>
          ))
        ) : (<div>No data available</div>
        )}
       
        
      </div>
     <div> <Footer /></div>
    </div>
  );
}



