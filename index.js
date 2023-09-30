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
let currentPlayer = "0";
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
const boxDraggable = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let currentImageDragged;
let boxDraggedFrom;
let boxDroppedInto;

boxes.forEach((box, index) => {
	box.textContent = "";
	box.addEventListener("click", (Event) => {
		if (!isGameOver && !box.hasChildNodes() && isPhase1) {
			const imgElm = document.createElement("img");
			imgElm.src =
				currentPlayer === "0"
					? playerOneImages[currentPlayer]
					: playerTwoImages[currentPlayer - 1];
			imgElm.setAttribute("draggable", "true");
			imgElm.setAttribute("id", currentPlayer);

			imgElm.addEventListener("dragstart", handleImageDragStart);
			imgElm.addEventListener("dragend", handleImageDragEnd);
			imgElm.addEventListener("drag", handleImageDrag);

			box.appendChild(imgElm);
			currentPlayer === "0" ? playerOneImages.pop() : playerTwoImages.pop();
			// Functions
			checkPhaseOneDone();
			checkForWin();
			changeTurn();
			// }
		}
	});
	box.addEventListener("dragover", handleBoxDragOver);
	box.addEventListener("drop", handleBoxDrop);
	box.addEventListener("dragenter", handleBoxDragEnter);
	box.addEventListener("dragleave", handleBoxDragLeave);
});

function handleImageDragStart(Event) {
	// Event.preventDefault();
	boxDraggedFrom = Event.target.parentElement;
	currentImageDragged = Event.target;
	console.log("Drag started from box", boxDraggedFrom);
}
function handleImageDragEnd(Event) {
	console.log("Drag ended", Event);
}
function handleImageDrag(Event) {
	console.log("Dragging", Event);
}

function handleBoxDragOver(Event) {
	Event.preventDefault();
	console.log("Dragged over box");
}
function handleBoxDrop(Event) {
	console.log("Dropped", Event.target);
	boxDroppedInto = Event.target;
	if (!Event.target.classList.contains("box") || Event.target.hasChildNodes())
		return;
	console.log(allowedDropZonesID[boxDraggedFrom.id - 1]);
	if (
		allowedDropZonesID[boxDraggedFrom.id - 1].includes(
			Number(boxDroppedInto.id)
		)
	) {
		Event.target.appendChild(currentImageDragged);
	} else {
		return;
	}
}
function handleBoxDragEnter(Event) {
	console.log("Entered dropzone!", Event);
}
function handleBoxDragLeave(Event) {
	console.log("Left dropzone!", Event);
}

// Function Declarations
function checkForWin() {
	console.log("Function for winner!");
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
