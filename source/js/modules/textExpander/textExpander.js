export class TextExpander {
  constructor() {
    this._expandTextButtons = document.querySelectorAll('[data-expand-text]');
    this._documentClickHandler = this._documentClickHandler.bind(this);
    this._eventTimeout = 400;

    this._init();
  }

  _init() {
    if (this._expandTextButtons.length) {
      document.addEventListener('click', this._documentClickHandler);
    }
  }

  _documentClickHandler(evt) {

    const target = evt.target;

    if (!target.closest('[data-expand-text]')) {
      return;
    }

    const expandTextButtonElement = target.closest('[data-expand-text]');

    evt.preventDefault();

    this._expandTextButton = expandTextButtonElement.dataset.expandText;

    if (!this._expandTextButton) {
      return;
    }

    const expandTextButtonOpen = expandTextButtonElement.dataset.expandTextOpen;
    const expandTextButtonClose = expandTextButtonElement.dataset.expandTextClose;
    if (expandTextButtonElement.innerHTML === expandTextButtonOpen) {
      expandTextButtonElement.innerHTML = expandTextButtonClose;
    } else {
      expandTextButtonElement.innerHTML = expandTextButtonOpen;
    }

    this.expandText();
  }


  expandText(expandTextName = this._expandTextButton) {
    const expandTextElements = document.querySelectorAll(`[data-expand-text-element="${expandTextName}"]`);
    if (!expandTextElements) {
      return;
    }

    document.removeEventListener('click', this._documentClickHandler);

    expandTextElements.forEach((element) => {
      element.classList.toggle('is-hidden');
    });

    setTimeout(() => {
      document.addEventListener('click', this._documentClickHandler);
    }, this._eventTimeout);
  }
}