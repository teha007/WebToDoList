const nameContainer = document.querySelector(".js-name");

function paintName(name) {
  nameContainer.innerHTML = "";
  const title = document.createElement("span");
  title.className = "name__text";
  title.innerHTML = `${name}`;
  nameContainer.appendChild(title);
}

function handleSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const input = form.querySelector("input");
  const value = input.value;
  input.value = "";

  // 한글, 영어, 숫자만 입력 가능한 정규표현식
  const reg_hanengnum = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|\*\s]+$/;
  // const reg_hanengnum = /[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|\*\s]/;

  // 한글, 영어, 숫자를 제대로 입력하고
  // 최소 1글자 이상 입력했을시에만 할 일 목록에 추가
  if (reg_hanengnum.test(value) && value.length > 0) {
    localStorage.setItem("username", value);
    paintName(value);
    input.placeholder = "이름";
  } else {
    input.placeholder = "이름을 쓰세요.";
  }
}

function paintInput() {
  const input = document.createElement("input");
  input.placeholder = "이름";
  input.type = "text";
  input.className = "name__input";
  input.style = "text-align: center; width:300px;", 
  input.maxLength = "10";
  const form = document.createElement("form");
  form.addEventListener("submit", handleSubmit);
  form.appendChild(input);
  nameContainer.appendChild(form);
}

function loadName() {
  const name = localStorage.getItem("username");
  if (name === null) {
    paintInput();
  } else {
    paintName(name);
  }
}

function init() {
  loadName();
}

init();
