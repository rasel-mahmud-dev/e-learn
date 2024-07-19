import React, {FC, ReactNode} from 'react';

export interface CommonTableColumn {
    name: string,
    field: string,
    tdClass?: string,
    tdThClass?: string,
    thClass?: string,
    render?: (el: string | number | any, item: any, index: number, colIndex: number) => ReactNode | React.JSX.Element | string | number
    renderTh?: (name: string | number | any, item: any, colIndex: number) => ReactNode | React.JSX.Element | string | number
}

type Props = {
    className?: string,
    tbodyClass?: string,
    column: CommonTableColumn[],
    data: Array<any>
    endColumn?: () => ReactNode
    renderTbHeader?: () => ReactNode
    onRenderTr?: (item: any) => string
}

const CommonTable: FC<Props> = (props) => {
    const {
        data,
        onRenderTr,
        column,
        renderTbHeader,
        tbodyClass = "",
        className = "",
        endColumn
    } = props
    return (
        <div>
            <table className={`rsl-table ${className}`}>

                {renderTbHeader && <thead className="table-header-div">

                <tr>
                    <th colSpan={column?.length} className="">
                        {renderTbHeader?.()}
                    </th>
                </tr>
                </thead>}

                <thead>
                <tr>
                    {column.map((tr, index) => (
                        <th key={tr.name} className={` ${tr.thClass ?? ""}  ${tr.tdThClass ?? ""}`}>
                            {tr.renderTh ? tr.renderTh(tr.name, tr, index) : tr.name}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody className={tbodyClass}>
                {data.map((item, index) => {
                    const className = onRenderTr?.(item) ?? ""
                    return <tr className={className} key={index}>
                        {column.map((tr, colIndex) => (
                            <td data-th={tr.name} key={tr.name} className={`${tr.tdClass ?? ""} ${tr.tdThClass ?? ""}`}>
                                {tr.render
                                    ? tr.render(item[tr.field], item, index, colIndex)
                                    : item[tr.field]
                                }
                            </td>
                        ))}
                    </tr>
                })}
                {endColumn && endColumn()}
                </tbody>
            </table>
        </div>
    );
};

export default CommonTable;