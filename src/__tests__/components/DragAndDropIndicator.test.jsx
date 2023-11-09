import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import DragAndDropIndicator from '../../components/DragAndDropIndicator';

describe('DragAndDropIndicator', () => {
    it('renders but not visible with default state', () => {
        render(<DragAndDropIndicator />);
        expect(screen.queryByText('Drop your file here')).not.toBeVisible();
    });

    it('shows the IndicatorBox on drag enter', () => {
        render(<DragAndDropIndicator />);
        const darkMask = screen.getByTestId('dark-mask');
        const indicatorBox = screen.getByText('Drop your file here');

        fireEvent.dragEnter(darkMask);

        expect(indicatorBox).toBeVisible();
    });

    it('hides the IndicatorBox on drag leave', () => {
        render(<DragAndDropIndicator />);
        const darkMask = screen.getByTestId('dark-mask');
        const indicatorBox = screen.getByText('Drop your file here');

        fireEvent.dragEnter(darkMask);
        fireEvent.dragLeave(darkMask);

        expect(indicatorBox).not.toBeVisible();
    });
});
