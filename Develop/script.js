$(function () {
  const hourStart = 6;
  const hourEnd = 19;
  // Display the current date in the header of the page
  const currentDate = dayjs().format("dddd, MMMM D, YYYY");
  const dateDisplay = document.getElementById("currentDay");
  dateDisplay.textContent = currentDate;

  // create the HTML for all the time blocks
  const container = document.querySelector(".container-fluid");

  for (let i = hourStart; i < hourEnd; i++) {
    const hour = i < 1 ? "12 AM" : i < 12 ? i + " AM" : i === 12 ? "12 PM" : (i - 12) + " PM";
    const hourId = "hour-" + i;
    const hourBlock = `
      <div id="${hourId}" class="row time-block">
        <div class="col-2 col-md-1 hour text-center py-3">${hour}</div>
        <textarea class="col-8 col-md-10 description" rows="3"></textarea>
        <button class="btn saveBtn col-2 col-md-1" aria-label="save">
          <i class="fas fa-save" aria-hidden="true"></i>
        </button>
      </div>
    `;
    container.insertAdjacentHTML("beforeend", hourBlock);
  }

  // Get the current hour using Day.js
  const currentHour = dayjs().hour();

  // Loop through each time-block element
  const timeBlocks = document.querySelectorAll(".time-block");
  timeBlocks.forEach(timeBlock => {
    const hourBlock = parseInt(timeBlock.getAttribute("id").split("-")[1]);

  // Compare the id to the current hour and add/remove classes as appropriate
  if (hourBlock < currentHour) {
    timeBlock.classList.add("past");
    timeBlock.classList.remove("present", "future");
  } else if (hourBlock === currentHour) {
    timeBlock.classList.add("present");
    timeBlock.classList.remove("past", "future");
  } else {
    timeBlock.classList.add("future");
    timeBlock.classList.remove("past", "present");
  }
});

// Get saved user input from local storage and set the values of the corresponding textarea elements
for (let i = hourStart; i < hourEnd; i++) {
  const hourId = "hour-" + i;
  const hourBlock = document.getElementById(hourId);
  const userInput = localStorage.getItem(hourId);
  if (userInput) {
    hourBlock.querySelector("textarea").value = userInput;
    console.log('userInput :>> ', userInput);
  }
}

  //Add a click listener to the save button in your JavaScript script,
  const saveBtns = document.querySelectorAll(".saveBtn");
  
  saveBtns.forEach(saveBtn => {
    saveBtn.addEventListener("click", function() {
      const hourBlock = this.parentNode.getAttribute("id");
      const userInput = this.previousElementSibling.value;
      localStorage.setItem(hourBlock, userInput);
      showSavedMessage();
    });
  });

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});

function showSavedMessage() {
  const savedMessage = document.getElementById("saved-message");
  savedMessage.textContent = 'Input saved in Local Storage!';
  savedMessage.style.display = "block";
  savedMessage.classList.add("blink");
  setTimeout(() => {
    savedMessage.classList.remove("blink");
    savedMessage.style.display = "none";
  }, 2400);
}
