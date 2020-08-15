export default function convertHourToMinutes(time: string) {
    const [hour, minutes] = time.split(':').map(Number);
    const timeinMinutes = (hour * 60) + minutes;
    return timeinMinutes;
}