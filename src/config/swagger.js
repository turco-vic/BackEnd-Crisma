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
  const customHtml = `
    <style id="custom-swagger-styles">
      .swagger-ui .topbar { display: none !important; }
      
      .swagger-ui .opblock.opblock-get { 
        border-color: #28a745 !important; 
        background: rgba(40, 167, 69, 0.1) !important;
        border-left: 5px solid #28a745 !important;
      }
      .swagger-ui .opblock.opblock-post { 
        border-color: #28a745 !important; 
        background: rgba(40, 167, 69, 0.1) !important;
        border-left: 5px solid #28a745 !important;
      }
      .swagger-ui .opblock.opblock-put { 
        border-color: #fd7e14 !important; 
        background: rgba(253, 126, 20, 0.1) !important;
        border-left: 5px solid #fd7e14 !important;
      }
      .swagger-ui .opblock.opblock-delete { 
        border-color: #dc3545 !important; 
        background: rgba(220, 53, 69, 0.1) !important;
        border-left: 5px solid #dc3545 !important;
      }
      .swagger-ui .opblock.opblock-get .opblock-summary-method,
      .swagger-ui .opblock-get .opblock-summary .opblock-summary-method {
        background-color: #28a745 !important;
        background: #28a745 !important;
        border-color: #28a745 !important;
        color: #fff !important;
      }
      .swagger-ui .opblock.opblock-post .opblock-summary-method,
      .swagger-ui .opblock-post .opblock-summary .opblock-summary-method {
        background-color: #28a745 !important;
        background: #28a745 !important;
        border-color: #28a745 !important;
        color: #fff !important;
      }
      .swagger-ui .opblock.opblock-put .opblock-summary-method,
      .swagger-ui .opblock-put .opblock-summary .opblock-summary-method {
        background-color: #fd7e14 !important;
        background: #fd7e14 !important;
        border-color: #fd7e14 !important;
        color: #fff !important;
      }
      .swagger-ui .opblock.opblock-delete .opblock-summary-method,
      .swagger-ui .opblock-delete .opblock-summary .opblock-summary-method {
        background-color: #dc3545 !important;
        background: #dc3545 !important;
        border-color: #dc3545 !important;
        color: #fff !important;
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
    </style>
    
    <script>
      let colorApplied = false;
      
      function aggressiveColorForce() {
        console.log('🎨 Aplicando cores corretas forçadamente...');
        
        // GET - Verde #28a745 (correto)
        document.querySelectorAll('.opblock-get .opblock-summary-method').forEach((el, index) => {
          el.style.cssText += 'background-color: #28a745 !important; background: #28a745 !important; border-color: #28a745 !important; color: #fff !important;';
          console.log('✅ Verde aplicado em GET', index);
        });
        
        // POST - Verde #28a745 (como você quer)
        document.querySelectorAll('.opblock-post .opblock-summary-method').forEach((el, index) => {
          el.style.cssText += 'background-color: #28a745 !important; background: #28a745 !important; border-color: #28a745 !important; color: #fff !important;';
          console.log('� Verde aplicado em POST', index);
        });
        
        // PUT - Laranja #fd7e14 (como você quer)
        document.querySelectorAll('.opblock-put .opblock-summary-method').forEach((el, index) => {
          el.style.cssText += 'background-color: #fd7e14 !important; background: #fd7e14 !important; border-color: #fd7e14 !important; color: #fff !important;';
          console.log('� Laranja aplicado em PUT', index);
        });
        
        // DELETE - Vermelho #dc3545 (correto)
        document.querySelectorAll('.opblock-delete .opblock-summary-method').forEach((el, index) => {
          el.style.cssText += 'background-color: #dc3545 !important; background: #dc3545 !important; border-color: #dc3545 !important; color: #fff !important;';
          console.log('🔴 Vermelho aplicado em DELETE', index);
        });
        
        colorApplied = true;
      }
      
      function initColors() {
        aggressiveColorForce();
        setTimeout(aggressiveColorForce, 50);
        setTimeout(aggressiveColorForce, 100);
        setTimeout(aggressiveColorForce, 200);
        setTimeout(aggressiveColorForce, 500);
        setTimeout(aggressiveColorForce, 1000);
        setTimeout(aggressiveColorForce, 2000);
      }
      
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initColors);
      } else {
        initColors();
      }
      
      const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
          if (mutation.addedNodes.length > 0) {
            setTimeout(aggressiveColorForce, 10);
          }
        });
      });
      
      function startObserver() {
        if (document.body) {
          observer.observe(document.body, { 
            childList: true, 
            subtree: true, 
            attributes: true,
            attributeFilter: ['style', 'class']
          });
        } else {
          setTimeout(startObserver, 50);
        }
      }
      startObserver();
    </script>
  `;

  app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customCss: '',
    customJs: customHtml,
    customSiteTitle: 'API Sistema de Crisma',
    swaggerOptions: {
      persistAuthorization: true,
    }
  }));
  
  console.log('📚 Documentação Swagger disponível em: http://localhost:3000/doc');
};

module.exports = setupSwagger;
