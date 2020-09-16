import React, { ReactElement } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import './Player.css';
import Sidebar from './Sidebar/Sidebar';
import Body from './Body/Body';
import Footer from './Footer/Footer';

interface Props {
  spotify: SpotifyWebApi.SpotifyWebApiJs
}

function Player({ spotify }: Props): ReactElement {
  return (
    <div className='player'>
      <div className="player__body">
        <Sidebar />
        <Body spotify={spotify} />
      </div>
      <Footer />
    </div>
  )
}

export default Player
