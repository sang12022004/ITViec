import React from "react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import Banner from "./components/Banner";

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
    </div>
  );
}

export default App;
