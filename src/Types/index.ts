// @ts-ignore

interface IExecuteResponse {
  ok: boolean;
  response?: any;
  error?: any;
}

interface IMusicCardProps {
  imgSrc: string;
  title: string;
  artistName: string;
}

interface IСategoriesListProps {
  listName: string;
  listItems: IMusicCardProps[];
}

interface IGenre {
  href: string;
  icons: IIcon[];
  id: string;
  name: string;
}

interface IPlaylist {
  name: string;
  tracks: {
    href: string;
  };
}

interface ITrack {
  track: {
    id: string;
    name: string;
    href: string;
  };
}

interface ITrackDetail {
  album: {
    images: IIcon[];
  };
  name: string;
  artists: IArtists[];
}

interface IArtists {
  name: string;
}

interface IIcon {
  height?: number;
  url?: string;
  width?: number;
}

interface ISpotifyController {
  getToken(): Promise<this>;
  getGenres(): Promise<IGenre[]>;
  getPlaylistByGenre(genreId: string): Promise<IPlaylist[]>;
  getTracks(tracksEndPoint: string): Promise<ITrack[]>;
  getTrackDetail(trackEndPoint: string): Promise<ITrackDetail>;
}

interface ITrackDetailProps {
  trackDetail: ITrackDetail;
}

interface ITracksListProps {
  tracks: ITrack[];
  trackDetail?: ITrackDetail;
  loadTrackDetail(trackHref: string): Promise<void>;
}

interface ISearchPanelProps {
  controller: ISpotifyController;
}

interface ISearchOptionProps {
  title: string;
  changeHandler(e: React.ChangeEvent<HTMLSelectElement>): void;
}

interface INavListProps {
  ulClass: string;
  liClass: string;
  liNames: string[];
}
