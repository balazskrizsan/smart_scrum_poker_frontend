export enum SocketDestination
{
    RECEIVE_SESSION_CREATED_OR_UPDATED = "/app/session.created_or_updated",
    RECEIVE_SESSION_CLOSED             = "/app/session.closed",

    RECEIVE_POKER_START                = "/app/poker.start",

    POKER_ROOM                         = "/app/poker-room-",

    RECEIVE_POKER_ROOM_STATE           = "/app/poker.room.state",
    SEND_POKER_ROOM_STATE              = '/app/poker.room.state/{pokerIdSecure}/{insecureUserId}',

    SEND_POKER_ROUND_START             = '/app/poker.round.start/{pokerIdSecure}/{ticketId}',
    RECEIVE_POKER_ROUND_START          = '/app/poker.round.start',

    SEND_POKER_ROUND_STOP              = '/app/poker.round.stop/{pokerIdSecure}/{ticketId}',
    RECEIVE_POKER_ROUND_STOP           = '/app/poker.round.stop',

    SEND_POKER_TICKET_CLOSE            = '/app/poker.ticket.close/{pokerIdSecure}/{ticketId}',
    RECEIVE_POKER_TICKET_CLOSE         = '/app/poker.ticket.closed',

    SEND_POKER_VOTE                    = '/app/poker.vote/{pokerIdSecure}/{ticketId}',
    RECEIVE_POKER_VOTE                 = '/app/poker.vote',

    SEND_INSECURE_USER_CREATE          = '/app/account.insecure.user.create',
    RECEIVE_INSECURE_USER_CREATE       = '/app/account.insecure.user.create',

    RECEIVE_POKER_VOTE_NEW_JOINER      = '/app/poker.vote.new_joiner',
}
