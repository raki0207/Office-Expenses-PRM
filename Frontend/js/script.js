document.addEventListener("DOMContentLoaded", function () {
    const expenses = [
        { empId: "EMP001", date: "2023-03-17", category: "Food", amount: 3000 },
        { empId: "EMP002", date: "2023-04-18", category: "Travel", amount: 5345 },
        { empId: "EMP003", date: "2023-03-20", category: "Conference", amount: 4123 },
        { empId: "EMP001", date: "2023-03-21", category: "Office Supplies", amount: 6345 },
        { empId: "EMP002", date: "2023-06-17", category: "Transportation", amount: 4106 },
        { empId: "EMP004", date: "2023-07-23", category: "Home Office", amount: 8345 },
        { empId: "EMP003", date: "2023-07-27", category: "Travel", amount: 3000 },
        { empId: "EMP001", date: "2025-02-04", category: "Food", amount: 3120 },
        { empId: "EMP002", date: "2025-02-05", category: "Travel", amount: 5500 },
        { empId: "EMP003", date: "2025-02-06", category: "Conference", amount: 4200 },
        { empId: "EMP001", date: "2025-02-04", category: "Office Supplies", amount: 6450 },
        { empId: "EMP002", date: "2025-02-05", category: "Transportation", amount: 4200 },
        { empId: "EMP004", date: "2025-02-06", category: "Home Office", amount: 8500 },
        { empId: "EMP003", date: "2025-02-07", category: "Travel", amount: 3150 },
        { empId: "EMP005", date: "2025-02-04", category: "Other", otherCategory: "Team Building", amount: 5000 },
        { empId: "EMP006", date: "2025-02-05", category: "Other", otherCategory: "Client Gifts", amount: 2500 }
    ];

    const downloadReportBtn = document.getElementById("downloadReportBtn");
    if (downloadReportBtn) downloadReportBtn.style.display = "none";

    document.getElementById("reportForm").addEventListener("submit", function (event) {
        event.preventDefault();

        const empId = document.getElementById("empId").value.trim();
        const category = document.getElementById("category").value.trim();
        const fromDate = new Date(document.getElementById("fromDate").value);
        const toDate = new Date(document.getElementById("toDate").value);
        const otherCategory = document.getElementById("otherCategory").value.trim();

        if (!fromDate || !toDate) {
            alert("Please select a valid date range.");
            return;
        }

        let filteredExpenses = expenses.filter(expense => {
            const expenseDate = new Date(expense.date);
            return expenseDate >= fromDate && expenseDate <= toDate;
        });

        if (empId) filteredExpenses = filteredExpenses.filter(expense => expense.empId === empId);
        if (category) {
            if (category === "Other" && otherCategory) {
                filteredExpenses = filteredExpenses.filter(expense => expense.category === otherCategory);
            } else {
                filteredExpenses = filteredExpenses.filter(expense => expense.category === category);
            }
        }

        displayReport(filteredExpenses);
    });

    function displayReport(filteredExpenses) {
        let totalAmount = 0;
        let reportHTML = `
            <table class="table table-bordered mt-3">
                <thead>
                    <tr>
                        <th>Emp ID</th>
                        <th>Date</th>
                        <th>Category</th>
                        <th>Expense Amount</th>
                    </tr>
                </thead>
                <tbody>
        `;

        if (filteredExpenses.length === 0) {
            reportHTML += `<tr><td colspan="4" class="text-center">No expenses found for the selected criteria.</td></tr>`;
        } else {
            filteredExpenses.forEach(expense => {
                totalAmount += expense.amount;
                reportHTML += `
                    <tr>
                        <td>${expense.empId}</td>
                        <td>${expense.date}</td>
                        <td>${expense.category}</td>
                        <td>₹${expense.amount.toFixed(2)}</td>
                    </tr>
                `;
            });
        }

        reportHTML += `</tbody></table>`;
        document.getElementById("totalAmount").textContent = `₹${totalAmount.toFixed(2)}`;
        document.getElementById("reportTable").innerHTML = reportHTML;

        if (downloadReportBtn) downloadReportBtn.style.display = "inline-block";
    }

    function convertToExcel(filteredExpenses) {
        const ws_data = [
            ["Emp ID", "Date", "Category", "Expense Amount"],
            ...filteredExpenses.map(expense => [
                expense.empId,
                expense.date,
                expense.category,
                `₹${expense.amount.toFixed(2)}`
            ])
        ];

        const ws = XLSX.utils.aoa_to_sheet(ws_data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Expenses");
        return wb;
    }

    function downloadReportExcel() {
        const empId = document.getElementById("empId").value.trim();
        const category = document.getElementById("category").value.trim();
        const fromDate = new Date(document.getElementById("fromDate").value);
        const toDate = new Date(document.getElementById("toDate").value);
        const otherCategory = document.getElementById("otherCategory").value.trim();

        let filteredExpenses = expenses.filter(expense => {
            const expenseDate = new Date(expense.date);
            return expenseDate >= fromDate && expenseDate <= toDate;
        });

        if (empId) filteredExpenses = filteredExpenses.filter(expense => expense.empId === empId);
        if (category) {
            if (category === "Other" && otherCategory) {
                filteredExpenses = filteredExpenses.filter(expense => expense.category === otherCategory);
            } else {
                filteredExpenses = filteredExpenses.filter(expense => expense.category === category);
            }
        }

        if (filteredExpenses.length === 0) {
            alert("No expenses to download for the selected criteria.");
            return;
        }

        const wb = convertToExcel(filteredExpenses);
        XLSX.writeFile(wb, "expense_report.xlsx");
    }

    if (downloadReportBtn) {
        downloadReportBtn.addEventListener("click", downloadReportExcel);
    }
});
