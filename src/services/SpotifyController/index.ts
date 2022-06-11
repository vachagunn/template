class SpotifyController implements ISpotifyController {
  private readonly clientId = "4c693d7eb651467888c7beae909278ed";
  private readonly clientSecret = "eed7d9bc6bdc491ba9bc510c6c0e3908";
  private token?: string;

  private async execute(
    url: string,
    config?: RequestInit
  ): Promise<IExecuteResponse> {
    config ??= {
      method: "GET",
      headers: { Authorization: "Bearer " + this.token },
    };
    const result = await fetch(url, config).catch(() => {});
    if (!result?.ok) return { ok: false };

    const data = await result
      .json()
      .then((response) => ({ ok: true, response }))
      .catch((error) => ({ ok: false, error }));
    return data;
  }

  getToken = async () => {
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
    if (res.ok) this.token = String(res.response.access_token);
    return this;
  };

  getGenres = async (): Promise<IGenre[]> => {
    if (!this.token) throw new Error("No token");
    const res = await this.execute(
      `https://api.spotify.com/v1/browse/categories?locale=sv_US`
    );
    if (!res.ok) throw new Error(res.error);
    return res.response.categories.items as IGenre[];
  };

  getPlaylistByGenre = async (genreId: string): Promise<IPlaylist[]> => {
    if (!this.token) throw new Error("No token");
    const limit = 15;
    const res = await this.execute(
      `https://api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=${limit}`
    );
    if (!res.ok) throw new Error(res.error);
    return res.response.playlists.items;
  };

  getTracks = async (tracksEndPoint: string): Promise<ITrack[]> => {
    if (!this.token) throw new Error("No token");
    const limit = 10;
    const res = await this.execute(`${tracksEndPoint}?limit=${limit}`);
    if (!res.ok) throw new Error(res.error);
    return res.response.items;
  };

  getTrackDetail = async (trackEndPoint: string): Promise<ITrackDetail> => {
    if (!this.token) throw new Error("No token");
    const res = await this.execute(trackEndPoint);
    if (!res.ok) throw new Error(res.error);
    return res.response;
  };
}

export default SpotifyController;
