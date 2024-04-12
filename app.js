async function sendTextToChatGPT(text) {
    const apiKey = 'api'; // Replace with your actual API key
    const endpoint = 'https://api.openai.com/v1/chat/completions';

    const data = {
        model: "gpt-4",
        messages: [{ role: "user", content: text }]
    };

    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData.choices[0].message.content;  // Adjust this according to the API response structure
}

// Event listener for right-clicking to send selected text
document.addEventListener('contextmenu', async (event) => {
    event.preventDefault();  // Prevent the default context menu

    const selectedText = window.getSelection().toString().trim();
    if (selectedText) {
        try {
            const chatGPTResponse = await sendTextToChatGPT(selectedText);
            console.log('ChatGPT Response:', chatGPTResponse);
        } catch (error) {
            console.error('Error calling ChatGPT:', error);
        }
    }
});
