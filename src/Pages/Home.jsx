import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import VideoCard from "../components/VideoCard";
const categories = ["All", "Website", "Music", "Gaming", "podcast", "React", "AI", "Coding", "Falcons", "JavaScript","FIFA",  "Web design", "Tailwind", "Roblox", "Friends", "Cats Play"];
function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);


  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    if (window.innerWidth >= 768) setIsSidebarOpen(true);
  }, []);

const Categorys = ({ category }) => {
  return (
    <div className={`text-[15px] font-medium whitespace-nowrap rounded-lg px-3 py-1 ${category === "All" ? 'bg-black text-white hover:bg-neutral-950 dark:bg-white dark:text-black' : 'bg-neutral-200 text-black hover:bg-neutral-300 dark:text-neutral-300 dark:bg-neutral-700 dark:hover:bg-neutral-600'} cursor-pointer`}>{category}</div>
  )
}
  return (
  <>
<Navbar toggleSidebar={toggleSidebar} />
  <div className="max-h-screen flex flex-col overflow-hidden dark:bg-neutral-900">
      <div className="flex overflow-auto">
         <Sidebar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}  />
 
        <div
          onClick={toggleSidebar}
          className={`md:hidden ${
            !isSidebarOpen && "opacity-0 pointer-events-none"
          } transition-all bg-black bg-opacity-50 h-screen w-full fixed left-0 top-0 z-20`}
        ></div>

        <div
          className={`w-full px-4 overflow-x-hidden custom_scrollbar ${
            isSidebarOpen && "hide_thumb"
          }`}
        >
   <div className="flex overflow-x-auto hide-scrollbar md:overflow-x-auto md:flex-nowrap gap-2 pb-2 -mx-2 px-2">
      {categories.map((cat, index) => (
        <Categorys key={index} category={cat} />
      ))}
    </div>  
          <div className="p-10 lg:p-0 md:mx-15 w-full">
            <VideoCard/>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Home