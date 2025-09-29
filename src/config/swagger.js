const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Sistema de Crisma',
      version: '2.0.0',
      description: 'API completa para gerenciamento do sistema de crisma com turmas, crismandos, coordenadores, encontros e controle de presenças',
      contact: {
        name: 'Enzo Turcovic',
        email: 'enzoturcovic@gmail.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de desenvolvimento'
      }
    ]
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

const setupSwagger = (app) => {
  const customHtml = `
    <script>
      window.onload = function() {
        const applyColors = () => {
          document.querySelectorAll('.opblock-get .opblock-summary-method').forEach(el => {
            el.style.setProperty('background-color', '#28a745', 'important');
            el.style.setProperty('border-color', '#28a745', 'important');
            el.style.setProperty('color', '#fff', 'important');
          });
          
          document.querySelectorAll('.opblock-post .opblock-summary-method').forEach(el => {
            el.style.setProperty('background-color', '#fd7e14', 'important');
            el.style.setProperty('border-color', '#fd7e14', 'important');
            el.style.setProperty('color', '#fff', 'important');
          });
          
          document.querySelectorAll('.opblock-put .opblock-summary-method').forEach(el => {
            el.style.setProperty('background-color', '#007bff', 'important');
            el.style.setProperty('border-color', '#007bff', 'important');
            el.style.setProperty('color', '#fff', 'important');
          });
          
          document.querySelectorAll('.opblock-delete .opblock-summary-method').forEach(el => {
            el.style.setProperty('background-color', '#dc3545', 'important');
            el.style.setProperty('border-color', '#dc3545', 'important');
            el.style.setProperty('color', '#fff', 'important');
          });
        };
        
        applyColors();
        setTimeout(applyColors, 500);
        setTimeout(applyColors, 1000);
        setTimeout(applyColors, 2000);
        
        const observer = new MutationObserver(applyColors);
        observer.observe(document.body, { childList: true, subtree: true });
      };
    </script>
  `;

  const customCss = `
    .swagger-ui .topbar { display: none !important; }
    .swagger-ui .opblock-get .opblock-summary-method { background: #28a745 !important; color: #fff !important; }
    .swagger-ui .opblock-post .opblock-summary-method { background: #fd7e14 !important; color: #fff !important; }
    .swagger-ui .opblock-put .opblock-summary-method { background: #007bff !important; color: #fff !important; }
    .swagger-ui .opblock-delete .opblock-summary-method { background: #dc3545 !important; color: #fff !important; }
  `;

  app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customCss: customCss + customHtml,
    customSiteTitle: 'API Sistema de Crisma',
    swaggerOptions: {
      persistAuthorization: true,
    }
  }));
  
  console.log('📚 Documentação Swagger disponível em: http://localhost:3000/doc');
};

module.exports = setupSwagger;
