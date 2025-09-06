const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav');

hamburger.addEventListener('click', () => {
    nav.classList.toggle('active');
    hamburger.textContent = nav.classList.contains('active') ? '✖' : '☰';
});

const cy = document.getElementById("currentyear");
if (cy) cy.textContent = new Date().getFullYear();

const lm = document.getElementById("lastModified");
if (lm) lm.textContent = `Last Modification: ${document.lastModified}`;
