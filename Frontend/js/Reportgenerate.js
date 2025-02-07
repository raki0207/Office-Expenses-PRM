
document.addEventListener("DOMContentLoaded", function () {
    const expenseTable = document.getElementById("reportTable");
    const totalAmountDisplay = document.getElementById("totalAmount");

    let totalAmount = 0;
    let tableHtml = `<table class="table table-striped">
                        <thead><tr>
                            <th>Employee ID</th>
                            <th>Category</th>
                            <th>Amount</th>
                            <th>Date & Time</th>
                        </tr></thead><tbody>`;

    // Fetch expenses from Firebase
    db.ref("expenses").on("value", (snapshot) => {
        totalAmount = 0;
        tableHtml = `<table class="table table-striped">
                        <thead><tr>
                            <th>Employee ID</th>
                            <th>Category</th>
                            <th>Amount</th>
                            <th>Date & Time</th>
                        </tr></thead><tbody>`;

        snapshot.forEach((childSnapshot) => {
            const expense = childSnapshot.val();
            totalAmount += expense.amount;

            tableHtml += `<tr>
                            <td>${expense.emp_id}</td>
                            <td>${expense.category} ${expense.other_category ? `(${expense.other_category})` : ""}</td>
                            <td>$${expense.amount}</td>
                            <td>${expense.date_time}</td>
                          </tr>`;
        });

        tableHtml += `</tbody></table>`;
        expenseTable.innerHTML = tableHtml;
        totalAmountDisplay.innerText = `$${totalAmount}`;
    });
});
