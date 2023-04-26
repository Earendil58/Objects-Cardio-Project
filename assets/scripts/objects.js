const addMovieBtn = document.getElementById('add-movie-btn');
const searchBtn = document.getElementById('search-btn');

const movies = [];

const renderMovies = (filter = '') => {
    const movieList = document.getElementById('movie-list');

    if (movies.length === 0) {
        movieList.classList.remove('visible');
    } else {
        movieList.classList.add('visible');
    }

    movieList.innerHTML = '';

    const filteredMovies = !filter ? movies : movies.filter(movie => movie.info.title.includes(filter));

    filteredMovies.forEach((movie) => {
        const movieEl = document.createElement('li');
        const { info, ...otherProps } = movie;
        console.log('esto es otherProps', otherProps);
        // const { title: movieTitle } = info;
        // const { getFormattedTittle } = movie;
        let text = movie.getFormattedTittle() + ' - ';
        for (const key in info) {
            if (key !== 'title') {
                text = text + `${key}: ${info[key]}`;
            }
        };
        movieEl.textContent = text;
        movieList.append(movieEl);
    });
};

const addMovieHandler = () => {
    const title = document.getElementById('title').value;
    const extraName = document.getElementById('extra-name').value;
    const extraValue = document.getElementById('extra-value').value;

    if (title.trim() === '' || extraName.trim() === '' || extraValue.trim() === '') {
        return;
    };

    const newMovie = {
        info: {
            title,
            [extraName]: extraValue
        },
        id: Math.random(),
        getFormattedTittle: function () {
            return this.info.title.toUpperCase();
        }
    };

    movies.push(newMovie);

    renderMovies();
};


searchMovieHandler = () => {
    const filterTerm = document.getElementById('filter-title').value;
    renderMovies(filterTerm);
};

addMovieBtn.addEventListener('click', addMovieHandler);
searchBtn.addEventListener('click', searchMovieHandler);