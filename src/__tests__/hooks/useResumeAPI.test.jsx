import { rest } from 'msw';
import { screen } from '@testing-library/react';
import { setupServer } from 'msw/lib/node';
import { useResumeApi } from '../../hooks/useResumeAPI';

const handlers = [
    rest.post('/resume', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ data: 'Successful' }));
    }),
];

const server = setupServer(...handlers);

describe('useResumeAPI', () => {
    beforeAll(() => server.listen());
    afterAll(() => server.resetHandlers(), server.close());

    it('should fetch POST when callApi', async () => {
        const [fileChange, callApi] = useResumeApi();
        fileChange('filename');
        callApi();

        expect(
            await screen.findByText(`{'data': 'Successful'}`),
        ).toBeInTheDocument();
    });
});
