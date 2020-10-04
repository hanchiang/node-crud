import { expect } from 'chai';
import { Server } from 'http';
import sinon from 'sinon';
import request from 'supertest';

import app from '../../src/app';
import config from '../config';
import * as auth from '../../src/util/auth';
import { expectCt } from 'helmet';

let server: Server;

describe('Integration test', () => {
  beforeEach(async () => {
    return new Promise((resolve) => {
      server = app.listen(config.port, resolve);
    });
  });

  afterEach(async () => {
    sinon.restore();
    return new Promise((resolve) => {
      server.close(resolve);
    });
  });

  describe('Login tests', () => {
    const body = { email: 'frontend@domain.com', password: 'frontend' };

    it('Error cases', async () => {
      const testData = [
        { body: {}, expectedStatus: 400 },
        { body: { password: body.password }, expectedStatus: 400 },
        { body: { email: body.email }, expectedStatus: 400 },
        {
          body: { email: 'email that does not exist', password: body.password },
          expectedStatus: 400,
        },
        {
          body: {
            email: body.email,
            password: 'wrong password',
          },
          expectedStatus: 401,
        },
        { body, expectedStatus: 200 },
      ];
      for (const td of testData) {
        const result = await request(server).post('/login').send(td.body);
        expect(result.status).to.equal(td.expectedStatus);
      }
    });

    it('Success case', async () => {
      const token = 'token';
      sinon.stub(auth, 'signToken').resolves(token);
      const result = await request(server).post('/login').send(body);
      expect(result.status).to.equal(200);
      expect(result.body.payload).to.equal(token);
    });
  });

  describe('Get all countries test', () => {
    it('Error cases', async () => {
      // no token
      const result = await request(server).get('/countries');
      expect(result.status).to.equal(401);
    });

    it('Success case', async () => {
      const token = await auth.signToken();
      const result = await request(server)
        .get('/countries')
        .set({ Authorization: `Bearer ${token}` });
      expect(result.status).to.equal(200);
    });
  });
});
