import { SpotifyToken } from "../spotify";

export interface DataLayerState {
  user?: SpotifyApi.CurrentUsersProfileResponse;
  playlists?: SpotifyApi.ListOfUsersPlaylistsResponse;
  newReleases?: SpotifyApi.ListOfNewReleasesResponse;
  albums?: SpotifyApi.UsersSavedAlbumsResponse;
  token: SpotifyToken,
  playing: boolean;
  item: SpotifyApi.TrackObjectFull | null;
  showSidebar: boolean;
}

export type DataLayerAction = {
  type: 'SET_USER';
  user: any;
} | {
  type: 'SET_TOKEN',
  token: SpotifyToken
} | {
  type: 'SET_PLAYLISTS',
  playlists: SpotifyApi.ListOfUsersPlaylistsResponse
} | {
  type: 'SET_ALBUMS',
  albums: SpotifyApi.UsersSavedAlbumsResponse
} | {
  type: 'SET_NEW_RELEASES',
  newReleases: SpotifyApi.ListOfNewReleasesResponse
} | {
  type: 'SET_ITEM',
  item: SpotifyApi.TrackObjectFull | null
} | {
  type: 'SET_PLAYING',
  playing: boolean
}| {
  type: 'TOGGLE_SHOW_SIDEBAR'
}

export const initialState: DataLayerState = {
  user: undefined,
  token: {},
  playlists: undefined,
  newReleases: undefined,
  playing: false,
  item: null,
  showSidebar: false
};

const reducer = (state: DataLayerState, action: DataLayerAction): DataLayerState => {
  console.log('action from reducer', action);
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.user
      }

    case 'SET_TOKEN':
      return {
        ...state,
        token: action.token
      }

    case 'SET_PLAYLISTS':
      return {
        ...state,
        playlists: action.playlists
      }

    case 'SET_ALBUMS':
      return {
        ...state,
        albums: action.albums
      }

    case 'SET_NEW_RELEASES':
      return {
        ...state,
        newReleases: action.newReleases
      }

    case 'SET_ITEM':
      return {
        ...state,
        item: action.item
      }

    case 'SET_PLAYING':
      return {
        ...state,
        playing: action.playing
      }

    case 'TOGGLE_SHOW_SIDEBAR':
      return {
        ...state,
        showSidebar: !state.showSidebar
      }

    default:
      return state
  }

}

export default reducer;
