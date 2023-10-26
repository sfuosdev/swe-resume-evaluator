/* eslint-disable no-unused-vars */
import React from 'react';
import { render, screen } from '@testing-library/react';
import ProgressText from '../../components/ProgressText';

describe('ProgressText Component', () => {
    it('should render the component when loading == true', () => {
        render(<ProgressText loading />);
        expect(screen.getByText('This is the 1st line...')).toBeInTheDocument();
    });

    it('should not render the component when loading == false', () => {
        render(<ProgressText loading={false} />);
        expect(screen.queryByText('This is the 1st line...')).toBeNull();
    });
});
