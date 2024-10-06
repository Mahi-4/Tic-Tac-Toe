let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let newBtn = document.querySelector("#new");
let msg = document.querySelector("#msg");
let msgContainer = document.querySelector(".msg-container");

let turn = true;
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8]
];

const resetGame = () => {
  turn = true;
  enableGame();
  document.querySelector("main").classList.remove("hide");
  msgContainer.classList.add("hide");

}

let count = 1;

boxes.forEach((box) =>
  box.addEventListener("click", () => {
    if (turn) {
      box.innerText = "X";
      box.style.color = "black";
      box.style.textShadow="0 0 15px rgb(101, 247, 4)";
      turn = false;
    } else {
      box.innerText = "O";
      box.style.color = "black";
      box.style.textShadow="0 0 15px red";
      turn = true;
    }
    box.disabled = true;
    checkWinner();
    count++;
  })
);

const enableGame = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
}

const disableGame = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
}

const showWinner = (winner) => {
  msgContainer.classList.remove("hide");
  msg.innerText = `Congratulations ${winner} \nYou Won `;
  document.querySelector("main").classList.add("hide");
  disableGame();
}

const checkWinner = () => {
  for (let patterns of winPatterns) {
    let pos1 = boxes[patterns[0]].innerText;
    let pos2 = boxes[patterns[1]].innerText;
    let pos3 = boxes[patterns[2]].innerText;

    if (pos1 != "" && pos2 !== "" && pos3 !== "") {
      if (pos1 === pos2 && pos2 === pos3) {
        showWinner(pos1);
        disableGame();
      }
      if (count === 9) {
        msgContainer.classList.remove("hide");
        msg.innerText = "Play Again!! Its a Draw";
        document.querySelector("main").classList.add("hide");
        count=0;
      }
    }

  }
}

reset.addEventListener("click", resetGame);
newBtn.addEventListener("click", resetGame);

