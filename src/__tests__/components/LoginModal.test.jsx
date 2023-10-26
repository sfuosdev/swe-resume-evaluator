import React from 'react';
import { render, screen } from '@testing-library/react';
import LoginModal from '../../components/LoginModal';
import Header from '../../components/Header';
import userEvent from '@testing-library/user-event';

const onClose = jest.fn();

const props = {
    isOn: true,
    width: 350,
    height: 370,
    OnClose: onClose,
}

describe('LoginModal', () => {
    it('should render with the given props', () => {
        render(<LoginModal isOn={props.isOn} width={props.width} height={props.height} OnClose={props.OnClose}/>);

        expect(onClose).toHaveBeenCalledTimes(0);
        expect(screen.getByTestId('modal')).toHaveStyle('width: 350px');
        expect(screen.getByTestId('modal')).toHaveStyle('height: 370px');
        expect(screen.getByText('Close')).toBeInTheDocument();
    });

    it('should be closed when close button is clicked', () => {
        render(<LoginModal isOn={props.isOn} width={props.width} height={props.height} OnClose={props.OnClose}/>)
        
        const button = screen.getByText('Close');
        userEvent.click(button);
        expect(onClose).toBeCalledTimes(1);
    });

    it('should be closed when the dark background is clicked', () => {
        render(<LoginModal isOn={props.isOn} width={props.width} height={props.height} OnClose={props.OnClose}/>)

        const darkBG = screen.getByTestId('darkBG');
        userEvent.click(darkBG);

        expect(onClose).toHaveBeenCalledTimes(1);
    })
})
