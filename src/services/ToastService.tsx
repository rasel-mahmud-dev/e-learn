import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

type Option = {
    duration?: number
    text?: string
}


class ToastService {
    static openSuccess(message: string, opt?: Option) {
        const MySwal = withReactContent(Swal)
        return MySwal.fire({
            timer: 2000, // opt?.duration ?? 5000,
            icon: "success",
            title: message,
            showConfirmButton: false
        })
    }

    static openCustom() {
        const MySwal = withReactContent(Swal)
        return MySwal
    }


    static promptWithConfirm(deleteMessage: string, yesBtnLabel?: string, noBtnLabel?: string, text?: string) {
        const MySwal = withReactContent(Swal)
        // MySwal.fire({
        //     timer: 4000, // opt?.duration ?? 5000,
        //     icon: "success",
        //     title: message,
        //     showConfirmButton: false
        // })

        return new Promise<{
            isConfirmed: boolean,
            done: (status: "success" | "error" | "info", msg: string, text?: string) => void
        }>((resolve) => {
            MySwal.fire({
                title: deleteMessage || "Are you sure?",
                text: text ?? "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                cancelButtonText: noBtnLabel ?? "Cancel",
                confirmButtonText: yesBtnLabel ?? "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    return resolve({
                        isConfirmed: true,
                        done: (status: "success" | "error" | "info", msg: string, text?: string) => {
                            MySwal.fire({
                                title: msg || "Done",
                                timer: 4000,
                                text: text,
                                icon: status
                            });
                        }
                    })
                }

                resolve({
                    isConfirmed: false, done: (msg: string) => {
                        MySwal.fire({
                            title: "Operator Cancel!",
                            text: "",
                            timer: 4000,
                            icon: "info"
                        });
                    }
                })
            })
        })
    }

    static openError(message: string, opt?: Option) {
        const MySwal = withReactContent(Swal)
        MySwal.fire({
            timer: opt?.duration ?? 2000,
            icon: "error",
            title: message,
            text: opt?.text,
            showConfirmButton: false
        })
    }
}

export default ToastService;