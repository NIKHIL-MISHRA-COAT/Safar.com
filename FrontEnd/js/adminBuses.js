// Get admin session key
let loginData = JSON.parse(localStorage.getItem("adminData"));
const adminKey = loginData?.aid;

// Fetch and render all buses
fetch(`http://localhost:8080/safar/bus/all`)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    const tbody = document.querySelector(".UserData");
    tbody.innerHTML = ""; // Clear existing rows

    data.forEach(bus => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td class="column1">${bus.busId}</td>
        <td class="column2">${bus.busName}</td>
        <td class="column3">${bus.driverName}</td>
        <td class="column4">${bus.routeFrom}</td>
        <td class="column5">${bus.routeTo}</td>
        <td class="column5">${bus.busJourneyDate}</td>
        <td class="column6">${bus.departureTime}</td>
        <td class="column6">${bus.availableSeats}</td>
        <td class="column7">${bus.fare}</td>
        <td class="column8" style="cursor:pointer; color:red;" data-id="${bus.busId}">
          <i class="fi fi-rs-trash"></i>
        </td>
      `;
      tbody.appendChild(row);
    });

    // Add delete handler
    document.querySelectorAll(".column8").forEach(delBtn => {
      delBtn.addEventListener("click", async () => {
        const busId = delBtn.getAttribute("data-id");
        if (confirm("Are you sure you want to delete this bus?")) {
          try {
            const res = await fetch(`http://localhost:8080/safar/admin/bus/delete/${busId}?key=${adminKey}`, {
              method: "DELETE"
            });
            if (res.ok) {
              alert("Bus deleted successfully.");
              window.location.reload();
            } else {
              const err = await res.json();
              alert("Delete failed: " + err.message);
            }
          } catch (err) {
            alert("Error: " + err.message);
          }
        }
      });
    });
  })
  .catch(error => {
    console.error("Error fetching buses:", error);
  });

// Handle form submission (Add Bus)
document.getElementById("busForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const formData = new FormData(this);

  const data = {
    busName: formData.get("busName"),
    driverName: formData.get("driverName"),
    busType: "AC",
    routeFrom: formData.get("routeFrom"),
    routeTo: formData.get("routeTo"),
    busJourneyDate: formData.get("busJourneyDate"),
    arrivalTime: "10:00:00",
    departureTime: formData.get("departureTime"),
    seats: Number(formData.get("seats")),
    availableSeats: Number(formData.get("seats")),
    fare: Number(formData.get("fare")),
    route: {
      routeFrom: formData.get("routeFrom"),
      routeTo: formData.get("routeTo"),
      distance: 1000
    }
  };

  try {
    const res = await fetch(`http://localhost:8080/safar/admin/bus/add?key=${adminKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (res.ok) {
      alert("Bus added successfully!");
      document.getElementById("busFormModal").style.display = "none";
      this.reset();
      location.reload();
    } else {
      const err = await res.json();
      alert("Add failed: " + (err.message || "Unknown error"));
    }
  } catch (err) {
    alert("Error: " + err.message);
  }
});
