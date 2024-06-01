import { Request, Response } from 'express';
import { IMessageRepository } from '@repositories/IMessageRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class MessageController {
  constructor(
    @inject("IMessageRepository") private messageRepository: IMessageRepository
  ) {}

  /**
   * @swagger
   * /message/{id}:
   *   get:
   *     summary: Get a message by ID
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The message ID
   *     responses:
   *       200:
   *         description: The message description by ID
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: string
   *                 createdOn:
   *                   type: string
   *                 text:
   *                   type: string
   *       404:
   *         description: Message not found
   */
  public getMessage(req: Request, res: Response): void {
    const id = req.params.id;
    const message = this.messageRepository.getMessage(id);
    if (message) {
      res.json(message);
    } else {
      res.status(404).send('Message not found');
    }
  }

  /**
   * @swagger
   * /message:
   *   post:
   *     summary: Create a new message
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - text
   *             properties:
   *               text:
   *                 type: string
   *     responses:
   *       201:
   *         description: Message created
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: string
   *                 createdOn:
   *                   type: string
   *                 text:
   *                   type: string
   */
  public createMessage(req: Request, res: Response): void {
    const { text } = req.body;
    const message = this.messageRepository.createMessage(text);
    res.status(201).json(message);
  }

  public greet(req: Request, res: Response): void {
    res.send('Hello from Message controller');
  }
}