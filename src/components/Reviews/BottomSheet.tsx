import React, {useEffect, useRef, useState} from 'react';

import "./BottomSheet.scss"

const BottomSheet = ({onClose, isOpen, children}) => {

    const [dragActive, setDragActive] = useState(false);

    const dragActiveRef = useRef<boolean>(false);

    function onMouseDown(e) {
        setDragActive(true)
        dragActiveRef.current = true
    }

    useEffect(() => {
        document.body.classList.toggle("overflow-hidden");
    }, [isOpen]);


    function onMouseUp(e) {
        setDragActive(false)
        dragActiveRef.current = false
    }

    function onMouseMove(e) {
        console.log("sdjklfsdjklf")
    }


    function documentMouseMove(e) {
        if (dragActiveRef.current) {
            console.dir(e);
        }
    }


    useEffect(() => {
        // document.addEventListener("mousemove", documentMouseMove)
        // return () => document.removeEventListener("mousemove", documentMouseMove)
    }, []);


    return  (
        <div className={`BottomSheet ${isOpen ? "BottomSheet-open" : ""}`}>
            <div className="BottomSheet-backdrop" onClick={onClose}/>
            <div className="BottomSheet-modal">
                <div onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseDown={onMouseDown}
                     className="BottomSheet-resize-bar"></div>
                <div>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default BottomSheet;