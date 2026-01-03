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
function loadLeaves() {
    fetch("http://127.0.0.1:5000/leave/list")
        .then(res => res.json())
        .then(data => {
            const table = document.getElementById("leaveTable");
            table.innerHTML = "";

            data.forEach((leave, index) => {
                table.innerHTML += `
                    <tr>
                        <td>${leave.type}</td>
                        <td>${leave.from}</td>
                        <td>${leave.to}</td>
                        <td>${leave.status}</td>
                        <td>
                            <button onclick="updateLeave(${index}, 'Approved')">Approve</button>
                            <button onclick="updateLeave(${index}, 'Rejected')">Reject</button>
                        </td>
                    </tr>
                `;
            });
        });
}

function updateLeave(index, status) {
    fetch("http://127.0.0.1:5000/leave/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ index, status })
    })
    .then(res => res.json())
    .then(() => {
        alert("Leave " + status);
        loadLeaves();
    })
    .catch(err => console.error(err));
}
function checkIn() {
    fetch("http://127.0.0.1:5000/attendance/checkin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "emp@dayflow.com" })
    })
    .then(res => res.json())
    .then(data => {
        if (data.error) alert(data.error);
        else alert("Checked in successfully");
    });
}

function checkOut() {
    fetch("http://127.0.0.1:5000/attendance/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "emp@dayflow.com" })
    })
    .then(res => res.json())
    .then(data => {
        if (data.error) alert(data.error);
        else alert("Checked out successfully");
    });
}
function loadAttendance() {
    fetch("http://127.0.0.1:5000/attendance/list")
        .then(res => res.json())
        .then(data => {
            const table = document.getElementById("attendanceTable");
            if (!table) return;

            table.innerHTML = "";
            data.forEach(rec => {
                table.innerHTML += `
                    <tr>
                        <td>${rec.email}</td>
                        <td>${rec.date}</td>
                        <td>${rec.check_in}</td>
                        <td>${rec.check_out || "-"}</td>
                        <td>${rec.status}</td>
                    </tr>
                `;
            });
        });
}

