const RESET_AFTER_MS = 3000;

/**
 * "Copy email" button. The result is announced through a polite live region
 * so screen reader users get the same confirmation as sighted users.
 */
export function initCopyEmail(button) {
  if (!button) return;

  const status = document.getElementById(button.dataset.copyStatus);
  const email = button.dataset.copyEmail;
  let timer;

  // The Clipboard API needs a secure context; keep the button hidden otherwise.
  if (!navigator.clipboard) return;
  button.hidden = false;

  button.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(email);
      status.textContent = `Copied ${email} to clipboard.`;
    } catch {
      status.textContent = `Couldn't copy. The email address is ${email}.`;
    }
    clearTimeout(timer);
    timer = setTimeout(() => (status.textContent = ""), RESET_AFTER_MS);
  });
}
