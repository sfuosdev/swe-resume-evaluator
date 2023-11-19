import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginSignupView from '../../components/LoginSignupView';

const toggleview = jest.fn();

const props = {
    isLogin: true,
    toggleView: toggleview,
};

describe('LoginSignupView', () => {
    it('should render with the default props', () => {
        render(
            <LoginSignupView
                isLogin={props.isLogin}
                toggleView={props.toggleView}
            />,
        );
        // Check if the LOG IN view is rendered
        expect(screen.getByText('LOG IN')).toBeInTheDocument();
    });

    it('should switch to the signup view when switch button is clicked on login view', () => {
        render(
            <LoginSignupView
                isLogin={props.isLogin}
                toggleView={props.toggleView}
            />,
        );
        // Click the switch button
        userEvent.click(
            screen.getByRole('button', {
                name: 'Do not have an account? Sign up',
            }),
        );
        expect(toggleview).toHaveBeenCalledWith(false);
    });
    it('should switch to the login view when switch button is clicked on signup view', () => {
        render(
            <LoginSignupView isLogin={false} toggleView={props.toggleView} />,
        );
        // Click the switch button
        userEvent.click(
            screen.getByRole('button', {
                name: 'Already have an account? Log in',
            }),
        );
        // Check if toggleView has been called and isLogin is set to false
        expect(toggleview).toHaveBeenCalledWith(true);
    });
});
