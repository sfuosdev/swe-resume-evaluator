describe('firebase admin initialization', () => {
    it('should initialize firebase admin', () => {
        const fbAdmin = require('../../firebase');
        expect(fbAdmin).toBeDefined();
    });
});
