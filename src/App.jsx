import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GridLoader from "react-spinners/GridLoader";
import Card from './components/Card';

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

  useEffect(() => {
    const getData = async () => {
      const options = {
        method: 'GET',
        url: 'https://imdb-top-100-movies.p.rapidapi.com',
        headers: {
          'X-RapidAPI-Key': 'fbe209ce8bmsh3007d13fbb0d7bdp1ee878jsn1eb1f3510fe1',
          'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
        }
      };
      
      try {
        setLoading(true);
        const response = await axios.request(options);
        const Data = response.data;
        setMovies(Data);
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
      <h1>Top 100 Movies on IMDB</h1>
      <input
        type="text"
        placeholder="Search film"
        value={searchTerm}
        onChange={handleSearch}
      />
      {loading ? (
        <div style={{ textAlign: 'center' }}>
          <GridLoader color="#ff6347" size={50} aria-label="Loading Spinner" css={override} />
        </div>
      ) : (
        <div className="cards">
          {movies.map((movie, index) => (
            <Card key={index} title={movie.title} year={movie.year} big_image={movie.big_image} />
          ))}
        </div>
      )}
    </div>
  );
}
