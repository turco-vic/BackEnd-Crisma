const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Sistema de Crisma',
      version: '2.0.0',
      description: 'API completa para gerenciamento do sistema de crisma com turmas, crismandos, encontros e controle de presenças',
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
  // Servir arquivos estáticos primeiro
  app.use('/doc/custom', require('express').static('public'));

  const swaggerUiAssetPath = require('swagger-ui-dist/absolute-path');
  const customCssUrl = '/doc/custom/swagger-custom.css';
  
  const swaggerOptions = {
    customCss: `
      .swagger-ui .topbar { display: none !important; }
      
      .swagger-ui .opblock.opblock-get { 
        border-color: #28a745 !important; 
        background: rgba(40, 167, 69, 0.1) !important;
        border-left: 5px solid #28a745 !important;
      }
      .swagger-ui .opblock.opblock-get .opblock-summary-method {
        background: #28a745 !important;
        color: #fff !important;
        border-color: #28a745 !important;
      }
      
      .swagger-ui .opblock.opblock-post { 
        border-color: #fd7e14 !important; 
        background: rgba(253, 126, 20, 0.1) !important;
        border-left: 5px solid #fd7e14 !important;
      }
      .swagger-ui .opblock.opblock-post .opblock-summary-method {
        background: #fd7e14 !important;
        color: #fff !important;
        border-color: #fd7e14 !important;
      }
      
      .swagger-ui .opblock.opblock-put { 
        border-color: #007bff !important; 
        background: rgba(0, 123, 255, 0.1) !important;
        border-left: 5px solid #007bff !important;
      }
      .swagger-ui .opblock.opblock-put .opblock-summary-method {
        background: #007bff !important;
        color: #fff !important;
        border-color: #007bff !important;
      }
      
      .swagger-ui .opblock.opblock-delete { 
        border-color: #dc3545 !important; 
        background: rgba(220, 53, 69, 0.1) !important;
        border-left: 5px solid #dc3545 !important;
      }
      .swagger-ui .opblock.opblock-delete .opblock-summary-method {
        background: #dc3545 !important;
        color: #fff !important;
        border-color: #dc3545 !important;
      }
      
      .swagger-ui .opblock { 
        margin: 10px 0 !important;
        border-radius: 8px !important;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1) !important;
      }
      .swagger-ui .opblock-summary-method {
        font-weight: bold !important;
        border-radius: 4px !important;
        min-width: 80px !important;
        text-align: center !important;
      }
    `,
    customJs: `
      <script>
        function forceMethodColors() {
          // GET - Verde
          document.querySelectorAll('.opblock-get .opblock-summary-method').forEach(el => {
            el.style.setProperty('background-color', '#28a745', 'important');
            el.style.setProperty('border-color', '#28a745', 'important');
            el.style.setProperty('color', '#fff', 'important');
          });
          
          // POST - Laranja
          document.querySelectorAll('.opblock-post .opblock-summary-method').forEach(el => {
            el.style.setProperty('background-color', '#fd7e14', 'important');
            el.style.setProperty('border-color', '#fd7e14', 'important');
            el.style.setProperty('color', '#fff', 'important');
          });
          
          // PUT - Azul
          document.querySelectorAll('.opblock-put .opblock-summary-method').forEach(el => {
            el.style.setProperty('background-color', '#007bff', 'important');
            el.style.setProperty('border-color', '#007bff', 'important');
            el.style.setProperty('color', '#fff', 'important');
          });
          
          // DELETE - Vermelho
          document.querySelectorAll('.opblock-delete .opblock-summary-method').forEach(el => {
            el.style.setProperty('background-color', '#dc3545', 'important');
            el.style.setProperty('border-color', '#dc3545', 'important');
            el.style.setProperty('color', '#fff', 'important');
          });
        }
        
        // Aplicar as cores quando carregar
        window.addEventListener('load', function() {
          setTimeout(forceMethodColors, 100);
          setTimeout(forceMethodColors, 500);
          setTimeout(forceMethodColors, 1000);
        });
        
        // Observer para novos elementos
        const observer = new MutationObserver(forceMethodColors);
        document.addEventListener('DOMContentLoaded', function() {
          observer.observe(document.body, { childList: true, subtree: true });
        });
      </script>
    `,
    customSiteTitle: 'API Sistema de Crisma',
    swaggerOptions: {
      persistAuthorization: true,
    }
  };

  app.use('/doc', swaggerUi.serve);
  app.get('/doc', swaggerUi.setup(swaggerSpec, swaggerOptions));
  
  console.log('📚 Documentação Swagger disponível em: http://localhost:3000/doc');
};

module.exports = setupSwagger;
