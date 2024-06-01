// controllers/MessageController.ts
import { Request, Response } from 'express';
import { IMessageRepository } from '@repositories/IMessageRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class MessageController {
  constructor(
    @inject("IMessageRepository") private messageRepository: IMessageRepository
  ) {}

  public getMessage(req: Request, res: Response): void {
    const id = req.params.id;
    const message = this.messageRepository.getMessage(id);
    if (message) {
      res.json(message);
    } else {
      res.status(404).send('Message not found');
    }
  }

  public createMessage(req: Request, res: Response): void {
    const { text } = req.body;
    const message = this.messageRepository.createMessage(text);
    res.status(201).json(message);
  }

  public getAllMessages(req: Request, res: Response): void {
    const messages = this.messageRepository.getAllMessages();
    res.json(messages);
  }
}
