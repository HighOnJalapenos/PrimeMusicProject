import { useParams } from "react-router-dom";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import {
  useGetAlbumDetailsQuery,
  useGetArtistDetailsQuery,
} from "../redux/services/shazamCore";
import { useState } from "react";
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

export default function Album() {
  const { id: albumID } = useParams();
  const { data } = useGetAlbumDetailsQuery(albumID);
  const album = data?.data;
  const [duration, setDuration] = useState([]);
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { isLoggedIn, token, favSongs } = useSelector((state) => state.user);
  const [showModal, setShowModal] = useState(false);

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

  const onModalClose = (e) => {
    console.log("debug");
    e.stopPropagation();
    document.documentElement.style.overflow = "";
    setShowModal(false);
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

  // Converting the seconds in duration to minutes-seconds format

  const artists = album?.artists || [];
  const dateString = album?.release.slice(0, 10);
  const date = new Date(dateString);
  const releaseDate = date.toDateString();
  console.log(album, "album");

  const artistNames =
    artists.length <= 3
      ? artists.map((artist) => artist.name).join(" & ")
      : "Various Artists";

  return (
    <Fragment>
      <section className="max-w-[1600px] min-h-screen m-auto pt-16">
        <div
          style={{ insetInlineStart: 0, insetInlineEnd: 0 }}
          className="h-full absolute top-0"
        >
          <div
            style={{ backgroundImage: `url(${album?.image})` }}
            className="h-screen w-full top-0 -z-10 fixed bg-cover bg-center transition-[background-image] duration-[1s] ease-[ease-in] delay-[0s] blur-xl"
          ></div>
          <div className="album-background sticky max-h-[200vh] top-[-100vh] h-full -z-10"></div>
        </div>
        <div className="md:px-14 px-5 flex md:flex-row flex-col items-center mb-8">
          <img
            className="md:h-72 md:w-72 h-32 w-32 rounded"
            src={album?.image}
            alt="album_image"
          />
          <div className="md:pl-8 md:inline-block md:self-end md:text-left text-center">
            <div className="text-xs font-bold text-[#25D1DA] mb-3 mt-3">
              ALBUM
            </div>
            <h1 className="xl:text-6xl text-4xl font-bold text-white mb-3">
              {album?.title}
            </h1>
            <div className="text-sm text-slate-300 mb-3">{artistNames}</div>
            <p className="mb-3 text-sm text-slate-300">
              {album?.songs?.length} songs {String.fromCharCode(8226)}{" "}
              {releaseDate}
            </p>
            <p className=" text-sm text-slate-400">{album?.description}</p>
          </div>
        </div>

        <div className="pt-3 md:px-14 px-0">
          <ul>
            {album?.songs?.map((song, i, data) => {
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
                      {showModal && (
                        <Portal onClose={onModalClose}>
                          <ModalContent onClose={onModalClose} />
                        </Portal>
                      )}
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
  // };
  // getNames();
  // return names
  //   ? [names.slice(0, -1).join(", "), names.slice(-1)].join(" & ")
  //   : "";
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
