import "reflect-metadata";
import express, { Application } from 'express';
import MessageRoutes from '@routes/MessageRoutes';
import { setupSwagger } from './swagger';
import { container } from "tsyringe";
import { MessageService } from "@services/MessageService";

const app: Application = express();
const port: number = 5000;

//Dependency Injection registration
container.register("IMessageRepository", { useClass: MessageService });

//JSON parse
app.use(express.json());

//Swagger
setupSwagger(app);

//Init MessageRouter
const messageRoutes = new MessageRoutes();
app.use('/api', messageRoutes.getRouter());

//Start app
app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
