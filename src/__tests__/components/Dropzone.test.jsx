import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@storybook/testing-library';
import Dropzone from '../../components/Dropzone';

describe('Dropzone component', () => {
    it('should have a button of input type file', () => {
        render(<Dropzone />);
        expect(screen.getByTestId('fileInput')).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: 'Upload' }),
        ).toBeInTheDocument();
    });

    it('should display the filename of the uploaded file', async () => {
        render(<Dropzone />);
        const file = new File(['hello'], 'hello.png', { type: 'image/png' });
        const fileInput = screen.getByTestId('fileInput');

        userEvent.upload(fileInput, file);
        expect(
            await screen.findByText('Filename: hello.png'),
        ).toBeInTheDocument();
    });

    it('should invoke the callback function with the uploaded file object', async () => {
        const callback = jest.fn();
        render(<Dropzone onFileChange={callback} />);
        const file = new File(['hello'], 'hello.png', { type: 'image/png' });
        const fileInput = screen.getByTestId('fileInput');

        userEvent.upload(fileInput, file);
        await waitFor(() => expect(callback.mock.calls.length).toBe(1));
        await waitFor(() => expect(callback).toHaveBeenCalledWith(file));
    });
});
