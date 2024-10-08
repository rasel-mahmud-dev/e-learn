import React from 'react';
import {useCategoryState} from "../store/categoriesState.ts";

const TopCategories = () => {

    const {categories} = useCategoryState()


    return (
        <div>
            <div className="container mx-auto px-4 py-20">
                <h2 className="text-3xl font-bold mb-4">Top Categories</h2>
                <p className="text-gray-500 mb-12 mt-4">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid dolores doloribus ea et, explicabo ipsa molestiae molestias omnis pariatur quos repudiandae sed unde, ut? Adipisci asperiores assumenda at aut autem eligendi, excepturi facilis fuga harum id illum iure maiores molestiae nam omnis possimus repellat, repellendus repudiandae sed, sint tenetur voluptatum.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">


                    {categories.map((category) => (
                        <div className="bg-red-100 p-6 rounded-lg flex items-center">
                            <div className="flex-shrink-0">
                                <svg className="h-12 w-12 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                          d="M12 4v16m0 0l8-8m-8 8L4 12m8 8V4"/>
                                </svg>
                            </div>
                            <div className="ml-4">
                                <h3 className="text-lg font-semibold">{category.title}</h3>
                            </div>
                        </div>
                    ))}


                </div>
            </div>
        </div>
    );
};

export default TopCategories;