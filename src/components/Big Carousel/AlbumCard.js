import { Link } from "react-router-dom";

export default function AlbumCard({ album }) {
  let content;

  switch (album?.artists?.length) {
    case 1:
      content = album?.artists[0]?.name;
      break;
    case 2:
      content = `${album?.artists[0]?.name} & ${album?.artists[1]?.name}`;
      break;
    case 3:
      content = `${album?.artists[0]?.name} &
        ${album?.artists[1]?.name} &
        ${album?.artists[2]?.name};`;
      break;
    default:
      content = "Various Artists";
      break;
  }
  return (
    <Link className="cursor-pointer" to={`/album/${album?._id}`}>
      <img
        className="w-full object-contain rounded"
        src={album?.image}
        alt={album?.title}
      />
      <p className="text-slate-100 text-base mt-2 truncate">{album?.title}</p>
      <p className="text-slate-500 text-sm truncate">{content}</p>
    </Link>
  );
}
