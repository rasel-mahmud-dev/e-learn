export function parseArrayInt(arr: any[]): number[] {
    if (!Array.isArray(arr)) return []
    return arr?.map(item => Number(item.toString())).filter(item => item)
}

