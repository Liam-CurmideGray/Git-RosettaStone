import { Spinner } from "clui";

export function StartAnimation() {
  let loadingText: string = `Loading data...`;

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

export function StopAnimation(buffer: Spinner) {
  buffer.stop();
}
