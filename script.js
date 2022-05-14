function displayMovie(movie) {
    console.log(movie);
    let ratings = `
    <h3>Movie Ratings</h3>
    <table>
        <tr>
            <th>Source</th>
            <th>Value</th>
            </tr>`;
    movie.Ratings.forEach(element => {
        ratings += `<tr>
            <td>${element.Source}</td>
            <td>${element.Value}</td>
            </tr>`;
    })
    ratings += `</table>`;
    let poster = movie.Poster;
    if (poster == 'N/A')
        poster = 'images/movie_night.jpg';

    let newMovie = `<div>
        <button onclick="loadAll()" class="all-movies">< Back To All Movies</button>
        <div class="movietitle hor">
        <div>
            <h2 class="title">${movie.Title}</h2><p class="year">Year <span>${movie.Year}</span></p>
            <p>Rated: ${movie.Rated}</p>
            <p>IMDB Votes: ${movie.imdbVotes}</p>
            <p>Actors: ${movie.Actors}</p>
            <p>Writers: ${movie.Writer}</p>
        </div>
        <div class="poster"><img class="poster-img" src="${poster}" alt="movie poster ${movie.Title}" ></div>
        </div>
        <div>
        <h2>Plot</h2>
        <p>${movie.Plot}</p>
        </div>
        ${ratings}
        <h3>More Information</h3>
        <p>Release Date: <span>${movie.Released}</span></p>
        <p>Country: <span>${movie.Country}</span></p>
        <p>Language: <span>${movie.Language}</span></p>
        <p>Website: <span>${movie.Website}</span></p>
        <p>Director: <span>${movie.Director}</span></p>
        <p>Metascore: <span>${movie.Metascore}</span></p>
        <button onclick="loadAll()" class="all-movies">< Back To All Movies</button>
        </div>`;
    $(".movies").html(newMovie);
}

function viewMovie(id) {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'movie-database-alternative.p.rapidapi.com',
            'X-RapidAPI-Key': 'b8f65b37d5mshf8368454b4615f2p1ef2e2jsn916411baaf0a'
        }
    };

    fetch(`https://movie-database-alternative.p.rapidapi.com/?r=json&i=${id}`, options)
        .then(response => response.json())
        .then(response => displayMovie(response))
        .catch(err => console.error(err));
}

function loadAll() {
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://movie-database-alternative.p.rapidapi.com/?s=Avengers%20Endgame&r=json&page=1",
        "method": "GET",
        "headers": {
            "X-RapidAPI-Host": "movie-database-alternative.p.rapidapi.com",
            "X-RapidAPI-Key": "b8f65b37d5mshf8368454b4615f2p1ef2e2jsn916411baaf0a"
        }
    };

    $.ajax(settings).done(function(response) {
        console.log(response);
        var data = response.Search;
        $(".movies").html("");
        data.forEach(element => {
            let newMovie = ``;
            if (element.Poster == "N/A") {
                newMovie = `<div class="movie" onclick="viewMovie('${element.imdbID}')">
                <div>
                    <h3 class="title">${element.Title}</h3>
                    <p class="year">Year <span>${element.Year}</span></p>
                    <p class="more-info">Click for more information</p>
                    </div>
                <div class="poster"><img src="images/movie_night.jpg"></div></div>`;
            } else {
                newMovie = `<div class="movie" onclick="viewMovie('${element.imdbID}')">
                <div>
                    <h3 class="title">${element.Title}</h3>
                    <p class="year">Year <span>${element.Year}</span></p>
                    <p class="more-info">Click for more information</p>
                    </div>
                <div class="poster"><img src="${element.Poster}"></div></div>`;

            }
            $(".movies").append(newMovie);
        });
    });
}
loadAll();