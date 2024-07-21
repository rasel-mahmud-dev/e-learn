import {FC, useCallback, useEffect, useState} from "react";
import {VscChevronLeft, VscChevronRight} from "react-icons/vsc";
import "./pagination.scss"

export interface PaginationProps {
    perPageRow: number,
    totalItem: number,
    currentPage: number
    buttonSize?: number
    className?: string
    onChange: (args: { currentPage: number, perPageRow: number }) => void
}

function range(len: number, cb: (i: number) => void) {
    for (let i = 0; i < len; i++) {
        cb(i)
    }
}

function rangeNegative(len: number, cb: (i: number) => void) {
    for (let i = len; i > 0; i--) {
        cb(i)
    }
}

interface StateType {
    perPageRow: number,
    currentPage: number,
    showPageItems: number[]
    showNumberOfItem: number
    displayPageBtn: number
    totalPage: number
}

const RslPagination: FC<PaginationProps> = (props) => {

    const {perPageRow = 20, buttonSize = 20, className = "", currentPage = 1, totalItem = 0, onChange} = props

    const [state, setState] = useState<StateType>({
        perPageRow: 0,
        currentPage: 1,
        showPageItems: [],
        showNumberOfItem: 1,
        displayPageBtn: 10,
        totalPage: 0
    })

    const getNextDisplayPageCount = useCallback(function (displayPageBtn: number, totalItem: number) {
        const totalPage = Math.ceil(totalItem / state.perPageRow)
        return totalPage >= displayPageBtn ? displayPageBtn : totalPage
    }, [state.perPageRow])


    const calcPaginationView = useCallback((totalItem: number, _perPageRow: number) => {
        const arr: number[] = []
        const totalPage = Math.ceil(totalItem / state.perPageRow)
        let n = getNextDisplayPageCount(state.displayPageBtn, props.totalItem)

        range(n, (i) => {
            arr.push(i + 1)
        })

        setState(prev => ({
            ...prev,
            showPageItems: arr,
            totalPage: totalPage,
            totalItem: totalItem,
            showNumberOfItem: state.displayPageBtn
        }))
    }, [ getNextDisplayPageCount, state.perPageRow, state.displayPageBtn, props.totalItem]);


    useEffect(() => {
        if (totalItem) {
            calcPaginationView(totalItem, state.perPageRow)
        }
    }, [calcPaginationView, totalItem, perPageRow, state.perPageRow])


    useEffect(() => {
        setState(prev => ({
            ...prev,
            perPageRow,
            currentPage,
            displayPageBtn: buttonSize
        }))

    }, [perPageRow, buttonSize, currentPage])



    function getLastItem(arr: Array<any>) {
        return arr[arr.length - 1]
    }

    function jumpLastPage(totalPage: number, displayPageBtn: number) {
        const showPageItems: number[] = []
        rangeNegative(displayPageBtn, (i) => {
            const pageBtn = totalPage - (i - 1)
            if(pageBtn > 0){
                showPageItems.push(pageBtn)
            }
        })
        // showPageItems.sortBy()
        return showPageItems
    }

    function handleNext(pageNumber: number) {
        setState(prev => {
            const up = {...prev}

            const displayPageBtn = up.displayPageBtn
            const totalPage = up.totalPage
            const lastItem = getLastItem(prev.showPageItems)
            const endOfList = lastItem === pageNumber
            if (endOfList) {
                up.showPageItems = []

                const remain = totalPage - (displayPageBtn + lastItem)
                // let low = Math.abs(remain) + lastItem
                const high = displayPageBtn - Math.abs(remain)


                if (remain < 0) {
                    rangeNegative(Math.abs(remain), (i) => {
                        const nextPageBtnNo = lastItem - (i - 1)
                        if(nextPageBtnNo > 0){
                            up.showPageItems.push(nextPageBtnNo)
                        }
                    })

                    if (high) {
                        range(high, (i) => {
                            const nextPageBtnNo = lastItem + (i + 1)
                            up.showPageItems.push(nextPageBtnNo)
                        })
                    }
                } else {
                    range(displayPageBtn, (i) => {
                        const nextPageBtnNo = lastItem + (i)
                        if (nextPageBtnNo <= totalPage) {
                            up.showPageItems.push(nextPageBtnNo)
                        }
                    })
                }
                // up.showPageItems
                up.currentPage = lastItem
            } else {
                up.currentPage = pageNumber
            }
            onChange(up)
            return up
        })
    }

    function handlePrev(pageNumber: number) {
        setState(prev => {
            const up = {...prev}
            const displayPageBtn = up.displayPageBtn
            const firstOfList = prev.showPageItems[0]
            const isFirst = firstOfList > pageNumber
            if (isFirst) {
                if (displayPageBtn > pageNumber) {
                    up.showPageItems = []
                    range(displayPageBtn, (i) => {
                        up.showPageItems.push(i + 1)
                    })
                } else {
                    up.showPageItems = []
                    rangeNegative(displayPageBtn, (i) => {
                        up.showPageItems.push(firstOfList - i)
                    })
                }
            }
            up.currentPage = pageNumber
            onChange(up)
            return up
        })
    }

    function changePage(pageNumber: number) {

        setState(prev => {
            const updatedPaginationState = {...prev}
            const displayPageBtn = updatedPaginationState.displayPageBtn
            const totalPage = updatedPaginationState.totalPage


            if (pageNumber === totalPage) {
                const re = {
                    ...updatedPaginationState,
                    currentPage: pageNumber,
                    showPageItems: jumpLastPage(totalPage, displayPageBtn)
                }
                onChange(re)
                return re
            }

            const lastNoOfCurrentShowPageBtn = getLastItem(updatedPaginationState.showPageItems)
            const firstNoOfCurrentShowPageBtn = updatedPaginationState.showPageItems[0]
            const isFirst = pageNumber === firstNoOfCurrentShowPageBtn
            const isLastPage = pageNumber === lastNoOfCurrentShowPageBtn
            const isHasBeforePage = pageNumber < lastNoOfCurrentShowPageBtn && totalPage - pageNumber
            let getDisplayPageBtn = getNextDisplayPageCount(state.displayPageBtn, props.totalItem)

            if (isFirst) {

                if (firstNoOfCurrentShowPageBtn > displayPageBtn) {
                    updatedPaginationState.showPageItems = []
                    rangeNegative(getDisplayPageBtn, (i) => {
                        updatedPaginationState.showPageItems.push(firstNoOfCurrentShowPageBtn - (i - 1))
                    })
                    updatedPaginationState.currentPage = pageNumber

                } else {
                    updatedPaginationState.showPageItems = []
                    range(getDisplayPageBtn, (i) => {
                        updatedPaginationState.showPageItems.push(i + 1)
                    })
                    updatedPaginationState.currentPage = 1
                }

            } else if (!isFirst && isHasBeforePage) {
                // middle number click
                updatedPaginationState.currentPage = pageNumber

            } else if (isLastPage) {
                updatedPaginationState.showPageItems = []

                const remain = totalPage - (displayPageBtn + lastNoOfCurrentShowPageBtn)
                // const low = Math.abs(remain) + lastNoOfCurrentShowPageBtn
                const high = displayPageBtn - Math.abs(remain)
                if (remain < 0) {
                    rangeNegative(Math.abs(remain), (i) => {
                        const nextPageBtnNo = lastNoOfCurrentShowPageBtn - (i - 1)
                        updatedPaginationState.showPageItems.push(nextPageBtnNo)
                    })

                    if (high) {
                        range(high, (i) => {
                            const nextPageBtnNo = lastNoOfCurrentShowPageBtn + (i + 1)
                            updatedPaginationState.showPageItems.push(nextPageBtnNo)
                        })
                    }

                } else {
                    range(getDisplayPageBtn, (i) => {

                        const nextPageBtnNo = lastNoOfCurrentShowPageBtn + (i)

                        if (nextPageBtnNo <= totalPage) {
                            updatedPaginationState.showPageItems.push(nextPageBtnNo)
                        }
                    })
                }

                updatedPaginationState.currentPage = lastNoOfCurrentShowPageBtn

            } else {
                updatedPaginationState.currentPage = pageNumber
            }

            onChange(updatedPaginationState)
            return updatedPaginationState
        })
    }

    function isDisabled() {
        return props.totalItem <= 0
    }


    return (
        <div className={`${className ?? ""} rs-pagination`}>
            <div className="column-gap-2">
                <span className="pagination-end-start-button"
                      onClick={() => !isDisabled() && handlePrev(1)}>Start</span>
                <span>|</span>
            </div>

            <div className="">
                <button className={`paginationArrow ${state.currentPage === 1 ? "disable-paginationArrow" : ""}`}
                        onClick={() => !isDisabled() && handlePrev(Number(state.currentPage - 1))}>
                    <VscChevronLeft/>
                    <span>Previous</span>
                </button>

                <div className="pagination-items">
                    {state.showPageItems.length > 0 ? state.showPageItems.map((pageNumber) => (
                        <div key={pageNumber}
                             onClick={() => !isDisabled() && changePage(Number(pageNumber))}
                             className={`pagination-item ${pageNumber === state.currentPage ? "active" : ""}`}>
                            {pageNumber}
                        </div>
                    )) : (
                        <div
                            className={`pagination-item no-page`}>
                            No page
                        </div>
                    )}
                </div>

                <button
                    className={`paginationArrow ${(state.currentPage === state.totalPage) ? "disable-paginationArrow" : ""}`}
                    onClick={() => !isDisabled() && handleNext(Number(state.currentPage + 1))}>
                    <span>Next</span>
                    <VscChevronRight/>
                </button>
            </div>

            <div>
                <span>|</span>
                <span className="pagination-end-start-button"
                      onClick={() => !isDisabled() && changePage(state.totalPage)}>End</span>
            </div>

            <div className="page-of">
                <span>Page</span>
                <span>{currentPage}</span>
                <span>of</span>
                <span>{state.totalPage}</span>
            </div>
        </div>
    );
};

export default RslPagination;


