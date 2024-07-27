import React from 'react';
import {BiHeart} from "react-icons/bi";
import "./Tab.scss"

const Tab = () => {
    return (
        <div className="rs-tab">
            <li className="rs-tab-el">
                <div className="icon"><BiHeart/></div>
            </li>
            <li className="rs-tab-el">
                <div className="icon"><BiHeart/></div>
                <div className="bar"> </div>
                <div className="nav__light"> </div>
            </li>
        </div>
    );
};

export default Tab;