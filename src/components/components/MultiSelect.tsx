import React, {FC, InputHTMLAttributes, useEffect, useState} from 'react';

interface SelectProps extends InputHTMLAttributes<HTMLSelectElement> {
    label: string;
    as?: "textarea" | "input",
    multiple?: boolean;
    options: any
    optName: string,
    optId: string,
}


const MultiSelect: FC<SelectProps> = (props) => {
    const {
        name,
        options,
        multiple,
        optId = "id",
        optName = "name",
        as = "input",
        placeholder,
        className = "",
        label,
        value,
        onChange
    } = props

    const [state, setState] = useState({
        isExpand: !!placeholder || !!value,
        isActive: false
    })

    const [selected, setSelected] = useState<string[]>([])


    useEffect(() => {
        if (value) {
            setState(prevState => ({...prevState, isActive: !!placeholder || !!value}))
            setSelected(value)
        }
    }, [value])


    function handleChange(e) {
        const {value} = e.target
        if (!multiple) {
            const val = value ? [value] : []
            setSelected(val)
            onChange({target: {name, value: val[0] ? val[0] : ""}})
        }

        setSelected(prevState => {
            const updatedState = [...prevState]
            const hasIndex = updatedState.indexOf(value)
            if (hasIndex === -1) {
                updatedState.push(value)
            } else {
                updatedState.splice(hasIndex, 1)
            }
            e.target.value = ""
            onChange({target: {name, value: updatedState}})
            return updatedState
        })
    }


    function handleRemoveSelected(id: string) {
        setSelected(prevState => prevState.filter(item => item != id))
    }

    function getSelectedItemName(id: string) {
        const item = options?.find(option => option[optId] == id)
        if (!item) return ""
        return item?.[optName]
    }

    return (
        <div
            className={`${className}
             ${as == "textarea" ? "el-compact-form-control-container-textarea" : ""}
             ${multiple ? "multiselect" : null}
             el-compact-form-control-container ${state.isActive ? "el-compact-form-control-container-active" : ""} ${state.isExpand ? "el-compact-form-control-container-expand" : ""}`}>

            {multiple && <div className="selected-list">
                {selected.map(item => (
                    <div onClick={() => handleRemoveSelected(item)}>
                        {getSelectedItemName(item)}
                    </div>
                ))}
            </div>}

            <select onChange={handleChange} className="rs_select">
                {placeholder && (
                    <option value="">{placeholder}</option>
                )}
                {options.map(opt => (
                    <option key={opt[optId]} value={opt[optId]}>
                        {opt[optName]}
                    </option>
                ))}
            </select>


            <label htmlFor={name} className="el-form-label el-heading-sm"><span
                className="el-compact-form-label-content"><span
                className="el-compact-form-label-text">{label}</span></span></label>

        </div>
    );
};

export default MultiSelect;