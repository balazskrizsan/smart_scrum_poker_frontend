import {SocketDestination} from "../../commons/enums/socket-destination";
import {IPoker}            from "./i-poker";

export interface IStart {
    requestDestination: SocketDestination,
    poker: IPoker,
}