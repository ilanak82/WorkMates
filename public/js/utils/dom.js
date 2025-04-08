// public/js/utils/dom.js

export function showError(element, message) {
    if (!element) return;
    element.textContent = message;
    element.style.color = "red";
    element.style.display = "block";
}

export function showSuccess(element, message) {
    if (!element) return;
    element.textContent = message;
    element.style.color = "green";
    element.style.display = "block";
}

export function clearMessage(element) {
    if (!element) return;
    element.textContent = "";
    element.style.display = "none";
}
