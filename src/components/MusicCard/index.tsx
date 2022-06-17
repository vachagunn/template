import React from "react";

const MusicCard: React.FC<IMusicCardProps> = ({
  artistName,
  imgSrc,
  title,
}) => {
  return (
    <div className="card">
      <img src={imgSrc} className="card-image" alt="avatar" />
      <div className="card-body">
        <div className="card-title">
          <span className="card-music-title">{title}</span>
        </div>
        <div className="card-artist">
          <span className="artist">{artistName}</span>
        </div>
      </div>
    </div>
  );
};

export default MusicCard;
