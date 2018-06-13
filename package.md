# Package.json

## Scripts
 - dev
   - 개발용 테스트용 development 모드로 소스코드 변경시 재 빌드 재 시작 됨
 - start
   - 프로덕트용 시작용 production 모드로 빌드 하고 production 모드로 서버가 실행 된다.
 - start:node
   - 그냥 빌드 없이 기존에 빌드 된 것을 실행 한다.
 - start:dev
   - 소스코드가 변경 되면 다시 시작 되는 시작
 - pm2:start:watch 
   - 프로세스 매니저가 프로젝트를 production 모드로 서버를 실행 한다.
 - pm2: ~
   - 프로세스 매니저 동작 들
 - build
   - production 모드로 빌드 한다
 - build
   - development 모드로 빌드 한다
 - doc
   - 모든 소스 파일은 문서화 한다 (작업 중 동작에 문제가 있음)
 - deploy
   - 프로덕션 환경에 deploy 한다 (작업 필요)
 - test:unit:watch
   - 유닛 테스트를 하며 코드 변경시 다시 테스트 한다
 - test:unit
   - 유닛 테스트를 한다.
 - cover
   - 커버리지 측정 리포트들 lcov html text 를 제공한다.
 - cover-ci
   - 커버리지 측정 lcov 리포트만 만 출력 한다.
## nyc

## devDependencies
 - @types/webpack-env
   - 웹팩 내부에서 사용되는 것들 정의 ex:(request.context)
 - cross-env
   - env 환경 설정을 script 에서 할 수 있게 함
 

## dependencies