import {SocketDestination} from "../modules/commons/enums/socket-destination";

export class IStdApiResponse<T> {
    data?: T;
    socketResponseDestination: SocketDestination;
    errorData?: any;
    success: boolean;
    errorCode: number;
    statusCode: number;
}
