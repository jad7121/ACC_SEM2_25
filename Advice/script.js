document.getElementsByClassName("fetchAdvice")[0].addEventListener("click", async function() {
  try {
    const response = await fetch("https://api.adviceslip.com/advice");
    const data = await response.json();
    document.getElementsByClassName("topic")[0].textContent = `Advice #${data.slip.id}`;
    document.getElementsByClassName("content")[0].textContent = `"${data.slip.advice}"`;

  } 
  catch (error) {
    document.writeln("Error fetching advice:", error);
  }

});
  