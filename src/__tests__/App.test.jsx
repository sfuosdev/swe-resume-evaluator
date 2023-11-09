import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import App from '../App';

describe('MainPage Navigation Path', () => {
    it('should navigate to LoadingPage when file is uploaded', () => {
        render(<App />);
        const fileInput = screen.getByTestId('fileInput');
        fireEvent.change(fileInput, {
            target: { files: [new File(['testfile'], 'testfile.txt')] },
        });
        expect(window.location.pathname).toBe('/loading');
    });
});

describe('LoadingPage Navigation Path', () => {
    it('should navigate to ReportingPage when the process is completed', () => {
        jest.useFakeTimers();
        const navigate = jest.fn;
        const encodedFile = 'Test';
        render(<App />);
        navigate('/loading', { state: { encodedFile } });
        act(() => {
            jest.advanceTimersByTime(15000); // 15 seconds
        });
        expect(window.location.pathname).toBe('/result/0x00');
    });
});
