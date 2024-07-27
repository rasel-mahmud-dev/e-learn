import React, {useState} from 'react';
import {FaAngleDown} from "react-icons/fa";
import {Link} from "react-router-dom";
import "./Sidebar.scss"

const Sidebar = ({items, isExpand = [], toggleExpand, children}) => {


    function getAllOpened(items, parent, result) {
        if (Array.isArray(items)) {
            items.forEach(item => {
                if (item.opened) {
                    // console.log(parent) // also add all parent ids that child has opened => true
                    parent?.id && result.push(parent.id)
                    result.push(item.id)
                }
                getAllOpened(item.children, item, result)
            })
        }

    }

    const result = []
    getAllOpened(items, null, result)

    return (
        <div className="rs-sidebar">
            <div className="rs-sidebar-header">
                {children}
            </div>
            <div className="rs-sidebar-items">

                <Rec step={1} toggleExpand={toggleExpand} isExpand={isExpand} items={items}/>
            </div>
        </div>
    );
};


function Rec({items, toggleExpand, isExpand = [], step = 1}) {


    if (!items) return null

    if (Array.isArray(items)) {
        return items.map(item => (
            <div className={`sidebar-items-step-${step}`}>
                <Item
                    toggleExpand={toggleExpand}
                    noChild={!item?.children?.length}
                    item={item}
                />

                {isExpand.includes(item.id) && (
                    <Rec step={step + 1} toggleExpand={toggleExpand} isExpand={isExpand} items={item.children}/>
                )}
            </div>
        ))
    }

    return null
}

function Item({item, noChild, toggleExpand}) {

    function jumpLink(item) {
        if (!noChild) {
            toggleExpand(item)
        }
    }

    return (
        <div className="rs-sidebar__item flex items-center justify-between" onClick={() => jumpLink(item)}>
            <div className="rs-sidebar__item-inner">
                {item.icon && item.icon()}
                {
                    item.link ? (
                        <Link to={item.link}>{item.title}</Link>
                    ) : (
                        <>
                            <h4> {item.title} </h4>
                        </>
                    )
                }
            </div>
            {!noChild && <FaAngleDown/>}

        </div>
    )
}

export default Sidebar;