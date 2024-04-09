import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Authentication System', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('handles a signup request', async () => {
    const emailReq = 'test@email.com';

    const res = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email: emailReq, password: 'password' })
      .expect(HttpStatus.CREATED);
    const { id, email } = res.body;
    expect(id).toBeDefined();
    expect(email).toBeDefined();
    expect(email).toEqual(emailReq);
  })

  it('signup as a new user and then get the currently logged in user', async () => {
    // given
    const emailReq = 'new@email.com';

    const givenRes = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email: emailReq, password: 'password' })
      .expect(HttpStatus.CREATED);

    const cookie = givenRes.get('Set-Cookie');

    // when
    const { body } = await request(app.getHttpServer())
      .get('/auth/whoami')
      .set('Cookie', cookie)
      .expect(HttpStatus.OK);

    // then
    expect(body.email).toEqual(emailReq);
  })
});
