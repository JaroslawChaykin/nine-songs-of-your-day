export default function resetDay(date) {
    const now = new Date(date)
    now.setHours(0)
    now.setMinutes(0)
    now.setSeconds(0)
    return now
}