import React from "react";

function chooseFirstLetter(name) {
    if (!name) {
        return "";
    }
    let letterOne = name[0];
    let letterTwo = "";
    let splitName = name.split(" ");
    if (splitName.length > 1) {
        letterTwo = splitName[1][0];
    }
    return letterOne + letterTwo;
}


const Image = ({className = "", imgClass = "", fallbackLetter = false, username = "", src, ...attr}) => {
        let letter = chooseFirstLetter(username)

        function handleErrorImage(e) {
            if (!fallbackLetter) {
                e.target.src = "/images/no-product.png"
            } else {
                let avatarRoot = (e.target?.parentNode)
                avatarRoot.innerHTML = `
			<span class="rounded-full bg-gray-200 w-9 h-9 flex items-center text-sm font-medium justify-center uppercase">${chooseFirstLetter(username)}</span>
		`
            }
        }

        return (
            <div className={className} {...attr}>
                {src
                    ? <div className="avatar-root">
                        <img onError={handleErrorImage} src={src} alt="avatar"
                             className={`rounded-full w-full ${imgClass}`}/>
                    </div>
                    :
                    <div
                        className={`rounded-full bg-gray-50/50 flex text-base items-center justify-center uppercase ${imgClass}`}>{letter}</div>
                }
            </div>
        );
    }
;

export default Image;
