import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    padding: 20px;
    margin: auto;
    width: 500px;
    height: 50px;
    border-size: 1px;
    border-width: 2px;
    border-style: dashed;
    justify-content: center;
    align-items: center;
`;

const changeHandler = () => {};

const submitHandler = () => {};

/**
 * Logo component displays a logo image or an alt text for a width and height given by the props
 */
function Dropzone() {
    return (
        <Wrapper>
            <div>
                <input type="file" name="file" onChange={changeHandler} />
                <div>
                    <button type="button" onClick={submitHandler}>
                        Upload
                    </button>
                </div>
            </div>
        </Wrapper>
    );
}

export default Dropzone;
