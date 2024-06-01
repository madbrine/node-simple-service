//services/MessageService.ts
import { IMessageRepository } from '@repositories/IMessageRepository';
import { MessageEntity } from '@entities/MessageEntity';
import { v4 as uuidv4 } from 'uuid';
import { injectable } from 'tsyringe';
import { EventEmitter } from 'events';

@injectable()
export class MessageService implements IMessageRepository {
  private messages: MessageEntity[] = [];
  private eventEmitter = new EventEmitter(); // Event emitter for notifications

  public createMessage(text: string): MessageEntity {
    const message = new MessageEntity(uuidv4(), new Date().toISOString(), text);
    if (this.messages.length >= 9) {
      const removedMessage = this.messages.shift();
      this.eventEmitter.emit('messageRemoved', removedMessage);
    }
    this.messages.push(message);
    this.eventEmitter.emit('messageAdded', message);
    return message;
  }

  public getMessage(id: string): MessageEntity | undefined {
    return this.messages.find(message => message.id === id);
  }

  public getAllMessages(): MessageEntity[] {
    return this.messages;
  }

  public on(event: string, listener: (message: MessageEntity) => void): void {
    this.eventEmitter.on(event, listener);
  }
}