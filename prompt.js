// Simulating fetching prompt ideas from a server
async function fetchPromptIdeas() {
    try {
        const response = await fetch('http://localhost:8080/prompt'); // Replace with your actual server URL
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const promptIdeas = await response.json();
        return promptIdeas;
    } catch (error) {
        console.error('Error fetching prompt ideas:', error.message);
        return null;
    }
}

// Your existing Prompt class in JavaScript
class Prompt {
    constructor(firstStatementPhrases, secondStatementPhrases) {
        this.firstStatementPhrases = firstStatementPhrases;
        this.secondStatementPhrases = secondStatementPhrases;
        this.lock1 = false;
        this.lock2 = false;
    }

    generateIdeas(txt1, txt2) {
        if (this.firstStatementPhrases.length > 0 && this.secondStatementPhrases.length > 0) {
            const randomFirstIdea = this.firstStatementPhrases[Math.floor(Math.random() * this.firstStatementPhrases.length)];
            const randomSecondIdea = this.secondStatementPhrases[Math.floor(Math.random() * this.secondStatementPhrases.length)];

            if (this.lock1 && !this.lock2) {
                txt2.value = randomSecondIdea;
            } else if (!this.lock1 && this.lock2) {
                txt1.value = randomFirstIdea;
            } else if (this.lock1 && this.lock2) {
                // Handle both locks active if needed
            } else {
                txt1.value = randomFirstIdea;
                txt2.value = randomSecondIdea;
            }
        } else {
            console.error('Prompt ideas list is empty.');
        }
    }

    toggleLock1() {
        this.lock1 = !this.lock1;
    }

    toggleLock2() {
        this.lock2 = !this.lock2;
    }
}

// Example usage
document.addEventListener('DOMContentLoaded', async () => {
    const promptIdeas = await fetchPromptIdeas();
    
    if (promptIdeas) {
        const prompt = new Prompt(promptIdeas.firstStatementPhrases, promptIdeas.secondStatementPhrases);

        // Your existing event listeners for buttons and text fields can go here
        // e.g., btn3.addEventListener('click', () => prompt.generateIdeas(txt1, txt2));
    }
});