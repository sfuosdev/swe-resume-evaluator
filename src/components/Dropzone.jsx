import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    padding: 20px;
    margin: auto;
    width: 500px;
    height: 100px;
    border-size: 1px;
    border-width: 2px;
    border-style: dashed;
    justify-content: center;
    align-items: center;
`;

/**
 * Dropzone component let users upload their files through the upload button
 */
function Dropzone({ onFileChange }) {
    // Track uploaded file object to be passed to onFileChange Prop
    const [uploadedFile, setUploadedFile] = useState({});

    // Track uploaded file details to be displayed to users
    const [fileDetailsDropdown, setFileDetailsDropdown] = useState(false);

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
        setFileDetailsDropdown(true);
    };

    return (
        <Wrapper>
            <div>
                <div>
                    <button type="button" onClick={uploadFileHandler}>
                        Upload
                    </button>
                </div>
                {fileDetailsDropdown && (
                    <div>
                        <p>Filename: {uploadedFile.name}</p>
                    </div>
                )}
                <input
                    type="file"
                    name="file"
                    ref={FileInputReference}
                    style={{ display: 'none' }} // Make the file input element invisible
                    onChange={changeFileHandler}
                    data-testid="fileInput"
                />
            </div>
        </Wrapper>
    );
}

Dropzone.propTypes = {
    /** onFileChange is a function from parent component that takes uploaded file object.  */
    onFileChange: PropTypes.func,
};

Dropzone.defaultProps = {
    onFileChange: () => {},
};

export default Dropzone;
