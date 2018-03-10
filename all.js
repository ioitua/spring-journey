// Auto-select of code-blocks
window.addEventListener('click', (event) => {
  if (event.target.nodeName === 'CODE') {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(event.target);
    selection.removeAllRanges();
    selection.addRange(range);
  }
});
