// js/share.js
// Web Share with a clipboard fallback.
import { APP_URL, APP_NAME } from "./config.js";

export async function shareCheckIn(labels, intention) {
  const list = labels.length > 1
    ? labels.slice(0, -1).join(", ") + " and " + labels[labels.length - 1]
    : labels[0] || "";
  let text = `Checking in: feeling ${list}.`;
  if (intention) text += ` ${intention}`;
  text += `\n\nvia ${APP_NAME} ${APP_URL}`;

  if (navigator.share) {
    try {
      await navigator.share({ text });
      return "shared";
    } catch {
      // fall through to clipboard
    }
  }
  try {
    await navigator.clipboard.writeText(text);
    return "copied";
  } catch {
    return "failed";
  }
}
