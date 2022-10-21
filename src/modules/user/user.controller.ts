import {Request, Response} from 'express';
import {inject, injectable} from 'inversify';
import {Controller} from '../../common/controller/controller.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {HttpMethod} from '../../types/http-method.enum.js';
import { StatusCodes } from 'http-status-codes';
import { UserServiceInterface } from './user-service.interface.js';

@injectable()
export default class UserController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.UserServiceInterface) private readonly userService: UserServiceInterface,
  ) {
    super(logger);

    this.logger.info('Register routes for UserController…');

    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    this.addRoute({path: '/', method: HttpMethod.Post, handler: this.create});
  }

  public async index(_req: Request, res: Response): Promise <void>{
    const users = await this.userService.findByEmail('test@pisem.local');
    this.send(res, StatusCodes.OK, users);
  }

  public create(_req: Request, _res: Response): void {
    console.log(_req, _res);// Код обработчика
  }
}
