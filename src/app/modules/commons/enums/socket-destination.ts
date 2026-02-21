export enum SocketDestination
{
    RECEIVE_SESSION_CREATED_OR_UPDATED = "/app/session.created_or_updated",
    RECEIVE_SESSION_CLOSED = "/app/session.closed",

    RECEIVE_POKER_START = "/app/poker/start",

    RECEIVE_POKER_ROOM_STATE = "/app/poker/game.state",
    SEND_POKER_ROOM_STATE = '/app/poker/game.state/{pokerIdSecure}/{insecureUserId}',

    SEND_POKER_VOTE_START = '/app/poker/vote.start/{pokerIdSecure}/{ticketId}',
    RECEIVE_POKER_VOTE_START = '/app/poker/vote.start',

    SEND__POKER__NEW_TICKET_CREATE = '/app/poker/new.ticket.create',
    RECEIVE__POKER__NEW_TICKET_CREATE = '/app/poker/new.ticket.create',

    SEND_POKER_TICKET_DELETE = '/app/poker/ticket.delete/{pokerIdSecure}/{ticketId}',
    RECEIVE_POKER_TICKET_DELETE = '/app/poker/ticket.delete',

    SEND_POKER_VOTE_STOP = '/app/poker/vote.stop/{pokerIdSecure}/{ticketId}',
    RECEIVE_POKER_VOTE_STOP = '/app/poker/vote.stop',

    SEND_POKER_TICKET_CLOSE = '/app/poker/ticket.close/{pokerIdSecure}/{ticketId}',
    RECEIVE_POKER_TICKET_CLOSE = '/app/poker/ticket.close',

    SEND__POKER__TICKET_OPEN = '/app/poker/ticket.open/{pokerIdSecure}/{ticketId}',
    RECEIVE__POKER__TICKET_OPEN = '/app/poker/ticket.open',

    SEND_POKER_VOTE = '/app/poker/vote/{pokerIdSecure}/{ticketId}',
    RECEIVE_POKER_VOTE = '/app/poker/vote',

    SEND_INSECURE_USER_CREATE = '/app/account/insecure.user.create',
    RECEIVE_INSECURE_USER_CREATE = '/app/account/insecure.user.create',

    POKER__MY_TICKETS = '/app/poker/my.tickets',

    RECEIVE_POKER_VOTE_NEW_JOINER = '/app/poker/vote.new_joiner',

    SEND__POKER__VOTER_LEAVING = '/app/poker/voter_leaving',
    RECEIVE__POKER__VOTER_LEAVING = '/app/poker/voter_leaving',
}
