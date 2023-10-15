/**
 * @jest-environment node
 */
import app from '../../auth/auth';

describe('test api key', () => {
    test('test api key', () => {
        expect(app.options.apiKey).toBe(process.env.FB_API_KEY);
    });
    test('test auth domain', () => {
        expect(app.options.authDomain).toBe(process.env.FB_DOMAIN);
    });
    test('test project id', () => {
        expect(app.options.projectId).toBe(process.env.FB_PROJECT_ID);
    });
    test('test storage bucket', () => {
        expect(app.options.storageBucket).toBe(process.env.FB_STORAGE_BUCKET);
    });
    test('test message sender id', () => {
        expect(app.options.messagingSenderId).toBe(process.env.FB_MESSAGE_SENDER_ID);
    });
    test('test app id', () => {
        expect(app.options.appId).toBe(process.env.FB_APP_ID);
    });
});