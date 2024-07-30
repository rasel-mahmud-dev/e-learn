import {useState} from "react";

function useDebounce(callback: any, delay = 300) {
    const [timer, setTimer] = useState<NodeJS.Timeout>();

    return (...args: Array<any>) => {
        clearTimeout(timer);
        const newTimer = setTimeout(() => {
            callback(...args);
        }, delay);

        setTimer(newTimer);
    };
}

export default useDebounce