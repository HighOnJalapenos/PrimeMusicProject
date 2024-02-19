import { useGetArtistDetailsQuery } from "../redux/services/shazamCore";
import { useParams } from "react-router-dom";
import "../styles/Artist.css";
import backgroundImage from "../assets/placeholder.png";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import PlayPauseAlbumSong from "../components/PlayPauseAlbumSong";
import { useDispatch } from "react-redux";
import { playPause, setActiveSong } from "../redux/features/playerSlice";

export default function Artist() {
  const { id: artistID } = useParams();
  const { data, isError } = useGetArtistDetailsQuery(artistID);
  const artistData = data?.data;

  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const [duration, setDuration] = useState([]);

  const dispatch = useDispatch();
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, data, i) => {
    const { songs } = data.data;
    dispatch(setActiveSong({ song, data: songs, i }));
    dispatch(playPause(true));
  };

  const getDuration = (e) => {
    const songDuration = e?.target?.duration;
    setDuration((prev) => [...prev, songDuration || 0]);
  };

  // Make error component here TODO
  if (isError) {
    return <div>Something went wrong</div>;
  }

  return (
    <section className="max-w-[1600px] m-auto pt-16 overflow-y-auto">
      <div
        style={{ insetInlineStart: 0, insetInlineEnd: 0 }}
        className="h-full absolute top-0"
      >
        <div
          style={{ backgroundImage: `url(${backgroundImage})` }}
          className="h-screen w-full top-0 -z-10 fixed bg-cover bg-center transition-[background-image] duration-[1s] ease-[ease-in] delay-[0s]"
        ></div>
        <div className="artist-background sticky h-full min-h-screen -z-10"></div>
      </div>

      <div className="md:px-14 px-5 flex md:flex-row flex-col items-center mb-8">
        <img
          className="md:h-72 md:w-72 h-32 w-32 rounded"
          src={artistData?.image}
          alt="album_image"
        />
        <div className="md:pl-8 md:self-start md:text-left md:mt-auto text-center">
          <div className="text-xs font-bold text-[#25D1DA] mb-3 mt-3">
            ARTIST
          </div>
          <h1 className="xl:text-6xl text-4xl font-bold text-white mb-3">
            {artistData?.name}
          </h1>
          <p className=" text-sm text-slate-400">{artistData?.description}</p>
        </div>
      </div>

      <div className="pt-3 md:px-14 px-0">
        <ul>
          {artistData?.songs?.map((song, i) => {
            return (
              <Fragment key={song._id}>
                {/* Get duration of the song */}
                <audio
                  src={song?.audio_url}
                  onLoadedMetadata={getDuration}
                ></audio>

                {/* UI element of the song */}
                <li className="h-25 py-3 flex items-center border-b border-[rgb(255,255,255)] border-opacity-20 relative group hover:bg-[#a3a3a34e]">
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
                  <i className="md:pr-5 pr-1 hover:cursor-pointer text-white">
                    <FavoriteBorderRoundedIcon />
                  </i>
                </li>
              </Fragment>
            );
          })}
        </ul>
      </div>
    </section>
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
