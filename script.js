const input = document.getElementById("input-box");
const button = document.querySelector("button");
const address = document.getElementById("ipadress");
const locat = document.getElementById("location");
const timezone = document.getElementById("timezone");
const isps = document.getElementById("isp");

button.addEventListener("click", fetchData);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    fetchData(); // Call fetchData when Enter is pressed
  }
});

function fetchData() {
  let input_value = input.value;

  // Fetching the data from the API using the input value
  fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=at_JBIIBQFVIerzEP4U1XAMyZJIQQuVq&ipAddress=${input_value}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Input correct IPv4 or IPv6 address.");
      }
      return response.json();
    })
    .then((data) => {
      // Displaying the result
      address.textContent = `${data.ip}`;
      locat.textContent = `${data.location.country}`;
      timezone.textContent = `${data.location.timezone}`;
      isps.textContent = `${data.isp}`;
    })
    .catch((error) => {
      // Handling errors
      address.textContent = "Error";
      locat.textContent = error.message;
      timezone.textContent = "";
      isps.textContent = "";
    })
    .finally(() => {
      // Clear the input value after fetching
      input.value = "";
    });
}
