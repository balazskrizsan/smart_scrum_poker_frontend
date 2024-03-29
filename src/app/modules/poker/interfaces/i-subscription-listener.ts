import {
    Observable,
    Subscription
}                        from "rxjs";
import {IStdApiResponse} from "../../../interfaces/i-std-api-response";
import {SocketDestination} from "../../commons/enums/socket-destination";

export interface ISubscriptionListener<T>
{
    observable: Observable<IStdApiResponse<T>>;
    destination: string;
    socketDestinationFilter: SocketDestination;
    $subscription: Subscription;
}