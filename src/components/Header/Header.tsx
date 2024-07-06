import React, {useState} from 'react';
import {useCategoryState} from "../../store/categoriesState.ts";
import {Link} from "react-router-dom";
import {TfiAngleRight} from "react-icons/tfi";
import {useAuthState} from "../../store/authState.ts";


function CategoryDropdown({categories, topics, isOpen, setOpen}) {


    const [selectedCate, setSelelectedCat] = useState(null);

    function handleMouseLeave() {
        setOpen(false);
    }

    return isOpen && (
        <div className="fixed top-0 left-0 z-50 bg-white shadow-lg max-w-3xl w-full mx-auto  "
             onMouseLeave={handleMouseLeave}>

            <div className="grid grid-cols-3">

                <div className=" max-w-3xl w-full">
                    {categories.map(cat => (
                        <div className="relative">
                            <div onClick={() => setSelelectedCat(cat.id)}
                                 className="max-w-2xl w-full flex justify-between items-center ">
                                <h4>{cat.title}</h4>
                                <TfiAngleRight className="text-xs"/>
                            </div>
                        </div>
                    ))}
                </div>


                {selectedCate == 1 && (
                    <div className="max-w-3xl w-full">
                        {topics.map(top => (
                            <div>
                                <Link onClick={() => setOpen(false)} to={`/topic/${top.slug}`}
                                      className="flex justify-between items-center">
                                    <h4>{top.title}</h4>
                                    <TfiAngleRight className="text-xs"/>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}

            </div>


        </div>
    )
}

const Header = () => {

    const {categories, topics} = useCategoryState()
    const {auth, logout} = useAuthState()

    const [isOpen, setOpen] = useState("")


    function handleLogout() {
        logout()
    }

    return (
        <nav className="navbar bg-base-100">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-x-10">
                <div className="flex  items-center gap-x-4">
                    <div>
                        <a href="#" className="w-auto h-8">
                            <img src="https://demo.edublink.co/wp-content/uploads/2023/06/logo-dark.png"
                                 alt="Your Platform Logo"/>
                        </a>
                    </div>

                    <div className="relative">
                        <p className="font-medium cursor-pointer" onMouseOver={() => setOpen(true)}>Categories</p>

                        <CategoryDropdown isOpen={isOpen} setOpen={setOpen} categories={categories} topics={topics}/>

                    </div>
                </div>


                <div className="flex items-center w-full">
                    <input type="text" placeholder="Search for courses"
                           className="w-full mr-4 rounded-full border border-gray-300 pl-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"/>
                    <i className="bi bi-search"></i>
                </div>


                <div>
                    {auth ? (
                        <div>
                            <div className="dropdown">
                                <button className="btn btn-outline">John Doe</button>
                                <div className="dropdown-content shadow-2xl border-gray-500">
                                    <div className="flex flex-col items-center justify-between">
                                        <Link to="/dashboard/create-course" className="dropdown-item">My Course</Link>
                                        <Link to="/dashboard/profile" className="dropdown-item">Profile</Link>
                                        <Link to="/CreateCourse" className="dropdown-item">Settings</Link>
                                        <button onClick={handleLogout} className="dropdown-item">Logout</button>
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

    );
};

export default Header;