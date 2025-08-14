document.addEventListener('DOMContentLoaded', () => {
    const reinforceBtn = document.getElementById('reinforceBtn');
    const displayOwnedPlayerId = document.getElementById('displayOwnedPlayerId');
    const messageDisplay = document.getElementById('message');
    const remainingCashDisplay = document.getElementById('remainingCash');
    const reinforceDetailsDisplay = document.getElementById('reinforceDetails');

    // Get ownedPlayerId from the URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const ownedPlayerId = urlParams.get('ownedPlayerId');

    // If no ID is found in the URL, display an error and disable the button
    if (!ownedPlayerId) {
        displayOwnedPlayerId.textContent = 'Error: Player ID not found.';
        messageDisplay.textContent = 'Please select a player to reinforce from the previous page.';
        reinforceBtn.disabled = true;
        return; // Stop execution
    }

    // Display the player ID on the page
    displayOwnedPlayerId.textContent = ownedPlayerId;

    reinforceBtn.addEventListener('click', async () => {
        // Clear previous results
        messageDisplay.textContent = '';
        remainingCashDisplay.textContent = '';
        reinforceDetailsDisplay.innerHTML = '';
        messageDisplay.className = '';

        try {
            // Making a PATCH request to the reinforcement endpoint
            const response = await fetch(`/api/reinforce/${ownedPlayerId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    // Add authentication headers if necessary
                }
            });

            const result = await response.json();

            // Check if the response was successful
            if (response.ok) {
                // Display the main message and remaining cash
                messageDisplay.textContent = result.message;
                const cash = result.남은금액.cashAfterPayment;
                remainingCashDisplay.textContent = `Remaining Cash: ${cash}`;

                // Display detailed results based on the outcome
                if (result.강화결과) {
                    messageDisplay.classList.add('success');
                    const details = result.강화결과;
                    reinforceDetailsDisplay.innerHTML = `
                        <p><strong>Level:</strong> ${details.level}</p>
                        <p><strong>Attack:</strong> ${details.attack}</p>
                        <p><strong>Defence:</strong> ${details.defence}</p>
                        <p><strong>Speed:</strong> ${details.speed}</p>
                    `;
                } else if (result.강등결과) {
                    messageDisplay.classList.add('failure');
                    const details = result.강등결과;
                    reinforceDetailsDisplay.innerHTML = `
                        <p><strong>Level:</strong> ${details.level}</p>
                        <p><strong>Attack:</strong> ${details.attack}</p>
                        <p><strong>Defence:</strong> ${details.defence}</p>
                        <p><strong>Speed:</strong> ${details.speed}</p>
                    `;
                } else if (result.message.includes('파괴')) {
                    messageDisplay.classList.add('destruction');
                } else {
                    messageDisplay.classList.add('failure');
                }
            } else {
                // Handle server-side errors
                throw new Error(result.error || 'Something went wrong on the server.');
            }
        } catch (error) {
            // Handle network or other errors
            console.error('Error:', error);
            messageDisplay.textContent = `Error: ${error.message}`;
            messageDisplay.classList.add('error');
        }
    });
});