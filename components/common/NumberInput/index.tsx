
interface Props {
    placeholder?: string,
    type?: string,
    min?: number,
    name: string,
    className: string,
    value: string | number | null,
    onChange: (event: any, index: number) => void,
    precision: number,
    index?: any,
    disabled?: boolean,
    invalidfields?: any,
    style?: any
}

const NumberInput = (props: Props) => {

    const whitespaceInputNumber = (value: string | number): string => {
        value = `${value}`.replace(/\s/g, '')
        if (!value && value !== '0') return ''

        let dot = ''
        
        if (value.includes('.')) dot = '.'
        if (value.includes(' ')) value = value.replace(' ', "")
        
        const period = `${value}`.split('.')[1]
        const digits = `${value}`.split('.')[0]
        
        let digitsArr = digits.split('').reverse()
    
        for (let i = 0; i < digitsArr.length; i++) {
            if (i % 3 === 0 && i !== 0) {
                digitsArr[i] = digitsArr[i] + ' '
            }
        }

        if (dot && !period) return digitsArr.reverse().join("") + dot
        if (!period) return digitsArr.reverse().join("")

        return digitsArr.reverse().join("") + (period ? "." + period : "")
    }

    return (
        <>
            <div className={`flex justify-between items-center relative rounded  w-full table-select`}>
                <input {...props} type="text" value={props.value ? whitespaceInputNumber(props.value) : ''} onChange={(e: any) => props.onChange(e, props.index)}/>
            </div>
        </>
    )
}

export default NumberInput
