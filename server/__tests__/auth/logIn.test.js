/**
 * testing sign in functionality
 */

import request from 'supertest';
import app from '../../auth/auth';

describe('POST /login', () => {
    it('not login with invalid credentials', async () => {
        const res = await request(app)
            .post('/login')
            .send({ 
                email: "test@test.com",
                password: "test1234"
            });
        expect(res.status).toBe(400);
        expect(res.body.status).toBe(400);
        expect(res.body.message).toBe('User does not exist');
    });
});