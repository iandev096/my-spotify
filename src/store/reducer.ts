import { SpotifyToken } from "../spotify";

export interface DataLayerState {
  user?: SpotifyApi.CurrentUsersProfileResponse;
  playlists?: SpotifyApi.ListOfUsersPlaylistsResponse;
  newReleases?: SpotifyApi.ListOfNewReleasesResponse;
  albums?: SpotifyApi.UsersSavedAlbumsResponse;
  token: SpotifyToken,
  playing: boolean;
  item: any;
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
}

export const initialState: DataLayerState = {
  user: undefined,
  token: {},
  playlists: undefined,
  newReleases: undefined,
  playing: false,
  item: null
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
  
    default:
      return state
  }

}

export default reducer;
