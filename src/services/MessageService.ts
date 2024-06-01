import { IMessageRepository } from '@repositories/IMessageRepository';
import { MessageEntity } from '@entities/MessageEntity';
import { v4 as uuidv4 } from 'uuid';
import { injectable } from 'tsyringe';

@injectable()
export class MessageService implements IMessageRepository {
  private messages: MessageEntity[] = [];

  public createMessage(text: string): MessageEntity {
    const message = new MessageEntity(uuidv4(), new Date().toISOString(), text);
    this.messages.push(message);
    return message;
  }

  public getMessage(id: string): MessageEntity | undefined {
    return this.messages.find(message => message.id === id);
  }
}