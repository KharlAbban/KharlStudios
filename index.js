let boxes = document.querySelectorAll(".box.align");
const playBtn = document.querySelector("#play-again");
const playerOneImages = [
	"images/micro.jpg",
	"images/micro.jpg",
	"images/micro.jpg",
];
const playerTwoImages = [
	"images/main.jpeg",
	"images/main.jpeg",
	"images/main.jpeg",
];
var currentPlayer = "0";
let isGameOver = false;
let isPhase1 = true;
const allowedDropZonesID = [
	[2, 4, 5],
	[1, 3, 5],
	[2, 5, 6],
	[1, 5, 7],
	[1, 2, 3, 4, 6, 7, 8, 9],
	[3, 5, 9],
	[4, 5, 8],
	[5, 7, 9],
	[5, 6, 8],
];
let currentImageDragged;
let boxDraggedFrom;
let boxDroppedInto;

boxes.forEach((box, index) => {
	box.textContent = "";
	box.addEventListener(
		"click",
		(Event) => {
			if (!isGameOver && !box.hasChildNodes() && isPhase1) {
				const imgElm = document.createElement("img");
				imgElm.src =
					currentPlayer === "0"
						? playerOneImages[currentPlayer]
						: playerTwoImages[currentPlayer - 1];
				imgElm.setAttribute("draggable", "true");
				imgElm.setAttribute("id", currentPlayer);

				imgElm.addEventListener("dragstart", handleImageDragStart);

				box.appendChild(imgElm);
				currentPlayer === "0" ? playerOneImages.pop() : playerTwoImages.pop();

				// Functions
				checkPhaseOneDone();
				checkForWin();
				changeTurn();
			}
		},
		{ once: true }
	);
	box.addEventListener("dragover", handleBoxDragOver);
	box.addEventListener("drop", handleBoxDrop);
});

function handleImageDragStart(Event) {
	if (isGameOver || isPhase1) return;
	if (Event.target.id !== currentPlayer) return;
	boxDraggedFrom = Event.target.parentElement;
	currentImageDragged = Event.target;
	// console.log("Drag started from box", boxDraggedFrom);
}

function handleBoxDragOver(Event) {
	Event.preventDefault();
	// console.log("Dragged over box", Event.target.parentElement);
}
function handleBoxDrop(Event) {
	// console.log("Dropped", Event.target);
	if (!Event.target.classList.contains("box") || Event.target.hasChildNodes()) {
		currentImageDragged = "";
		boxDraggedFrom = "";
		boxDroppedInto = "";
		return;
	}
	boxDroppedInto = Event.target;
	// console.log(allowedDropZonesID[boxDraggedFrom.id - 1]);
	if (
		allowedDropZonesID[boxDraggedFrom.id - 1].includes(
			Number(boxDroppedInto.id)
		)
	) {
		Event.target.appendChild(currentImageDragged);
		checkForWin();
		currentImageDragged = "";
		boxDraggedFrom = "";
		boxDroppedInto = "";
		changeTurn();
	} else {
		return;
	}
}

// Function Declarations
function checkForWin() {
	// console.log("Function for winner!");
	// Box Ids for win conditions
	let winConditions = [
		[1, 2, 3],
		[4, 5, 6],
		[7, 8, 9],
		[1, 4, 7],
		[2, 5, 8],
		[3, 6, 9],
		[1, 5, 9],
		[3, 5, 7],
	];
	// console.log(boxes[winConditions[0][0] - 1]);
	for (let i = 0; i < winConditions.length; i++) {
		let winConditionsDivs = [],
			canCheckForWin;
		for (let j = 0; j < winConditions[i].length; j++) {
			// console.log(boxes[winConditions[i][j] - 1]);
			// winConditionsDivs[j] =
			// 	boxes[winConditions[i][j] - 1].querySelector("img");
			winConditionsDivs[j] = boxes[winConditions[i][j] - 1];
		}

		canCheckForWin = winConditionsDivs.every((div) => {
			return div.hasChildNodes();
		});
		// console.log(canCheckForWin);
		if (!canCheckForWin) continue;
		let isWin = winConditionsDivs.every((div) => {
			return div.querySelector("img").id == currentPlayer;
		});
		// alert(currentPlayer);
		if (!isWin) continue;
		isGameOver = true;
		alert(`Game Over ${currentPlayer}`);
	}
}

function changeTurn() {
	if (currentPlayer == "0") {
		currentPlayer = "1";
		document.querySelector(".bg").style.left = "85px";
	} else {
		currentPlayer = "0";
		document.querySelector(".bg").style.left = "0";
	}
}
function checkPhaseOneDone() {
	if (playerOneImages.length < 1 && playerTwoImages.length < 1) {
		isPhase1 = false;
	} else {
		isPhase1 = true;
	}
}
