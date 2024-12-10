export function initSidebar() {
 const elements = {
   sidebar: document.querySelector("#sidebar"),
   toggleBtn: document.querySelector("#toggle-sidebar"),
   content: document.querySelectorAll(".sidebar-content"),
   icon: document.querySelector("#toggle-sidebar i")
 };

 const state = {
   isCollapsed: localStorage.getItem("sidebarCollapsed") === "true"
 };

 function toggleSidebar() {
   elements.sidebar?.classList.toggle("w-64");
   elements.sidebar?.classList.toggle("w-16");
   elements.content.forEach(el => el.classList.toggle("hidden"));
   elements.icon?.classList.toggle("rotate-180");

   state.isCollapsed = !state.isCollapsed;
   localStorage.setItem("sidebarCollapsed", String(state.isCollapsed));
 }

 elements.toggleBtn?.addEventListener("click", toggleSidebar);

 if (state.isCollapsed) {
   toggleSidebar();
 }
}
