import React from "react";

const TrackDetail: React.FC<ITrackDetailProps> = ({
  trackDetail: { album, artists, name },
}) => {
  return (
    <div className="track_details">
      <div className="img_track">
        <img src={album.images[0].url} width="256" height="256" alt="" />
      </div>
      <div className="title_track">
        <label className="form-label-genre">{name}</label>
      </div>
      <div className="artist_track">
        <label className="form-label-artist">By {artists[0].name}</label>
      </div>
    </div>
  );
};

export default TrackDetail;
