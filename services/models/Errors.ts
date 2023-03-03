export enum BackendErrorEnums {
    INVALID_NONCE,
    INVALID_SIGNATURE,
    UNKNOWN_ETH_ADDRESS,
    INVALID_REQUEST_DATA,
    INVALID_ORDER_CLASS,
    TRADING_IS_NOT_STARTED_YET,
    INVALID_ORDER_SIDE,
    INVALID_ORDER_TYPE,
    INVALID_ORDER_TIF,
    INVALID_ACCOUNT,
    INVALID_CONTRACT_ID,
    INVALID_ORDER_PRICE_PRECISION,
    INVALID_ORDER_PRICE,
    INVALID_ORDER_QTY_PRECISION,
    INVALID_ORDER_QTY,
    INVALID_ORDER_ID,
    INVALID_CN_VALIDATION_FAILED,
    INVALID_ORDER_LEGS,
}

export const BackendErrorsTranslations: {[key: string]: string} = {
    INVALID_NONCE: "Invalid nonce",
    INVALID_SIGNATURE: "Invalid signature",
    UNKNOWN_ETH_ADDRESS: "Unknown address, please deposit or try later",
    INVALID_REQUEST_DATA: "Invalid request",
    INVALID_ORDER_CLASS: "Invalid request (order class)",
    TRADING_IS_NOT_STARTED_YET: "Trading is not started yet",
    INVALID_ORDER_SIDE: "Invalid request (order side)",
    INVALID_ORDER_TYPE: "Invalid request (order type)",
    INVALID_ORDER_TIF: "Invalid request (order time in force)",
    INVALID_ACCOUNT: "Invalid request (order eth address)",
    INVALID_CONTRACT_ID: "Invalid contract id in order",
    INVALID_ORDER_PRICE_PRECISION: "Invalid order price precision",
    INVALID_ORDER_PRICE: "Invalid order price",
    INVALID_ORDER_QTY_PRECISION: "Invalid order quantity precision",
    INVALID_ORDER_QTY: "Invalid order quantity",
    INVALID_ORDER_ID: "Invalid order id",
    INVALID_CN_VALIDATION_FAILED: "Order validation failed",
    INVALID_ORDER_LEGS: "Invalid request (order legs)",
}

export enum ErrorTypeEnums {
    REGULAR_ERROR = 'regularError',
    METAMASK_NOT_FOUND_ERROR = 'metaMaskNotFoundError'
}

export interface ErrorMessage {
    error: string,
    errorMessage?: string
    isError : boolean
    errorType?: ErrorTypeEnums
    isAdmin?: boolean
}

export interface MetaMaskError {
    message: string;
    code: number;
    data?: any;
}

export default interface Errors extends Array<ErrorMessage> { }