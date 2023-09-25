import { Link } from "react-router-dom";

export default function ArtistCard({ song }) {
  console.log(song);
  return (
    <Link className="cursor-pointer" to={`/artists/${song?.artist[0]._id}`}>
      <img
        className="w-full object-contain rounded"
        src={song?.artist[0].image}
        alt="name"
      />
      <p className="text-slate-100 text-base mt-2">{song?.artist[0].name}</p>
    </Link>
  );
}
