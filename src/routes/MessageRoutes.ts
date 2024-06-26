import { Router } from 'express';
import MessageController from '@controllers/MessageController';
import { container } from 'tsyringe';

export default class MessageRoutes {
  public router: Router;
  private messageController: MessageController;

  constructor() {
    this.router = Router();
    this.messageController = container.resolve(MessageController);
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/message/:id', this.messageController.getMessage.bind(this.messageController));
    this.router.get('/messages', this.messageController.getAllMessages.bind(this.messageController)); // New route
    this.router.post('/message', this.messageController.createMessage.bind(this.messageController));
  }

  public getRouter(): Router {
    return this.router;
  }
}