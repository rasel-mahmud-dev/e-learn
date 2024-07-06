
type Opt = {
    accept: string[]
}

function chooseFile({accept = []}: Opt) {
    return new Promise<File | null>((resolve) => {
        const fileInput = document.createElement("input")
        fileInput.setAttribute("type", "file")
        fileInput.setAttribute("accept", accept.join(","));
        fileInput.addEventListener("change", (e: any) => {
            const file = e.target.files[0]
            if (!file) return resolve(null);
            resolve(file)
        })

        fileInput.click()
    })
}

export default chooseFile