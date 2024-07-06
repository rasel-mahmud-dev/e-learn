
function resizeImage({src, maxWidth = 1280, maxHeight = 760, quality = 0.5}) {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = function () {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            let width = img.width;
            let height = img.height;

            // Check if the current width is larger than the max
            if (width > maxWidth) {
                const ratio = maxWidth / width;
                width = maxWidth;
                height = height * ratio;
            }

            // Check if the current height is larger than max
            if (height > maxHeight) {
                const ratio = maxHeight / height;
                height = maxHeight;
                width = width * ratio;
            }

            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);
            canvas.toBlob((r) => {
                const base64 = canvas.toDataURL('image/jpeg', quality)
                resolve(r ? {base64, blob: r} : null)
            }, 'image/jpeg', quality); // Change format as needed
        };
    })
};

export default resizeImage