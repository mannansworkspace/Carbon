import moment from "moment";
 const FormatDate = (date: Date): string =>  moment(date).format('YYYY-MM-DD')
export default FormatDate