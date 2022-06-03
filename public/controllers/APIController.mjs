console.log('APIController load');

class APIController {
    clientId = '4c693d7eb651467888c7beae909278ed';
    clientSecret = 'eed7d9bc6bdc491ba9bc510c6c0e3908';

    async Execute(url, config) {
        const result = await fetch(url, config).catch(() => {});
        if (!result.ok) return { ok: false };               
        
        const data = await result
            .json()
            .then((response) => ({ ok: true, response }))
            .catch((err) => ({ ok: false, err }));
        return data;
    }

    getToken = async () => {
        const config = {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded', 
                'Authorization' : 'Basic ' + btoa(this.clientId + ':' + this.clientSecret),
            },
            body: 'grant_type=client_credentials',
        };

        const res = await this.Execute('https://accounts.spotify.com/api/token', config);
        if (!res.ok) return res.err;
        return res.response.access_token;
    };

    getGenres = async (token) => {
        const config = {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token },
        };

        const res = await this.Execute(`https://api.spotify.com/v1/browse/categories?locale=sv_US`, config);
        if (!res.ok) return res.err;
        return res.response.categories.items;
    };

    getPlaylistByGenre = async (token, genreId) => {
        const limit = 15;

        const config = {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token},
        };

        const res = await this.Execute(`https://api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=${limit}`, config);
        if (!res.ok) return res.err;
        return res.response.playlists.items;
    };

    getTracks = async (token, tracksEndPoint) => {
        const limit = 10;

        const config = {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token},
        };

        const res = await this.Execute(`${tracksEndPoint}?limit=${limit}`, config);
        if (!res.ok) return res.err;
        return res.response.items;
    };

    getTrack = async (token, trackEndPoint) => {
        const config = {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token},
        };

        const res = await this.Execute(trackEndPoint, config);
        if (!res.ok) return res.error;
        return res.response;
    };
}

export default APIController;