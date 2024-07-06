import React, {FC, FocusEventHandler, InputHTMLAttributes, useState} from 'react';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

const TextInput: FC<TextInputProps> = (props) => {

    const {name, type, placeholder, className = "", label, ...attrs} = props

    const [state, setState] = useState({
        isExpand: !!placeholder,
        isActive: false
    })

    function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
        const val = e.target.value
        setState({isExpand: !!val || !!placeholder, isActive: false})
    }

    function handleFocus() {
        setState({isExpand: true, isActive: true})
    }


    return (

        <div
            className={`${className} el-compact-form-control-container ${state.isActive ? "el-compact-form-control-container-active" : ""} ${state.isExpand ? "el-compact-form-control-container-expand" : ""}`}>

            <input {...attrs}
                   id={name}
                   placeholder={placeholder}
                   onFocus={handleFocus}
                   onBlur={handleBlur}
                   name={name} type={type}
                   className="el-text-input   "
            />

            <label htmlFor={name} className="el-form-label el-heading-sm"><span
                className="el-compact-form-label-content"><span
                className="el-compact-form-label-text">{label}</span></span></label>

        </div>
    );
};

export default TextInput;