document.addEventListener("DOMContentLoaded", function () {
	const display = document.getElementById("display");
	const keyboard = document.getElementById("keyboard");
	const spaceButton = document.getElementById("space");
	const backspaceButton = document.getElementById("backspace");
	const enterButton = document.getElementById("enter");
	const synth = window.speechSynthesis;

	let text = "";

	const letters = [
		"A",
		"B",
		"V",
		"G",
		"D",
		"Đ",
		"E",
		"Ž",
		"Z",
		"I",
		"J",
		"K",
		"L",
		"Lj",
		"M",
		"N",
		"Nj",
		"O",
		"P",
		"R",
		"S",
		"T",
		"Ć",
		"U",
		"F",
		"H",
		"C",
		"Č",
		"Dž",
		"Š",
	];

	// Kreiranje dugmića za slova
	letters.forEach((letter) => {
		const button = document.createElement("button");
		button.textContent = letter;
		button.classList.add("key");
		button.addEventListener("click", () => {
			text += letter;
			display.textContent = text;
			talk(button.innerText);
		});
		keyboard.appendChild(button);
	});

	// Dugme SPACE
	spaceButton.addEventListener("click", () => {
		text += " ";
		display.textContent = text;
	});

	// Dugme BACKSPACE
	backspaceButton.addEventListener("click", () => {
		text = text.slice(0, -1);
		display.textContent = text;
	});

	// Dugme ENTER
	enterButton.addEventListener("click", () => {
		talk(text);
		display.textContent = "";
		text = "";
	});

	// Dugme ENTER (čitanje teksta)
	function talk(text) {
		console.log("Speaking:", text);
		responsiveVoice.speak(text, "Serbian Male");
	}
});

//get all lang

var langList = document.getElementById("langList");
var text =
	"<table border=1><tr><th>Default<th>Language<th>Local<th>Name<th>URI</tr>";
// Get voices; add to table markup
function loadVoices() {
	var voices = speechSynthesis.getVoices();
	voices.forEach(function (voice, i) {
		// Add all details to table
		text +=
			"<tr><td>" +
			voice.default +
			"<td>" +
			voice.lang +
			"<td>" +
			voice.localService +
			"<td>" +
			voice.name +
			"<td>" +
			voice.voiceURI;
	});
}
loadVoices();
langList.innerHTML = text;
// Chrome loads voices asynchronously.
window.speechSynthesis.onvoiceschanged = function (e) {
	loadVoices();
	langList.innerHTML = text;
};
