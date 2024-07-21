function getAssetPath(link: string) {
    if(!link) return ""
    if(link.startsWith("http")) return link
    return  "/images/" + link
}

export default getAssetPath