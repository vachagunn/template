import React, { useEffect, useState } from "react";
import SearchOption from "../SearchOption";
import TracksList from "../TracksList";

const SearchPanel: React.FC<ISearchPanelProps> = ({ controller }) => {
  const [genres, setGenres] = useState<IGenre[]>([]);
  const [playlist, setPlaylist] = useState<IPlaylist[]>([]);
  const [tracks, setTracks] = useState<ITrack[]>([]);
  const [trackDetail, setTrackDetail] = useState<ITrackDetail>();
  const [selectedPlaylistHref, setSelectedPlaylistHref] = useState<string>();

  const loadPlaylists = async (genreId: string) => {
    const res = await controller.getPlaylistByGenre(genreId).catch(console.log);
    if (!res) return;
    setPlaylist(res);
    setTracks([]);
    setTrackDetail(undefined);
    setSelectedPlaylistHref(undefined);
  };

  const loadTracks = async () => {
    if (!selectedPlaylistHref) return;
    const res = await controller
      .getTracks(selectedPlaylistHref)
      .catch(console.log);
    if (!res) return;
    setTracks(res);
    setTrackDetail(undefined);
    setSelectedPlaylistHref(undefined);
  };

  const loadTrackDetail = async (trackHref: string) => {
    const res = await controller.getTrackDetail(trackHref).catch(console.log);
    if (res) setTrackDetail(res);
  };

  useEffect(() => {
    const loadGenres = async () => {
      const res = await controller.getGenres().catch(console.log);
      if (!res) return;
      setGenres(res);
    };
    loadGenres();
  }, [controller]);

  return (
    <div className="search_panel">
      <SearchOption
        title="Genre"
        changeHandler={(e) => loadPlaylists(e.target.value)}
      >
        {genres.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </SearchOption>
      <SearchOption
        title="Playlists"
        changeHandler={(e) => setSelectedPlaylistHref(e.target.value)}
      >
        {playlist.map(({ name, tracks: { href } }) => (
          <option key={href} value={href}>
            {name}
          </option>
        ))}
      </SearchOption>
      <button className="btn_search" onClick={loadTracks}>
        Search
      </button>
      <TracksList
        loadTrackDetail={loadTrackDetail}
        tracks={tracks}
        trackDetail={trackDetail}
      />
    </div>
  );
};

export default SearchPanel;
