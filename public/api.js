const APIController = (function() {
    
    const clientId = '4c693d7eb651467888c7beae909278ed';
    const clientSecret = 'eed7d9bc6bdc491ba9bc510c6c0e3908';

    const _getToken = async () => {

        const result = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded', 
                'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)
            },
            body: 'grant_type=client_credentials'
        }).then((result) => result.json()).catch((err) => alert(err));

        const data = result;
        return data.access_token;
    }
    
    const _getGenres = async (token) => {

        const result = await fetch(`https://api.spotify.com/v1/browse/categories?locale=sv_US`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        }).then((result) => result.json()).catch(err => alert(err));

        const data = result;
        return data.categories.items;
    }

    const _getPlaylistByGenre = async (token, genreId) => {

        const limit = 15;
        
        const result = await fetch(`https://api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=${limit}`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        }).then((result) => result.json()).catch((err) => alert(err));

        const data = result;
        return data.playlists.items;
    }

    const _getTracks = async (token, tracksEndPoint) => {

        const limit = 10;

        const result = await fetch(`${tracksEndPoint}?limit=${limit}`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        }).then((result) => result.json()).catch((err) => alert(err));

        const data = result;
        return data.items;
    }

    const _getTrack = async (token, trackEndPoint) => {

        const result = await fetch(`${trackEndPoint}`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        }).then((result) => result.json()).catch((err) => alert(err));

        const data = result;
        return data;
    }

    return {
        getToken() {
            return _getToken();
        },
        getGenres(token) {
            return _getGenres(token);
        },
        getPlaylistByGenre(token, genreId) {
            return _getPlaylistByGenre(token, genreId);
        },
        getTracks(token, tracksEndPoint) {
            return _getTracks(token, tracksEndPoint);
        },
        getTrack(token, trackEndPoint) {
            return _getTrack(token, trackEndPoint);
        }
    }
})();

// UI Module
const UIController = function() {

    // Объект для хранения ссылок на selector'ы  html
    const DOMElements = {
        selectGenre: '.genre',
        selectPlaylist: '.playlist',
        buttonSubmit: '.btn_search',
        divSongDetail: '.track_details',
        hfToken: '.hidden_token',
        divSonglist: '.song-list'
    }

    return {
        // Метод - получение полей
        inputField() {
            return {
                genre: document.querySelector(DOMElements.selectGenre),
                playlist: document.querySelector(DOMElements.selectPlaylist),
                tracks: document.querySelector(DOMElements.divSonglist),
                submit: document.querySelector(DOMElements.buttonSubmit),
                songDetail: document.querySelector(DOMElements.divSongDetail)
            }
        },

        // Методы для создания выбора опций
        createGenre(text, value) {
            const html = `<option value="${value}">${text}</option>`;
            this.inputField().genre.insertAdjacentHTML('beforeend', html);
        }, 

        createPlaylist(text, value) {
            const html = `<option value="${value}">${text}</option>`;
            this.inputField().playlist.insertAdjacentHTML('beforeend', html);
        },

        // Методы для создания списка треков
        createTrack(id, name) {
            const html = `<a href="#" class="list-group-item list-group-item-action list-group-item-light" id="${id}">${name}</a>`;
            this.inputField().tracks.insertAdjacentHTML('beforeend', html);
        },

        // Метод для создания деталей трека (картинка, название, артист)
        createTrackDetail(img, title, artist) {
            const trackDetails = this.inputField().songDetail; 
            // Очистка после клика на трек
            trackDetails.innerHTML = '';
            const html = 
            `
            <div class="img_track">
                <img src="${img}" width="128" height="128" alt="">        
            </div>
            <div class="title_track">
                <label for="Genre" class="form-label-genre">${title}</label>
            </div>
            <div class="artist_track">
                <label for="artist" class="form-label-artist">By ${artist}</label>
            </div> 
            `;
            trackDetails.insertAdjacentHTML('beforeend', html)
        },

        resetTrackDetail() {
            this.inputField().songDetail.innerHTML = '';
        },

        resetTracks() {
            this.inputField().tracks.innerHTML = '';
            this.resetTrackDetail();
        },

        resetPlaylist() {
            this.inputField().playlist.innerHTML = '';
            this.resetTracks();
        },

        storeToken(value) {
            document.querySelector(DOMElements.hfToken).value = value;
        },

        getStoredToken() {
            return {
                token: document.querySelector(DOMElements.hfToken).value
            }
        }
    }

}();

const APPController = (function(UICtrl, APICtrl) {

    const DOMInputs = UICtrl.inputField();

    // Получаем жанры при загрузке страницы
    const loadGenres = async () => {
        // Получаем токен
        const token = await APICtrl.getToken();           
        // Сохраняем токен на странице
        UICtrl.storeToken(token);
        // Получаем жанры
        const genres = await APICtrl.getGenres(token);
        // Заполняем элементами (треками) жанров
        genres.forEach(element => UICtrl.createGenre(element.name, element.id));
    }

    // Смена жанра
    DOMInputs.genre.addEventListener('change', async () => {
        // Сброс плейлиста
        UICtrl.resetPlaylist();
        // Получаем токен на странице
        const token = UICtrl.getStoredToken().token;        
        // Выбор жанра
        const genreSelect = UICtrl.inputField().genre;       
        // Получаем идентификатор выбранного жанра
        const genreId = genreSelect.options[genreSelect.selectedIndex].value;             
        // Список жанров (плейлист)
        const playlist = await APICtrl.getPlaylistByGenre(token, genreId);       
        // Создаем список треков по плейлисту
        playlist.forEach(p => UICtrl.createPlaylist(p.name, p.tracks.href));
    });


    // Создание кнопки отправки
    DOMInputs.submit.addEventListener('click', async (e) => {
        // Предотвращаем сброс страницы
        e.preventDefault();
        // Чистим треки
        UICtrl.resetTracks();
        // Получаем токен
        const token = UICtrl.getStoredToken().token;        
        // Получаем поля плейлиста
        const playlistSelect = UICtrl.inputField().playlist;
        // Получаем эндпоинт треков по выбранному плейлисту
        const tracksEndPoint = playlistSelect.options[playlistSelect.selectedIndex].value;
        // Получаем лист треков
        const tracks = await APICtrl.getTracks(token, tracksEndPoint);
        // Создаем элементы трек листа
        tracks.forEach(el => UICtrl.createTrack(el.track.href, el.track.name))

    });

    // Создание события при клике на трек

    DOMInputs.tracks.addEventListener('click', async (e) => {
        // Предотвращаем сброс страницы
        e.preventDefault();
        UICtrl.resetTrackDetail();
        // Получаем токен
        const token = UICtrl.getStoredToken().token;
        // Получаем эндпоинт трека
        const trackEndpoint = e.target.id;
        // Получаем объект трека
        const track = await APICtrl.getTrack(token, trackEndpoint);
        // Загружаем детали трека
        UICtrl.createTrackDetail(track.album.images[2].url, track.name, track.artists[0].name);
    });  

    return {
        init() {
            console.log('App is starting');
            loadGenres();
        }
    }

})(UIController, APIController);


// Метод для загрузки жанров при загрузке страницы
APPController.init();
