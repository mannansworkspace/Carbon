export const whitespaceNumber = (value: string | number, precision: number): string => {
    if (!value && value !== 0) return ''
    value = `${value}`
    if (!value) return ''

    const toFixedNumber = precision ? Number(value).toFixed(precision) : Number(value)

    const period = `${toFixedNumber}`.split('.')[1]
    const digits = `${toFixedNumber}`.split('.')[0]
    let digitsArr = digits.split('').reverse()

    for (let i = 0; i < digitsArr.length; i++) {
        if (i % 3 === 0 && i !== 0) digitsArr[i] = digitsArr[i] + ' '
    }

    return digitsArr.reverse().join("") + (period ? "." + period : "")
}

export const whitespaceString = (value: string | number): string => {
    if (!value && value !== 0) return ''
    value = `${value}`
    if (!value) return ''


    const period = value.split('.')[1]
    const digits = value.split('.')[0]
    let digitsArr = digits.split('').reverse()

    for (let i = 0; i < digitsArr.length; i++) {
        if (i % 3 === 0 && i !== 0) digitsArr[i] = digitsArr[i] + ' '
    }

    return digitsArr.reverse().join("") + (period ? "." + period : "")
}

export const getNumberValue = (value: string): string => {
    if(!value){
        return ''
    }
    
    // remove spaces from string
    value = value.replace(/\s/g, '');
    // remove aphats from string
    value = value.replace(/[^.\d]/g, '');

    return value
}

export const getNumber = (value: string): number => {
    return Number(getNumberValue(value))
}