import LoginModal from './LoginModal';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'LoginModal',
    component: LoginModal,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'a simple Modal component',
            },
        },
    },
    argTypes: {
        isOn: {
            description: 'True if , false otherwise.',
        },
        width: {
            description: 'Set the width of the modal',
        },
        height: {
            description: 'Set the height of the modal',
        },
        OnClose: {
            description: 'A function that closes the modal',
        },
        children: {
            description: 'Array of elements that go inside the modal',
        },
    },
};

export const Primary = {
    args: {
        children: 'Login / Sign up',
    },
};
