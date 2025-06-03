import { Menu, Mic, MoonStar, Search, Sun } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";


const Navbar = ({ toggleSidebar }) => {
    const navigate = useNavigate();

 
   const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

 const handleLogout = () => {
    localStorage.removeItem('user'); 

  
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-10  bg-neutral-900">
      <nav className="flex items-center justify-between py-2 pb-5 px-4">
        <HeaderLeftSection toggleSidebar={toggleSidebar} />

        <div className="h-10 flex gap-3 w-[600px] max-lg:w-[500px] max-md:hidden">
          <form action="#" className="flex w-full">
            <input
              className="border w-full h-full rounded-l-full px-4 outline-none  bg-neutral-900 border-neutral-500 focus:border-blue-500 text-neutral-300"
              type="search"
              placeholder="Search"
              required
            />
            <button className="border px-5 border-l-0 rounded-r-full  border-neutral-500 hover:bg-neutral-700">
              <Search className="text-neutral-400" />
            </button>
          </form>
          <button className="p-2 rounded-full bg-neutral-800 hover:bg-neutral-700">
            <Mic className="text-neutral-400" />
          </button>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full md:hidden  hover:bg-neutral-700">
            <Search className="text-neutral-400" />
          </button>
          
        <div className="relative inline-block text-left" ref={dropdownRef}>
      <img
        className="w-8 h-8 rounded-full cursor-pointer"
        src="https://images.unsplash.com/photo-1457449940276-e8deed18bfff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
        alt="User Image"
        onClick={() => setIsOpen(!isOpen)}
      />

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 origin-top-right bg-neutral-800 divide-y divide-gray-700 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-20">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <button
              onClick={handleLogout}
              className="block px-4 py-2 text-sm text-white hover:bg-neutral-700 w-full text-left"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
        </div>
      </nav>
    </header>
  );
};

export const HeaderLeftSection = ({ toggleSidebar }) => {
  return (
    <div className="flex gap-4 items-center">
      <button
        onClick={toggleSidebar}
        className="p-2 rounded-full  hover:bg-neutral-700"
      >
        <Menu className="text-neutral-400" />
      </button>
      <Link to={"/home"} className="flex items-center gap-2" >
        <img src={"https://cdn3.iconfinder.com/data/icons/social-network-30/512/social-06-512.png"} width={32} alt="Logo" />
        <h2 className="text-xl font-bold text-neutral-300">YouTube</h2>
      </Link>
    </div>
  );
};

export default Navbar;
