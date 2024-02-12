import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GridLoader from "react-spinners/GridLoader";
import Card from './components/Card/card';
import './App.css'
import { ThemeProvider } from './context';
import ThemedButton from './components/Card/Button/button';
import { ThemeContext } from './context';
import { useContext } from 'react';

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function App() {
  const [movies, setMovies] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState([])
  const [searchTerm, setSearchTerm] = useState('');
  const { theme} = useContext(ThemeContext);



  console.log(useContext(ThemeContext))

  useEffect(() => {
    const getData = async () => {
      const options = {
        method: 'GET',
        url: 'https://imdb-top-100-movies.p.rapidapi.com',
        headers: {
          'X-RapidAPI-Key': 'b78950ca13mshd6471d0c63e8686p1899d4jsn30c07a7f9f92',
          'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
        }
      };
      
      try {
        setLoading(true);
        const response = await axios.request(options);
        const Data = response.data;
        setMovies(Data);
        setFilteredMovies(Data)
        setLoading(false); 
      } catch (error) {
        console.error(error);
        setLoading(false); 
      }
    };
    
    getData();
  }, []);

  useEffect(() => {
    const filtered = movies.filter(movie =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMovies(filtered);
  }, [searchTerm, movies]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="container">
      <div className="top">
        <div className="heading">
          <h1 style={{}}>Top 100 Movies on IMDB</h1>
          <div className="button">
          <ThemedButton /> 
        </div> 
        </div>

      <div className="search">
         <input
        type="text"
        placeholder="Search film"
        value={searchTerm}
        onChange={handleSearch}
      />
      </div>
      </div>
     
      {loading ? (
        <div style={{ textAlign: 'center' }}>
          <GridLoader color="#ff6347" size={50} aria-label="Loading Spinner" css={override} />
        </div>
      ) : (
        <div className="cards">
          {filteredMovies.map((movie, index) => (
            <Card key={index} title={movie.title} year={movie.year} big_image={movie.big_image} />
          ))}
        </div>
      )}
    </div>
  );
  
}
