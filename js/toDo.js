const form = document.querySelector(".js-to-do"),
  input = document.querySelector(".js-add-to-do"),
  list = document.querySelector(".js-list");

let toDos = [];

function persistToDos() {
  const stringToDo = JSON.stringify(toDos);
  localStorage.setItem("toDos", stringToDo);
}

function saveToDo(text) {
  console.log(text.length);
  const toDoObject = {
    id: toDos.length + 1,
    value: text
  };
  toDos.push(toDoObject);
  persistToDos();
}

function handleDelete(event) {
  const target = event.target;
  const li = target.parentElement;
  const ul = li.parentElement;
  const toDoId = li.id;
  ul.removeChild(li);
  toDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(toDoId);
  });
  persistToDos();
}

function addToDo(text) {

  if (toDos.length < 10) {
    const toDo = document.createElement("li");
    toDo.className = "toDo";
    toDo.id = toDos.length + 1;
    const deleteBtn = document.createElement("span");
    deleteBtn.innerHTML = "X";
    deleteBtn.className = "toDo__button";
    deleteBtn.addEventListener("click", handleDelete);
    const label = document.createElement("label");
    label.innerHTML = text;

    // 한글, 영어, 숫자만 입력 가능한 정규표현식
    var reg_hanengnum = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|\*\s]+$/;

    // 콘솔 로그를 이용해서 제대로 체크하는지 확인
    // console.log(!reg_hanengnum.test(text));

    // 한글, 영어, 숫자를 제대로 입력하고
    // 최소 1글자 이상 입력했을시에만 할 일 목록에 추가
    if (text.length > 0 && reg_hanengnum.test(text)) {
      toDo.appendChild(deleteBtn);
      toDo.appendChild(label);
      list.appendChild(toDo);
      saveToDo(text);
      input.placeholder = "할 일"
    } else {
      input.placeholder = "정확한 할 일을 써주세요.";
    }
  } else {
    input.placeholder = "목록은 최대 10개"
  }
}

function onSubmit(event) {
  event.preventDefault();
  const value = input.value;
  input.value = "";
  addToDo(value);
}

function loadToDos() {
  const loadedToDos = localStorage.getItem("toDos");
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      addToDo(toDo.value);
    });
  }
  return;
}

function init() {
  loadToDos();
}

form.addEventListener("submit", onSubmit);

init();
