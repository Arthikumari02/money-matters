import '../src/index.css';

import type { Preview } from '@storybook/react';

const preview: Preview = {
    parameters: {
        layout: 'fullscreen',
        backgrounds: {
            default: 'gray-50',
        },
    },
};

export default preview;
