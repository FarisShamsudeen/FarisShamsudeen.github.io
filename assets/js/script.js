'use strict';

// preloader variables
const preloader = document.querySelector("[data-preloader]");

window.addEventListener("load", function() {
  if (preloader) {
    preloader.classList.add("loaded");
  }
});

document.addEventListener("DOMContentLoaded", function() {

  // element toggle function
  const elementToggleFunc = function(elem) { elem.classList.toggle("active"); }

  // sidebar variables
  const sidebar = document.querySelector("[data-sidebar]");
  const sidebarBtn = document.querySelector("[data-sidebar-btn]");

  // sidebar toggle functionality for mobile
  if (sidebarBtn) {
    sidebarBtn.addEventListener("click", function() { elementToggleFunc(sidebar); });
  }

  function initInfiniteScroll(selector, speed = 0.3) {
    const list = document.querySelector(selector);
    if (!list) return;

    // Get children (skip spinner etc.)
    const items = Array.from(list.children);

    // Clone all items once for looping effect
    items.forEach(item => list.appendChild(item.cloneNode(true)));

    // Variables
    let isHovered = false;
    let position = 0;

    list.addEventListener("mouseenter", () => (isHovered = true));
    list.addEventListener("mouseleave", () => (isHovered = false));

    // Smooth infinite scroll loop
    function animate() {
      if (!isHovered) {
        position += speed;
        // Scroll to the new position
        list.scrollLeft = position;

        // Reset position seamlessly when we reach half the scroll width
        if (position >= list.scrollWidth / 2) position = 0;
        if (position <= 0) position = list.scrollWidth / 2;
      }

      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }

  initInfiniteScroll(".myoffers-list", -0.6); // scroll leftwards
  initInfiniteScroll(".mytools-list", 0.9);   // scroll rightwards


  // custom select variables
  const select = document.querySelector("[data-select]");
  const selectItems = document.querySelectorAll("[data-select-item]");
  const selectValue = document.querySelector("[data-selecct-value]");
  const filterBtn = document.querySelectorAll("[data-filter-btn]");

  if (select) {
    select.addEventListener("click", function() { elementToggleFunc(this); });
  }

  // add event in all select items
  for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function() {
      let selectedValue = this.innerText.toLowerCase();
      if (selectValue) {
        selectValue.innerText = this.innerText;
      }
      elementToggleFunc(select);
      filterFunc(selectedValue);
    });
  }

  // filter variables
  const filterItems = document.querySelectorAll("[data-filter-item]");

  const filterFunc = function(selectedValue) {
    for (let i = 0; i < filterItems.length; i++) {
      if (selectedValue === "all") {
        filterItems[i].classList.add("active");
      } else if (selectedValue === filterItems[i].dataset.category) {
        filterItems[i].classList.add("active");
      } else {
        filterItems[i].classList.remove("active");
      }
    }
  }

  // add event in all filter button items for large screen
  if (filterBtn.length > 0) {
    let lastClickedBtn = filterBtn[0];
    for (let i = 0; i < filterBtn.length; i++) {
      filterBtn[i].addEventListener("click", function() {
        let selectedValue = this.innerText.toLowerCase();
        if (selectValue) {
          selectValue.innerText = this.innerText;
        }
        filterFunc(selectedValue);
        lastClickedBtn.classList.remove("active");
        this.classList.add("active");
        lastClickedBtn = this;
      });
    }
  }









  const form = document.querySelector("[data-form]");
  const inputs = Array.from(document.querySelectorAll("[data-form-input]"));
  const submitBtn = document.querySelector("[data-form-btn]");
  const ACCESS_KEY = "c65e70e2-c4fb-4b2a-9077-26b5545beaf6";

  // Create or get error message below each input
  function getErrorNode(input) {
    let err = input.parentElement.querySelector(".input-error");
    if (!err) {
      err = document.createElement("small");
      err.className = "input-error";
      input.parentElement.appendChild(err);
    }
    return err;
  }

  // Validation logic
  function validateField(input) {
    const name = input.name;
    const value = input.value.trim();
    const err = getErrorNode(input);
    let valid = true;
    let message = "";

    if (name === "fullname" || name === "name") {
      if (!value) {
        message = "Full name is required.";
        valid = false;
      } else if (value.length < 2) {
        message = "Enter at least 2 characters.";
        valid = false;
      }
    }

    if (name === "email") {
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) {
        message = "Email is required.";
        valid = false;
      } else if (!emailRe.test(value)) {
        message = "Enter a valid email address.";
        valid = false;
      }
    }

    if (name === "subject") {
      if (!value) {
        message = "Subject is required.";
        valid = false;
      } else if (value.length < 3) {
        message = "Subject must be at least 3 characters.";
        valid = false;
      }
    }

    if (name === "message") {
      if (!value) {
        message = "Message is required.";
        valid = false;
      } else if (value.length < 10) {
        message = "Message must be at least 10 characters.";
        valid = false;
      }
    }

    // Apply classes + checkmark icon
    const icon = input.parentElement.querySelector(".valid-icon");
    if (valid) {
      input.classList.remove("invalid");
      input.classList.add("valid");
      err.textContent = "";
      if (!icon) {
        const tick = document.createElement("span");
        tick.className = "valid-icon";
        tick.innerHTML = `<ion-icon name="checkmark-circle"></ion-icon>`; // ✓
        input.parentElement.appendChild(tick);
      }
    } else {
      input.classList.remove("valid");
      input.classList.add("invalid");
      err.textContent = message;
      if (icon) icon.remove();
    }

    return valid;
  }

  // Validate all fields
  function isFormValid() {
    return inputs.every((i) => validateField(i));
  }

  // Update submit button enable/disable
  function updateButtonState() {
    if (isFormValid()) submitBtn.removeAttribute("disabled");
    else submitBtn.setAttribute("disabled", "");
  }

  // Live validation
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      validateField(input);
      updateButtonState();
    });
    input.addEventListener("blur", () => validateField(input));
  });

  // Confetti 🎉
  // 🎉 Confetti animation (fixed version)
  function launchConfetti() {
    const confettiCount = 100;
    const container = document.createElement("div");
    container.className = "confetti-container";
    document.body.appendChild(container);

    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement("div");
      confetti.className = "confetti";

      // Random positions and colors
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 60%)`;

      // Random delay and duration
      confetti.style.animationDelay = `${Math.random() * 1.5}s`;
      confetti.style.animationDuration = `${1.5 + Math.random() * 1.5}s`;

      // Random size
      const size = 6 + Math.random() * 6;
      confetti.style.width = `${size}px`;
      confetti.style.height = `${size * 1.4}px`;

      container.appendChild(confetti);
    }

    // Remove container after animation
    setTimeout(() => container.remove(), 4000);
  }

  // Success/Error messages
  function showMessage(text, type = "success") {
    let box = document.querySelector(".form-message");
    if (!box) {
      box = document.createElement("div");
      box.className = "form-message";
      form.parentElement.appendChild(box);
    }

    box.textContent = text;
    box.classList.remove("success", "error", "visible");
    box.classList.add(type, "visible");
    setTimeout(() => box.classList.remove("visible"), 4000);
  }

  // Submit form
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      const firstInvalid = inputs.find((i) => !validateField(i));
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    submitBtn.setAttribute("disabled", "");
    const original = submitBtn.innerHTML;
    submitBtn.innerHTML = `<span class="btn-spinner"></span> Sending...`;

    const formData = new FormData();
    formData.append("access_key", ACCESS_KEY);
    formData.append("name", form.fullname.value.trim());
    formData.append("email", form.email.value.trim());
    formData.append("subject", form.subject.value.trim());
    formData.append("message", form.message.value.trim());

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (response.ok && data.success) {
        // SUCCESS CASE
        launchConfetti(); // 🎉 Show confetti only
        form.reset();
        inputs.forEach((i) => i.classList.remove("valid", "invalid"));
        document.querySelectorAll(".valid-icon").forEach((el) => el.remove());

        // Update button to show "Sent"
        submitBtn.innerHTML = `<ion-icon name="checkmark-circle"></ion-icon><span>Sent Successfully</span>`;

        // Re-enable button after 8 seconds
        setTimeout(() => {
          submitBtn.innerHTML = original;
          updateButtonState();
        }, 8000);
      } else {
        // ❌ FAIL CASE (show error)
        showMessage("⚠️ Failed to send message. Try again.", "error");
        submitBtn.innerHTML = original;
        updateButtonState();
      }
    } catch (err) {
      console.error(err);
      showMessage("❌ Network error! Please try again later.", "error");
      submitBtn.innerHTML = original;
      updateButtonState();
    }
  });





  // page navigation variables
  const navigationLinks = document.querySelectorAll("[data-nav-link]");
  const pages = document.querySelectorAll("[data-page]");

  // add event to all nav link
  for (let i = 0; i < navigationLinks.length; i++) {
    navigationLinks[i].addEventListener("click", function() {

      for (let i = 0; i < pages.length; i++) {
        if (this.querySelector('span').innerHTML.toLowerCase() === pages[i].dataset.page) {
          pages[i].classList.add("active");
          navigationLinks[i].classList.add("active");
          window.scrollTo(0, 0);
        } else {
          pages[i].classList.remove("active");
          navigationLinks[i].classList.remove("active");
        }
      }

    });
  }


  // blog modal variables
  const blogPostLinks = document.querySelectorAll(".blog-post-link");
  const blogModalContainer = document.querySelector("[data-blog-modal-container]");
  const blogModalCloseBtn = document.querySelector("[data-blog-modal-close-btn]");
  const blogOverlay = document.querySelector("[data-blog-overlay]");

  // blog modal variables
  const blogModalImg = document.querySelector("[data-blog-modal-img]");
  const blogModalTitle = document.querySelector("[data-blog-modal-title]");
  const blogModalTime = document.querySelector("[data-blog-modal-time]");
  const blogModalText = document.querySelector("[data-blog-modal-text]");

  // blog modal toggle function
  const blogModalFunc = function() {
    if (blogModalContainer) {
      blogModalContainer.classList.toggle("active");
    }
    if (blogOverlay) {
      blogOverlay.classList.toggle("active");
    }
  }

  // add click event to all blog post links
  for (let i = 0; i < blogPostLinks.length; i++) {
    blogPostLinks[i].addEventListener("click", function(event) {
      event.preventDefault();
      const blogPostId = this.dataset.blogPostId;
      const blogPostItem = this.parentElement;
      const blogPostTitle = blogPostItem.querySelector(".blog-item-title").innerHTML;
      const blogPostTime = blogPostItem.querySelector("time").innerHTML;
      const blogPostText = blogPostItem.querySelector(".blog-text").innerHTML;
      const blogPostImgSrc = blogPostItem.querySelector(".blog-banner-box img").src;
      const blogPostImgAlt = blogPostItem.querySelector(".blog-banner-box img").alt;

      if (blogModalTitle) {
        blogModalTitle.innerHTML = blogPostTitle;
      }
      if (blogModalTime) {
        blogModalTime.innerHTML = blogPostTime;
      }
      if (blogModalText) {
        blogModalText.innerHTML = `<p>${blogPostText}</p>`;
      }
      if (blogModalImg) {
        blogModalImg.src = blogPostImgSrc;
        blogModalImg.alt = blogPostImgAlt;
      }

      blogModalFunc();
    });
  }

  // add click event to blog modal close button
  if (blogModalCloseBtn) {
    blogModalCloseBtn.addEventListener("click", blogModalFunc);
  }
  if (blogOverlay) {
    blogOverlay.addEventListener("click", blogModalFunc);
  }

  // back to top button
  const backTopBtn = document.querySelector("[data-back-to-top]");

  window.addEventListener("scroll", function() {
    if (window.scrollY >= 100) {
      backTopBtn.classList.add("active");
    } else {
      backTopBtn.classList.remove("active");
    }
  });

  if (backTopBtn) {
    backTopBtn.addEventListener("click", function() {
      window.scrollTo(0, 0);
    });
  }

});
