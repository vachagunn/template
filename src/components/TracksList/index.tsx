import React from "react";
import TrackDetail from "../TrackDetail";

const TracksList: React.FC<ITracksListProps> = ({
  tracks,
  trackDetail,
  loadTrackDetail,
}) => {
  return (
    <div className="tracks_list">
      <div className="list_group">
        <div className="list-group song-list">
          {tracks.map(({ track: { id, name, href } }) => (
            <span
              key={id}
              className="list-group-item"
              onClick={() => loadTrackDetail(href)}
            >
              {name}
            </span>
          ))}
        </div>
      </div>
      {!!trackDetail && <TrackDetail trackDetail={trackDetail} />}
    </div>
  );
};

export default TracksList;
