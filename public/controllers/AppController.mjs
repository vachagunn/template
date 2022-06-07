console.log("AppController load");

class AppController {
  constructor(UICtrl, APICtrl) {
    this.UICtrl = UICtrl;
    this.APICtrl = APICtrl;
    this.addListeners();
    this.loadGenres();
  }

  addListeners() {
    this.UICtrl.genre.addEventListener("change", async () => {
      this.UICtrl.resetPlaylist();
      const token = this.UICtrl.getStoredToken().token;
      const genreSelect = this.UICtrl.genre;
      const genreId = genreSelect.options[genreSelect.selectedIndex].value;
      const playlist = await this.APICtrl.getPlaylistByGenre(token, genreId);
      playlist.forEach((p) => this.UICtrl.createPlaylist(p.name, p.tracks.href));
    });

    this.UICtrl.submit.addEventListener("click", async (e) => {
      e.preventDefault();
      this.UICtrl.resetTracks();
      const token = this.UICtrl.getStoredToken().token;
      const playlistSelect = this.UICtrl.playlist;
      const tracksEndPoint = playlistSelect.options[playlistSelect.selectedIndex].value;
      const tracks = await this.APICtrl.getTracks(token, tracksEndPoint);
      tracks.forEach((el) => this.UICtrl.createTrack(el.track.href, el.track.name));
    });

    this.UICtrl.tracks.addEventListener("click", async (e) => {
      e.preventDefault();
      this.UICtrl.resetTrackDetail();
      const token = this.UICtrl.getStoredToken().token;
      const trackEndpoint = e.target.id;
      const track = await this.APICtrl.getTrack(token, trackEndpoint);
      this.UICtrl.createTrackDetail(
        track.album.images[0].url,
        track.name,
        track.artists[0].name
      );
    });
  }

  async loadGenres() {
    const token = await this.APICtrl.getToken();
    this.UICtrl.storeToken(token);
    const genres = await this.APICtrl.getGenres(token);
    genres.forEach((element) => this.UICtrl.createGenre(element.name, element.id));
  }
}

export default AppController;
