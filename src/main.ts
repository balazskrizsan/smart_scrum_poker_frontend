import {bootstrapApplication} from "@angular/platform-browser";
import {provideRouter}        from "@angular/router";
import {routes}               from "./app/routing";
import {provideAnimations}    from "@angular/platform-browser/animations";
import {AppComponent}         from "./app/app.component";
import {provideHttpClient}    from "@angular/common/http";
import {RxStompService}       from "./app/modules/commons/services/rx-stomp-service";
import {AccountService}       from "./app/modules/account/service/account-service";
import {HttpService}          from "./app/services/http-service";
import {LocalStorageService}  from "./app/services/local-storage-service";
import {FlashMessageState}    from "./app/modules/flash-message/states/flash-message-state";
import {FlashMessageService}  from "./app/modules/flash-message/services/flash-message-service";
import {Forms}                from "./app/modules/poker/forms";
import {PokerStateStore}      from "./app/modules/poker/poker-state-store.service";

// Poker services
import {AddTicketService}               from "./app/modules/poker/service/add-ticket-service";
import {GameStateService}               from "./app/modules/poker/service/game-state-service";
import {OwnService}                     from "./app/modules/poker/service/own-service";
import {PokerTicketDeleteService}       from "./app/modules/poker/service/poker-ticket-delete-service";
import {RoundStartService}              from "./app/modules/poker/service/round-start-service";
import {SessionClosedService}           from "./app/modules/poker/service/session-closed-service";
import {SessionCreatedOrUpdatedService} from "./app/modules/poker/service/session-created-or-updated-service";
import {SubscriptionService}            from "./app/modules/poker/service/subscription-service";
import {TicketCloseService}             from "./app/modules/poker/service/ticket-close-service";
import {VoteNewJoinerService}           from "./app/modules/poker/service/vote-new-joiner-service";
import {VoteService}                    from "./app/modules/poker/service/vote-service";
import {VoteStopService}                from "./app/modules/poker/service/vote-stop-service";
import {VoterLeavingService}            from "./app/modules/poker/service/voter-leaving-service";

// Poker factories
import {AddTicketListenerFactory}               from "./app/modules/poker/factories/add-ticket-listener-factory";
import {GameStateListenerFactory}               from "./app/modules/poker/factories/game-state-listener-factory";
import {PokerStartListenerFactory}              from "./app/modules/poker/factories/poker-start-listener-factory";
import {PokerTicketDeleteListenerFactory}       from "./app/modules/poker/factories/poker-ticket-delete-listener-factory.service";
import {RoundStartListenerFactory}              from "./app/modules/poker/factories/round-start-listener-factory";
import {SessionClosedListenerFactory}           from "./app/modules/poker/factories/session-closed-listener-factory";
import {SessionCreatedOrUpdatedListenerFactory} from "./app/modules/poker/factories/session-created-or-updated-listener-factory.service";
import {TicketCloseListenerFactory}             from "./app/modules/poker/factories/ticket-close-listener-factory";
import {VoteListenerFactory}                    from "./app/modules/poker/factories/vote-listener-factory";
import {VoteNewJoinerListenerFactory}           from "./app/modules/poker/factories/vote-new-joiner-listener-factory";
import {VoteStopListenerFactory}                from "./app/modules/poker/factories/vote-stop-listener-factory";
import {VoterLeavingFactory}                    from "./app/modules/poker/factories/voter-leaving-factory";

// Poker repositories
import {CompanyRepository} from "./app/modules/poker/repositories/company-repository";

// Poker forms
import {NewTicketForm} from "./app/modules/poker/submodules/forms";
import {TicketOpenListenerFactory} from "./app/modules/poker/factories/ticket-open-listener-factory";
import {TicketOpenService} from "./app/modules/poker/service/ticket-open-service";

bootstrapApplication(AppComponent, {
    providers: [
        provideRouter(routes),
        provideAnimations(),
        provideHttpClient(),
        RxStompService,
        AccountService,
        HttpService,
        LocalStorageService,
        FlashMessageState,
        FlashMessageService,
        Forms,
        PokerStateStore,

        // Poker services
        AddTicketService,
        GameStateService,
        OwnService,
        PokerTicketDeleteService,
        RoundStartService,
        SessionClosedService,
        SessionCreatedOrUpdatedService,
        SubscriptionService,
        TicketOpenService,
        TicketCloseService,
        VoteNewJoinerService,
        VoteService,
        VoteStopService,
        VoterLeavingService,

        // Poker factories
        AddTicketListenerFactory,
        GameStateListenerFactory,
        PokerStartListenerFactory,
        PokerTicketDeleteListenerFactory,
        RoundStartListenerFactory,
        SessionClosedListenerFactory,
        SessionCreatedOrUpdatedListenerFactory,
        TicketOpenListenerFactory,
        TicketCloseListenerFactory,
        VoteListenerFactory,
        VoteNewJoinerListenerFactory,
        VoteStopListenerFactory,
        VoterLeavingFactory,

        // Poker repositories
        CompanyRepository,

        // Poker forms
        NewTicketForm,
    ]
}).catch(err => console.error(err));
