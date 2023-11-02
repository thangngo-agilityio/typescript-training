import { MAX_POPUP } from "@/constants/common";
import { createElement, querySelector } from "@/helpers/doms";
import { Message } from "@/interfaces/message";


export class Popup {
  currentPopupCount: number = 0;
  maxPopupCount: number = MAX_POPUP;

  createPopup(status: string, message: string) {
    const mainElement = querySelector<HTMLDivElement>('.main-content');
    const popup = createElement<HTMLDivElement>('div');

    if (popup) {
      popup.classList.add('popup', `popup-${status}`, 'open');

      this.currentPopupCount++;

      popup.innerHTML = `<div class="popup-body">
                        <p class="popup-message">${message}</p>
                      </div>`;

      popup.onclick = (e: Event) => {
        const target = e.target as Element;

        if (target.closest('.popup-close')) {
          popup.remove();
          this.currentPopupCount--;
        }
      };

      if (this.currentPopupCount >= this.maxPopupCount) {
        return;
      }

      // Auto remove popup after 1 seconds
      setTimeout(() => {
        popup.remove();
        this.currentPopupCount--;
      }, 1500);

      // Add popupElement to mainElement
      mainElement.appendChild(popup);
    }
  }

  success({ message }: Message) {
    this.createPopup('success', message);
  }

  error({ message }: Message) {
    this.createPopup('error', message);
  }
}
