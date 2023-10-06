import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { useEffect, useState } from "react";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import PlayPauseAlbumSong from "../components/PlayPauseAlbumSong";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import "../styles/album.css";
import { useDispatch } from "react-redux";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import Portal from "../components/Portal/Portal";
import ModalContent from "../components/Portal/ModalContent";
import { addFavSongs, removeFavSongs } from "../redux/features/userSlice";
import axios from "../api/axios";
import myLikes from "../assets/myLikes.webp";
import { useNavigate } from "react-router-dom";

import { useGetArtistDetailsQuery } from "../redux/services/shazamCore";

export default function Likes() {
  const [album, setAlbum] = useState([]);
  const [duration, setDuration] = useState([]);
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { isLoggedIn, token, favSongs } = useSelector((state) => state.user);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getFav();
  }, []);

  const getFav = async () => {
    try {
      const res = await axios.get("/music/favorites/like", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res?.data.data.songs);
      setAlbum(res?.data.data.songs);
    } catch (err) {
      console.log(err?.response?.data?.message);
    }
  };

  const dispatch = useDispatch();
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, data, i) => {
    console.log(data);
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  const getDuration = (e) => {
    const songDuration = e?.target?.duration;
    setDuration((prev) => [...prev, songDuration || 0]);
  };

  const onModalClose = () => {
    navigate("/");
    console.log("debug");
  };

  const handleFav = (song) => {
    if (!isLoggedIn) {
      document.documentElement.style.overflow = "hidden";
      setShowModal(true);
    } else {
      addFav(song._id);
    }
  };

  const addFav = async (id) => {
    if (favSongs.includes(id)) {
      dispatch(removeFavSongs(id));
    } else {
      dispatch(addFavSongs(id));
    }
    try {
      const res = await axios.patch(
        "/music/favorites/like",
        {
          songId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  if (!isLoggedIn) {
    return (
      <Portal>
        <ModalContent onClose={onModalClose} />
      </Portal>
    );
  }

  return (
    <Fragment>
      <section className="max-w-[1600px] min-h-screen m-auto pt-16">
        <div
          style={{ insetInlineStart: 0, insetInlineEnd: 0 }}
          className="h-full absolute top-0"
        >
          <div className="bg-[url('https://m.media-amazon.com/images/G/01/Music/Curate/052720_Mylikes_PL_FT_PL_Tile_2400x2400._UX358_FMwebp_QL85_.jpg')] h-screen w-full top-0 -z-10 fixed bg-cover bg-center transition-[background-image] duration-[1s] ease-[ease-in] delay-[0s] blur-xl"></div>
          <div className="album-background sticky max-h-[200vh] top-[-100vh] h-full -z-10"></div>
        </div>
        <div className="md:px-14 px-5 flex md:flex-row flex-col items-center mb-8">
          <img
            className="md:h-72 md:w-72 h-32 w-32 rounded"
            src={myLikes}
            alt="album_image"
          />
          <div className="md:pl-8 md:inline-block md:self-end md:text-left text-center">
            <div className="text-xs font-bold text-[#25D1DA] mb-3 mt-3">
              PLAYLIST
            </div>
            <h1 className="xl:text-6xl text-4xl font-bold text-white mb-3">
              My Likes
            </h1>
            <p className=" text-sm text-slate-400">
              All the songs you 'like,' all in one place
            </p>
          </div>
        </div>

        <div className="pt-3 md:px-14 px-0">
          {console.log(album)}
          <ul>
            {album?.map((song, i, data) => {
              return (
                <Fragment key={song._id}>
                  {/* Get duration of the song */}
                  <audio
                    src={song?.audio_url}
                    onLoadedMetadata={getDuration}
                  ></audio>

                  {/* UI element of the song */}
                  <li
                    onClick={() => handlePlayClick(song, data, i)}
                    className="h-25 py-3 flex items-center border-b border-[rgb(255,255,255)] border-opacity-20 relative group hover:bg-[#a3a3a34e]"
                  >
                    <PlayPauseAlbumSong
                      song={song}
                      i={i}
                      isPlaying={isPlaying}
                      activeSong={activeSong}
                      data={data}
                      handlePlayClick={handlePlayClick}
                      handlePauseClick={handlePauseClick}
                    />
                    <div className="flex w-full sm:flex-row flex-col truncate">
                      <span className="text-base basis-1/3 text-white truncate">
                        {song?.title}
                      </span>
                      <span className="text-sm basis-1/3 text-slate-300 truncate">
                        <ArtistBeatifiedNames artist={song?.artist} />
                      </span>
                      <span className="text-sm basis-1/3 text-slate-300 truncate">
                        <SongDuration seconds={duration[i]} />
                      </span>
                    </div>
                    <i
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFav(song);
                      }}
                      className="md:pr-5 pr-1 hover:cursor-pointer text-white"
                    >
                      {favSongs.includes(song?._id) ? (
                        <FavoriteOutlinedIcon />
                      ) : (
                        <FavoriteBorderRoundedIcon />
                      )}
                    </i>
                  </li>
                </Fragment>
              );
            })}
          </ul>
        </div>
      </section>
    </Fragment>
  );
}

function ArtistBeatifiedNames({ artist }) {
  // const getNames = async () => {
  const names = artist?.map((artistID) => {
    return (
      <span key={artistID} className="artist-name">
        <ArtistDetails artistID={artistID} />
      </span>
    );
  });
  return names;
}

function ArtistDetails({ artistID }) {
  const { data } = useGetArtistDetailsQuery(artistID);
  return data?.data?.name;
}

function SongDuration({ seconds }) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = (seconds % 60).toFixed(0);
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds}`;
}
