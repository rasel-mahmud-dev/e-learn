import React, {FC, InputHTMLAttributes, useEffect, useState} from 'react';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
    label: string;
    as?: "textarea" | "input"
}

const TextInput: FC<TextInputProps> = (props) => {

    const {name, type, as = "input", placeholder, className = "", label, value, ...attrs} = props

    const [state, setState] = useState({
        isExpand: !!placeholder || !!value,
        isActive: false
    })

    function handleBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const val = e.target.value
        setState({isExpand: !!val || !!placeholder, isActive: false})
    }

    function handleFocus() {
        setState({isExpand: true, isActive: true})
    }

    useEffect(() => {
        if (value) {
            setState(prevState => ({...prevState, isActive: !!placeholder || !!value}))
        }
    }, [value])


    return (

        <div
            className={`${className}
             ${as == "textarea" ? "el-compact-form-control-container-textarea" : ""}
             el-compact-form-control-container ${state.isActive ? "el-compact-form-control-container-active" : ""} ${state.isExpand ? "el-compact-form-control-container-expand" : ""}`}>

            {as == "textarea" ? (
                <textarea {...attrs}
                          id={name}
                          value={value}
                          placeholder={placeholder}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                          name={name}
                          className="el-text-input   "
                ></textarea>
            ) : (
                <input {...attrs}
                       id={name}
                       value={value}
                       placeholder={placeholder}
                       onFocus={handleFocus}
                       onBlur={handleBlur}
                       name={name} type={type}
                       className="el-text-input   "
                />
            )}


            <label htmlFor={name} className="el-form-label el-heading-sm"><span
                className="el-compact-form-label-content"><span
                className="el-compact-form-label-text">{label}</span></span></label>

        </div>
    );
};

export default TextInput;