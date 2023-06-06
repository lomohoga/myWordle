let currentIndex = 0;
let currentRow = 0;
let mysteryWord = null;

function checkAnswer(){
    let activeRow = document.querySelectorAll("#main .row")[currentRow];
    let found = true;

    for(let i = 0; i < 5; i++){
        let letter = activeRow.querySelectorAll(".letter")[i];

        if(mysteryWord.includes(letter.innerHTML)){
            if(mysteryWord[i] === letter.innerHTML){
                letter.classList.add("correct");
            }
            else{
                letter.classList.add("misplaced");
                found = false;
            }
        }
        else{
            letter.classList.add("incorrect");
            found = false;
        }
    }

    return found;
}

window.addEventListener("keydown", (e) => {
    if(e.key === "Backspace"){
        if(currentIndex == 0){
            return;
        }

        let activeRow = document.querySelectorAll("#main .row")[currentRow];
        activeRow.querySelectorAll(".letter")[currentIndex - 1].innerHTML = "";
        currentIndex--;
    }

    if(e.key == "Enter"){
        if(currentIndex < 5){
            return;
        }

        if(checkAnswer()){
            document.querySelector("#message").innerHTML = "Congratulations. You got the word.";
            // Remove handler here
            return;
        }

        currentRow++;
        if(currentRow === 5){
            document.querySelector("#message").innerHTML = "The mystery word is " + mysteryWord;
            // Remove handler here
            return;
        }

        currentIndex = 0;
    }

    if(e.key.match(/^[a-zA-Z]{1}$/)){
        if(currentIndex == 5){
            return;
        }

        let activeRow = document.querySelectorAll("#main .row")[currentRow];
        activeRow.querySelectorAll(".letter")[currentIndex].innerHTML = e.key.toUpperCase();
        currentIndex++;
    }
})

window.addEventListener("load", () => {
    // Generate rows
    for(let a = 0; a < 5; a++){
        let newRow = document.createElement('div');
        newRow.classList.add('row');

        for(let b = 0; b < 5; b++){
            let newLetter = document.createElement('div');
            newLetter.classList.add('letter');

            newRow.appendChild(newLetter);
        }

        document.querySelector('#main').appendChild(newRow);
    }

    // Get mystery word
    let url = "https://gist.githubusercontent.com/dracos/dd0668f281e685bad51479e5acaadb93/raw/ca9018b32e963292473841fb55fd5a62176769b5/valid-wordle-words.txt";
    fetch(url)
    .then(d => d.text())
    .catch(() => {
        // Disable keypress here
        document.querySelector("#message").innerHTML = "Cannot get the word. Please check your Internet connection and try again.";
    })
    .then(response => {
        let words = response.split("\n");
        let index = Math.floor(Math.random() * words.length);
        mysteryWord = words[index].toUpperCase();
    })
})