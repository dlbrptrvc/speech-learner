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

	enterButton.addEventListener("click", () => {
		display.textContent = "";
		talk(text);
		text = "";
	});

	// Dugme ENTER (čitanje teksta)
	function talk(text) {
		console.log("Speaking:", text);
		var to_speak = new SpeechSynthesisUtterance(text);
		// window.speechSynthesis.speak(to_speak);
		// console.log("Setting language");
		to_speak.lang = "ru-RU";
		synth.speak(to_speak);
		// Run the function
		textToSpeech();
	}
});

async function textToSpeech() {
	try {
		// Send the request to generate speech
		const response = await fetch(
			"https://lambda.us-east-1.amazonaws.com/2015-03-31/functions/arn%3Aaws%3Alambda%3Aus-east-1%3A284375238109%3Afunction%3Ankprod-ProjectRequestStack-ProjectRequestFunction-8IEOMS7LNGLH/invocations",
			{
				credentials: "include",
				headers: {
					"User-Agent":
						"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:136.0) Gecko/20100101 Firefox/136.0",
					Accept: "*/*",
					"Accept-Language": "en-US,en;q=0.5",
					"amz-sdk-invocation-id": "ad2a4a34-4935-4ace-aecd-73336609f38b",
					"amz-sdk-request": "attempt=1; max=4",
					authorization:
						"AWS4-HMAC-SHA256 Credential=ASIAUENQVYXOQEN3TEC5/20250316/us-east-1/lambda/aws4_request, SignedHeaders=amz-sdk-invocation-id;amz-sdk-request;content-length;content-type;host;x-amz-content-sha256;x-amz-date;x-amz-invocation-type;x-amz-security-token;x-amz-user-agent, Signature=2f37e300f8f6ed675ead1547fbd06fa05b3f49c75d32075a24cb079ea889ef0b",
					"content-type": "application/octet-stream",
					"x-amz-content-sha256":
						"3f4eb7913c80453c3be0b4b50482ba12780f13f383174b726f186bd418851260",
					"x-amz-date": "20250316T000139Z",
					"x-amz-invocation-type": "RequestResponse",
					"x-amz-security-token": "YOUR_SECURITY_TOKEN_HERE",
					"x-amz-user-agent":
						"aws-sdk-js/3.588.0 ua/2.0 os/Windows#NT-10.0 lang/js md/browser#Firefox_136.0 api/lambda#3.588.0",
				},
				body: JSON.stringify({
					request: "update",
					projectId: "551febdf-204a-4759-ac03-ebe761b47bf7",
					properties: {
						videoSettings: {
							voice: "lazar-latin",
							"voice-volume": "normal",
							"voice-speed": "normal",
							format: "m4a",
							packaging: "single-audio",
							background: "",
						},
						description: "Ja sam rođen u cvetu livada",
						scriptFileName: "yTseEw0LEmOCuQrQcaXb5p1CuxmS4jzS.txt",
					},
				}),
				method: "POST",
				mode: "cors",
			}
		);

		if (!response.ok) {
			throw new Error(
				`Error in text-to-speech request: ${response.statusText}`
			);
		}

		console.log("Speech synthesis request sent successfully");

		// Retrieve the generated audio file URL
		const audioResponse = await fetch(
			"https://nkprod-coredatastack-pa7jx42xiwhf-tasksbucket-13qb6gn1l5ooi.s3.us-east-1.amazonaws.com/84f51b54-f72f-4424-ae9c-46b62d8f063e/status?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAUENQVYXO364OQ57F%2F20250316%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250316T000142Z&X-Amz-Expires=86400&X-Amz-Signature=e34c08939c62f82355281b3052c8a4d3480d27d8aa27b81b7d14e120492d270f&X-Amz-SignedHeaders=host&x-id=GetObject",
			{
				credentials: "omit",
				headers: {
					"User-Agent":
						"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:136.0) Gecko/20100101 Firefox/136.0",
					Accept: "*/*",
					"Accept-Language": "en-US,en;q=0.5",
				},
				method: "GET",
				mode: "cors",
			}
		);

		if (!audioResponse.ok) {
			throw new Error(`Error fetching audio: ${audioResponse.statusText}`);
		}

		console.log("Audio file retrieved successfully");

		// Convert response to a blob
		const audioBlob = await audioResponse.blob();
		const audioUrl = URL.createObjectURL(audioBlob);

		// Play the audio
		const audio = new Audio(audioUrl);
		audio
			.play()
			.then(() => {
				console.log("Playing audio...");
			})
			.catch((error) => {
				console.error("Error playing audio:", error);
			});
	} catch (error) {
		console.error("Error:", error);
	}
}
