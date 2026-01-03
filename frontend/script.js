function login() {
    const email = document.querySelector('input[type="email"]').value;
    const password = document.querySelector('input[type="password"]').value;
    const role = document.querySelector('select').value;

    fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
    .then(res => {
        if (!res.ok) throw new Error("Invalid login");
        return res.json();
    })
    .then(data => {
        if (data.role === "employee") {
            window.location.href = "employee_dashboard.html";
        } else if (data.role === "admin") {
            window.location.href = "admin_dashboard.html";
        }
    })
    .catch(err => {
        alert("Login failed");
    });
}
function applyLeave() {
    const leaveType = document.querySelector("select").value;
    const fromDate = document.getElementById("fromDate").value;
    const toDate = document.getElementById("toDate").value;
    const remarks = document.querySelector("textarea").value;

    if (!fromDate || !toDate) {
        alert("Please select dates");
        return;
    }

    fetch("http://127.0.0.1:5000/leave/apply", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            type: leaveType,
            from: fromDate,
            to: toDate,
            remarks: remarks
        })
    })
    .then(res => res.json())
    .then(data => {
        alert("Leave request submitted successfully");
    })
    .catch(err => {
        alert("Error submitting leave");
        console.error(err);
    });
}

