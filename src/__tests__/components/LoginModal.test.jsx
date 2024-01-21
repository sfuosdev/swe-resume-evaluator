/**
 * @jest-environment node
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginModal from '../../components/LoginModal';

const onClose = jest.fn();

const props = {
    isOn: true,
    width: 350,
    height: 370,
    OnClose: onClose,
};

describe('Modal', () => {
    it('should render with the given props', () => {
        render(
            <LoginModal
                isOn={props.isOn}
                width={props.width}
                height={props.height}
                OnClose={props.OnClose}
            />,
        );

        expect(onClose).toHaveBeenCalledTimes(0);
        expect(screen.getByTestId('modal')).toHaveStyle('width: 350px');
        expect(screen.getByTestId('modal')).toHaveStyle('height: 370px');
        expect(screen.getByText('X')).toBeInTheDocument();
    });

    it('should be closed when close button is clicked', () => {
        render(
            <LoginModal
                isOn={props.isOn}
                width={props.width}
                height={props.height}
                OnClose={props.OnClose}
            />,
        );

        const button = screen.getByText('X');
        userEvent.click(button);
        expect(onClose).toBeCalledTimes(1);
    });

    it('should be closed when the dark background is clicked', () => {
        render(
            <LoginModal
                isOn={props.isOn}
                width={props.width}
                height={props.height}
                OnClose={props.OnClose}
            />,
        );

        const darkBG = screen.getByTestId('darkBG');
        userEvent.click(darkBG);

        expect(onClose).toHaveBeenCalledTimes(1);
    });
});
