import React, {useEffect, useState} from "react";
import {BsStarFill} from "react-icons/bs";

const RatingChooser = ({
                           name,
                           className = "",
                           labelClass,
                           defaultValue,
                           label,
                           onChange,
                           inputClass = "",
                           total
                       }) => {
    const [state, setState] = useState({
        value: "",
        errorMessage: "",
    });

    useEffect(() => {
        setState({
            value: defaultValue,
            errorMessage: "",
        });
    }, [defaultValue]);

    function handleChangeRate(rate) {

        setState((p) => ({
            ...p,
            // errorMessage: validate,
            value: rate
        }));

        onChange({target: {name, value: rate}});
    }

    return (
        <div className={`rsl-input-group ${className}`}>
            {label && (
                <label className={`cursor-pointer ${labelClass}`} htmlFor={name}>
                    {label}
                </label>
            )}
            <div
                className="rounded-md  outline-none flex gap-x-1">
                {Array(total).fill(1).map((_, index) => (
                    <BsStarFill key={index} onClick={() => handleChangeRate(index + 1)}
                                className={`text-dark-50/50 cursor-pointer ${state.value >= String(index + 1) ? "!text-orange-400" : ""} `}

                    />
                ))}
            </div>

            {state.errorMessage && <div className="text-red-400 text-sm mt-1">{state.errorMessage}</div>}
        </div>
    );
};
;

export default RatingChooser;
