import React, { useEffect } from 'react';
import './App.css';
import Login from './Login/Login';
import Player from './Player/Player';
import { getTokenFromUrl } from './spotify';
import SpotifyWebApi from 'spotify-web-api-js';
import { useDataLayer } from './store/DataLayer';

const spotify = new SpotifyWebApi();

function clearUrlHash() {
  window.location.hash = '';
}

function App() {
  const [{ user, token }, dispatch] = useDataLayer();
  console.log(process.env)
  useEffect(() => {
    const _token = getTokenFromUrl();
    clearUrlHash();
    console.log('Token from spotify', _token);

    if (_token?.access_token) {
      dispatch({ type: 'SET_TOKEN', token: _token });

      spotify.setAccessToken(_token.access_token);

      spotify.getMe().then(user => {
        dispatch({ type: 'SET_USER', user });
      });

      spotify.getUserPlaylists().then(playlists => {
        dispatch({ type: 'SET_PLAYLISTS', playlists });
      });

      spotify.getMySavedAlbums().then(albums => {
        dispatch({ type: 'SET_ALBUMS', albums })
      });

      spotify.getNewReleases({ limit: 20 }).then(newReleases => {
        dispatch({ type: 'SET_NEW_RELEASES', newReleases });
      })
    }
  }, [dispatch]);

  console.log('Person 🧑', user);
  return (
    <div className="app">
      {
        token?.access_token ? (
          <Player spotify={spotify} />
        ) : (
            <Login />
          )
      }
    </div>
  );
}

export default App;
