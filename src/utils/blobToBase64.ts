function blobToBase64(blob: Blob){
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = function(e: any){
            resolve(e.target.result)
        }
        reader.onerror = function(e: any){
            reject(e)
        }
        if(blob){
            reader.readAsDataURL(blob)
        }
    })
}

export default blobToBase64