import React from 'react';
import './Sidebar.css';
import SidebarOption from './SidebarOption/SidebarOption';
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import { useDataLayer } from '../../store/DataLayer';

interface Props {

}

const Sidebar = (props: Props) => {
  const [{ playlists, albums, showSidebar }, dispatch] = useDataLayer();

  return (<>
    <div className={`sidebar ${showSidebar ? 'sidebar__show' : ''}`}>
      <img
        className="sidebar__logo"
        src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
        alt=""
      />
      <SidebarOption title='Home' Icon={HomeIcon} />
      <SidebarOption title='Search' Icon={SearchIcon} />
      <SidebarOption title='Your Library' Icon={LibraryMusicIcon} />

      <br />
      <strong className='sidebar__title'>PLAYLISTS</strong>
      <hr />
      {playlists?.items?.map(
        playlist => <SidebarOption key={playlist.name} title={playlist.name} />
      )}
      {albums?.items?.map(
        album => <SidebarOption key={album.album.name} title={album.album.name} />
      )}
    </div>
    <div
      onClick={() => dispatch({ type: 'TOGGLE_SHOW_SIDEBAR' })}
      className={`sidebar__backdrop ${showSidebar ? 'sidebar__show' : ''}`}
    >
    </div>
  </>)
}

export default Sidebar
