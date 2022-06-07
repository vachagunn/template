console.log("UIController load");

class UIController {
  genre = document.querySelector(".genre");
  playlist = document.querySelector(".playlist");
  tracks = document.querySelector(".track_details");
  songDetail = document.querySelector(".song-list");
  submit = document.querySelector(".btn_search");
  storeHfToken = document.querySelector(".hidden_token");

  createGenre(text, value) {
    const html = `<option value="${value}">${text}</option>`;
    this.genre.insertAdjacentHTML("beforeend", html);
  }

  createPlaylist(text, value) {
    const html = `<option value="${value}">${text}</option>`;
    this.playlist.insertAdjacentHTML("beforeend", html);
  }

  createTrack(id, name) {
    const html = `<a href="#" class="list-group-item" id="${id}">${name}</a>`;
    this.tracks.insertAdjacentHTML("beforeend", html);
  }

  createTrackDetail(img, title, artist) {
    const trackDetails = this.songDetail;
    trackDetails.innerHTML = "";
    const html = `
            <div class="img_track">
                <img src="${img}" width="256" height="256" alt="">        
            </div>
            <div class="title_track">
                <label for="Genre" class="form-label-genre">${title}</label>
            </div>
            <div class="artist_track">
                <label for="artist" class="form-label-artist">By ${artist}</label>
            </div> 
            `;
    trackDetails.insertAdjacentHTML("beforeend", html);
  }

  resetTrackDetail() {
    this.songDetail.innerHTML = "";
  }

  resetTracks() {
    this.tracks.innerHTML = "";
    this.resetTrackDetail();
  }

  resetPlaylist() {
    this.playlist.innerHTML = "";
    this.resetTracks();
  }

  storeToken(value) {
    this.storeHfToken.value = value;
  }

  getStoredToken() {
    return {
      token: this.storeHfToken.value,
    };
  }
}

export default UIController;
