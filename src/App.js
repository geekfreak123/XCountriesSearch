import React, { useState, useEffect } from "react";
import "./styles.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
      if (!response.ok) {
        throw new Error("Failed to fetch countries");
      }
      const data = await response.json();
      setCountries(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  return (
    <div className="container">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />
      <div id="countryContainer">
        {countries
          .filter((country) =>
            country.name.common.toLowerCase().includes(searchTerm),
          )
          .map((country) => (
            <div key={country.name.common} className="countryCard">
              <img
                src={country.flags.png}
                alt={`${country.name.common} flag`}
              />
              <span>{country.name.common}</span>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
