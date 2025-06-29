document.addEventListener("DOMContentLoaded", () => {
  const loginData = JSON.parse(localStorage.getItem("loginData")); // Assuming you stored aid in localStorage

  if (!loginData || !loginData.aid) {
    console.error("Login data not found. Redirecting to login page...");
    // Optional: Redirect to login page
    return;
  }

  fetch(`http://localhost:8080/safar/admin/user/all?key=${loginData.aid}`)
    .then(response => {
      if (!response.ok) throw new Error("Failed to fetch user data");
      return response.json();
    })
    .then(data => {
      const userTable = document.querySelector(".UserData");
      userTable.innerHTML = ""; // Clear previous rows if any

      data.forEach(element => {
        userTable.innerHTML += `
          <tr>
            <td class="column1">${element.userID}</td>
            <td class="column2">${element.firstName}</td>
            <td class="column3">${element.lastName}</td>
            <td class="column4">${element.mobile}</td>
            <td class="column5">${element.email}</td>
            <td class="column6">${element.totalReservation}</td>
            <td class="column7">${element.totalFeedBack}</td>
            <td id="btn" class="column8">
              <i class="fi fi-rs-trash"></i>
            </td>
          </tr>
        `;
      });
    })
    .catch(error => {
      console.error("Error:", error);
    });
});
