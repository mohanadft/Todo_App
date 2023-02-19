import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
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

  it('can user signup', async () => {
    const user = {
      email: '1aasdasdsd@gmail.com',
      password: 'asd',
    };

    const {
      body: { data },
    } = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        ...user,
      })
      .expect(201);

    expect(data.email).toEqual(user.email);
    expect(data.password).not.toEqual(user.password);
  });
});
