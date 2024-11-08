# Mixero - Create Spotify Playlists

**Mixero** is a React + Vite application designed to simplify the process of creating and exporting custom Spotify playlists. Built on Codecademy's Front-End Engineer Career Path "Jammming" project, it delivers a focused, distraction-free experience, offering users an intuitive alternative to Spotify’s app and web interfaces.

## Key Features

- **Live Search and Preview**: Quickly discover and preview tracks from Spotify's vast library with real-time search results, allowing you to curate your playlist with precision.
- **Playlist Customization**: Effortlessly add or remove tracks to create your perfect playlist.
- **Playlist Naming**: Personalize your playlists by customizing the name.
- **Trending Discoveries**: Explore the latest popular songs from Spotify's Top 50 Global Playlist.
- **Export to Spotify**: One-click export of your created playlists to your Spotify account.

## Known Issues and Workarounds

1. **Unavailable Track Previews**: Some track preview samples may not be available due to Spotify's limitations.
2. **Multiple Audio Playback**: Playing a new audio sample will not automatically pause the previous one.
3. **Mobile Browser Login Redirect**: Exclusively on mobile browsers, the Spotify login redirect may not function properly. To bypass this issue:
    - Visit [mixero.netlify.app](https://mixero.netlify.app);
    - Click the login button and sign in to your Spotify account;
    - After authentication, return to [mixero.netlify.app](https://mixero.netlify.app);
    - Click the login button again;
    - The app should now function as expected.

If you encounter any other issues or unexpected behaviour, please reach out.

## Upcoming Features

These features will be introduced eventually, though there is no set release date or estimated timeline for their arrival. Upcoming features include:
- **Playlist Management**: Ability to manage previously created playlists.
- **User Profile**: Ability to manage user profiles and associated data.

If you'd like to suggest new features, please reach out.

## Get Started with Mixero

### Access the Live Application
Visit [mixero.netlify.app](https://mixero.netlify.app) to use the live Mixero application.

### Run Locally
1. Clone the repository or download the project files.
2. Open the terminal, navigate to the project directory, and run `npm install` or `yarn install` to install dependencies.
3. Generate your Spotify Web API key at [developer.spotify.com](https://developer.spotify.com/). If you need assistance setting up the Web API Key, read the documentation available at [developer.spotify.com/documentation/web-api](https://developer.spotify.com/documentation/web-api).
4. Create a `.env` file in the project directory to store your environment variables and Spotify Web API key. 
5. Start the development server by running `npm run dev` or `yarn dev`.
6. Open your browser and navigate to `http://localhost:5137` to view the local instance of Mixero.

## License
This project is licensed under the Apache License 2.0. For more details, please refer to the [license](./license) file.