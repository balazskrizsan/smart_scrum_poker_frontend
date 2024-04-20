import {Injectable}            from "@angular/core";
import {RxStomp}               from "@stomp/rx-stomp";
import {SocketDestination}     from "../enums/socket-destination";
import {
    map,
    tap
}                              from "rxjs/operators";
import {IStdApiResponse}       from "../../../interfaces/i-std-api-response";
import {filter}                from "rxjs";
import {ISubscriptionListener} from "../../poker/interfaces/i-subscription-listener";
import {AccountService}        from "../../account/service/account-service";
import {IInsecureUser}         from "../../account/interfaces/i-insecure-user";

@Injectable()
export class RxStompService
{
    private rxStomp: RxStomp = null;
    private static serverUrl = 'wss://localhost:9999/ws';

    constructor(private accountService: AccountService)
    {
    }

    public get(): RxStomp
    {
        if (null != this.rxStomp)
        {
            return this.rxStomp;
        }

        this.rxStomp = new RxStomp();
        this.rxStomp.configure({
            brokerURL:      RxStompService.serverUrl,
            connectHeaders: this.getConnectHeaders()
        });
        this.rxStomp.activate();
    }

    private getConnectHeaders(): {}
    {
        let user: IInsecureUser;
        try
        {
            user = this.accountService.getCurrentUser()
        } catch (e)
        {
            return {}
        }

        return {
            "insecureUserIdSecure": user.idSecure
        };
    }

    public getSubscription<T>(destination: string, socketDestinationFilter: SocketDestination): ISubscriptionListener<T>
    {
        console.log(">>>> New socket subscription: ", {'destination': destination, 'filter': socketDestinationFilter});

        try
        {
            var observable = this.get()
              .watch({destination: destination})
              .pipe(
                map((message): IStdApiResponse<T> => JSON.parse(message.body).body),
                filter(body => body.socketResponseDestination == socketDestinationFilter),
                tap(body => console.log(">>>> Socket response:", {destination, socketDestinationFilter, body})),
              );

            return {observable, destination, socketDestinationFilter, $subscription: null}
        } catch (e)
        {
            console.log(e);

            throw new Error("Can't start socket connection: " + destination);
        }
    }

    public unsubscribe<T>(handler: ISubscriptionListener<T>): void
    {
        console.log(">>>> Unsubscription: ", {
            destination:             handler.destination,
            socketDestinationFilter: handler.socketDestinationFilter
        });
        handler.$subscription.unsubscribe();
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

        console.log(">>>> Socket publication: ", publication);

        this.rxStomp.publish(publication);
    }
}