// Function to navigate to the homepage by changing the window location
function goToHomePage() {
    window.location.href = 'index.html';
}

// Event listener for when the DOM content is loaded, calls displayFavoriteMovies function
document.addEventListener('DOMContentLoaded', () => {
    displayFavoriteMovies();
});

// Function to display favorite movies
function displayFavoriteMovies() {
    // Get the container element where favorite movies will be displayed
    const favoritesContainer = document.getElementById('favoriteMovies');
    // Clear the container
    favoritesContainer.innerHTML = '';
    // Get favorite movies from localStorage or initialize an empty array
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // If no favorite movies are present, display a message and return
    if (favorites.length === 0) {
        favoritesContainer.innerHTML = '<p>No favorite movies added yet.</p>';
        return;
    }

    // Iterate through each favorite movie and create a card for it
    favorites.forEach(movie => {
        const movieCard = createFavoriteMovieCard(movie); // Call createFavoriteMovieCard function
        favoritesContainer.appendChild(movieCard); // Append the created card to the container
    });
}

// Function to create a card for a favorite movie
function createFavoriteMovieCard(movie) {
    // Create a div element for the movie card
    const movieCard = document.createElement('div');
    // Add Bootstrap classes to style the card
    movieCard.classList.add('col-md-4', 'my-3');

    // Populate the inner HTML of the card with movie information
    movieCard.innerHTML = `
        <div class="card shadow">
            <img src="${movie.poster !== 'N/A' ? movie.poster : 'placeholder.png'}" class="card-img-top" alt="${movie.title}">
            <div class="card-body">
                <h5 class="card-title">${movie.title}</h5>
                <p class="card-text">Year: ${movie.year}</p>
                <button class="btn btn-danger" onclick="removeFromFavorites('${movie.id}')">Remove from Favorites</button>
            </div>
        </div>
    `;

    // Return the created movie card
    return movieCard;
}

// Function to remove a movie from favorites
function removeFromFavorites(id) {
    // Get favorite movies from localStorage or initialize an empty array
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    // Filter out the movie with the given id
    favorites = favorites.filter(movie => movie.id !== id);
    // Update the favorites in localStorage
    localStorage.setItem('favorites', JSON.stringify(favorites));
    // Redisplay favorite movies
    displayFavoriteMovies();
}
