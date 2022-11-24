import React, { useCallback, useEffect, useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import MoviesForm from './components/MoviesForm';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retrying, setRetrying] = useState();
  const [check, setCheck] = useState(false);
  
  const fetchMoviesHandler = useCallback(async() => {
    setLoading(true);
    setError(null);
    try{
      const response = await fetch('https://react-http-579fc-default-rtdb.firebaseio.com/movies.json');
      if(!response.ok){
        throw new Error('Something went wrong...Retrying');
      }
       const data = await response.json();
        
       const loadedMovies = [];

       for(const key in data){
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        })
       };
        setMovies(loadedMovies);
    }catch(error) {
      setError(error.message);
      setCheck(true);
      const retrying = setTimeout(() => {
        fetchMoviesHandler();
      },5000);
      setRetrying(retrying);
    }
      
        setLoading(false);
  },[]);

  useEffect(() => {
    fetchMoviesHandler()
    console.log('useEffect is called');
  },[fetchMoviesHandler])

  async function addMovieHandler (movie) {
    const response = await fetch('https://react-http-579fc-default-rtdb.firebaseio.com/movies.json',{
      method: 'POST',
      body: JSON.stringify(movie),
      headers: {
        'Content-type' : 'application/json'
      },
    })
    const data = await response.json();
    console.log(data);
  };

  const deleteMovieHandler = async (id) => {
   const deleteResponse = await fetch('https://react-http-579fc-default-rtdb.firebaseio.com/movies/${id}.json',{
      method: 'DELETE',
      body: JSON.stringify(id),
      headers: {
        'Content-type' : 'application/json'
      },
    })
    const data = deleteResponse.json();
    console.log(data);
    
  }

  let content = <p>No movies Found</p>

  if(movies.length > 0) {
    content = <MoviesList movies={movies} onDeleteMovie={deleteMovieHandler}/>
  };

  const retryingHandler = () => {
      clearTimeout(retrying);
      setCheck(false);
    
  }

  if(error){
    content = <p>{retrying && error}</p>
  }

  if(loading){
    content = <p>Loading...</p>
  }

  return (
    <React.Fragment>
      <MoviesForm onAddMovie={addMovieHandler}/>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
        {check && !loading && error &&  <button onClick={retryingHandler}>Cancel</button>}
      </section>
    </React.Fragment>
  );
}

export default App;
