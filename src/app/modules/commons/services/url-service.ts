import {environment} from '../../../../environments/environment';

export class UrlService
{

    public static getHome(): string
    {
        return '/';
    }

    public static getPoker(): string
    {
        return '/poker';
    }

    public static getPokerCreate(): string
    {
        return '/poker/create';
    }

    public static getPokerMyPokers(): string
    {
        return "/poker/my-pokers";
    }

    public static getPokerDisplay(pokerId: string): string
    {
        return "/poker/display/" + pokerId;
    }

    public static getAccountCreate(): string
    {
        return '/account';
    }

    public static getAccountLogout(): string
    {
        return '/account/logout';
    }
}
