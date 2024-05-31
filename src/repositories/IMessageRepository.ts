import { MessageEntity } from "@entities/MessageEntity";

export interface IMessageRepository {
    createMessage(text: string): MessageEntity;
    getMessage(id: string): MessageEntity | undefined;
}