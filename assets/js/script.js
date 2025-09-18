'use strict';

// preloader variables
const preloader = document.querySelector("[data-preloader]");

window.addEventListener("load", function () {
  if (preloader) {
    preloader.classList.add("loaded");
  }
});

document.addEventListener("DOMContentLoaded", function() {

  // element toggle function
  const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

  // sidebar variables
  const sidebar = document.querySelector("[data-sidebar]");
  const sidebarBtn = document.querySelector("[data-sidebar-btn]");

  // sidebar toggle functionality for mobile
  if (sidebarBtn) {
    sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
  }

  // // testimonials variables
  // const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
  // const modalContainer = document.querySelector("[data-modal-container]");
  // const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
  // const overlay = document.querySelector("[data-overlay]");
  //
  // // modal variable
  // const modalImg = document.querySelector("[data-modal-img]");
  // const modalTitle = document.querySelector("[data-modal-title]");
  // const modalText = document.querySelector("[data-modal-text]");
  //
  // // modal toggle function
  // const testimonialsModalFunc = function () {
  //   if (modalContainer) {
  //     modalContainer.classList.toggle("active");
  //   }
  //   if (overlay) {
  //     overlay.classList.toggle("active");
  //   }
  // }
  //
  // // add click event to all modal items
  // for (let i = 0; i < testimonialsItem.length; i++) {
  //   testimonialsItem[i].addEventListener("click", function () {
  //     if (modalImg) {
  //       modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
  //       modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
  //     }
  //     if (modalTitle) {
  //       modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
  //     }
  //     if (modalText) {
  //       modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
  //     }
  //     testimonialsModalFunc();
  //   });
  // }
  //
  // // add click event to modal close button
  // if (modalCloseBtn) {
  //   modalCloseBtn.addEventListener("click", testimonialsModalFunc);
  // }
  // if (overlay) {
  //   overlay.addEventListener("click", testimonialsModalFunc);
  // }
  //
  // custom select variables
  const select = document.querySelector("[data-select]");
  const selectItems = document.querySelectorAll("[data-select-item]");
  const selectValue = document.querySelector("[data-selecct-value]");
  const filterBtn = document.querySelectorAll("[data-filter-btn]");

  if (select) {
    select.addEventListener("click", function () { elementToggleFunc(this); });
  }

  // add event in all select items
  for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function () {
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

  const filterFunc = function (selectedValue) {
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
      filterBtn[i].addEventListener("click", function () {
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

  // contact form variables
  const form = document.querySelector("[data-form]");
  const formInputs = document.querySelectorAll("[data-form-input]");
  const formBtn = document.querySelector("[data-form-btn]");

  if (form) {
    // add event to all form input field
    for (let i = 0; i < formInputs.length; i++) {
      formInputs[i].addEventListener("input", function () {
        // check form validation
        if (form.checkValidity()) {
          formBtn.removeAttribute("disabled");
        } else {
          formBtn.setAttribute("disabled", "");
        }
      });
    }
  }

  // page navigation variables
  const navigationLinks = document.querySelectorAll("[data-nav-link]");
  const pages = document.querySelectorAll("[data-page]");

  // add event to all nav link
  for (let i = 0; i < navigationLinks.length; i++) {
    navigationLinks[i].addEventListener("click", function () {

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

  // portfolio modal variables
  const projectLinks = document.querySelectorAll(".project-link");

  // modal toggle function
  const portfolioModalFunc = function () {
    modalContainer.classList.toggle("active");
    overlay.classList.toggle("active");
  }

  // add click event to all project links
  for (let i = 0; i < projectLinks.length; i++) {
    projectLinks[i].addEventListener("click", function (event) {
      event.preventDefault();
      const projectId = this.dataset.projectId;
      const projectItem = this.parentElement;
      const projectTitle = projectItem.querySelector(".project-title").innerHTML;
      const projectCategory = projectItem.querySelector(".project-category").innerHTML;
      const projectImgSrc = projectItem.querySelector(".project-img img").src;
      const projectImgAlt = projectItem.querySelector(".project-img img").alt;

      modalTitle.innerHTML = projectTitle;
      modalText.innerHTML = `<p>${projectCategory}</p>`;
      modalImg.src = projectImgSrc;
      modalImg.alt = projectImgAlt;

      portfolioModalFunc();
    });
  }

  // add click event to modal close button
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", portfolioModalFunc);
  }
  if (overlay) {
    overlay.addEventListener("click", portfolioModalFunc);
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
  const blogModalFunc = function () {
    if (blogModalContainer) {
      blogModalContainer.classList.toggle("active");
    }
    if (blogOverlay) {
      blogOverlay.classList.toggle("active");
    }
  }

  // add click event to all blog post links
  for (let i = 0; i < blogPostLinks.length; i++) {
    blogPostLinks[i].addEventListener("click", function (event) {
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

  window.addEventListener("scroll", function () {
    if (window.scrollY >= 100) {
      backTopBtn.classList.add("active");
    } else {
      backTopBtn.classList.remove("active");
    }
  });

  if(backTopBtn) {
    backTopBtn.addEventListener("click", function() {
      window.scrollTo(0,0);
    });
  }

});
