import moment from "moment"
import { useEffect, useState } from "react"
import { Link } from "react-router"

function VideoItem() {
  const [data, setData] = useState([])

  const ApiKey = "AIzaSyCEywTc1VDaUTpZUHfyh0SWtwu20Sgy2K8"
  const fetchData = async () => {
    const ApiUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=30&regionCode=US&key=${ApiKey}`
    await fetch(ApiUrl)
      .then((res) => res.json())
      .then((data) => setData(data.items))
  }
  useEffect(() => {
    fetchData()
  }, [])

  let valueNow = (value) => {
    if (value >= 1000000) {
      return Math.floor(value / 1000000) + "M"
    } else if (value >= 1000) {
      return Math.floor(value / 1000) + "K"
    } else {
      return value
    }
  }

  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-5 pb-6">
      {data.map((video) => (
        <Link
          to={`/video/${video.id}`}
          key={video.id}
        >
          <div className="w-[900]">
            <div className="relative">
              <img
                className="rounded-lg "
                src={video.snippet.thumbnails.medium.url}
              />
            </div>

            <div className="flex gap-3 py-3 px-2">
              <div>
                <h2
                  className=" font-semibold leading-snug line-clamp-2 dark:text-neutral-300"
                  title={video.title}
                >
                  {video.snippet.title}
                </h2>
                <p className="text-sm mt-1 text-neutral-700 hover:text-neutral-500 dark:text-neutral-300">
                  {video.snippet.channelTitle}
                </p>
                <p className="text-sm text-neutral-700 dark:text-neutral-300">
                  {valueNow(video.statistics.viewCount)} Views &bull;{" "}
                  {moment(video.snippet.publishedAt).fromNow()}
                </p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default VideoItem
