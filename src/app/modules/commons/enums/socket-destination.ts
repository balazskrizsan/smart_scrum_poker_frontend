export enum SocketDestination
{
    RECEIVE_POKER_START          = "/app/poker.start",

    POKER_ROOM                   = "/app/poker-room-",

    RECEIVE_POKER_ROOM_STATE     = "/app/poker.room.state",
    SEND_POKER_ROOM_STATE        = '/app/poker.room.state/{pokerSecureId}',

    SEND_POKER_ROUND_START       = '/app/poker.round.start/{pokerSecureId}/{ticketId}',
    RECEIVE_POKER_ROUND_START    = '/app/poker.round.start',

    SEND_POKER_ROUND_STOP        = '/app/poker.round.stop/{pokerSecureId}/{ticketId}',
    RECEIVE_POKER_ROUND_STOP     = '/app/poker.round.stop',

    SEND_POKER_VOTE              = '/app/poker.vote/{pokerSecureId}/{ticketId}',
    RECEIVE_POKER_VOTE           = '/app/poker.vote',

    SEND_INSECURE_USER_CREATE    = '/app/account.insecure.user.create',
    RECIEVE_INSECURE_USER_CREATE = '/app/account.insecure.user.create'
}