import {Injectable} from "@angular/core";
import {IInsecureUser} from "../interfaces/i-insecure-user";
import {LocalStorageService} from "../../../services/local-storage-service";

@Injectable()
export class AccountService
{
    constructor(private localStorageService: LocalStorageService)
    {
    }

    public getCurrentUser(): IInsecureUser
    {
        const rawInsecureUser = this.localStorageService.get('current_user');
        if (null == rawInsecureUser)
        {
            throw new Error("Not logged in");
        }

        return JSON.parse(rawInsecureUser);
    }
}
