# 🎬 FilmFinder

FilmFinder is a web app that allows users to search for movies and TV shows, and discover where they're available to stream, rent, or buy across various streaming platforms.

![FilmFinder Screenshot](https://i.imgur.com/DYa1lGw.png)

## ✨ Features

- **Movie & TV Show Search**: Search for any movie or TV show by title
- **Streaming Availability**: See where content is available to stream, rent, or buy
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **IMDb Integration**: Direct links to IMDb for more information

## 🚀 Technologies Used

- React.js
- OMDb API (Open Movie Database)
- TMDB API (The Movie Database)
- CSS3 with modern features
- Responsive design principles

## 🛠️ Installation & Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

3. **API Keys**
   - Get an API key from [OMDb API](http://www.omdbapi.com/)
   - Get an API key from [The Movie Database](https://www.themoviedb.org/)
   - Update the keys in `src/config.js`

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open in browser**
   - The app will be available at `http://localhost:3000`

## 📝 How to Use

1. Enter a movie or TV show title in the search box
2. Click the "Search" button or press Enter
3. Browse the results with posters, titles, and years
4. See where each title is available to stream, rent, or buy
5. Click "View on IMDb" for more detailed information

## 🔧 Configuration

The application uses two APIs:
- **OMDb API**: Provides basic movie/show information and posters
- **TMDB API**: Provides streaming availability information

API keys are stored in `src/config.js`. Replace the placeholder keys with your own before deploying.

## 📱 Responsive Design

FilmFinder is designed to work on all devices:
- **Desktop**: Full grid layout with multiple columns
- **Tablet**: Adjusted grid with fewer columns
- **Mobile**: Single column layout with optimized touch targets


## 📊 Future Enhancements

- User accounts and favorites
- Trailer integration

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [OMDb API](http://www.omdbapi.com/) for movie data
- [The Movie Database](https://www.themoviedb.org/) for streaming availability data
