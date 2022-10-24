import {Request, Response} from 'express';
import {inject, injectable} from 'inversify';
import {Controller} from '../../common/controller/controller.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {HttpMethod} from '../../types/http-method.enum.js';
import { StatusCodes } from 'http-status-codes';
import { UserServiceInterface } from './user-service.interface.js';
import UserResponse from './response/user.response.js';
import { fillDTO } from '../../utils/common.js';
import CreateUserDto from './dto/create-user.dto.js';
import { ConfigInterface } from '../../common/config/config.interface.js';
import HttpError from '../../common/errors/http-error.js';
import LoginUserDto from './dto/login-user.dto.js';


@injectable()
export default class UserController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.UserServiceInterface) private readonly userService:
    UserServiceInterface,
    @inject(Component.ConfigInterface) private readonly configService: ConfigInterface,
  ) {
    super(logger);

    this.logger.info('Register routes for UserController...');

    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    this.addRoute({path: '/register', method: HttpMethod.Post, handler: this.create});
    this.addRoute({path: '/login', method: HttpMethod.Post, handler: this.login});
  }

  public async index(_req: Request, res: Response): Promise <void>{
    const users = await this.userService.findByEmail('test@pisem.local');
    this.send(res, StatusCodes.OK, users);
  }

  public async create(
    {body}: Request<Record<string, unknown>, Record<string, unknown>, CreateUserDto>, res: Response): Promise <void> {
    const existsUser = await this.userService.findByEmail(body.email);

    if(existsUser) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `User with email ${body.email} already exists.`,
        'UserController'
      );
    }

    const result = await this.userService.create(body, this.configService.get('SALT'));
    this.created(
      res,
      fillDTO(UserResponse, result)
    );
  }

  public async login(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    {body}: Request<Record<string, unknown>, Record<string, unknown>, LoginUserDto>, _res: Response) : Promise<void> {
    const existsUser = await this.userService.findByEmail(body.email);

    if(!existsUser) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        `User with email ${body.email} is not found.`,
        'User Controller'
      );
    }

    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'User Controller',
    );
  }
}
