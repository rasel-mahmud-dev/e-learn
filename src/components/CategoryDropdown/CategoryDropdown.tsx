import React, {useState} from "react";
import {TfiAngleRight} from "react-icons/tfi";
import {Link} from "react-router-dom";


function CategoryDropdown({categories, subCategories, topics, isOpen, setOpen}) {


    const [selectedCate, setSelelectedCat] = useState<string>("");
    const [selectedSubCate, setSelectedSubCate] = useState<string>("");


    function handleMouseLeave() {
        setOpen(false);
        setSelectedSubCate("")
        setSelelectedCat("")
    }

    function makeCateUrl() {
        const cat = categories.find(category => category.id === selectedCate);
        const subCat = subCategories.find(subCat => subCat.id === selectedSubCate);

        return `${cat?.slug}/${subCat?.slug}`
    }


    return isOpen && (
        <div className="category-dropdown"
             onMouseLeave={handleMouseLeave}>

            <div className="flex gap-x-5  ">

                <div className="dropdown-section w-full">
                    {categories.map(cat => (

                        <div onMouseEnter={() => setSelelectedCat(cat.id)}
                             className="max-w-2xl w-full flex justify-between items-center ">

                            <h4>{cat.title}</h4>

                            <TfiAngleRight className="text-xs"/>

                        </div>
                    ))}
                </div>


                {selectedCate && (
                    <>
                        <div className="dropdown-section  w-full">
                            {subCategories.filter((c) => c?.categories?.includes(selectedCate?.toString()))?.map(cat => (
                                <Link to={`/courses/${makeCateUrl()}`} onMouseEnter={() => setSelectedSubCate(cat.id)}
                                      className="max-w-2xl w-full flex justify-between items-center ">
                                    <h4>{cat.title}</h4>
                                    <TfiAngleRight className="text-xs"/>
                                </Link>
                            ))}

                        </div>

                        {selectedSubCate && (
                            <div className="dropdown-section  w-full">
                                {topics.filter((c) => c?.subCategories?.includes(selectedSubCate?.toString()))?.map(top => (
                                    <Link key={top.id} to={`/topic/${top.slug}`}
                                          className="flex justify-between items-center">
                                        <h4>{top.title}</h4>
                                    </Link>
                                ))}

                            </div>
                        )}
                    </>
                )}


            </div>

        </div>
    )
}

export default CategoryDropdown