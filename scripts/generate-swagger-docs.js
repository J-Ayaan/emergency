const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: '응급의료정보 API',
    description: '응급의료정보 조회를 위한 API 문서',
    version: '1.0.0',
    contact: {
      name: 'API Support',
      email: 'support@example.com'
    }
  },
  host: 'localhost:3000',
  basePath: '/',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: '응급실 실시간 가용병상정보',
      description: '응급실의 실시간 병상 정보 조회 API'
    },
    {
      name: '중증질환 수용 가능 병원 정보',
      description: '중증질환 수용 가능 병원 정보 조회 API'
    }
  ],
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      in: 'header',
      name: 'Authorization',
      description: 'Bearer 토큰을 입력하세요'
    }
  },
  definitions: {
    ErrorResponse: {
      statusCode: 'number',
      message: 'string',
      error: 'string'
    },
    Pagination: {
      pageNo: 'number',
      numOfRows: 'number',
      totalCount: 'number'
    }
  }
};

const outputFile = './src/swagger.json';
const endpointsFiles = ['./src/main.ts'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log('Swagger 문서 생성 완료');
}); 