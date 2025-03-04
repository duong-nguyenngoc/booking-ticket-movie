import { useEffect, useState } from "react";
import { Tabs } from "antd";
import { placeholderImage } from "../../../constants/defaultValues";
import { useNavigate } from "react-router-dom";
import { imageUrlRegex } from "../../../constants/regex";
import { getMovieByCinema } from "../../../api/api";
import moment from "moment/moment";

export default function MenuCinema() {
  const [danhSachHeThongRap, setDanhSachHeThongRap] = useState([]);
  useEffect(() => {
    getMovieByCinema()
      .then((res) => {
        setDanhSachHeThongRap(res.data);
      })
      .catch((err) => console.error(err));
  }, []);
  const onImageError = (e) => {
    e.target.src = placeholderImage;
  };
  const renderDsPhim = (dsPhim) => {
    return dsPhim.map((phim, index) => {
      return (
        <div key={index} className="flex space-x-5 p-3 items-center">
          <img
            alt=""
            src={
              imageUrlRegex.test(phim.hinhAnh) ? phim.hinhAnh : placeholderImage
            }
            onError={onImageError}
            className="w-20 h-32 object-cover"
          />
          <div>
            <p className="font-bold">{phim.tenPhim}</p>
            <div className="grid grid-cols-2 gap-3">
              {phim.lstLichChieuTheoPhim.slice(0, 8).map((lichChieu, index) => (
                <button
                  className="bg-red-500 text-white rounded shadow px-5 py-2 cursor-pointer hover:bg-red-700 duration-300"
                  key={index}
                  onClick={() =>
                    NavigationPreloadManager(
                      `/purchase/${lichChieu.maLichChieu}`
                    )
                  }
                >
                  {moment(lichChieu.ngayChieuGioChieu).format(
                    "DD-MM-YYYY ~ HH:mm"
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      );
    });
  };

  const classTabs = "h-full lg:h-96";
  const classTabsShowMovie = "h-[390px] lg:h-96";
  const navigate = useNavigate();
  const handleHeThongRap = () => {
    return danhSachHeThongRap.map((heThongRap, index) => {
      return {
        key: index,
        label: <img className="w-8 h-8 mx-auto" src={heThongRap.logo} alt="" />,
        children: (
          <>
            <div className="hidden lg:block">
              <Tabs
                className={classTabs}
                tabPosition="left"
                defaultActiveKey="1"
                items={heThongRap.lstCumRap.map((cumRap) => {
                  return {
                    key: cumRap.tenCumRap,
                    label: (
                      <div className="text-left w-96 whitespace-normal">
                        <p className="text-green-700 font-medium">
                          {cumRap.tenCumRap}
                        </p>
                        <p className="text-green-700 hover:text-green-900 truncate">
                          {cumRap.diaChi}
                        </p>
                      </div>
                    ),
                    children: (
                      <div
                        className={classTabsShowMovie}
                        style={{ overflowY: "scroll" }}
                      >
                        {renderDsPhim(cumRap.danhSachPhim)}
                      </div>
                    ),
                  };
                })}
              />
            </div>
            <div className="block lg:hidden">
              <Tabs
                className={classTabs}
                tabPosition="top"
                defaultActiveKey="1"
                items={heThongRap.lstCumRap.map((cumRap) => {
                  return {
                    key: cumRap.tenCumRap,
                    label: (
                      <div className="text-left w-96 whitespace-normal">
                        <p className="text-green-800 font-medium">
                          {cumRap.tenCumRap}
                        </p>
                        <p className="text-green-800 hover:text-green-800 truncate">
                          {cumRap.diaChi}
                        </p>
                      </div>
                    ),
                    children: (
                      <div
                        className={classTabsShowMovie}
                        style={{ overflowY: "scroll" }}
                      >
                        {renderDsPhim(cumRap.danhSachPhim)}
                      </div>
                    ),
                  };
                })}
              />
            </div>
          </>
        ),
      };
    });
  };

  return (
    <div className="container p-3 rounded border-2 border-l-black">
      <div className="hidden lg:block">
        <Tabs
          className={classTabs}
          tabPosition="left"
          defaultActiveKey="1"
          items={handleHeThongRap()}
        />
      </div>
      <div className="block lg:hidden">
        <Tabs
          className={classTabs}
          centered
          defaultActiveKey="1"
          items={handleHeThongRap()}
        />
      </div>
    </div>
  );
}
