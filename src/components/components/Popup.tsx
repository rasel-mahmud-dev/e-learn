import React, {FC, ReactNode, useEffect, useRef} from 'react';

type Props = {
    onClose: () => void
    isOpen: boolean
    className?: string
    backdropClass?: string
    children: ReactNode
    isOpenBackdrop?: boolean
}
const Popup: FC<Props> = ({onClose, className= "", isOpenBackdrop = true, backdropClass = "", isOpen, children}) => {

    function handleBlur() {
        // onClose()
    }

    return (
        <>
            <div className={`popup-root ${className ?? ""} ${isOpen ? "open" : "close" }`} tabIndex={-1} onBlur={handleBlur}>
                {children}
            </div>

            {isOpen && isOpenBackdrop && <div onClick={()=>onClose()} className={`backdrop ${backdropClass}`}></div>}

        </>
    );
};

export default Popup;