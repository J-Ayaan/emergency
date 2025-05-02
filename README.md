# Emergency Public Data API

응급의료기관 정보를 제공하는 공공데이터 API 서비스입니다.

## Description

이 프로젝트는 공공데이터포털의 응급의료기관 정보를 활용하여 다음과 같은 API를 제공합니다:

- 응급실 정보 조회
- 중증질환자 이송 가능 병원 정보 조회
- 응급실 가용병상 정보 조회
- 응급실 메시지 정보 조회

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## API Documentation

API 문서는 Swagger UI를 통해 제공됩니다. 서버 실행 후 다음 URL에서 확인할 수 있습니다:

```
http://localhost:3000/api
```

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
