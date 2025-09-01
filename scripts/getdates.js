// Current year
const cy = document.getElementById("currentyear");
if (cy) cy.textContent = new Date().getFullYear();

// Last modified
const lm = document.getElementById("lastModified");
if (lm) lm.textContent = `Last Modification: ${document.lastModified}`;