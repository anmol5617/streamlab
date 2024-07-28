import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiRequests } from "../helper/apirequests";
import instance from "../helper/axios";
import Card from "../components/layout/Card";

function BrowseByGenre(props) {
  const { platform, genreid } = useParams();
  const [videosByGenre, setVideosByGenre] = useState(null);
  const [genresList , setGenresList]= useState(null)
  const fetchVideoByGenre = async (platform, genreid) => {
    const response = await instance.get(
      apiRequests.getByGenre(platform, genreid)
    );
    setVideosByGenre(response.data);
  };
  const fetchGenreList = async(platform)=>{
    const response = await instance.get(apiRequests.getGenres(platform))
    setGenresList(response.data.genres)
}

  useEffect(() => {
    if (platform && genreid) {
      fetchVideoByGenre(platform, genreid);
    }
  }, [platform, genreid]);
  return (
    <div className="py-20">
        <div className="py-5 flex">
            <div className="flex ms-auto">
                <select name="platform">
                    <option value="tv">Tv Shows</option>
                    <option value="movie">Movies</option>
                </select>
                <select name="">

                    <option value="">List</option>
                </select>
            </div>
        </div>
      <div className="flex flex-wrap">
        {videosByGenre?.results.map((video) => {
          return (
            <div className="w-1/5 p-3">
              <Card video={video} platform={platform} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BrowseByGenre;
