function search(resourceType, query) {
  const url = `https://swapi.dev/api/${resourceType}/?search=${encodeURIComponent(query)}`;
  // console.log(url);

  return axios.get(url)
    // .then((response) => { console.log(response); return response;  })
    .then((response) => response.data.results);

  // return fetch(url)
  //   .then(response => response.json())
  //   .then(data => data.results);

  // return Promise.resolve([{
  //   "name": "Tatooine", 
  //   "rotation_period": "23", 
  //   "orbital_period": "304", 
  //   "diameter": "10465", 
  //   "climate": "arid", 
  //   "gravity": "1 standard", 
  //   "terrain": "desert", 
  //   "surface_water": "1", 
  //   "population": "200000", 
  //   "residents": [
  //       "https://swapi.dev/api/people/1/", 
  //       "https://swapi.dev/api/people/2/", 
  //       "https://swapi.dev/api/people/4/", 
  //       "https://swapi.dev/api/people/6/", 
  //       "https://swapi.dev/api/people/7/", 
  //       "https://swapi.dev/api/people/8/", 
  //       "https://swapi.dev/api/people/9/", 
  //       "https://swapi.dev/api/people/11/", 
  //       "https://swapi.dev/api/people/43/", 
  //       "https://swapi.dev/api/people/62/"
  //   ], 
  //   "films": [
  //       "https://swapi.dev/api/films/1/", 
  //       "https://swapi.dev/api/films/3/", 
  //       "https://swapi.dev/api/films/4/", 
  //       "https://swapi.dev/api/films/5/", 
  //       "https://swapi.dev/api/films/6/"
  //   ], 
  //   "created": "2014-12-09T13:50:49.641000Z", 
  //   "edited": "2014-12-20T20:58:18.411000Z", 
  //   "url": "https://swapi.dev/api/planets/1/"
  // }]);
}

function loadFilmPosters() {
  return axios.get('https://swapi.dev/api/films/')
    .then(function(response) {
      const movies = response.data.results;
      // console.log(movies);

      return Promise.all(
        movies
          .map(m => encodeURIComponent("Star Wars " + m.title))
          .map(t => axios.get(`https://www.omdbapi.com/?s=${t}&apikey=856ce5e2`))
      );
    })
    .then(function(omdbSearches) {
      return omdbSearches.map(res => res.data.Search[0].Poster);
    });

  // return Promise.resolve([
  //   'https://m.media-amazon.com/images/M/MV5BOTA5NjhiOT…TU1ZDJkXkEyXkFqcGdeQXVyMTA4NDI1NTQx._V1_SX300.jpg', 
  //   'https://m.media-amazon.com/images/M/MV5BYmU1NDRjND…TU4OTE0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg', 
  //   'https://m.media-amazon.com/images/M/MV5BOWZlMjFiYz…Tk0ODk1XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg', 
  //   'https://m.media-amazon.com/images/M/MV5BYTRhNjcwNW…WI0ZDA2XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg', 
  //   'https://m.media-amazon.com/images/M/MV5BMDAzM2M0Y2…DVlMTU5XkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_SX300.jpg', 
  //   'https://m.media-amazon.com/images/M/MV5BNTc4MTc3NTQ5OF5BMl5BanBnXkFtZTcwOTg0NjI4NA@@._V1_SX300.jpg'
  // ]);
}

// loadFilmPosters().then(console.log);

// search('planets', 'dan')
//   .then(console.log);

// What is array.map()?
// function map(array, predicate) {
//   const newArray = [];

//   for(let element of array) {
//     newArray.push(predicate(element));
//   }

//   return newArray;
// }

// const myArray = [1,2,3,4,5],
//       doubles = myArray.map(function(n) { return n * 2 });
      // doubles = map(myArray, function(n) { return n * 2 });

// for(let e of myArray) {
//   doubles.push(e * 2);
// }

// console.log(doubles);