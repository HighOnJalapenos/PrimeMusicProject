import { useParams } from "react-router-dom";
import { useGetAlbumDetailsQuery } from "../redux/services/shazamCore";
import { useState } from "react";

export default function Album() {
  const { id: albumID } = useParams();
  const { data, isFetching, Error } = useGetAlbumDetailsQuery(albumID);
  const album = data?.data;
  console.log(album);
  let au = document.createElement("audio");
  const [duration, setDuration] = useState([]);

  const getDuration = (e) => {
    const songDuration = e?.target?.duration;
    setDuration((prev) => [...prev, songDuration || 0]);
  };

  const artists = album?.artists || [];
  const dateString = album?.release.slice(0, 10);
  const date = new Date(dateString);
  const releaseDate = date.toDateString();

  const artistNames =
    artists.length <= 3
      ? artists.map((artist) => artist.name).join(" & ")
      : "Various Artists";

  return (
    <section className="max-w-[1600px] m-auto pt-16">
      <div className="md:px-14 px-5 flex md:flex-row flex-col items-center">
        <img className="md:h-72 md:w-72 h-32 w-32 rounded" src={album?.image} />
        <div className="md:pl-8 md:inline-block md:self-end md:text-left text-center">
          <div className="text-xs font-bold text-[#25D1DA] mb-3 mt-3">
            ALBUM
          </div>
          <h1 className="xl:text-6xl text-4xl font-bold text-white mb-3">
            {album?.title}
          </h1>
          <div className="text-sm text-slate-300 mb-3">{artistNames}</div>
          <p className="mb-3 text-sm text-slate-400">
            {album?.songs?.length} songs {String.fromCharCode(8226)}{" "}
            {releaseDate}
          </p>
          <p className=" text-sm text-slate-400">{album?.description}</p>
        </div>
      </div>

      <div>
        <ul>
          {album?.songs?.map((song, i) => {
            return (
              <>
                <audio
                  src={song?.audio_url}
                  onLoadedMetadata={getDuration}
                ></audio>
                <div className="text-white">{duration[i]}</div>
              </>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
