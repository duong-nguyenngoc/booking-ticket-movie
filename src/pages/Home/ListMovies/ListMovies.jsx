import { Card } from "antd";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { chooseTrailer } from "../../../redux/action/userAction";
import {
  defaultTrailer,
  placeholderImg,
} from "../../../constants/defaultValues";
import {
  trailerUrlRegex,
  imageUrlRegex,
  trailerYoutube,
} from "../../../constants/regex";
import PlayVideo from "../../../component/PlayVideo";

export default function ListMovies({ arrMovie }) {
  const onImageError = (e) => {
    e.target.src = placeholderImg;
  };
  const dispatch = useDispatch();
  const handleChooseTrailer = (trailer) => {
    let videoId = "";
    if (trailerYoutube.test(trailer) || trailer.includes("embed")) {
      const parts = trailer.split("/");
      videoId = parts[parts.length - 1];
    } else {
      const url = new URL(trailer);
      videoId = url.searchParams.get("v");
    }
    dispatch(chooseTrailer(videoId));
  };

  return (
    <>
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {arrMovie.slice(0, 8).map((item, index) => (
            <div key={index} className="relative group">
              <Card
                hoverable
                cover={
                  <>
                    <img
                      className="h-48 object-cover group-hover:brightness-50 duration-300 group2"
                      onClick={() =>
                        handleChooseTrailer(trailerUrlRegex.test)
                          ? item.trailer
                          : defaultTrailer
                      }
                      alt="example"
                      src={
                        imageUrlRegex.test(item.hinhAnh)
                          ? item.hinhAnh
                          : placeholderImg
                      }
                      onError={onImageError}
                    />
                  </>
                }
              >
                <div className="space-y-3">
                  <p className="w-full flex justify-start items-center">
                    <span className="ml-2 font-semibold text-xl truncate">
                      {item.tenPhim}
                    </span>
                  </p>
                  <p className="line-clamp-2 text-justify h-12">{item.moTa}</p>
                </div>
                <NavLink className="text-white" to={`/detail${item.maPhim}`}>
                  <button className="py-3 mt-3 w-full mx-auto text-white bg-red-400 rounded hover:bg-red-600 duration-300">
                    Get Ticket
                  </button>
                </NavLink>
              </Card>
              <PlayVideo
                isCard
                trailer={item.trailer ?? defaultTrailer}
              ></PlayVideo>{" "}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
