/**
 * test the sign up functionality
 */

import request from 'supertest';
import app from '../../auth/auth';

describe('POST /signup', () => {
    it('sign up with with credentials', async () => {
        const randSuffix = Date.now();
        const res = await request(app)
            .post('/signup')
            .send({ 
                email: "test" + randSuffix + "@test.com",
                username: "test" + randSuffix,
                password: "test1234"
            });
            
        expect(res.status).toBe(200);
        expect(res.body.status).toBe(200);
        expect(res.body.message).toBe('ok');
        expect(res.body).toHaveProperty('user_token');
    })

    // testing with invalid email format
    it('sign up with invalid email', async () => {
        const randSuffix = Date.now();
        const res = await request(app)
            .post('/signup')
            .send({ 
                email: "test" + randSuffix + "test.com",
                username: "test" + randSuffix,
                password: "test1234"
            });
            
        expect(res.status).toBe(400);
        expect(res.body.status).toBe(400);
        expect(res.body.message).toBe('Email that was provided is invalid format');
    })

    // testing with invalid username
    // username must be at least 4 characters
    it('sign up with invalid username', async () => {
        const res = await request(app)
            .post('/signup')
            .send({ 
                email: "test@test.com",
                username: "te",
                password: "test1234"
            });
        expect(res.status).toBe(400);
        expect(res.body.status).toBe(400);
        expect(res.body.message).toBe('Username is invalid format');
    });

    // testing with invalid password
    // password must be at least 8 characters
    it('sign up with invalid password', async () => {
        const res = await request(app)
            .post('/signup')
            .send({ 
                email: "test@test.com",
                username: "test",
                password: "test"
            });
        expect(res.status).toBe(400);
        expect(res.body.status).toBe(400);
        expect(res.body.message).toBe('Password must be at least 8 characters');
    })
});