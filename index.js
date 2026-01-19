function setFeedback(el, message, type = "ok") {
  if (!el) return; 
  el.textContent = message;
  el.classList.remove("ok", "error");
  el.classList.add(type);
}

document.addEventListener("DOMContentLoaded", () => {
  
  const naamForm = document.querySelector("#naamForm");
  const naamInput = document.querySelector("#naam");
  const naamFeedback = document.querySelector("#naamFeedback");

  if (naamForm && naamInput) {
    naamForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const naam = naamInput.value.trim();

      if (naam.length < 2) {
        setFeedback(naamFeedback, "Vul een geldige naam in (minimaal 2 tekens).", "error");
        return;
      }

      localStorage.setItem("naam", naam);
      setFeedback(naamFeedback, `Thanks ${naam}! Opgeslagen.`, "ok");
      naamForm.reset();
    });
  } else {
    console.warn("Naamformulier niet gevonden: check #naamForm en #naam in je HTML.");
  }

  
  const chillForm = document.querySelector("#chillForm");
  const chillFeedback = document.querySelector("#chillFeedback");

  if (chillForm) {
    chillForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const gekozen = chillForm.querySelector('input[name="chill"]:checked');

      if (!gekozen) {
        setFeedback(chillFeedback, "Kies een optie.", "error");
        return;
      }

      setFeedback(chillFeedback, `Gekozen: ${gekozen.value}`, "ok");
    });

    
    chillForm.addEventListener("change", (e) => {
      if (e.target && e.target.name === "chill") {
        setFeedback(chillFeedback, `Aangeklikt: ${e.target.value}`, "ok");
      }
    });
  } else {
    console.warn("Chill formulier niet gevonden: check #chillForm in je HTML.");
  }

  
  const emailForm = document.querySelector("#emailForm");
  const emailInput = document.querySelector("#email");
  const emailFeedback = document.querySelector("#emailFeedback");

  if (emailForm && emailInput) {
    emailForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = emailInput.value.trim();

      if (!email.includes("@") || !email.includes(".")) {
        setFeedback(emailFeedback, "Vul een geldig emailadres in.", "error");
        return;
      }

      localStorage.setItem("email", email);
      setFeedback(emailFeedback, `Email opgeslagen: ${email}`, "ok");
      emailForm.reset();
    });
  } else {
    console.warn("Emailformulier niet gevonden: check #emailForm en #email in je HTML.");
  }
});
