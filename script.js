/* ============================================
   LEVEL 4: FRONT-END INTERACTION
   ============================================
   This file makes the page RESPOND to user actions.
   It only runs AFTER the browser has built the full page
   (that's why we linked it at the bottom of <body>).
*/


/* ---------- Task 1: Change "Book Ticket" button appearance when clicked ---------- */

// Step 1: Find ALL elements with class "book-btn" on the page.
// querySelectorAll returns a LIST of matching elements (there are 3 buttons).
const bookButtons = document.querySelectorAll('.book-btn');

// Step 2: Loop through each button and attach a click listener to it.
// forEach runs the given function ONCE for every button in the list.
bookButtons.forEach(function (button) {

  button.addEventListener('click', function () {
    // addEventListener('click', ...) means:
    // "when this exact button is clicked, run this function"

    // Toggle the "selected" class on/off each time it's clicked.
    // classList.toggle() ADDS the class if it's missing, REMOVES it if present.
    button.classList.toggle('selected');

    if (button.classList.contains('selected')) {
      button.textContent = 'Selected ✓';
      // .textContent changes the visible text inside the button
    } else {
      button.textContent = 'Book Ticket';
    }

    // Bonus: also update the Event Details section to match
    // WHICH card this button belongs to.
    // .closest('.event-card') walks UP the HTML tree from the button
    // until it finds the nearest parent with class "event-card".
    const card = button.closest('.event-card');
    const eventName = card.getAttribute('data-event');
    // getAttribute reads the data-event="..." value we set in the HTML

    updateEventDetails(eventName, card);
  });
});


/* ---------- Helper function: updates the Event Details box ---------- */

function updateEventDetails(eventName, card) {
  // We read the date/location/price straight from the clicked card,
  // so we don't have to repeat that data in JavaScript too.
  const date = card.querySelector('.event-date').textContent;
  const location = card.querySelector('.event-location').textContent;
  const price = card.querySelector('.event-price').textContent;

  const detailsBox = document.getElementById('details-box');

  // .innerHTML replaces everything INSIDE the box with new HTML.
  // (We use innerHTML here instead of textContent because we want
  // the <strong> tags to actually render as bold, not as plain text.)
  detailsBox.innerHTML = `
    <h3>${eventName}</h3>
    <p><strong>Venue / Date:</strong> ${location} — ${date}</p>
    <p><strong>Ticket Price:</strong> ${price}</p>
  `;
  // The ${...} syntax is called a "template literal" — it lets us
  // insert variable values directly into a string.
}


/* ---------- Task 2: Show/Hide the Event Details section ---------- */

const toggleBtn = document.getElementById('toggle-details-btn');
const detailsBox = document.getElementById('details-box');

toggleBtn.addEventListener('click', function () {
  // We check the CURRENT display style to decide what to do next.
  const isHidden = detailsBox.style.display === 'none';

  if (isHidden) {
    detailsBox.style.display = 'block';
    toggleBtn.textContent = 'Hide Details';
  } else {
    detailsBox.style.display = 'none';
    toggleBtn.textContent = 'Show Details';
  }
});


/* ---------- Task 3 & 4: Booking form + validation ---------- */

const bookingForm = document.getElementById('booking-form');
const formMessage = document.getElementById('form-message');

bookingForm.addEventListener('submit', function (event) {
  // 'submit' fires when the user clicks the "Confirm Booking" button
  // (since that button has type="submit" inside a <form>).

  event.preventDefault();
  // preventDefault() STOPS the browser's default behavior, which would
  // normally reload the page. We want to handle the submission ourselves.

  // Step 1: Grab the current values typed into each field.
  const name = document.getElementById('name').value.trim();
  // .value reads whatever the user typed. .trim() removes accidental
  // leading/trailing spaces (e.g. someone typing " Priya " by mistake).
  const email = document.getElementById('email').value.trim();
  const selectedEvent = document.getElementById('event-select').value;
  const ticketCount = document.getElementById('ticket-count').value;

  // Step 2: Validate — check that nothing required is empty.
  if (name === '' || email === '' || selectedEvent === '' || ticketCount === '') {
    formMessage.textContent = 'Please fill in all fields before booking.';
    formMessage.className = 'form-message-error';
    // .className REPLACES all classes on the element with this new one —
    // used here to swap the error/success color styling.
    return;
    // 'return' stops the function here — we don't want to show a
    // success message if validation failed.
  }

  // Step 3 (bonus check): a very basic email sanity check.
  if (!email.includes('@')) {
    formMessage.textContent = 'Please enter a valid email address.';
    formMessage.className = 'form-message-error';
    return;
  }

  // Step 4: If we reach this point, everything is valid.
  formMessage.textContent =
    `Booking confirmed for ${name} — ${ticketCount} ticket(s) for "${selectedEvent}".`;
  formMessage.className = 'form-message-success';

  bookingForm.reset();
  // .reset() clears all form fields back to their default/empty state,
  // ready for a new booking.
});
