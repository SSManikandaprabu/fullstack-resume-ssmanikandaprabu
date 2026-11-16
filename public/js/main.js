/**
 * S S MANIKANDA PRABU — FULL STACK RESUME
 * Interactive Client-Side Engine
 */
document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  // 1. Dark / Light Mode Switcher with LocalStorage Memory
  const themeToggle = document.getElementById("theme-toggle");
  const htmlRoot = document.documentElement;
  const savedTheme = localStorage.getItem("resume_theme") || "dark";
  htmlRoot.setAttribute("data-theme", savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      const current = htmlRoot.getAttribute("data-theme");
      const next = current === "dark" ? "light" : "dark";
      htmlRoot.setAttribute("data-theme", next);
      localStorage.setItem("resume_theme", next);
    });
  }

  // 2. Mobile Navigation Drawer
  const mobileToggle = document.getElementById("mobile-toggle");
  const mobileDrawer = document.getElementById("mobile-drawer");

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener("click", function () {
      mobileDrawer.classList.toggle("--open");
    });

    mobileDrawer.querySelectorAll(".drawer-link").forEach(function (link) {
      link.addEventListener("click", function () {
        mobileDrawer.classList.remove("--open");
      });
    });
  }

  // 3. Interactive Skills Filter Bar
  const filterBtns = document.querySelectorAll(".skill-filter-btn");
  const skillCards = document.querySelectorAll(".skill-category-card");

  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterBtns.forEach(b => b.classList.remove("--active"));
      btn.classList.add("--active");

      const category = btn.getAttribute("data-cat");
      skillCards.forEach(function (card) {
        if (category === "all" || card.getAttribute("data-category") === category) {
          card.style.display = "block";
          card.style.animation = "fadeInCard 0.4s ease forwards";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // 4. Contact Form Submission (Mock / API Endpoint)
  const contactForm = document.getElementById("contact-form");
  const responseMsg = document.getElementById("form-response-msg");
  const submitBtn = document.getElementById("form-submit-btn");

  if (contactForm && responseMsg) {
    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;

      const formData = {
        name: document.getElementById("form-name").value,
        email: document.getElementById("form-email").value,
        subject: document.getElementById("form-subject").value,
        message: document.getElementById("form-message").value
      };

      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        });
        const data = await res.json();

        responseMsg.className = "form-feedback success";
        responseMsg.style.display = "block";
        responseMsg.textContent = data.message || "Thank you! Your message has been sent successfully.";
        contactForm.reset();
      } catch (err) {
        // Fallback for purely static environments
        responseMsg.className = "form-feedback success";
        responseMsg.style.display = "block";
        responseMsg.textContent = "Thank you, " + formData.name + "! Your message has been received.";
        contactForm.reset();
      } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        setTimeout(() => {
          responseMsg.style.display = "none";
        }, 6000);
      }
    });
  }

  // 5. Sticky Header Shadow on Scroll
  const header = document.getElementById("header");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 30) {
      header.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.25)";
    } else {
      header.style.boxShadow = "none";
    }
  });
});
