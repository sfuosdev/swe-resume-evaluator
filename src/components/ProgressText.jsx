/* eslint-disable no-nested-ternary */
/* eslint-disable no-undef */
import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

const fadeOutToTop = keyframes`
  from { opacity: 0.5; }
  to {
    opacity: 0;
    transform: translateY(-100%);
  }
`;

const moveToCompleted = keyframes`
  from {
    opacity: 1;
    transform: translateY(100%);
  }
  to { opacity: 0.5 }
`;

const moveToScheduled = keyframes`
  from {
    opacity: 0.5;
    transform: translateY(100%);
  }
  to { opacity: 1 }
`;

const fadeInFromBottom = keyframes`
  from {
    opacity: 0;
    transform: translateY(100%);
  }
  to { opacity: 0.5 }
`;

const LineContainer = styled.div`
    animation: ${({ animation }) => animation} 2s;
    display: ${({ hide }) => (hide ? 'none' : 'block')};
`;

/**
 * Display ProgressText component when 'loading' prop == True
 * Turn ON/OFF by 'loading'
 * Usage: <ProgressText loading />
 * @returns ProgressText
 */
function ProgressText({ loading = true }) {
    // eslint-disable-next-line no-undef, prettier/prettier
    const textLines = useMemo(() => [
            '',
            'This is the 1st line.',
            'This is the 2nd line.',
            'This is the 3rd line.',
            'This is the 4th line.',
            'This is the 5th line.',
            'This is the 6th line.',
            'This is the 7th line.',
            'This is the 8th line.',
            'This is the 9th line.',
            'This is the 10th line.',
            'This is the 11th line.',
            'This is the 12th line.',
            'This is the 13th line.',
            'This is the 14th line.',
            'This is the 15th line.',
            // Add more lines as needed
            '',
        ],
        [],
    );

    const [currentIndex, setCurrentIndex] = useState([0, 1, 2]);

    // eslint-disable-next-line consistent-return
    useEffect(() => {
        const interval = setInterval(() => {
            if (currentIndex[2] < textLines.length - 2) {
                const nextIndex = currentIndex.map((index) => index + 1);
                setCurrentIndex(nextIndex);
            }
        }, 2000); // Adjust the delay as needed

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
