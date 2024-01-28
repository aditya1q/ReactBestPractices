import React, { useState } from 'react';

const LanguageSelector = () => {
    const languages = [
        'English',
        'Spanish',
        'French',
        'German',
        'Chinese',
        'Japanese',
    ];

    const [selectedLanguage, setSelectedLanguage] = useState('');

    const handleLanguageChange = (language) => {
        setSelectedLanguage(language);
    };

    return (
        <div>
            <h2>Select a Language:</h2>
            <ul>
                {languages.map((language, index) => (
                    <li
                        key={index}
                        onClick={() => handleLanguageChange(language)}
                        style={{
                            cursor: 'pointer',
                            fontWeight:
                                language === selectedLanguage ? 'bold' : 'normal',
                        }}
                    >
                        {language}
                    </li>
                ))}
            </ul>
            {selectedLanguage && (
                <p>You have selected: {selectedLanguage}</p>
            )}
        </div>
    );
};

export default LanguageSelector;
