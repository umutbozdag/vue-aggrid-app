export const changeTheme = () => {
  const html = document.querySelector("html");
  const icon = document.querySelector(".theme-icon");
  if (html.classList.contains("light")) {
    html.classList.add("dark");
    html.classList.remove("light");
    icon.classList.add("fa-sun");
    icon.classList.remove("fa-moon");
  } else if (html.classList.contains("dark")) {
    html.classList.add("light");
    html.classList.remove("dark");
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
  }
};
