import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Application } from "express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Message API",
      version: "1.0.0",
      description: "A simple Express Message API",
    },
    servers: [
      {
        url: "http://localhost:5000/api",
      },
    ],
  },
  apis: ["./src/controllers/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export function setupSwagger(app: Application): void {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
