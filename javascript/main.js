//objects for each language character
let charArr = [{ char: "ა" }, { char: "ბ" }, { char: "გ" }, { char: "დ" }, { char: "ე" }, { char: "ვ" }, { char: "ზ" }, { char: "თ" }, { char: "ი" },
{ char: "კ" }, { char: "ლ" }, { char: "მ" }, { char: "ნ" }, { char: "ო" }, { char: "პ" }, { char: "ჟ" }, { char: "რ" }, { char: "ს" }, { char: "ტ" },
{ char: "უ" }, { char: "ფ" }, { char: "ქ" }, { char: "ღ" }, { char: "ყ" }, { char: "შ" }, { char: "ჩ" }, { char: "ც" }, { char: "ძ" }, { char: "წ" },
{ char: "ჭ" }, { char: "ხ" }, { char: "ჯ" }, { char: "ჰ" }]

//build checkbox markup for each object in arr
let charCheckBoxesArr = charArr.map(el => (
	`<div class="check-box">
	<input type="checkbox" class='lettersToPracticeCheckbox' id="${el.char}checkbox" value="${el.char}">
	<label for="${el.char}">${el.char}</label>
	</div>`
))

//dump them all on the page, without the commas
document.getElementById("checkboxes").innerHTML = charCheckBoxesArr.join(" ");

let guessedChar = "";
let currentCorrectAudioLetter = undefined;

function checkAnswer(val) {

	let yes = document.getElementById("thumbsUp");
	let no = document.getElementById("thumbsDown");

	function yesAnim() {
		georgianYes.play();
		yes.style.opacity = 1;
	}

	function noAnim() {
		georgianNo.play();
		no.style.opacity = 1;
	}

	function hide(el) {
		el.style.opacity = 0;
	}

	if (currentCorrectAudioLetter !== undefined) {
		if (currentCorrectAudioLetter.name === val) {
			yesAnim();
			setTimeout(function () { hide(yes) }, 2000);
		} else {
			noAnim();
			setTimeout(function () { hide(no) }, 2000);
		}
	}
}

//build audio objects
let soundsArr = charArr.map(el => (
	{
		name: `${el.char}`,
		sound: document.createElement("audio"),
		markup: `<button type="button" class="submitButton" id="${el.char}button" value="${el.char}" onclick="checkAnswer('${el.char}')">
		<label for="${el.char}">${el.char}</button>`
	}
))

//apply correct .wav
for (let i = 0; i < soundsArr.length; i++) {
	soundsArr[i].sound.src = `Audio/${soundsArr[i].name}.wav`
	soundsArr[i].sound.name = `${soundsArr[i].name}`
}

//possibe char sounds
let checkedChars = [];

let georgianYes = document.createElement('audio');
georgianYes.src = 'Audio/Georgian yes.wav';
let georgianNo = document.createElement('audio');
georgianNo.src = 'Audio/Georgian no.wav';

function getRndInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

let checkboxClickFunction = function handleCheckBoxClick(e) {
	e.stopPropagation();
	console.log(e.currentTarget.type);

	if (this.checked === true) {
		for (let i = 0; i < soundsArr.length; i++) {
			if (this.value === soundsArr[i].name) {
				checkedChars.push({
					name: soundsArr[i].name, sound: soundsArr[i].sound,
					markup: soundsArr[i].markup
				});
			}
		}
	} else {
		for (let i = 0; i < checkedChars.length; i++) {
			if (this.value === checkedChars[i].name) {
				checkedChars.splice(i, 1);
			}
		}
	}
	document.getElementById("answers").innerHTML = checkedChars.map(el => el.markup).join(" ")
	console.log(checkedChars)
}

var arrayOfAllCheckboxes = document.getElementsByClassName('lettersToPracticeCheckbox');
for (let i = 0; i < arrayOfAllCheckboxes.length; i++) {
	arrayOfAllCheckboxes[i].onclick = checkboxClickFunction;
}

function handlePlayButtonClick() {
	randomAudioLetterIndex = getRndInteger(0, checkedChars.length - 1);

	currentCorrectAudioLetter = checkedChars[randomAudioLetterIndex];
	console.log(currentCorrectAudioLetter)
	currentCorrectAudioLetter.sound.play();
}


