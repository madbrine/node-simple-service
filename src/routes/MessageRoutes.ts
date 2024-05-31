import { Router } from 'express';
import MessageController from '@controllers/MessageController';

export default class MessageRoutes {
  public router: Router;
  private messageController: MessageController;

  constructor() {
    this.router = Router();
    this.messageController = new MessageController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/message/:id', this.messageController.getMessage.bind(this.messageController));
    this.router.post('/message', this.messageController.createMessage.bind(this.messageController));
    this.router.get('/greet', this.messageController.greet.bind(this.messageController));
  }

  public getRouter(): Router {
    return this.router;
  }
}