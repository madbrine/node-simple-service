export class MessageEntity {
    constructor(
        readonly id: string,
        readonly createdOn: string,
        readonly text: string
    ) {}
}