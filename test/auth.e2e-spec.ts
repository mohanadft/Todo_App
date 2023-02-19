import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/modules/prisma/prisma.service';

describe('Authentication System', () => {
  let app: INestApplication;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        {
          provide: PrismaService,
          useValue: prismaService,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    prismaService = app.get(PrismaService);
    await prismaService.user.deleteMany();
  });

  it('can user signup', async () => {
    const user = {
      email: '2@gmail.com',
      password: 'asd',
    };

    const { body } = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        ...user,
      })
      .expect(201);

    expect(body.data.email).toEqual(user.email);
    expect(body.data.password).not.toEqual(user.password);

    expect(body.access_token).toBeDefined();
  });

  it('can the signed in user access routes', async () => {
    const user = {
      email: '2@gmail.com',
      password: 'asd',
    };

    const { body } = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ ...user })
      .expect(201);

    const { access_token } = body;

    return await request(app.getHttpServer())
      .get('/tasks')
      .set('Authorization', `Bearer ${access_token}`)
      .send({ ...user })
      .expect(200);
  });
});
