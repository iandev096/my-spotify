// TYPES
export type SpotifyToken = {
  access_token?: string,
  expires_in?: string,
  token_type?: string
}
type STKey = keyof SpotifyToken;


// https://developer.spotify.com/documentation/web-playback-sdk/quick-start/#
export const authEndpoint = "https://accounts.spotify.com/authorize";
const clientId = "844808a85c3e41fe8b00eb63fe396301";
const redirectUri = 'https://my-spotify-six.vercel.app/' ?? "http://localhost:3000/";

// we use scopes to inform spotify which scopes withing spotify we want our app to use. Think of it as permissions.
const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
  "user-library-read"
];

export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  '%20'
)}&response_type=token&show_dialog=true`;

export const getTokenFromUrl = (): SpotifyToken => {
  return window.location.hash
    .substring(1)
    .split('&')
    .reduce((acc: SpotifyToken, cur: string) => {
      let parts = cur.split('=');
      acc[parts[0] as STKey] = decodeURIComponent(parts[1]);
      return acc;
    }, {});
}
