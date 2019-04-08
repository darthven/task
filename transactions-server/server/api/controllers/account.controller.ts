import { JsonController, HttpCode, Get } from "routing-controllers"
import { Inject } from "typedi"

import { AccountService } from "../services/account.service"
import { Balance } from "../models/balance.model"


@JsonController('/account')
export class AccountController {
    @Inject()
    private readonly service!: AccountService

    @HttpCode(200)
    @Get('/balance')
    public async getAccountBalance(): Promise<Balance> {
        return this.service.fetchAccountBalance()
    }

}