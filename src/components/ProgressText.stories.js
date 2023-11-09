import ProgressText from './ProgressText';

export default {
    title: 'ProgressText',
    component: ProgressText,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        loading: { control: 'boolean' },
    },
};

export const Primary = {
    args: {
        loading: true,
    },
};
