import React from "react"
import { Link, useParams } from "react-router"
import { SaveAll, ThumbsDown, ThumbsUp } from "lucide-react"
import { PiShareFatThin } from "react-icons/pi"
import { useEffect, useState } from "react"
import moment from "moment"
import image from "../assets/image.png"
import Navbar from "../components/Navbar"
function Video() {
  const { id } = useParams()

  const ApiKey = "AIzaSyCcCGUmTbhwk5zbW1cFJ8E-agG7q0Na8Qs"

  const [apidata, setApiData] = useState(null)
  const [channelData, setChannelData] = useState(null)
  const [commentData, setCommentData] = useState([])
  const [commentText, setCommentText] = useState("")

  const [apidataside, setApiDataside] = useState([])

  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [likedisCount, setLikedisCount] = useState(0)

  const handleLikeClick = async () => {
    setLiked(!liked)

    const newCount = liked ? likeCount - 1 : likeCount + 1
    setLikeCount(newCount)

    try {
      const response = await fetch(
        "https://683d578b199a0039e9e508e2.mockapi.io/like",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, liked: !liked }),
        }
      )

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`)
      }

      const data = await response.json()
      console.log("Like update successful:", data)
    } catch (error) {
      console.error("Error updating like:", error)
    }
  }

  const handledisLikeClick = async () => {
    setLiked(!liked)

    const newCount = liked ? likedisCount - 1 : likedisCount + 1
    setLikedisCount(newCount)

    try {
      const response = await fetch(
        "https://683d578b199a0039e9e508e2.mockapi.io/like",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, liked: !liked }),
        }
      )

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`)
      }

      const data = await response.json()
      console.log("Like update successful:", data)
    } catch (error) {
      console.error("Error updating like:", error)
    }
  }

  const fetchData = async () => {
    const recomendVideos = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&key=${ApiKey}`
    await fetch(recomendVideos)
      .then((res) => res.json())
      .then((data) => setApiDataside(data.items))
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post(
        "https://683f77f05b39a8039a54b165.mockapi.io/comment",
        {
          videoId: id,
          text: commentText,
        }
      )
      console.log("Comment added:", response.data)
    } catch (error) {
      console.error("Error adding comment:", error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const fetchChannelData = async () => {
    const channelDataUel = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apidata.snippet.channelId}&key=${ApiKey}`
    await fetch(channelDataUel)
      .then((res) => res.json())
      .then((data) => setChannelData(data.items[0]))
  }

  const fetchVideoData = async () => {
    const videoDisUrl = ` https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=${ApiKey}`
    await fetch(videoDisUrl)
      .then((res) => res.json())
      .then((data) => setApiData(data.items[0]))

    const commentsUrl = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${id}&key=${ApiKey}`
    await fetch(commentsUrl)
      .then((res) => res.json())
      .then((data) => setCommentData(data.items))
  }

  useEffect(() => {
    fetchVideoData()
  }, [])

  useEffect(() => {
    if (apidata) {
      fetchChannelData()
    }
  }, [apidata])

  if (!apidata) {
    return <div>Lodding</div>
  }

  let valueNow = (value) => {
    if (value >= 1000000) {
      return Math.floor(value / 1000000) + "M"
    } else if (value >= 1000) {
      return Math.floor(value / 1000) + "K"
    } else {
      return value
    }
  }
    const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  }
  return (
    <>
<Navbar toggleSidebar={toggleSidebar} />
    <div className="px-4 py-6  bg-neutral-900 text-white ">
      <div className="flex flex-col md:flex-row md:gap-8">
        <div className="w-full md:w-2/3 mb-8 md:mb-0">
          <div className="aspect-video bg-black rounded-lg overflow-hidden">
            <iframe
              src={`https://www.youtube.com/embed/${id}?enablejsapi=1&rel=0`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>

          <h3 className="mt-4 text-xl font-semibold line-clamp-2">
            {apidata?.snippet?.title}
          </h3>

          <div className="flex flex-wrap items-center justify-between mt-4 text-sm text-gray-300">
            <p>
              {valueNow(apidata?.statistics?.viewCount)} Views •{" "}
              {moment(apidata?.snippet?.publishedAt).fromNow()}
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2 sm:mt-0">
              <span className="flex items-center gap-1">
                <ThumbsUp
                  onClick={handleLikeClick}
                  className="text-white"
                />{" "}
                {apidata?.statistics?.likeCount + likeCount}
              </span>
              <span className="flex items-center gap-1">
                <ThumbsDown
                  onClick={handledisLikeClick}
                  className="text-white"
                />{" "}
                {likedisCount}
              </span>
              <span className="flex items-center gap-1">
                <PiShareFatThin className="text-white" /> Share
              </span>
              <span className="flex items-center gap-1">
                <SaveAll className="text-white" /> Save
              </span>
            </div>
          </div>

          <hr className="my-6 border-t border-gray-700" />

          <div className="flex items-center mb-6">
            <img
              src={
                channelData?.snippet?.thumbnails?.default?.url ||
                "https://via.placeholder.com/40"
              }
              alt="Channel"
              className="w-10 h-10 rounded-full mr-4"
            />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-lg truncate">
                {apidata?.snippet?.channelTitle}
              </p>
              <span className="text-sm text-gray-400">
                {valueNow(channelData?.statistics?.subscriberCount || 0)}{" "}
                Subscribers
              </span>
            </div>
            <button className="bg-red-600 text-white py-1.5 px-4 sm:px-6 rounded hover:bg-red-700 transition whitespace-nowrap mt-2 sm:mt-0">
              Subscribe
            </button>
          </div>

          <div className="vid-description ml-0 md:ml-14">
            <p className="text-sm mb-6 line-clamp-3">
              {apidata?.snippet?.description}
            </p>
            <hr className="my-6 border-t border-gray-700" />
            <h4 className="text-sm mb-4">
              {apidata?.statistics?.commentCount} Comments
            </h4>
            <form onSubmit={handleSubmit}>
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add a comment"
              />
              <button type="submit">Comment</button>
            </form>
            {commentData.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row sm:items-start mb-4 space-y-2 sm:space-y-0"
              >
                <img
                  src={
                    item.snippet.topLevelComment.snippet.authorProfileImageUrl
                  }
                  alt="User"
                  className="w-9 h-9 rounded-full sm:mr-4 self-start"
                />
                <div className="min-w-0">
                  <h3 className="text-sm font-medium truncate">
                    {item.snippet.topLevelComment.snippet.authorDisplayName}
                    <span className="text-xs text-gray-500 font-normal ml-2">
                      1 day ago
                    </span>
                  </h3>
                  <p className="text-sm text-white mt-1 break-words">
                    {item.snippet.topLevelComment.snippet.textDisplay}
                  </p>
                  <div className="comment-action flex items-center mt-2 text-sm text-gray-400">
                    <ThumbsUp className="mr-1" />
                    <span className="mr-4">
                      {valueNow(item.snippet.topLevelComment.snippet.likeCount)}
                    </span>
                    <ThumbsDown className="mr-1" />
                  </div>
                </div>
              </div>
            ))} 
          </div>
        </div>

        {/* Side Videos */}
        <div className="w-full md:w-1/3 order-first md:order-last">
          <div className="w-full bg-neutral-900 p-4 space-y-6">
            <a
              href="https://www.linkedin.com/in/shouqalkanhal/"
              target="_blank"
            >
              <img
                src={image}
                alt=""
              />
              <p className="text-xs text-gray-300 mb-5">
                Ads:Follow me on LinkedIn
              </p>
            </a>

            {apidataside.map((item) => (
              <Link
                to={`/video/${item.id}`}
                key={item.id}
                className="flex flex-col sm:flex-row gap-4 group"
              >
                <div className="sm:w-40 aspect-video rounded overflow-hidden flex-shrink-0">
                  <img
                    src={item.snippet.thumbnails.medium.url}
                    alt="Video thumbnail"
                    className="w-full h-full object-cover "
                  />
                </div>
                <div className="space-y-1 min-w-0">
                  <h4 className="text-sm font-medium text-white line-clamp-2  transition-colors">
                    {item.snippet.title}
                  </h4>
                  <p className="text-sm text-gray-400 truncate">
                    {item.snippet.channelTitle}
                  </p>
                  <p className="text-xs text-gray-500">
                    {valueNow(item.statistics.viewCount)} Views •{" "}
                    {moment(item.snippet.publishedAt).fromNow()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}


export default Video
