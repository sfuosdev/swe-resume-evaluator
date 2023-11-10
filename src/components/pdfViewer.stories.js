import PdfViewer from './pdfViewer';
import samplePdf from '../__tests__/resources/sample_resume.pdf';

export default {
    title: 'PdfViewer',
    component: PdfViewer,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export const Primary = {
    args: {
        file: samplePdf,
        width: 500,
        height: 500,
    },
};
