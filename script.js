const tabs = document.querySelectorAll(".tab-button");
const tabContents = document.querySelectorAll(".tab-content");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    tabContents.forEach(content => content.classList.remove("active"));
    document.getElementById(tab.dataset.tab).classList.add("active");
  });
});

const modal = document.getElementById("modal");
const addIdeaBtn = document.getElementById("add-idea");
const cancelBtn = document.getElementById("cancel");

addIdeaBtn.onclick = () => modal.classList.remove("hidden");
cancelBtn.onclick = () => modal.classList.add("hidden");

const ideaForm = document.getElementById("idea-form");
const ideaList = document.getElementById("idea-list");
const notYetList = document.getElementById("not-yet-list");
const doneList = document.getElementById("done-list");

function saveData() {
  const data = {
    ideas: ideaList.innerHTML,
    todos: {
      notYet: notYetList.innerHTML,
      done: doneList.innerHTML
    }
  };
  localStorage.setItem("todoAppData", JSON.stringify(data));
}

function loadData() {
  const data = JSON.parse(localStorage.getItem("todoAppData"));
  if (data) {
    ideaList.innerHTML = data.ideas;
    notYetList.innerHTML = data.todos.notYet;
    doneList.innerHTML = data.todos.done;
  }
}

ideaForm.addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("item-name").value;
  const duration = document.getElementById("duration").value;
  const materials = document.getElementById("materials").value;
  const imageFile = document.getElementById("image").files[0];
  const reader = new FileReader();

  reader.onload = function () {
    const imageUrl = reader.result;
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${imageUrl}" alt="idea">
      <div class="details">
        <p>${name}</p>
        <p>${duration}</p>
        <p>${materials}</p>
      </div>
    `;
    ideaList.appendChild(card);

    const todo = card.cloneNode(true);
    todo.classList.add("todo-card");
    
    const button = document.createElement("button");
    button.textContent = "Done";
    button.onclick = () => {
      doneList.appendChild(todo);
      button.remove();
      saveData();
    };
    todo.appendChild(button);
    
    notYetList.appendChild(todo);
    

    modal.classList.add("hidden");
    ideaForm.reset();
    saveData();
  };

  if (imageFile) reader.readAsDataURL(imageFile);
});

window.onload = () => loadData();
