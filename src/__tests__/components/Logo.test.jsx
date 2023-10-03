import React from 'react';
import { render, screen } from '@testing-library/react';
import Logo from '../../components/Logo';

describe('Logo Component', () => {
    it('should display an image for a given width and height, which are passed through its props', () => {
        render(<Logo width={200} height={300} />);
        const image = screen.getByAltText('logo');
        expect(image.src).toContain('logo.png');
        expect(image).toHaveStyle('width: 200px');
        expect(image).toHaveStyle('height: 300px');
    });
});
