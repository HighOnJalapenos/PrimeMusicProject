import { Link } from "react-router-dom";

export default function SearchArtistCard({ artist }) {
  console.log(artist);
  return (
    <Link className="cursor-pointer" to={`/artists/${artist._id}`}>
      <img
        className="w-full object-contain rounded"
        src={artist.image}
        alt="name"
      />
      <p className="text-slate-100 text-base mt-2">{artist.name}</p>
    </Link>
  );
}
