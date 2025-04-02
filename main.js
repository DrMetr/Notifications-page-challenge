const container = document.querySelector(".notifications_container");
const markReadBtn = document.querySelector(".mark_as_read");
const notsNumber = document.querySelector(".number");
let notifications = [];

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
    let html = '';
      
    data.forEach(item => {
      let when = `<div class="when">
            <span class="time_number">${item.when} </span><span class="ago">${item.ago}</span>
              </div>`

      item.new == true ? html += `<div class="notification d-flex flex-row m-3 p-3 rounded-3 new">`: html += `<div class="notification d-flex flex-row m-3 p-3 rounded-3">`;
      
      item.new == true ? marker = `<span class="marker"><svg width="16" height="16" class="ms-1"> 
      <circle cx="5" cy="8" r="3" fill="var(--Red)" /> </svg></span>` : marker = ``;

      html +=`<img src="${item.avatar}" class="avatar">
      <div class="notification_info d-flex flex-column ms-3">
      <div class="notification_text"><a href="#" class="name me-1">${item.name}</a>
      <span class="action">${item.action}</span>`
          
      switch(Object.keys(item.additional).toString()){ //adds liked posts, pictures, names of groups and messages
          case 'group':
            html = html + `<a href="#" class="group"> ${item.additional.group}</a>` + marker + when
            break
          case 'post_title':
            html = html +`<a href="#" class="post"> ${item.additional.post_title}</a>` + marker + when
            break
          case 'picture':
            html= html + `<a href="#"  class="picture float-end ms-5"><img src="${item.additional.picture}" alt="liked picture" class="picture_not"></a>` + marker + when
            break
          case 'message':
            html = html + marker + when + `<div class="message mt-2">${item.additional.message}</div>`
            break
          default:
            html = html + marker + when
            break
        }

      html += `</div></div></div>`;
    })
    container.innerHTML = html;
    checkCount();
}

markReadBtn.addEventListener("click", event => {
  event.preventDefault();
  let toMarkRead = document.querySelectorAll(".new");
  toMarkRead.forEach(item => mark(item));
  checkCount();
})

function mark(item){
  item.classList.remove("new");
  item.querySelector(".marker").remove();
}

function checkCount(){
  let counter = document.querySelectorAll(".new");
  document.querySelector(".number").textContent = counter.length;
}