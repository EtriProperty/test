# test

node : 10.16.0
npm : 6.10.2
express : 4.17.1
mysqlmodule : 2.17.1
mysql community server : 8.0.18

[test dir] express-test(express 템플릿 pug 사용)

- DB 정보는 dotenv 사용
  .env 파일에 DB 정보를 저장하고 DB연결시 process.env.DB_profile 이런식으로하고 process.evn.DB_profile.hostname 이런식으로
  사용
