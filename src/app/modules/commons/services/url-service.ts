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

    public static getAccountCreate(): string
    {
        return '/account';
    }

    public static getAccountLogout(): string
    {
        return '/account/logout';
    }
}
