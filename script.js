// Translation data - based on the provided Java examples
const translationDatabase = {
    "en": {
        "kn": {
            "Nanage pencil bekagide, can you give it to me?": "I want pencil, can you give it to me?",
            "Avaru office-ige hodaru, but he forgot his tiffin box.": "He went to office, but he forgot his tiffin box.",
            "Eega time estu?": "What is the time now?",
            "ninge ehtu Age?": "how old you are"
        },
        "hi": {
            "Hello": "नमस्ते",
            "How are you?": "आप कैसे हैं?",
            "Thank you": "धन्यवाद",
            "Good morning": "सुप्रभात"
        },
        "te": {
            "Hello": "హలో",
            "How are you?": "మీరు ఎలా ఉన్నారు?",
            "Thank you": "ధన్యవాదాలు",
            "Good morning": "శుభోదయం"
        },
        "ta": {
            "Hello": "வணக்கம்",
            "How are you?": "நீங்கள் எப்படி இருக்கிறீர்கள்?",
            "Thank you": "நன்றி",
            "Good morning": "காலை வணக்கம்"
        },
        "ml": {
            "Hello": "ഹലോ",
            "How are you?": "സുഖമാണോ?",
            "Thank you": "നന്ദി",
            "Good morning": "സുപ്രഭാതം"
        }
    },
    "kn": {
        "en": {
            "ನನಗೆ ಪೆನ್ಸಿಲ್ ಬೇಕಾಗಿದೆ, ನೀನು ಅದನ್ನು ನನಗೆ ಕೊಡಬಹುದಾ?": "I want pencil, can you give it to me?",
            "ಅವರು ಆಫೀಸ್‌ಗೆ ಹೋದರು, ಆದರೆ ಅವರು ತಮ್ಮ ಟಿಫಿನ್ ಬಾಕ್ಸ್ ಅನ್ನು ಮರೆತರು.": "He went to office, but he forgot his tiffin box.",
            "ಈಗ ಟೈಮ್ ಎಷ್ಟು?": "What is the time now?",
            "ನಿಮಗೆ ಎಷ್ಟು ವಯಸ್ಸು?": "How old are you?"
        }
    },
    "hi": {
        "en": {
            "नमस्ते": "Hello",
            "आप कैसे हैं?": "How are you?",
            "धन्यवाद": "Thank you",
            "सुप्रभात": "Good morning"
        }
    },
    "te": {
        "en": {
            "హలో": "Hello",
            "మీరు ఎలా ఉన్నారు?": "How are you?",
            "ధన్యవాదాలు": "Thank you",
            "శుభోదయం": "Good morning"
        }
    },
    "ta": {
        "en": {
            "வணக்கம்": "Hello",
            "நீங்கள் எப்படி இருக்கிறீர்கள்?": "How are you?",
            "நன்றி": "Thank you",
            "காலை வணக்கம்": "Good morning"
        }
    },
    "ml": {
        "en": {
            "ഹലോ": "Hello",
            "സുഖമാണോ?": "How are you?",
            "നന്ദി": "Thank you",
            "സുപ്രഭാതം": "Good morning"
        }
    }
};

// Language names mapping
const languageNames = {
    "en": "English",
    "kn": "Kannada",
    "hi": "Hindi",
    "te": "Telugu",
    "ta": "Tamil",
    "ml": "Malayalam"
};

// DOM elements
const inputText = document.getElementById('input-text');
const outputText = document.getElementById('output-text');
const sourceLang = document.getElementById('source-lang');
const targetLang = document.getElementById('target-lang');
const examplesGrid = document.getElementById('examples-grid');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    populateExamples();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    // Auto-translate when input changes
    inputText.addEventListener('input', function() {
        if (inputText.value.trim()) {
            translateText();
        } else {
            outputText.textContent = 'Translation will appear here...';
        }
    });

    // Translate when language selection changes
    sourceLang.addEventListener('change', translateText);
    targetLang.addEventListener('change', translateText);
}

// Main translation function
function translateText() {
    const text = inputText.value.trim();
    const source = sourceLang.value;
    const target = targetLang.value;

    if (!text) {
        outputText.textContent = 'Translation will appear here...';
        return;
    }

    let translation = '';

    // Check if translation exists in database
    if (translationDatabase[source] && translationDatabase[source][target] && translationDatabase[source][target][text]) {
        translation = translationDatabase[source][target][text];
    } else {
        // Try reverse lookup (if target to source exists)
        if (translationDatabase[target] && translationDatabase[target][source] && translationDatabase[target][source][text]) {
            translation = translationDatabase[target][source][text];
        } else {
            translation = 'Translation not found. Try adding it to the database.';
        }
    }

    outputText.textContent = translation;
}

// Swap languages function
function swapLanguages() {
    const source = sourceLang.value;
    const target = targetLang.value;

    sourceLang.value = target;
    targetLang.value = source;

    // Swap text content
    const input = inputText.value;
    const output = outputText.textContent;

    inputText.value = output === 'Translation will appear here...' ? '' : output;
    outputText.textContent = input === 'Translation will appear here...' ? '' : input;

    translateText();
}

// Clear input function
function clearInput() {
    inputText.value = '';
    outputText.textContent = 'Translation will appear here...';
}

// Copy output to clipboard
function copyOutput() {
    const text = outputText.textContent;
    if (text && text !== 'Translation will appear here...') {
        navigator.clipboard.writeText(text).then(function() {
            showNotification('Text copied to clipboard!');
        }).catch(function(err) {
            console.error('Failed to copy: ', err);
        });
    }
}

// Text-to-speech for output
function speakOutput() {
    const text = outputText.textContent;
    if (text && text !== 'Translation will appear here...' && 'speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = targetLang.value === 'en' ? 'en-US' :
                        targetLang.value === 'hi' ? 'hi-IN' :
                        targetLang.value === 'kn' ? 'kn-IN' :
                        targetLang.value === 'te' ? 'te-IN' :
                        targetLang.value === 'ta' ? 'ta-IN' :
                        targetLang.value === 'ml' ? 'ml-IN' : 'en-US';
        speechSynthesis.speak(utterance);
    }
}

// Voice input function
function startVoiceInput() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();

        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = sourceLang.value === 'en' ? 'en-US' :
                          sourceLang.value === 'hi' ? 'hi-IN' :
                          sourceLang.value === 'kn' ? 'kn-IN' :
                          sourceLang.value === 'te' ? 'te-IN' :
                          sourceLang.value === 'ta' ? 'ta-IN' :
                          sourceLang.value === 'ml' ? 'ml-IN' : 'en-US';

        recognition.onstart = function() {
            inputText.placeholder = 'Listening...';
        };

        recognition.onresult = function(event) {
            const transcript = event.results[0][0].transcript;
            inputText.value = transcript;
            translateText();
        };

        recognition.onerror = function(event) {
            console.error('Speech recognition error:', event.error);
            inputText.placeholder = 'Enter text to translate...';
        };

        recognition.onend = function() {
            inputText.placeholder = 'Enter text to translate...';
        };

        recognition.start();
    } else {
        alert('Speech recognition is not supported in this browser.');
    }
}

// Populate examples
function populateExamples() {
    const examples = [
        {
            source: "Nanage pencil bekagide, can you give it to me?",
            translation: "I want pencil, can you give it to me?",
            sourceLang: "kn",
            targetLang: "en"
        },
        {
            source: "Avaru office-ige hodaru, but he forgot his tiffin box.",
            translation: "He went to office, but he forgot his tiffin box.",
            sourceLang: "kn",
            targetLang: "en"
        },
        {
            source: "Eega time estu?",
            translation: "What is the time now?",
            sourceLang: "kn",
            targetLang: "en"
        },
        {
            source: "Hello",
            translation: "नमस्ते",
            sourceLang: "en",
            targetLang: "hi"
        },
        {
            source: "Thank you",
            translation: "धन्यवाद",
            sourceLang: "en",
            targetLang: "hi"
        }
    ];

    examples.forEach(example => {
        const exampleCard = document.createElement('div');
        exampleCard.className = 'example-card';
        exampleCard.innerHTML = `
            <h4>${languageNames[example.sourceLang]} → ${languageNames[example.targetLang]}</h4>
            <div class="example-text">${example.source}</div>
            <div class="example-translation">${example.translation}</div>
        `;
        exampleCard.addEventListener('click', function() {
            inputText.value = example.source;
            sourceLang.value = example.sourceLang;
            targetLang.value = example.targetLang;
            translateText();
        });
        examplesGrid.appendChild(exampleCard);
    });
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 10px 20px;
        border-radius: 6px;
        z-index: 1001;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Modal functions
function showAddTranslationModal() {
    document.getElementById('add-translation-modal').style.display = 'block';
    document.getElementById('new-source-text').focus();
}

function closeAddTranslationModal() {
    document.getElementById('add-translation-modal').style.display = 'none';
    document.getElementById('new-source-text').value = '';
    document.getElementById('new-target-text').value = '';
}

function addNewTranslation() {
    const sourceText = document.getElementById('new-source-text').value.trim();
    const targetText = document.getElementById('new-target-text').value.trim();
    const sourceLang = document.getElementById('new-source-lang').value;
    const targetLang = document.getElementById('new-target-lang').value;

    if (!sourceText || !targetText) {
        alert('Please fill in both source and target text.');
        return;
    }

    // Add to translation database
    if (!translationDatabase[sourceLang]) {
        translationDatabase[sourceLang] = {};
    }
    if (!translationDatabase[sourceLang][targetLang]) {
        translationDatabase[sourceLang][targetLang] = {};
    }

    translationDatabase[sourceLang][targetLang][sourceText] = targetText;

    // Also add reverse translation if it doesn't exist
    if (!translationDatabase[targetLang][sourceLang]) {
        translationDatabase[targetLang][sourceLang] = {};
    }
    translationDatabase[targetLang][sourceLang][targetText] = sourceText;

    showNotification('Translation added successfully!');
    closeAddTranslationModal();

    // Refresh examples
    examplesGrid.innerHTML = '';
    populateExamples();
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('add-translation-modal');
    if (event.target === modal) {
        closeAddTranslationModal();
    }
});
