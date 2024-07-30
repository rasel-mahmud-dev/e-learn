import React, {useEffect, useState} from 'react';

import "./SearchHints.scss"
import useDebounce from "../../hooks/useDebounce.tsx";
import {api} from "../../apis";


const SearchHints = ({isShowSearchSuggestion, value}) => {

    const db = useDebounce(handleSearch, 500)

    const [searchSuggestions, setSearchSuggestions] = useState([])

    async function handleSearch(value: string) {
        try {
            api.post("/api/v1/courses/search", {value: value})

            api.post("/api/v1/courses/search-suggestion", {query: value}).then(({data}) => {
                if (data?.suggestions) {
                    setSearchSuggestions(data?.suggestions)
                }
            })
        } catch (ex) {
            console.log(ex)
        }
    }

    useEffect(() => {
        db(value)
    }, [value]);


    return isShowSearchSuggestion && (
        <div className="SearchHints">
            <div className="flex gap-x-2 text-sm items-center">
                <h4 className="font-medium">Search For</h4>
                <span>aaa</span>
            </div>

            <div>

                {searchSuggestions.map((_item, i) => (
                    <li className="search-hints-item" key={i}>
                        {_item}
                    </li>
                ))}

            </div>
        </div>
    );
};

export default SearchHints;