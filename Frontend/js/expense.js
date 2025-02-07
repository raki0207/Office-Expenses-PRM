// document.getElementById("expenseForm").addEventListener("submit", function (e) {
//     e.preventDefault();

//     const expenseData = {
//         emp_id: document.getElementById("empId").value,
//         category: document.getElementById("category").value,
//         other_category: document.getElementById("otherCategory").value || "",
//         amount: parseFloat(document.getElementById("amount").value),
//         date_time: document.getElementById("fromDate").value
//     };

//     console.log("Submitting expense:", expenseData);

//     db.ref("expenses").push(expenseData)
//         .then(() => {
//             alert("Expense submitted successfully!");
//             document.getElementById("expenseForm").reset();
//         })
//         .catch((error) => {
//             console.error("Error submitting expense:", error);
//             alert("Error: " + error.message);
//         });
// });

// Make sure to include the Firebase SDK
import firebase from "firebase/app";
import "firebase/database"; // To work with Realtime Database

// Your Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyC3q7Wj1FzLVcON52Ra1ovlFXIzZIrVMbI",
  authDomain: "office-expenses-de258.firebaseapp.com",
  databaseURL: "https://office-expenses-de258-default-rtdb.firebaseio.com",
  projectId: "office-expenses-de258",
  storageBucket: "office-expenses-de258.appspot.com",
  messagingSenderId: "661570586036",
  appId: "1:661570586036:web:938fb23576722a81e65ee1"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Database reference
const db = firebase.database(); // This is where `db` gets defined


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database(); // Reference to your Realtime Database

document.getElementById("expenseForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const expenseData = {
        emp_id: document.getElementById("empId").value,
        category: document.getElementById("category").value,
        other_category: document.getElementById("otherCategory").value || "",
        amount: parseFloat(document.getElementById("amount").value),
        date_time: document.getElementById("fromDate").value
    };

    console.log("Submitting expense:", expenseData);

    db.ref("expenses").push(expenseData)
        .then(() => {
            alert("Expense submitted successfully!");
            document.getElementById("expenseForm").reset();
        })
        .catch((error) => {
            console.error("Error submitting expense:", error);
            alert("Error: " + error.message);
        });
});
