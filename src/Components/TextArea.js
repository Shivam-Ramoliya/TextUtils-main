import React, { useState } from 'react';

export default function TextArea(props) {
    const [originalText, setOriginalText] = useState("Enter your text here.");
    const [convertedText, setConvertedText] = useState("");

    // Utility: Get class based on light/dark mode
    const getModeClass = () => {
        return props.mode === 'dark'
            ? {
                backgroundColor: '#1e293b',         
                color: '#f0f9ff',                  
                border: '1px solid #334155',        
                boxShadow: '0 0 7px rgba(255, 255, 255, 1)',
                transition: 'all 0.5s ease',
                borderRadius: '0.5rem',           
            }
            : {
                backgroundColor: '#f0f9ff',         
                color: '#1e293b',                   
                border: '1px solid #dbeafe',        
                boxShadow: '0 0 7px rgba(0, 0, 0, 1)',
                transition: 'all 0.5s ease',
                borderRadius: '0.5rem',
            };
    };

    const handleChange = (event) => {
        setOriginalText(event.target.value);
        setConvertedText("");
    };

    const handleCopyText = () => {
        navigator.clipboard.writeText(convertedText);
        props.showAlert("Text copied to Clipboard!", "success");
    };

    const handleClearText = () => {
        setOriginalText("");
        setConvertedText("");
        props.showAlert("Text cleared!", "success");
    };

    // Case Conversion Utilities
    const handleUPClick = () => {
        setConvertedText(originalText.toUpperCase());
        props.showAlert("Converted to UpperCase!", "success");
    };

    const handleLOWClick = () => {
        setConvertedText(originalText.toLowerCase());
        props.showAlert("Converted to LowerCase!", "success");
    };

    const handleSentenceCase = () => {
        const newText = originalText
            .toLowerCase()
            .replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase());
        setConvertedText(newText);
        props.showAlert("Converted to SentenceCase!", "success");
    };

    const handleCapitalizedCase = () => {
        const newText = originalText
            .toLowerCase()
            .replace(/\b\w/g, char => char.toUpperCase());
        setConvertedText(newText);
        props.showAlert("Converted to CapitalizedCase!", "success");
    };

    const handleAlternatingCase = () => {
        let newText = '';
        for (let i = 0; i < originalText.length; i++) {
            newText += i % 2 === 0
                ? originalText[i].toLowerCase()
                : originalText[i].toUpperCase();
        }
        setConvertedText(newText);
        props.showAlert("Converted to AlternatingCase!", "success");
    };

    const handleInverseCase = () => {
        const newText = [...originalText]
            .map(c => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase())
            .join('');
        setConvertedText(newText);
        props.showAlert("Converted to InverseCase!", "success");
    };

    // Text Cleanup Utilities
    const handleSpaces = () => {
        let newText = originalText.split(/[ ]+/).join(" ");
        setConvertedText(newText);
        props.showAlert("Extra spaces removed!", "success");
    };

    const handleRemoveAllSpaces = () => {
        const newText = originalText.replace(/\s+/g, '');
        setConvertedText(newText);
        props.showAlert("All spaces removed!", "success");
    };

    const handleRemoveNumbers = () => {
        setConvertedText(originalText.replace(/[0-9]/g, ''));
        props.showAlert("All numbers removed!", "success");
    };

    const handleRemovePunctuation = () => {
        setConvertedText(originalText.replace(/[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/g, ''));
        props.showAlert("All punctuation removed!", "success");
    };

    // Text Transformation Utilities
    const handleReverse = () => {
        let newtext = "";
        for (let i = originalText.length - 1; i >= 0; i--) {
            newtext += originalText[i];
        }
        setConvertedText(newtext);
        props.showAlert("Text reversed!", "success");
    };

    const handleVowelConsonant = () => {
        const text = originalText.toLowerCase();
        let vowels = 0, consonants = 0, others = 0;

        for (let char of text) {
            if (/[a-z]/.test(char)) {
                if ("aeiou".includes(char)) vowels++;
                else consonants++;
            } else {
                others++;
            }
        }

        const summary =
            `Vowels: ${vowels}\nConsonants: ${consonants}\nOther Characters: ${others}`;
        setConvertedText(summary);
        props.showAlert("Vowel/Consonant frequency calculated!", "success");
    };

    const handleCharFrequency = () => {
        const freq = {};
        for (let char of originalText) {
            freq[char] = (freq[char] || 0) + 1;
        }

        const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]);
        const output = sorted.map(([char, count]) => `'${char}': ${count}`).join('\n');

        setConvertedText(output);
        props.showAlert("Character frequency calculated!", "success");
    };

    // Speech Utility
    const handleSpeak = () => {
        window.speechSynthesis.cancel();
        const msg = new SpeechSynthesisUtterance(originalText);
        window.speechSynthesis.speak(msg);
        props.showAlert("Text to Speech activated!", "success");
    };

    // Encoding-Decoding Utilities
    const handleBase64Encode = () => {
        setConvertedText(btoa(originalText));
        props.showAlert("Encoded to Base64!", "success");
    };

    const handleBase64Decode = () => {
        try {
            setConvertedText(atob(originalText));
            props.showAlert("Decoded from Base64!", "success");
        } catch {
            props.showAlert("Invalid Base64 Text!", "danger");
        }
    };

    // Text Statistics
    const OriginalwordCount = originalText.trim().split(/\s+/).filter(word => word.length > 0).length;
    const OriginalcharCount = originalText.length;

    const ConvertedwordCount = convertedText.trim().split(/\s+/).filter(word => word.length > 0).length;
    const ConvertedcharCount = convertedText.length;

    return (
        <div className="container my-4">
            <h1 className="mb-4">{props.heading}</h1>

            {/* Original Text Area */}
            <div className="row align-items-start mb-4">
                <div className="col-md-8">
                    <div className="mb-3 position-relative">
                        <label htmlFor="originalTextArea" className="form-label d-flex justify-content-between align-items-center">
                            <h5>Original Text.</h5>
                            <button type="button" className="btn btn-sm btn-outline-danger" onClick={handleClearText}>
                                Clear
                            </button>
                        </label>
                        <textarea
                            className="form-control"
                            style={getModeClass()}
                            id="originalTextArea"
                            value={originalText}
                            onChange={handleChange}
                            rows="7"
                        ></textarea>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="p-3" style={getModeClass()}>
                        <h4 className="text-center mb-3">Your Text summary for the original Text.</h4>
                        <p><strong>{OriginalwordCount}</strong> Words and <strong>{OriginalcharCount}</strong> Characters.</p>
                        <p><strong>{(OriginalwordCount * 0.008).toFixed(2)}</strong> minutes read.</p>
                    </div>
                </div>
            </div>

            {/* Converted Text Area */}
            <div className="row align-items-start mb-4">
                <div className="col-md-8">
                    <div className="mb-3 position-relative">
                        <label htmlFor="convertedTextArea" className="form-label d-flex justify-content-between align-items-center">
                            <h5>Converted Text.</h5>
                            <button type="button" className="btn btn-sm btn-outline-success" onClick={handleCopyText}>
                                Copy
                            </button>
                        </label>
                        <textarea
                            className="form-control"
                            style={getModeClass()}
                            id="convertedTextArea"
                            value={convertedText}
                            readOnly
                            rows="7"
                        ></textarea>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="p-3" style={getModeClass()}>
                        <h4 className="text-center mb-3">Your Text summary for the converted Text.</h4>
                        <p><strong>{ConvertedwordCount}</strong> Words and <strong>{ConvertedcharCount}</strong> Characters.</p>
                        <p><strong>{(ConvertedwordCount * 0.008).toFixed(2)}</strong> minutes read.</p>
                    </div>
                </div>
            </div>

            {/* Utility Buttons */}
            <div className="mb-4 d-flex flex-wrap gap-2">
                {/* Case Conversion Utilities */}
                <button className="btn btn-primary" onClick={handleUPClick}>UPPERCASE</button>
                <button className="btn btn-primary" onClick={handleLOWClick}>lowercase</button>
                <button className="btn btn-primary" onClick={handleSentenceCase}>Sentence case</button>
                <button className="btn btn-primary" onClick={handleCapitalizedCase}>Capitalized Case</button>
                <button className="btn btn-primary" onClick={handleAlternatingCase}>aLtErNaTiNg cAsE</button>
                <button className="btn btn-primary" onClick={handleInverseCase}>iNVERSE cASE</button>

                {/* Text Cleanup */}
                <button className="btn btn-primary" onClick={handleSpaces}>Remove Extra Spaces</button>
                <button className="btn btn-primary" onClick={handleRemoveAllSpaces}>Remove All Spaces</button>
                <button className="btn btn-primary" onClick={handleRemoveNumbers}>Remove Numbers</button>
                <button className="btn btn-primary" onClick={handleRemovePunctuation}>Remove Punctuation</button>

                {/* Transformations */}
                <button className="btn btn-primary" onClick={handleReverse}>Reverse Text</button>
                <button className="btn btn-primary" onClick={handleVowelConsonant}>Vowels/Consonant Frequency</button>
                <button className="btn btn-primary" onClick={handleCharFrequency}>Character Frequency</button>

                {/* Audio & Encoding */}
                <button className="btn btn-primary" onClick={handleSpeak}>Text to Speech</button>
                <button className="btn btn-primary" onClick={handleBase64Encode}>Encode to Base64</button>
                <button className="btn btn-primary" onClick={handleBase64Decode}>Decode Base64</button>
            </div>
        </div>
    );
}
