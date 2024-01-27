//Creating the Movie class
class Movie{
    constructor(title, genre, year, available = true) {
        this.title = title;
        this.genre = genre;
        this.year = year;
        this.available = available;
    }

    //Renting a movie
    rent(){
        if(this.available){
            this.available = false;
            console.log(`You have rented '${this.title}'`);
            return this.title;
        }else{
            console.log(`${this.title} is not available`)
        }
    }

    // Returning a rented movie
    returnMovie(){
        this.available = true;
        console.log(`You have returned ${this.title}`)
    }
}

//Creating the Store class so people can rent movies
class MovieStore {
    constructor(name, movies) {
      this.name = name;
      this.movies = movies;
    }
    
    //Searching for a specific movie
    searchMovie(title) {
    return this.movies.find((movie) => movie.title === title);
    }

    rentMovie(title){
        const movie = this.searchMovie(title)
        if(movie){
            movie.rent();
            return movie;
        }else{
            console.log(`${title} is not available`)
        }
    }

    returnMovie(title){
        const movie = this.searchMovie(title);
        if(movie){
            movie.returnMovie();
            return movie;
        }else{
            console.log(`${title} is not available`)
        }
    }
}

// Test Cases
const movies = [
    new Movie("The Shawshank Redemption", "Drama", 1994),
    new Movie("The Godfather", "Crime", 1972),
    new Movie("The Dark Knight", "Action", 2008),
    new Movie('Breaking Bad', 'Crime', 2017),
    new Movie('Bob Hearts Abishola', 'Comedy', 2018),
    new Movie('The Good Doctor', 'Drama', 2019),
    new Movie('Fringe', 'Sci-Fi', 2017),
    new Movie('FBI', 'Action', 2018),
    new Movie('FBI most wanted', 'Action', 2019),
];

const movieStore = new MovieStore("Video Paradise", movies);

const fbi = movieStore.rentMovie("FBI");

console.log(fbi.available)
movieStore.returnMovie("FBI");
console.log(fbi.available)
console.log(movieStore.returnMovie("The Shawshank Redemption"));

