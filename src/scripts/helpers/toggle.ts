import { ToggleStyle } from "@/types/toggle";
import { querySelector } from "./doms";

export const handleToggleLoading = (status: boolean) => {
  const toggle = querySelector<HTMLDivElement>('.toggle');

  if (toggle) {
    toggle.style.display = status ? ToggleStyle.SHOW : ToggleStyle.HIDE
  }
}
