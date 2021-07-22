
const filmsListContainer = document.querySelector('#films-list');
const filmDetailContainer = document.querySelector('#film-detail');

const app = () => {
    listFilms();
}

const listFilms = () => {
    showPreloader(filmsListContainer);
    fetch('https://swapi.dev/api/films/')
        .then(response => response.json())
        .then(data => {
            renderListFilms(data.results);
            hidePreloader(filmsListContainer);
            return true;
        });

}

const getFilm = (url) => {
    showPreloader(filmDetailContainer);
    // получаем и выводим содержимое фильма
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const dateCreated = new Date(data.created);
            const dateEdited = new Date(data.edited);

            hidePreloader(filmDetailContainer);

            filmDetailContainer.innerHTML = `
                <p>title: ${data.title}</p>
                <p>created: ${dateCreated}</p>
                <p>director: ${data.director}</p>
                <p>edited: ${dateEdited}</p>
            `
            return true;
        });
}

const renderListFilms = (films) => {
    // выводим список фильмов
    for(let i = 0; i < films.length; i++) {
        filmsListContainer.innerHTML += `<a href="${films[i].url}" class="film-item">${films[i].title}</div>`;
    }

    // вешаем обработчики на элементы списка
    renderedItems = document.querySelectorAll('.film-item');
    for (let i = 0; i < films.length; i++) {
        renderedItems[i].addEventListener('click', (event) => {
            event.preventDefault();
            console.log(event);
            getFilm(event.target.href);
        });
    }
}

const showPreloader = (element) => {
    element.classList.add('spinner');
}

const hidePreloader = (element) => {
    element.classList.remove('spinner');
}

app();