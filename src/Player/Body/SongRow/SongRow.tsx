import React, { ReactElement } from 'react';
import './SongRow.css';

interface Props {
  track: Partial<SpotifyApi.TrackObjectSimplified & SpotifyApi.TrackObjectFull>,
  album?: Partial<SpotifyApi.AlbumObjectSimplified & SpotifyApi.AlbumObjectFull>
}

function SongRow({ track, album }: Props): ReactElement {
  return (
    <div className='songRow'>
      <img className='songRow__album' src={album?.images && album?.images[0].url} alt={album?.name} />
      <div className="songRow__info">
        <h1>{track.name}</h1>
        <p>{track.artists?.map(artist => artist.name).join(', ')}</p>
      </div>
    </div>
  )
}

export default SongRow
