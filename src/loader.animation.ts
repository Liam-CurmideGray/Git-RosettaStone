import { Spinner } from "clui";

export function startAnimation(): Spinner {
  let loadingText = `Loading data...`;

  let buffer: Spinner = new Spinner(loadingText, [
    "◜",
    "◠",
    "◝",
    "◞",
    "◡",
    "◟"
  ]);

  buffer.start();
  buffer.message(loadingText);

  return buffer;
}

export function stopAnimation(buffer: Spinner): void {
  buffer.stop();
}
