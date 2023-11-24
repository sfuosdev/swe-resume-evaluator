import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const UploadButton = styled.button`
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
    position: relative;
    z-index: 2;
    font-size: 16px;
    margin-top: 20px;
    background-color: white;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 4px;
    align-items: center;
    border-style: dotted;
    border-color: grey;
    transition: background-color 0.3s ease;
    text-align: center;

    &:hover {
        background-color: #e6e6e6;
    }

    & > p {
        margin: 0;
        font-weight: ${(props) => (props.uploaded ? 'normal' : 'bold')};
        color: ${(props) => (props.uploaded ? 'grey' : 'black')};
        font-size: ${(props) => (props.uploaded ? '14px' : '16px')};
    }
`;

/**
 * Dropzone component let users upload their files through the upload button
 */
function Dropzone({ onFileChange, width, height }) {
    // Track uploaded file object to be passed to onFileChange Prop
    const [uploadedFile, setUploadedFile] = useState(null);

    // Reference to the hidden file input element
    const FileInputReference = useRef(null);

    // When the upload button is clicked, the "choose file" button inside the referenced input element is clicked, user then choose file from device
    const uploadFileHandler = () => {
        FileInputReference.current.click();
    };

    // After user upload a file from their device, display the file details to customers and invoke callback
    const changeFileHandler = (event) => {
        event.preventDefault();
        setUploadedFile(event.target.files[0]);
        onFileChange(event.target.files[0]);
    };

    return (
        <div>
            <div>
                <UploadButton
                    type="button"
                    onClick={uploadFileHandler}
                    width={width}
                    height={height}
                >
                    {uploadedFile ? (
                        <p>{uploadedFile.name}</p>
                    ) : (
                        <>
                            <p>
                                <strong>
                                    Drag your resume here or click to select
                                    file
                                </strong>
                            </p>
                            <p style={{ color: 'grey', fontSize: '14px' }}>
                                only accept .pdf .docx, each file should not
                                exceed 2mb
                            </p>
                        </>
                    )}
                </UploadButton>
            </div>
            <input
                type="file"
                name="file"
                ref={FileInputReference}
                style={{ display: 'none' }} // Make the file input element invisible
                onChange={changeFileHandler}
                data-testid="fileInput"
            />
        </div>
    );
}

Dropzone.propTypes = {
    /** onFileChange is a function from parent component that takes uploaded file object.  */
    onFileChange: PropTypes.func,
    width: PropTypes.number,
    height: PropTypes.number,
};

Dropzone.defaultProps = {
    onFileChange: () => {},
    width: 150,
    height: 150,
};

export default Dropzone;
