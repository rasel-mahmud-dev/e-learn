import React, {useState} from "react";
import {TfiAngleRight} from "react-icons/tfi";
import {Link} from "react-router-dom";


function CategoryDropdown({categories, subCategories, topics, isOpen, setOpen}) {


    const [selectedCate, setSelelectedCat] = useState(null);

    function handleMouseLeave() {
        setOpen(false);
        setSelelectedCat(null)
    }

    return isOpen && (
        <div className="category-dropdown"
             onMouseLeave={handleMouseLeave}>

            <div className="flex gap-x-5  ">

                <div className="dropdown-section w-full">
                    {categories.map(cat => (

                        <div onClick={() => setSelelectedCat(cat.id)}
                             className="max-w-2xl w-full flex justify-between items-center ">

                            <h4>{cat.title}</h4>

                            <TfiAngleRight className="text-xs"/>

                        </div>
                    ))}
                </div>


                {selectedCate == 1 && (
                    <div className="dropdown-section  w-full">
                        {subCategories?.map(cat => (

                            <div onClick={() => setSelelectedCat(cat.id)}
                                 className="max-w-2xl w-full flex justify-between items-center ">
                                <h4>{cat.title}</h4>
                                <TfiAngleRight className="text-xs"/>

                            </div>
                        ))}

                    </div>
                )}


                {selectedCate == 1 && (
                    <div className="dropdown-section  w-full">
                        {topics?.map(top => (
                            <Link onClick={() => setOpen(false)} to={`/topic/${top.slug}`}
                                  className="flex justify-between items-center">
                                <h4>{top.title}</h4>
                            </Link>
                        ))}

                    </div>
                )}
            </div>

        </div>
    )
}

export default CategoryDropdown