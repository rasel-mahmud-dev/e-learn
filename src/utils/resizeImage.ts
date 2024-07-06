function resizeImage({src, maxWidth = 1280, maxHeight = 760, quality = 0.5}) {
    return new Promise<{ base64: string, blob: any } | null>((resolve) => {
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

export function resizeProfilePhoto({ src, targetSize = 200, quality = 0.5 }) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = function () {
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
            canvas.width = targetSize;
            canvas.height = targetSize;

            let sourceX, sourceY, sourceWidth, sourceHeight;

            if (img.width > img.height) {
                // Landscape orientation
                sourceWidth = img.height;
                sourceHeight = img.height;
                sourceX = (img.width - img.height) / 2;
                sourceY = 0;
            } else {
                // Portrait orientation or square
                sourceWidth = img.width;
                sourceHeight = img.width;
                sourceX = 0;
                sourceY = (img.height - img.width) / 2 - (0.2 * img.width); // Shift 20% towards top
            }

            // Ensure sourceY doesn't go out of bounds
            if (sourceY < 0) sourceY = 0;

            context.drawImage(
                img,
                sourceX,
                sourceY,
                sourceWidth,
                sourceHeight,
                0,
                0,
                targetSize,
                targetSize
            );

            const base64 = canvas.toDataURL('image/jpeg', quality);
            canvas.toBlob((blob) => {
                resolve(blob ? { base64, blob } : null);
            }, 'image/jpeg', quality);
        };
        img.onerror = function (err) {
            reject(err);
        };
    });
}




export default resizeImage