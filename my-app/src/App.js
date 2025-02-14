import React from "react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import Banner from "./components/Banner";
import Title from "./components/Title";
import FilterBar from "./components/FilterBar";
import Pagination from "./components/Pagination";
import Footer from "./components/FooterBar";

function App() {
  return (
    <div class="main">
      <div class="background"></div>
      <Navbar />
      <SearchBar />
      <div class="wrapper">
        <Banner />
        <div class="gray-background"></div>
      </div>
      <Title />
      <FilterBar />
      <Pagination />
      <Footer />
    </div>
  );
}

export default App;
