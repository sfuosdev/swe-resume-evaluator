import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useDrop } from 'react-dnd';
import { NativeTypes } from 'react-dnd-html5-backend';

const DarkMask = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${({ isDragging }) =>
        isDragging ? 'rgba(0, 0, 0, 0.5)' : 'transparent'};
    z-index: 1;
    transition: background-color 0.3s;
`;

const IndicatorBox = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    background-color: white;
    border: 2px dashed #cccccc;
    border-radius: 5px;
    z-index: 2;
    display: ${({ isDragging }) => (isDragging ? 'block' : 'none')};
`;

const DropArea = styled.div`
    width: 300px;
    height: 200px;
    border: 2px dashed #cccccc;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
`;

const DragAndDropIndicator = () => {
    const [isDragging, setIsDragging] = useState(false);

    const [, drop] = useDrop({
        accept: [NativeTypes.FILE],
        drop(item, monitor) {
            // Handle the file drop here if needed
            // For now, we'll just update the state to indicate that a file was dropped.
            setIsDragging(false);
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });

    const handleDragEnter = () => {
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    return (
        <div>
            <DarkMask
                isDragging={isDragging}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
            >
                <IndicatorBox isDragging={isDragging}>
                    Drop your file here
                </IndicatorBox>
            </DarkMask>
            <DropArea ref={drop}>{/* Your content here */}</DropArea>
        </div>
    );
};

export default DragAndDropIndicator;
