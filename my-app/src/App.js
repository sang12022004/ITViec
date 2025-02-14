import React from "react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import Banner from "./components/Banner";
import Title from "./components/Title";
import FilterBar from "./components/FilterBar";
import Footer from "./components/FooterBar";
import JobListBar from "./components/JobListBar";
import Pagination from "./components/Pagination";

function App() {
  return (
    <div class="main">
      <div class="background"></div>
      <Navbar/>
      <SearchBar/>
      <div class="wrapper">
        <Banner />
        <div class="gray-background"></div>
      </div>
      <Title/>
      <FilterBar/>
      <div class="body-content">
        <div class="row">
          <div class="col-md-5 job-list-container">
            <JobListBar />
          </div>
          <div class="col-md-7">
          </div>
        </div>
      </div>
      <Pagination />
      <Footer/>
    </div>
  );
}

export default App;
