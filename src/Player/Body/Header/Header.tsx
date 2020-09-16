import React, { ReactElement } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import SearchIcon from "@material-ui/icons/Search";
import './Header.css';
import { Avatar } from '@material-ui/core';
import { useDataLayer } from '../../../store/DataLayer';

interface Props {
  spotify: SpotifyWebApi.SpotifyWebApiJs
}

function Header({ spotify }: Props): ReactElement {
  const [{user}] = useDataLayer();

  return (
    <div className='header'>
      <div className="header__left">
        <SearchIcon />
        <input
          placeholder="Search for Artists, Songs, or Podcasts "
          type="text"
        />
      </div>
      <div className="header__right">
        <Avatar src={user?.images && user?.images[0].url} alt={user?.display_name} />
        <h4>{user?.display_name}</h4>
      </div>
    </div>
  )
}

export default Header
