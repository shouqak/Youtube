import { SaveAll, ThumbsDown, ThumbsUp } from "lucide-react"
import { PiShareFatThin } from "react-icons/pi"
import React, { useEffect, useState } from "react"

function VideoDis({ id }) {
    const ApiKey = "AIzaSyCEywTc1VDaUTpZUHfyh0SWtwu20Sgy2K8"

const [apidata, setApiData] = useState(null)

const fetchVideoData = async ()=>{

const videoDisUrl=` https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=${ApiKey}`
await fetch(videoDisUrl).then(res=>res.json()).then(data=>setApiData(data.item[0]))
} 

useEffect(() => {
  
fetchVideoData();

}, [])

return (
    <>
      <div className=" w-2/3 px-4">
        <iframe
          src={`https://www.youtube.com/embed/${id}`}
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
        <h3 className="mt-3 font-semibold text-xl">
{apidata?apidata.snippet.title:"Tittle here"}        </h3>

        <div className="play-video-info flex flex-wrap items-center justify-between mt-3 text-sm text-gray-500">
          <p>1345 View • 2 days</p>
          <div className="flex space-x-4 mt-2 sm:mt-0">
            <span className="flex items-center gap-1">
              <ThumbsUp /> 345
            </span>
            <span className="flex items-center gap-1">
              <ThumbsDown /> 55
            </span>
            <span className="flex items-center gap-1">
              <PiShareFatThin /> Share
            </span>
            <span className="flex items-center gap-1">
              <SaveAll /> Save
            </span>
          </div>
        </div>

        <hr className="my-4 border-t border-gray-300" />

        <div className=" flex items-center mb-4">
          <img
            src="https://images.unsplash.com/photo-1457449940276-e8deed18bfff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8xJfHByb2ZpbGV8ZW58MHx8fHww"
            alt=""
            className="w-10 h-10 rounded-full mr-4"
          />
          <div className="flex-1">
            <p className="font-semibold text-lg text-black">GreatStuck</p>
            <span className="text-sm text-gray-500">1M subscribers</span>
          </div>
          <button className="bg-red-600 text-white py-1 px-6 rounded hover:bg-red-700">
            Subscribe
          </button>
        </div>

        <div className=" ml-14">
          <p className="text-sm text-gray-600">Channel that makes learning</p>
          <p className="text-sm text-gray-600">
            Subscribe GreatStack to watch more
          </p>
          <hr className="my-4 border-t border-gray-300" />
          <h4 className="text-sm text-gray-600 mb-4">130 Comments</h4>

          <div className=" flex">
            <img
              src="https://images.unsplash.com/photo-1457449940276-e8deed18bfff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8xJfHByb2ZpbGV8ZW58MHx8fHww"
              alt=""
              className="w-9 h-9 rounded-full mr-4"
            />
            <div>
              <h3 className="text-sm font-medium">
                Jack Nico{" "}
                <span className="text-xs text-gray-500 font-normal ml-2">
                  1 day ago
                </span>
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                A global computer network
                klh;kyhknloiynoyoupho[inhipf8yfiukglhftif
              </p>
              <div className=" flex items-center mt-2 text-sm text-gray-500">
                <ThumbsUp className="mr-1" />
                <span className="mr-4">244</span>
                <ThumbsDown className="mr-1" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default VideoDis
