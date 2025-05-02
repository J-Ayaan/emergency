const fs = require('fs');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Emergency Public Data API',
      version: '1.0.0',
      description: '응급의료기관 정보를 제공하는 공공데이터 API 서비스',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: '개발 서버',
      },
    ],
  },
  apis: ['./src/**/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);
const swaggerHtml = swaggerUi.generateHTML(swaggerSpec);

// docs 디렉토리가 없으면 생성
const docsDir = path.join(__dirname, '../docs');
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir);
}

// index.html 파일 생성
fs.writeFileSync(
  path.join(docsDir, 'index.html'),
  `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Emergency Public Data API Documentation</title>
  <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@4.5.0/swagger-ui.css">
</head>
<body>
  <div id="swagger-ui"></div>
  <script src="https://unpkg.com/swagger-ui-dist@4.5.0/swagger-ui-bundle.js"></script>
  <script>
    window.onload = () => {
      window.ui = SwaggerUIBundle({
        spec: ${JSON.stringify(swaggerSpec)},
        dom_id: '#swagger-ui',
        deepLinking: true,
        presets: [
          SwaggerUIBundle.presets.apis,
          SwaggerUIBundle.SwaggerUIStandalonePreset
        ],
      });
    };
  </script>
</body>
</html>`
);

console.log('Swagger 문서가 docs/index.html에 생성되었습니다.'); 