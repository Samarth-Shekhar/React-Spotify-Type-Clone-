import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { Searchbar, Sidebar, MusicPlayer, TopPlay } from './components';
import { ArtistDetails, TopArtists, Search, SongDetails, TopCharts } from './pages';
import AlbumDetails from './pages/AlbumDetails';
import Playlists from './pages/Playlists'; 
import PlaylistDetails from './pages/PlaylistDetails'; 
import Genres from './pages/Genres';
import GenreDetails from './pages/GenreDetails';
import Albums from './pages/Albums';

const App = () => {
  const { activeSong } = useSelector((state) => state.player);

  return (
    <div className="relative flex">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#121286]">
        <Searchbar />

        <div className="px-6 h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
          <div className="flex-1 h-fit pb-40">
            <Routes>
  <Route path="/" element={<TopCharts />} /> {/* ✅ Default landing page */}
  <Route path="/top-artists" element={<TopArtists />} />
  <Route path="/top-charts" element={<TopCharts />} />
  <Route path="/artists/:id" element={<ArtistDetails />} />
  <Route path="/songs/:artist/:songid" element={<SongDetails />} />
  <Route path="/search/:searchTerm" element={<Search />} />
  <Route path="/albums" element={<Albums />} />
  <Route path="/albums/:id" element={<AlbumDetails />} />
  <Route path="/genres/:genre" element={<GenreDetails />} />
  <Route path="/genres" element={<Genres />} />
  <Route path="/playlists" element={<Playlists />} />
<Route path="/playlists/:id" element={<PlaylistDetails />} />
</Routes>
          </div>
          <div className="xl:sticky relative top-0 h-fit">
            <TopPlay />
          </div>
        </div>
      </div>

      {activeSong?.title && (
        <div className="absolute h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10">
          <MusicPlayer />
        </div>
      )}
    </div>
  );
};

export default App;
