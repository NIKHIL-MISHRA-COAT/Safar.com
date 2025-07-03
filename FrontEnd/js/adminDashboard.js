
fetch('http://localhost:8080/safar/bus/count')
  .then(response => response.json())
  .then(data => {
    const count = typeof data === "number" ? data : 0;
    document.querySelector("#buses").innerHTML = count;
    console.log(count);
  })
  .catch(error => {
    console.log('Error:', error);
    document.querySelector("#buses").innerHTML = 0;
  });



fetch('http://localhost:8080/safar/user/count')
  .then(response => response.json())
  .then(data => {
    document.querySelector("#users").innerHTML = data
    console.log(data)
  })
  .catch(error => {
    console.log('Error:', error);
  });


fetch('http://localhost:8080/safar/reservation/count')
  .then(response => response.json())
  .then(data => {
    document.querySelector("#reservation").innerHTML = data
    console.log(data)
  })
  .catch(error => {
    console.log('Error:', error);
  });


fetch('http://localhost:8080/safar/feedback/count')
  .then(response => response.json())
  .then(data => {
    document.querySelector("#feedback").innerHTML = data
  })
  .catch(error => {
    console.log('Error:', error);
  });

  
fetch('http://localhost:8080/safar/route/count')
  .then(response => response.json())
  .then(data => {
    document.querySelector("#route").innerHTML = data
  })
  .catch(error => {
    console.log('Error:', error);
  });



let loginData = JSON.parse(localStorage.getItem("adminData"))
document.querySelector("#admin").innerHTML = loginData.adminID
