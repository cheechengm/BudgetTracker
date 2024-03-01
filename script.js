// Selecting elements
const expenseForm = document.getElementById('expense-form');
const expenseList = document.getElementById('expense-list');
const totalDisplay = document.getElementById('total');

// Initialize total expense
let totalExpense = 0;

// Function to add expense
function addExpense(description, amount) {
    // Create list item
    const expenseItem = document.createElement('div');
    expenseItem.classList.add('expense-item');
    expenseItem.innerHTML = `
        <p>${description}</p>
        <p>$${amount.toFixed(2)}</p> <!-- Display amount with two decimal places -->
        <button class="delete-btn">Delete</button>
    `;

    // Add to expense list
    expenseList.appendChild(expenseItem);

    // Update total expense
    totalExpense += amount; // No need to parse again, since we're already using a float
    totalDisplay.textContent = totalExpense.toFixed(2); // Update total with two decimal places
}

// Event listener for expense form submission
expenseForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const description = document.getElementById('expense').value;
    const amount = parseFloat(document.getElementById('amount').value); // Parse the amount as a float

    if (description.trim() === '' || isNaN(amount)) { // Check if amount is NaN
        alert('Please enter both description and a valid amount.');
        return;
    }

    addExpense(description, amount);

    // Reset form fields
    expenseForm.reset();
});

// Event listener for deleting expenses
expenseList.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-btn')) {
        const expenseItem = event.target.parentElement;
        const amount = expenseItem.querySelector('p:last-child').textContent.slice(1);
        totalExpense -= parseFloat(amount);
        totalDisplay.textContent = totalExpense.toFixed(2);
        expenseItem.remove();
    }
});
