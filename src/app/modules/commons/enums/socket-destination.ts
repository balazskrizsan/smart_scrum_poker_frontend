export enum SocketDestination
{
    RECEIVE_POKER_START      = "/app/poker.start",

    POKER_ROOM               = "/app/poker-room-",

    RECEIVE_POKER_ROOM_STATE = "/app/poker.room.state",
    SEND_POKER_ROOM_STATE    = '/app/poker.room.state/{pokerSecureId}'
}