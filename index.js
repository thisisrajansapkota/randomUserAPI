const toDoListElem = document.getElementById("entryList");
const ignoreListElem = document.getElementById("ignoreList");
const ignoreHrElem = document.getElementById("ignoreHr");
const totalHrElem = document.getElementById("totalHr");
const deleteBtn = document.getElementById("delete");
const moveBtn = document.getElementById("move");

let toDoList = [];

const generateRandomStr = (length = 6) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
};

const handleOnSubmit = (e) => {
  e.preventDefault();
  // console.log(e);
  const form = e.target;
  const formData = new FormData(form);
  const todo = formData.get("task");
  const hr = formData.get("hr");
  if (+hr < 1) {
    return alert("Enter valid hours");
  }
  // or we can get elements.value from input fields

  const obj = {
    id: generateRandomStr(),
    todo: todo,
    hr: hr,
    // example (key : value)
    type: "entry",
  };
  toDoList.push(obj);

  displayEntryList();
  calculateTotalHrs();
};

const displayEntryList = () => {
  let htmlStr = "";
  const entryLists = toDoList.filter((todo) => todo.type === "entry");
  entryLists.forEach((task, index) => {
    //    index starts from 0 (default)
    htmlStr += `<tr>
                  <td>${index + 1}</td>
              
                  <td>${task.todo}</td>
                  <td>${task.hr}hr</td>
                  <td>
                    <button class="btn btn-danger" onclick="handleDelete('${
                      task.id
                    }') ">
                      <i class="fa-solid fa-trash"></i>
                    </button>
                    <button class="btn btn-success">
                      <i class="fa-solid fa-arrow-right" onclick="updateType('${
                        task.id
                      }', 'ignore')"></i>
                    </button>
                  </td>
                </tr>`;
  });
  toDoListElem.innerHTML = htmlStr;
};

const displayIgnoreList = () => {
  let htmlStr = "";
  const entryLists = toDoList.filter((todo) => todo.type === "ignore");
  entryLists.forEach((task, index) => {
    //    index starts from 0 (default)
    htmlStr += `<tr>
                  <td>${index + 1}</td>
              
                  <td>${task.todo}</td>
                  <td>${task.hr}hr</td>
                  <td>
                    <button class="btn btn-danger" onclick="handleDelete('${
                      task.id
                    }') ">
                      <i class="fa-solid fa-trash"></i>
                    </button>
                    <button class="btn btn-warning">
                      <i class="fa-solid fa-arrow-left" onclick="updateType('${
                        task.id
                      }', 'entry')"></i>
                    </button>
                  </td>
                </tr>`;
  });
  ignoreListElem.innerHTML = htmlStr;
};
const handleDelete = (id) => {
  if (confirm("Do you want to delete?")) {
    toDoList = toDoList.filter((todo) => todo.id !== id);
    displayEntryList();
    displayIgnoreList();
    calculateTotalHrs();
  }
};

const updateType = (id, type) => {
  console.log("I am update", id, type);
  toDoList = toDoList.map((todo) => {
    if (todo.id === id) {
      return {
        // ...todo is for destructuring!
        ...todo,
        type,
      };
    } else {
      return todo;
    }
  });
  console.log("TODO", toDoList);
  displayEntryList();
  displayIgnoreList();
  calculateTotalHrs();
};

const calculateTotalHrs = () => {
  let totalHr = 0;
  let ignoredHr = 0;
  for (let i = 0; i < toDoList.length; i++) {
    const todo = toDoList[i];
    totalHr += +todo.hr;
    if (todo.type === "ignore") {
      ignoredHr += +todo.hr;
    }
  }
  ignoreHrElem.innerText = ignoredHr;
  totalHrElem.innerText = totalHr;
};
