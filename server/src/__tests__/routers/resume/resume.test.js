const request = require('supertest');
const app = require('../../../app');

const temp = {
    user_id: 'sample_user_id',
    resume: 'sample',
};

describe('POST /resume', () => {
    it('be successful if pdf is uploaded and api is called', async () => {
        const res = await request(app).post('/resume').send(temp);

        expect(res.status).toBe(200);
        expect(res.body.status).toBe(200);
        expect(res.body.message).toBe('OK');
    });
});
