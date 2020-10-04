import { expect } from 'chai';
import { Server } from 'http';
import sinon from 'sinon';
import request from 'supertest';

import app from '../../src/app';
import config from '../config';
import * as auth from '../../src/util/auth';

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
      const accessToken = 'accessToken';
      sinon.stub(auth, 'signAccessToken').resolves(accessToken);
      const refreshToken = 'refreshToken';
      sinon.stub(auth, 'signRefreshToken').resolves(refreshToken);

      const result = await request(server).post('/login').send(body);
      expect(result.status).to.equal(200);
      expect(result.body.payload).to.eql({
        accessToken,
        refreshToken,
      });
    });
  });

  describe('Get all countries test', () => {
    it('Error cases', async () => {
      // no token
      const result = await request(server).get('/countries');
      expect(result.status).to.equal(401);
    });

    it('Success case', async () => {
      const token = await auth.signAccessToken();
      const result = await request(server)
        .get('/countries')
        .set({ Authorization: `Bearer ${token}` });
      expect(result.status).to.equal(200);
    });
  });

  describe('Get country test', () => {
    it('Error cases', async () => {
      const token = await auth.signAccessToken();
      // no token
      let result = await request(server).get('/countries');
      expect(result.status).to.equal(401);

      // country not found
      result = await request(server)
        .get('/countries?country=notfound')
        .set({ Authorization: `Bearer ${token}` });
      expect(result.status).to.equal(404);
    });

    it('Success case', async () => {
      const token = await auth.signAccessToken();
      const result = await request(server)
        .get('/countries?country=brazil')
        .set({ Authorization: `Bearer ${token}` });
      expect(result.status).to.equal(200);
    });
  });

  describe('Refresh token test', () => {
    it('Error cases', async () => {
      // no refresh token
      let result = await request(server).post('/refresh');
      expect(result.status).to.equal(401);

      // invalid refresh token
      result = await request(server).post('/refresh');
      expect(result.status).to.equal(401);
    });

    it('Success case', async () => {
      const refreshToken = await auth.signRefreshToken();
      const result = await request(server).post('/refresh').send({
        refreshToken,
      });
      expect(result.status).to.equal(200);
    });
  });
});
