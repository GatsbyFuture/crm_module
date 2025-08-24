import {ErrorCodes} from "../enums/error.codes";

export const ErrorMessages: Record<ErrorCodes, { status: number, message: string }> = {
    [ErrorCodes.FLOW_PLATFORM_NOT_FOUND]: {status: 404, message: "Flow platform not found!"},
    [ErrorCodes.FLOW_PLATFORM_ALREADY_EXIST]: {status: 409, message: "Flow platform already exists!"},


    [ErrorCodes.FLOW_SETTING_NOT_FOUND]: {status: 404, message: "Flow setting not found!"},
    [ErrorCodes.FLOW_SETTING_ALREADY_EXIST]: {status: 409, message: "Flow setting already exists!"},

    [ErrorCodes.DATA_NOT_FOUND]: {status: 404, message: "Data not found!"},
    [ErrorCodes.DATA_ALREADY_EXIST]: {status: 409, message: "Data already exists!"},
}