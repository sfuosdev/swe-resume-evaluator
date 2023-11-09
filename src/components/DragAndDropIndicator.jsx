import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
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
    z-index: 5;
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
function DragAndDropIndicator({ onFileChange }) {
    const [isDragging, setIsDragging] = useState(false);
    const [darkMaskZIndex, setDarkMaskZIndex] = useState(1);
    const FileInputReference = useRef(null);

    const handleDragEnter = () => {
        setIsDragging(true);
        setDarkMaskZIndex(3);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
        setDarkMaskZIndex(1);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files[0];
        onFileChange(droppedFile);
        setIsDragging(false);
        setDarkMaskZIndex(1);
    };

    return (
        <div>
            <DndProvider backend={HTML5Backend}>
                <DarkMask
                    data-testid="dark-mask"
                    style={{ zIndex: darkMaskZIndex }}
                    isDragging={isDragging}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                >
                    <IndicatorBox isDragging={isDragging}>
                        Drop your file here
                        <input
                            type="file"
                            name="file"
                            ref={FileInputReference}
                            style={{ display: 'none' }}
                            data-testid="fileInputByDrag"
                        />
                    </IndicatorBox>
                </DarkMask>
            </DndProvider>
        </div>
    );
}

DragAndDropIndicator.propTypes = {
    /** onFileChange is a function from parent component that takes uploaded file object.  */
    onFileChange: PropTypes.func,
};

DragAndDropIndicator.defaultProps = {
    onFileChange: () => {},
};

export default DragAndDropIndicator;
