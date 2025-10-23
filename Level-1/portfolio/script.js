
window.addEventListener("scroll", () => {
  let sections = document.querySelectorAll("section");
  let navLinks = document.querySelectorAll(".navbar a");

  sections.forEach((section, index) => {
    let top = window.scrollY;
    let offset = section.offsetTop - 150;
    let height = section.offsetHeight;
    let id = section.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
      });
      navLinks[index].classList.add("active");
    }
  });
});

// Add glowing effect on hover
const navItems = document.querySelectorAll(".navbar a");
navItems.forEach((item) => {
  item.addEventListener("mouseover", () => {
    item.style.textShadow = "0 0 10px #ffeb3b";
  });
  item.addEventListener("mouseout", () => {
    item.style.textShadow = "none";
  });
});

// Welcome animation
window.onload = () => {
  const home = document.querySelector("#home h1");
  home.style.transition = "all 1.5s ease";
  home.style.opacity = "0";
  setTimeout(() => {
    home.style.opacity = "1";
  }, 300);
};
