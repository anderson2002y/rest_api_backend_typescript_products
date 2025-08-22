import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options : swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: '3.0.2',
    tags: [
      {
        name: 'Products',
        description: 'API operations related to products'
      }
    ],
    info: {
      title: 'REST API Node.js / Express / Typescript',
      version: '1.0.0',
      description: 'API Docs for products'
    }
  },
  apis: ['./src/router.ts']
}

const swaggerSpec = swaggerJSDoc(options);

const swaggerUiOption : SwaggerUiOptions = {
  customCss : `
    .swagger-ui .topbar {
      background-color: #2b3b45;
    }

    .topbar-wrapper .link {
      content: url('https://www.svgrepo.com/show/474373/cloud-server.svg');
      height: 60px;
      width: auto;
    }
  `,
  customSiteTitle: 'Documentacion REST API Express / TypeScript'
}
export default swaggerSpec;
export {
  swaggerUiOption
}