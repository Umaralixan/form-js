let elForm = document.querySelector(".todo-form");
let elList = document.querySelector(".todo-list");

// Get All Todos
function renderTodos(arr, list) {
  list.innerHTML = null;
  arr.forEach((item) => {
    let elItem = document.createElement("li");
    elItem.innerHTML = `
          <strong class="text-[16px] text-[grey]">${item.content}</strong>
          <button class="w-[150px] bg-[red] ml-[30px] mt-[10px] rounded-[4px] text-[#ffffff]" onclick="handleEdit('${item.id}')">Edit</button>
          <button class="btnn w-[200px] ml-[40px] bg-[gn]" onclick="handleDelete('${item.id}')">Delete</button>
    `;
    list.appendChild(elItem);
  });
}
axios.get("http://localhost:3000/todos").then((res) => {
  renderTodos(res.data, elList);
});

// Delete part
function handleDelete(id) {
  axios.delete(`http://localhost:3000/todos/${id}`);
}
// Delete end

// Create form start
elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const data = {
    content: evt.target.todo.value,
  };
  axios.post("http://localhost:3000/todos", data);
});
// Create form end

// Update part
function handleEdit(id) {
  axios.get(`http://localhost:3000/todos/${id}`).then((res) => {
    const newValue = prompt(res.data.content);
    if (newValue) {
      const data = {
        content: newValue,
      };
      axios.patch(`http://localhost:3000/todos/${id}`, data);
    } else {
      alert("Update qilmadingiz");
    }
  });
}
// Update end
