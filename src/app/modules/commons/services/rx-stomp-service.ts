import {Injectable}        from "@angular/core";
import {RxStomp}           from "@stomp/rx-stomp";
import {SocketDestination} from "../enums/socket-destination";
import {map}             from "rxjs/operators";
import {IStdApiResponse} from "../../../interfaces/i-std-api-response";
import {
    filter,
    Observable,
    Subscription
} from "rxjs";

@Injectable()
export class RxStompService
{
    private rxStomp: RxStomp = null;
    private static serverUrl = 'wss://localhost:9999/ws';

    public get(): RxStomp
    {
        if (null != this.rxStomp)
        {
            return this.rxStomp;
        }

        this.rxStomp = new RxStomp();
        this.rxStomp.configure({
            brokerURL: RxStompService.serverUrl,
        });
        this.rxStomp.activate();
    }

    public getSubscription<T>(destination: string, socketDestinationFilter: SocketDestination):
      Observable<IStdApiResponse<T>>
    {
        console.log("> New subscription: ", {'destination': destination, 'filter': socketDestinationFilter});

        try
        {
            return this.get()
              .watch({destination: destination})
              .pipe(
                map((message): IStdApiResponse<T> => JSON.parse(message.body).body),
                filter(body => body.socketResponseDestination == socketDestinationFilter),
              );
        } catch (e)
        {
            console.log(e);

            throw new Error("Can't start socket connection: " + destination);
        }
    }

    public unsubscribe(destination: string, $subscription: Subscription): void
    {
        console.log("> Unsubscription: ", {'destination': destination});
        $subscription.unsubscribe();
    }

    public publish(destination: string, rawBody)
    {
        if (null == this.rxStomp)
        {
            this.get();
        }

        var publication = {
            destination: destination,
            body:        JSON.stringify(rawBody)
        };

        console.log("> STOMP publication: ", publication);

        this.rxStomp.publish(publication);
    }
}