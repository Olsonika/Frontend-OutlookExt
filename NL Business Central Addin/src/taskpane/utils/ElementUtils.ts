export function showElement(elementId: string): void {
  const element = document.getElementById(elementId);
  if (element) {
    element.style.display = "block";
  }
}

export function hideElement(elementId: string): void {
  const element = document.getElementById(elementId);
  if (element) {
    element.style.display = "none";
  }
}
