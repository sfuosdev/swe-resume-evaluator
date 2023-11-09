import React, { useState } from 'react';
import styled from 'styled-components';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

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
    padding: 70px;
    background-color: #8e44ad;
    border: 2px dashed #ffffff;
    border-radius: 10px;
    z-index: 2;
    display: ${({ isDragging }) => (isDragging ? 'block' : 'none')};
    pointer-events: none;

    color: #ffffff;
    font-size: 28px;
    text-align: center;
    text-transform: uppercase;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

/**
 * Display message box and cover the darkening mask when the user drag file over the screen
 * Invisible in default state
 * @returns DragAndDropIndicator
 */
function DragAndDropIndicator() {
    const [isDragging, setIsDragging] = useState(false);

    const handleDragEnter = () => {
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    return (
        <div>
            <DndProvider backend={HTML5Backend}>
                <DarkMask
                    data-testid="dark-mask"
                    isDragging={isDragging}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                >
                    <IndicatorBox isDragging={isDragging}>
                        Drop your file here
                    </IndicatorBox>
                </DarkMask>
            </DndProvider>
        </div>
    );
}

export default DragAndDropIndicator;
