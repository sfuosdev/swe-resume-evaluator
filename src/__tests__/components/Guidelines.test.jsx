import React from 'react';
import { render, screen } from '@testing-library/react';
import Guidelines from '../../components/Guidelines';

describe('Guideline Component', () => {
    it('should render the component', () => {
        render(<Guidelines />);
        expect(screen.getByText('How To Use Our Service?')).toBeInTheDocument();
    });
});
