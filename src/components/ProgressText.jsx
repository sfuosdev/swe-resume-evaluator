/* eslint-disable no-nested-ternary */
/* eslint-disable no-undef */
import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

const fadeOutToTop = keyframes`
  from { 
    opacity: 0.3;
    transform: translateY(100%);
  }
  to { opacity: 0; }
`;

const moveToCompleted = keyframes`
  from {
    opacity: 1;
    transform: translateY(100%);
  }
  to { opacity: 0.3 }
`;

const moveToScheduled = keyframes`
  from {
    opacity: 0.3;
    transform: translateY(100%);
  }
  to { opacity: 1 }
`;

const fadeInFromBottom = keyframes`
  from {
    opacity: 0;
    transform: translateY(100%);
  }
  to { opacity: 0.3 }
`;

const LineContainer = styled.div`
    animation: ${({ animation }) => animation} 3s;
    opacity: 0;
    display: ${({ hide }) => (hide ? 'none' : 'block')};
    font-family: arial, sans-serif;
    font-size: 40px;
    font-weight: bold;
    color: #333;
    text-align: center;
    padding: 10px;
`;

/**
 * Display ProgressText component when 'loading' prop == True
 * Turn ON/OFF by 'loading'
 * Usage: <ProgressText loading />
 * @returns ProgressText
 */
function ProgressText({ loading = true }) {
    // eslint-disable-next-line no-undef, prettier/prettier
    const textLines = useMemo(
        () => [
            '\u200B', // Zero-Width Space (invisible)
            '\u200B',
            'This is the 1st line...',
            'This is the 2nd line...',
            'This is the 3rd line...',
            'This is the 4th line...',
            'This is the 5th line...',
            'This is the 6th line...',
            'This is the 7th line...',
            'This is the 8th line...',
            'This is the 9th line...',
            'This is the 10th line...',
            'This is the 11th line...',
            'This is the 12th line...',
            'This is the 13th line...',
            'This is the 14th line...',
            'This is the 15th line...',
            // Add more lines as needed
            '\u200B ',
        ],
        [],
    );

    const [currentIndex, setCurrentIndex] = useState([0, 1, 2, 3]);

    // eslint-disable-next-line consistent-return
    useEffect(() => {
        const interval = setInterval(() => {
            if (currentIndex[2] < textLines.length - 2) {
                const nextIndex = currentIndex.map((index) => index + 1);
                setCurrentIndex(nextIndex);
            } else {
                setCurrentIndex([0, 1, 2, 3]);
            }
        }, 2900); // Adjust the delay as (animation delay - 100)

        return () => clearInterval(interval);
    }, [currentIndex, textLines]);

    if (!loading) {
        return null;
    }

    return (
        <div className="progress-text-container">
            {textLines.map((line, index) => (
                <LineContainer
                    animation={
                        index === currentIndex[0]
                            ? fadeOutToTop
                            : index === currentIndex[1]
                            ? moveToCompleted
                            : index === currentIndex[2]
                            ? moveToScheduled
                            : fadeInFromBottom
                    }
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    hide={currentIndex.indexOf(index) === -1}
                >
                    {line}
                </LineContainer>
            ))}
        </div>
    );
}

ProgressText.propTypes = {
    loading: PropTypes.bool.isRequired,
};

export default ProgressText;
