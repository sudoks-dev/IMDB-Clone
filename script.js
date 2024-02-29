// Adding an event listener to an input field with the id 'searchInput'
// This listener triggers the searchMovies function whenever there's an input event
document.getElementById('searchInput').addEventListener('input', searchMovies);

// Function to search for movies using the OMDb API
function searchMovies() {
    // Extracting the query value from the input field and trimming any extra spaces
    const query = this.value.trim();
    
    // If the query is empty, clear the search results and return
    if (query.length === 0) {
        clearResults();
        return;
    }

    // Fetching data from the OMDb API based on the search query
    fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=16f94fa7&s=${query}`)
        .then(response => response.json()) // Parsing the response as JSON
        .then(data => displaySearchResults(data)) // Displaying search results
        .catch(error => console.error('Error:', error)); // Handling any errors
}

// Function to display search results on the webpage
function displaySearchResults(data) {
    clearResults(); // Clearing previous search results
    const searchResultsContainer = document.getElementById('searchResults'); // Getting the container to display search results
    
    // If no results were found, display a message
    if (!data.Search) {
        searchResultsContainer.innerHTML = '<p>No results found</p>';
        return;
    }

    // Retrieving favorites from local storage and creating a map for easier lookup
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    let favoriteMoviesMap = new Map(favorites.map(movie => [movie.id, movie]));

    // Looping through each movie in the search results
    data.Search.forEach(movie => {
        const movieCard = createMovieCard(movie); // Creating a movie card for each movie
        
        // Checking if the current movie is in the favorites
        if (favoriteMoviesMap.has(movie.imdbID)) {
            const favoriteMovie = favoriteMoviesMap.get(movie.imdbID); // Getting the favorite movie details
            // Adding a button to remove the movie from favorites
            movieCard.innerHTML += `
                <button class="btn btn-danger mt-2" onclick="removeFromFavorites('${favoriteMovie.id}')">Remove from Favorites</button>
            `;
            searchResultsContainer.prepend(movieCard); // Prepending the movie card with remove button
        } else {
            searchResultsContainer.appendChild(movieCard); // Appending the movie card to the search results
        }
    });
}

// Function to clear the search results
function clearResults() {
    document.getElementById('searchResults').innerHTML = '';
}

// Function to create a movie card element
function createMovieCard(movie) {
    const movieCard = document.createElement('div'); // Creating a new div element for the movie card
    movieCard.classList.add('col-md-4', 'my-3'); // Adding classes to style the card
    
    // Creating HTML content for the movie card using template literals
    movieCard.innerHTML = `
        <div class="card shadow">
            <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'placeholder.png'}" class="card-img-top" alt="${movie.Title}">
            <div class="card-body">
                <h5 class="card-title">${movie.Title}</h5>
                <p class="card-text">Year: ${movie.Year}</p>
                <button class="btn btn-primary" onclick="addToFavorites('${movie.imdbID}', '${movie.Title}', '${movie.Poster}', '${movie.Year}')">Add to Favorites</button>
            </div>
        </div>
    `;

    return movieCard; // Returning the created movie card element
}

// Function to add a movie to favorites
function addToFavorites(id, title, poster, year) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || []; // Retrieving favorites from local storage
    // Checking if the movie is already in favorites
    if (!favorites.some(movie => movie.id === id)) {
        // If not, adding the movie to favorites
        favorites.push({ id, title, poster, year });
        localStorage.setItem('favorites', JSON.stringify(favorites)); // Saving favorites to local storage
        alert('Added to favorites!'); // Alerting the user
    }
}

// Function to navigate to the favorite movies page
function viewFavoriteMovies() {
    window.location.href = 'favorites.html'; // Redirecting to the favorites page
}
