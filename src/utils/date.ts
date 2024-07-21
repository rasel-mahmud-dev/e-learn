export function showDateTime(date: string | Date) {
    const dt = new Date(date)

    return dt.toDateString() + " " + dt.toLocaleTimeString()
}

