import { Button } from '@material-ui/core';
import React, { ReactElement, useCallback, useEffect, useState } from 'react'
import SpotifyWebApi from 'spotify-web-api-js';
import { useDataLayer } from '../../store/DataLayer';
import './Body.css';
import Header from './Header/Header';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import SongRow from './SongRow/SongRow';


interface Props {
  spotify: SpotifyWebApi.SpotifyWebApiJs
}

function Body({ spotify }: Props): ReactElement {
  const [{ newReleases }] = useDataLayer();
  const [album, setAlbum] = useState<Partial<SpotifyApi.AlbumObjectSimplified & SpotifyApi.AlbumObjectFull>>();
  const [tracks, setTracks] = useState<SpotifyApi.TrackObjectSimplified[]>([]);

  useEffect(() => {
    if (!newReleases) return;
    const albumIds: string[] = [];
    newReleases.albums.items.forEach((cur) => {
      albumIds.push(cur.id);
    });

    spotify.getAlbums(albumIds).then(res => {
      const _tracks: SpotifyApi.TrackObjectSimplified[] = []
      res.albums.forEach(_album => {
        _tracks.push(..._album.tracks.items);
      });
      setTracks(_tracks);
    });  
  }, [newReleases]);

console.log('tracks', tracks);

  const shuffleSelectedAlbum = useCallback(() => {
    if (!newReleases) return;
    const albums = newReleases.albums.items;
    const selectedAlbum = albums[Math.floor(Math.random() * albums.length)];
    setAlbum(selectedAlbum);
  }, [newReleases]);
  useEffect(() => {
    shuffleSelectedAlbum();
  }, [shuffleSelectedAlbum]);


  return (
    <div className='body'>
      <Header spotify={spotify} />
      <div className="body__info">
        <img src={album?.images && album.images[0].url} alt={album?.name} />
        <div className="body__infoText">
          <Button
            onClick={() => shuffleSelectedAlbum()}
            variant='outlined'
            size='small'
            color='primary'
            startIcon={<ShuffleIcon />}
          >SHUFFLE</Button>
          <strong>ALBUM/SONG</strong>
          <h2>New Release</h2>
          <p>{album?.name} <em>{album?.artists?.reduce((acc, cur) => acc += ` |${cur.name}`, '')}</em></p>
        </div>
      </div>
      <div className="body__songs">
        <div className="body__icons">
          <PlayCircleFilledIcon className="body__shuffle" />
          <FavoriteIcon fontSize='large' />
          <MoreHorizIcon />
        </div>
        <div>
          {/* list of songs */}
          {tracks?.map(track => (
            <SongRow key={track.id} track={track} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Body
