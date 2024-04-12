async function sendTextToChatGPT(text) {
    const apiKey = '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'; // Replace with your actual API key
    const endpoint = 'https://api.openai.com/v1/chat/completions';

    console.log('Preparing to send data to OpenAI...');
    const data = {
        model: "gpt-4",
        messages: [{ role: "user", content: text }]
    };

    console.log('Data prepared:', JSON.stringify(data, null, 2)); // Displays formatted data being sent
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify(data)
        });

        console.log('Request sent. Status:', response.status); // Logs the HTTP status

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log('Response received:', JSON.stringify(responseData, null, 2)); // Displays the response data formatted

        return responseData.choices[0].message.content;
    } catch (error) {
        console.error('Error during fetch operation:', error);
    }
}

// Event listener for right-clicking to send selected text
document.addEventListener('contextmenu', async (event) => {
    event.preventDefault();  // Prevent the default context menu
    console.log('Right-click detected.');

    const selectedText = window.getSelection().toString().trim();
    console.log('Selected text:', selectedText);

    if (selectedText) {
        try {
            console.log('Sending selected text to ChatGPT...');
            const chatGPTResponse = await sendTextToChatGPT(selectedText);
            console.log('ChatGPT Response:', chatGPTResponse);
        } catch (error) {
            console.error('Error calling ChatGPT:', error);
        }
    } else {
        console.log('No text selected.');
    }
});
