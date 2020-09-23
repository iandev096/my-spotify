import React, { ReactElement } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import SearchIcon from "@material-ui/icons/Search";
import MenuIcon from '@material-ui/icons/Menu';
import './Header.css';
import { Avatar, IconButton } from '@material-ui/core';
import { useDataLayer } from '../../../store/DataLayer';

interface Props {
  spotify: SpotifyWebApi.SpotifyWebApiJs;
}

function Header({ spotify }: Props): ReactElement {
  const [{ user }, dispatch] = useDataLayer();

  return (
    <div className='header'>
      <IconButton className='header__menuButton' onClick={() => dispatch({ type: 'TOGGLE_SHOW_SIDEBAR' })} >
        <MenuIcon />
      </IconButton>
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
