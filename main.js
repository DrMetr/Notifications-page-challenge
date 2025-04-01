const container = document.querySelector(".notifications_container");
const markRead = document.querySelector(".mark_as_read");
const notsNumber = document.querySelector(".number");

fetch("data.json")
  .then((res) => {
    if (!res.ok) {
      throw new Error(`Network response was not ok: ${res.statusText}`);
    }
    return res.json();
  }) 
  .then((data) => {
    notifications = data;
    place(data);
  })
  .catch((err) => {
    container.innerHTML = `Error fetching data: ${err.message}`;
  });

function place(data){
    
}