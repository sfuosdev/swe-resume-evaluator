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
function Dropzone({ handleFile }) {
    // Track uploaded file object to be passed to handleFile Prop
    const [uploadedFile, setUploadedFile] = useState({});
    // Track uploaded file details to be displayed to users
    const [fileDetailsDropdown, setFileDetailsDropdown] = useState(false);

    // Reference to the hidden file input element
    const hiddenFileInputReference = useRef(null);

    // When the upload button is clicked, the choose file button in the hidden file input element will be clicked
    const uploadFileHandler = () => {
        hiddenFileInputReference.current.click();
    };

    // After user upload a file from their device, display the file details to customers
    const changeFileHandler = (event) => {
        setUploadedFile(event.target.files[0]);
        setFileDetailsDropdown(true);
    };

    // After user click on the Evaluate button, pass uploaded file object to the parent prop handleFile
    const submitHandler = () => {
        handleFile(uploadedFile);
        console.log(uploadedFile);
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
                        <button type="button" onClick={submitHandler}>
                            Evaluate
                        </button>
                    </div>
                )}
                <input
                    type="file"
                    name="file"
                    onChange={changeFileHandler}
                    ref={hiddenFileInputReference}
                    style={{ display: 'none' }} // Make the file input element invisible
                />
            </div>
        </Wrapper>
    );
}

Dropzone.propTypes = {
    /** handleFile is a function from parent component that takes uploaded file object.  */
    handleFile: PropTypes.func,
};

Dropzone.defaultProps = {
    handleFile: () => {},
};

export default Dropzone;
