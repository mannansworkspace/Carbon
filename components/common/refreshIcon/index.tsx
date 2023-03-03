import { FC } from "react"

interface Props {
    onRefresh: Function,
}
const Refresh: FC<Props> = (props) => {

    const { onRefresh } = props
    return (
        <div className="flex w-[49px] h-[51px]">

            <div style={{ cursor: 'pointer' }} onClick={() => onRefresh()} className="flex w-[49px] h-[50px]  ml-5"  >
                <svg
                    className="m-auto"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="#FFFFFF"
                    aria-hidden="true"
                    width="20px"
                    height="20px"
                >
                    <path
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    ></path>
                </svg>
            </div>
        </div>

    )
}

export default Refresh