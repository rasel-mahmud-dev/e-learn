import React from 'react';

import "./SearchHints.scss"
import {BsClock} from "react-icons/bs";

const getName(){
    return (
        <div>
            <h1>This is h1  tag. and it will shown as heading.</h1>
        </div>
    )
}
const SearchHints = ({isShowSearchSuggestion}) => {
    return isShowSearchSuggestion && (
        <div className="SearchHints">
            <div className="flex gap-x-2 text-sm items-center">
                <h4 className="font-medium">Search For</h4>
                <span>aaa</span>
            </div>

            <div>

                {Array.from({length: 100}).map((_item, i) => (
                    <li className="search-hints-item" key={i}>
                        {}
                    </li>
                ))}

            </div>
        </div>
    );
};

export default SearchHints;