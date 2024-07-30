import React, {useState} from 'react';
import {useCategoryState} from "../../store/categoriesState.ts";
import {Link} from "react-router-dom";
import {useAuthState} from "../../store/authState.ts";
import CategoryDropdown from "../CategoryDropdown/CategoryDropdown.tsx";
import SearchHints from "../SearchHints/SearchHints.tsx";
import useDebounce from "../../hooks/useDebounce.tsx";


const Header = () => {

    const {categories, subCategories, topics} = useCategoryState()
    const {auth, logout} = useAuthState()

    const [isOpen, setOpen] = useState("")
    const [searchValue, setSearchValue] = useState("")
    const [isSearchSuggestion, setSearchSuggestion] = useState(false)


    function handleLogout() {
        logout()
    }

    return (
        <>
            <nav className="navbar bg-base-100 navigation">
                <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-x-10">
                    <div className="flex  items-center gap-x-4">
                        <div>
                            <Link to="/" className="w-auto h-8">
                                <img src="https://demo.edublink.co/wp-content/uploads/2023/06/logo-dark.png"
                                     alt="Your Platform Logo"/>
                            </Link>
                        </div>

                        <div className="relative py-4" onMouseLeave={() => setOpen(false)}>
                            <p className="font-medium cursor-pointer"
                               onMouseOver={() => setOpen(true)}>Categories</p>

                            <CategoryDropdown subCategories={subCategories} isOpen={isOpen} setOpen={setOpen}
                                              categories={categories}
                                              topics={topics}/>

                        </div>
                    </div>


                    <div className="relative flex items-center w-full">
                        <input onClick={() => setSearchSuggestion(prev => !prev)} type="text"
                               placeholder="Search for courses"
                               onChange={(e)=>setSearchValue(e.target.value)}
                               value={searchValue}
                               className="w-full mr-4 rounded-full border border-gray-300 pl-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"/>
                        <i className="bi bi-search"></i>

                        <SearchHints value={searchValue} isShowSearchSuggestion={isSearchSuggestion}/>

                    </div>


                    <div>
                        {auth ? (
                            <div>
                                <div className="dropdown">
                                    <button className="btn btn-outline">

                                        <div className="avatar">
                                            <div className="w-8 rounded-full">
                                                <img
                                                    src={auth?.avatar}/>
                                            </div>
                                        </div>
                                    </button>


                                    <div className="dropdown-content shadow-2xl border-gray-500   w-36 right-0 z-40">
                                        <div className="flex flex-col items-center justify-between">
                                            <Link to="/dashboard/create-course" className="py-1 dropdown-item">My
                                                Course</Link>
                                            <Link to="/dashboard/profile" className="py-1 dropdown-item">Profile</Link>
                                            <Link to="/CreateCourse" className="py-1 dropdown-item">Settings</Link>
                                            <Link to="/admin-dashboard" className="py-1 dropdown-item">Admin
                                                Dashboard</Link>
                                            <button onClick={handleLogout} className="py-1 dropdown-item">Logout
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        ) : (
                            <div className="flex items-center   gap-x-2">
                                <Link to="/join/login">
                                    <button className="btn btn-outline">Login</button>
                                </Link>
                                <Link to="/join/signup">
                                    <button className="btn btn-black">Sign up</button>
                                </Link>
                            </div>
                        )}


                    </div>


                </div>
            </nav>
            <div className="header-space"></div>
        </>
    );
};

export default Header;