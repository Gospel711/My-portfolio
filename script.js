document.getElementById("contactForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent page refresh
    event.stopPropagation(); // Stop event bubbling
  
    // Get form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    const submitButton = document.querySelector("button[type='submit']");
  
    // Ensure no empty fields
    if (!name || !email || !message) {
      alert("Please fill out all fields before sending.");
      return;
    }
  
    // Disable the submit button temporarily to prevent multiple clicks
    submitButton.disabled = true;
  
    try {
      const SERVER_URL = "http://localhost:3000";
      const response = await fetch(SERVER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
  
      const result = await response.json();
      if (result.status === "Success") {
        alert("Your message was sent successfully!");
        document.getElementById("contactForm").reset(); // Clears form
      } else {
        alert("Error sending message: " + result.message);
      }
    } catch (error) {
      alert("Failed to send the message. Please try again.");
      console.error("Submission Error: ", error);
    } finally {
      // Re-enable submit button after request completes
      submitButton.disabled = false;
    }
  });