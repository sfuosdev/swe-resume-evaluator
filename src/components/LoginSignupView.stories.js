import LoginSignupView from './LoginSignupView';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'LoginSignupView',
    component: LoginSignupView,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'two different views within the modal',
            },
        },
    },
    argTypes: {
        isLogin: {
            description: 'Login view if, Signup view otherwise.',
        },
        toggleView: {
            description: 'isLogin true if, isLogin false otherwise',
        },
    },
};

export const Primary = {
    args: {
        isLogin: true,
        toggleView: () => {},
    },
};
