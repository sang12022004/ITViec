import React from "react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import Banner from "./components/Banner";
import Title from "./components/Title";
import FilterBar from "./components/FilterBar";
import Footer from "./components/FooterBar";
import JobListBar from "./components/JobListBar";

function App() {
  return (
    <div className="main">
      <div className="background"></div>
      <Navbar/>
      <SearchBar/>
        <div class="wrapper">
          <Banner />
        </div>
        <Title/>
        <FilterBar/>
        <JobListBar/>
        <Footer/>
      </div>
  );
}

export default App;
