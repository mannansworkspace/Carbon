import { FC, useMemo } from "react"
import Modal from "components/common/Modal"

interface Props {
    title: string,
    onClose: Function,
    event: any
}



const Content: FC<Props> = (props) => {
    const {
        title,
        onClose,
        event
    } = props

    console.log({event})

    const bodyContent = useMemo(() => {
        if (event) {
            return [...Object.keys(event)
                .map((key) => {
                    return <p>{key} : <span>{`${event[key]}`}</span></p>
                })]
        }
    }, [event])

    return (
        <div>
            <Modal.Header title={title} showCloseBtn={true} onClose={() => onClose(false)} />
            <Modal.Body>
                <div>
                    {event && bodyContent}
                </div>
            </Modal.Body>
        </div>
    )
}
export default Content