export const formatDate = (dateTime: number | Date): string => {
    const local = 'en-US';
    const day: any = { day: '2-digit' };
    const month: any = { month: '2-digit' };
    const year: any = { year: 'numeric' };
    const time: any = { hour: '2-digit', hour12: false, minute: '2-digit' };
    const date = new Date(dateTime);
    const formatter = date.toLocaleDateString.bind(date);
    const timeFormatter = date.toLocaleTimeString.bind(date);
    return `${formatter(local, month)}-${formatter(local, day)}-${formatter(local, year)} ${timeFormatter(local, time)}`;
};

export const formatDateForHistoryTable = (dateTime: number | Date): { date: string, time: string } => {
    const local = 'en-US';
    const day: any = { day: '2-digit' };
    const month: any = { month: 'short' };
    const year: any = { year: 'numeric' };
    const time: any = { hour: '2-digit', hour12: false, minute: '2-digit' };
    const date = new Date(dateTime);
    const formatter = date.toLocaleDateString.bind(date);
    const timeFormatter = date.toLocaleTimeString.bind(date);
    return {
        date: `${formatter(local, day)} ${formatter(local, month)} ${formatter(local, year)}`,
        time: `${timeFormatter(local, time)}`
    };
}