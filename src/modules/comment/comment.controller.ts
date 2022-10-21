import {Request, Response} from 'express';
import {inject, injectable} from 'inversify';
import {Controller} from '../../common/controller/controller.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {HttpMethod} from '../../types/http-method.enum.js';

@injectable()
export default class CommentController extends Controller {
  constructor(@inject(Component.LoggerInterface) logger: LoggerInterface
  ) {
    super(logger);

    this.logger.info('Register routes for CommentController…');

    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    this.addRoute({path: '/', method: HttpMethod.Post, handler: this.create});
  }

  public index(_req: Request, _res: Response): void {
    console.log(_req, _res);// Код обработчика
  }

  public create(_req: Request, _res: Response): void {
    console.log(_req, _res);// Код обработчика
  }
}
