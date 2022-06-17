class SpotifyController implements ISpotifyController {
  private readonly clientId = "4c693d7eb651467888c7beae909278ed";
  private readonly clientSecret = "eed7d9bc6bdc491ba9bc510c6c0e3908";
  private token?: string;

  private async execute(
    url: string,
    config: RequestInit = {
      method: "GET",
      headers: { Authorization: "Bearer " + this.token },
    }
  ): Promise<IExecuteResponse> {
    const result = await fetch(url, config).catch(console.error);
    if (!result || !result?.ok) return { ok: false };

    const data = await result
      .json()
      .then((response) => ({ ok: true, response }))
      .catch((error) => ({ ok: false, error }));
    return data;
  }

  async getToken() {
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa(this.clientId + ":" + this.clientSecret),
      },
      body: "grant_type=client_credentials",
    };

    const res = await this.execute(
      "https://accounts.spotify.com/api/token",
      config
    );
    if (!res.ok) throw new Error("Can't get token");
    this.token = (res.response as { access_token: string }).access_token;
    return this;
  };

  getGenres = async (): Promise<IGenre[]> => {
    if (!this.token) throw new Error("No token");
    const res = await this.execute(
      `https://api.spotify.com/v1/browse/categories?locale=sv_US`
    );
    if (!res.ok) throw new Error(String(res.error));
    return (res.response as { categories: { items: IGenre[] } }).categories
      .items as IGenre[];
  };

  getPlaylistByGenre = async (genreId: string): Promise<IPlaylist[]> => {
    if (!this.token) throw new Error("No token");
    const limit = 15;
    const res = await this.execute(
      `https://api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=${limit}`
    );
    if (!res.ok) throw new Error(String(res.error));
    return (res.response as { playlists: { items: IPlaylist[] } }).playlists
      .items;
  };

  getTracks = async (tracksEndPoint: string): Promise<ITrack[]> => {
    if (!this.token) throw new Error("No token");
    const limit = 10;
    const res = await this.execute(`${tracksEndPoint}?limit=${limit}`);
    if (!res.ok) throw new Error(String(res.error));
    return (res.response as { items: ITrack[] }).items;
  };

  getTrackDetail = async (trackEndPoint: string): Promise<ITrackDetail> => {
    if (!this.token) throw new Error("No token");
    const res = await this.execute(trackEndPoint);
    if (!res.ok) throw new Error(String(res.error));
    return res.response as ITrackDetail;
  };
}

export default SpotifyController;
