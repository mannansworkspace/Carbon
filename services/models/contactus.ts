export default interface ContactUsForm{
    name: string,
    email: string,
    country?: string,
    company?: string,
    info?: string,
    message: string,
    captcha? : string
}