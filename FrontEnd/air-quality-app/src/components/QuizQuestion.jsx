import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../static/QuizQuestion.css'; // Import the CSS file for styling

function QuizQuestion({ question, currentQuestion, onChange, onNext, onPrevious, selectedAnswers }) {
    const { id, text, options } = question;
    const [error, setError] = useState('');

    const handleOptionChange = (e) => {
        const selectedOption = options.find(option => option.value === e.target.value);
        onChange(id, e.target.value, selectedOption.score);
        setError(''); // Clear the error message on option change
    };

    const handleNext = () => {
        if (selectedAnswers.length === 0) {
            setError('Please select at least one option before proceeding.');
        } else {
            setError('');
            onNext();
        }
    };

    const handlePrevious = () => {
        setError('');
        onPrevious();
    };

    return (
        <div className={`question ${currentQuestion === id ? 'active' : ''}`}>
            <p>{text}</p>
            <div className="options">
                {options.map((option, index) => (
                    <div key={index} className="option">
                        <label>
                            <input
                                type={option.type}
                                name={id}
                                value={option.value}
                                checked={selectedAnswers.includes(option.value)}
                                onChange={handleOptionChange}
                            />
                            {option.value}
                        </label>
                    </div>
                ))}
            </div>
            {error && <p className="error-message">{error}</p>}
            <div className="navigation-buttons">
                <button
                    type="button"
                    className="previous"
                    onClick={handlePrevious}
                    disabled={currentQuestion === 'question1'}
                >
                    Previous
                </button>
                <button
                    type="button"
                    className="next"
                    onClick={handleNext}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

QuizQuestion.propTypes = {
    question: PropTypes.object.isRequired,
    currentQuestion: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
    onPrevious: PropTypes.func.isRequired,
    selectedAnswers: PropTypes.array.isRequired,
};

export default QuizQuestion;