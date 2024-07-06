import React, {forwardRef, useRef, useState} from 'react';
import ReactCrop, {Crop} from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'


const CropImage = forwardRef(({src, crop, setCrop, handleComplete}, ref) => {
    // const [crop, setCrop] = useState<Crop>({
    //     unit: '%', // Can be 'px' or '%'
    //     x: 25,
    //     y: 25,
    //     width: 50,
    //     height: 50
    // })

    return (
        <ReactCrop  onComplete={handleComplete} crop={crop} onChange={c => setCrop(c)}>
            <img ref={ref} className="flex" src={src}/>
        </ReactCrop>

    );
})

export default CropImage;