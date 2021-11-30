// QUERY SELECTION
const displayQuote = document.querySelector("#quote");
const inputQuote = document.querySelector("#inputQuote");
const addInputBtn = document.querySelector("#addInput");
const cancelInputBtn = document.querySelector("#cancelInput")
const nextQuoteBtn = document.querySelector("#nextQuote");
const addQuoteBtn = document.querySelector("#addQuote");





// VARIABLES
const myQuotes = [];
const myQuotesL = "myQuotes";

const quotesArray =
    ['"If you want to achieve greatness stop asking for permission."',
        '"Things work out best for those who make the best of how things work out."',
        '"To live a creative life, we must lose our fear of being wrong."',
        '"If you are not willing to risk the usual you will have to settle for the ordinary."',
        '"Trust because you are willing to accept the risk, not because it\'s safe or certain."',
        '"Opportunities don\'t happen, you create them."',
        '"All our dreams can come true if we have the courage to pursue them."',
        '"Good things come to people who wait, but better things come to those who go out and get them."',
        '"If you do what you always did, you will get what you always got."',
        '"Success is walking from failure to failure with no loss of enthusiasm."'];




// FUNCTIONS
const toggleHidden = (element) => {
    element.classList.toggle("hidden");
}

const toggleReturn = () => {
    // Show/Hide: Input, Add, Cancel
    toggleHidden(inputQuote);
    toggleHidden(addInputBtn);
    toggleHidden(cancelInputBtn);
    // Hide/Show: Next , Add
    toggleHidden(nextQuoteBtn);
    toggleHidden(addQuoteBtn);
}





// INITIALIZATION
if (JSON.parse(localStorage.getItem(myQuotesL)) === null) {
    localStorage.setItem(myQuotesL, JSON.stringify(myQuotes));
}
else {
    for (let i = 0; i < JSON.parse(localStorage.getItem(myQuotesL)).length; i++) {
        myQuotes.push(JSON.parse(localStorage.getItem(myQuotesL))[i]);
    }
}

// Displays a random quote initially
let rand = Math.floor(Math.random() * quotesArray.length);
displayQuote.textContent = quotesArray[rand];

addQuoteBtn.addEventListener("click", function (e) {
    toggleReturn();
});

addInputBtn.addEventListener("click", function () {
    if (inputQuote.value !== "") {
        // Changes displayed quote
        displayQuote.textContent = `"${inputQuote.value}"`;
        // Adds quote to local Storage
        myQuotes.push(`"${inputQuote.value}"`);
        localStorage.setItem(myQuotesL, JSON.stringify(myQuotes));
        toggleReturn();
        // Resets input
        inputQuote.value = "";
    }
});

cancelInputBtn.addEventListener("click", function () {
    toggleReturn();
});

nextQuoteBtn.addEventListener("click", function () {
    // If myQuotes is empty
    if (myQuotes.length === 0) {
        // Displays another random quote from quotesArray
        let rand = Math.floor(Math.random() * quotesArray.length);
        displayQuote.textContent = quotesArray[rand];
    }
    // If myQuotes has stored a quote
    else {
        let pick = Math.random();
        // Displays quote from quotesArray
        if (pick < 0.5) {
            let rand = Math.floor(Math.random() * quotesArray.length);
            displayQuote.textContent = quotesArray[rand];
        }
        // Displays quote from myQuotes
        else {
            let rand = Math.floor(Math.random() * myQuotes.length);
            displayQuote.textContent = myQuotes[rand];
        }
    }
});
