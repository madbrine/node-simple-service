import "reflect-metadata";
import express, { Application } from 'express';
import MessageRoutes from '@routes/MessageRoutes';
import { container } from "tsyringe";
import { MessageService } from "@services/MessageService";
import { createServer } from 'http';
import { Server as WebSocketServer, WebSocket } from 'ws';

const app: Application = express();
const port: number = 5000;

// Dependency Injection registration
container.register("IMessageRepository", { useClass: MessageService });

// JSON parse
app.use(express.json());

// Init MessageRouter
const messageRoutes = new MessageRoutes();
app.use('/api', messageRoutes.getRouter());

// WebSocket server
const server = createServer(app);
const wss = new WebSocketServer({ server });

wss.on('connection', (ws: WebSocket) => {
  console.log('Client connected');
});

const messageService = container.resolve(MessageService);
messageService.on('messageAdded', (message) => {
  wss.clients.forEach((client: WebSocket) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ event: 'messageAdded', data: message }));
    }
  });
});

messageService.on('messageRemoved', (message) => {
  wss.clients.forEach((client: WebSocket) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ event: 'messageRemoved', data: message }));
    }
  });
});

// Start app
server.listen(port, () => {
  console.log(`Running on port ${port}`);
});