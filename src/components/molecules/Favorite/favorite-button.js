class FavoriteButton extends HTMLElement {
  constructor() {
    super();
    this._gameId = '';
    this._isFavorite = false;
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['game-id', 'is-favorite'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'game-id') {
      this._gameId = newValue;
    }
    if (name === 'is-favorite') {
      this._isFavorite = newValue === 'true';
      this._updateIcon();
    }
  }

  connectedCallback() {
    this._render();
    this._attachEventListeners();
  }

  disconnectedCallback() {
    const button = this.shadowRoot.querySelector('button');
    if (button) {
      button.removeEventListener('click', this._toggleFavorite);
    }
  }

  _toggleFavorite = () => {
    this.dispatchEvent(
      new CustomEvent('favoriteToggle', {
        detail: { gameId: this._gameId },
        bubbles: true,
      }),
    );
  };

  _updateIcon() {
    const iconElement = this.shadowRoot.querySelector('.heart-icon');
    if (iconElement) {
      iconElement.innerHTML = this._isFavorite
        ? this._filledHeartSVG()
        : this._outlineHeartSVG();
    }
  }

  _render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          position: relative;
          z-index: 10;
        }
        button {
          background: white;
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 2px 5px rgba(0,0,0,0.2);
          transition: transform 0.2s;
        }
        button:hover {
          transform: scale(1.1);
        }
        .heart-icon {
          width: 24px;
          height: 24px;
          color: #e74c3c;
        }
      </style>
      <button aria-label="Toggle favorite">
        <div class="heart-icon">
          ${this._isFavorite ? this._filledHeartSVG() : this._outlineHeartSVG()}
        </div>
      </button>
    `;
  }

  _attachEventListeners() {
    const button = this.shadowRoot.querySelector('button');
    if (button) {
      button.addEventListener('click', this._toggleFavorite);
    }
  }

  _outlineHeartSVG() {
    return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>`;
  }

  _filledHeartSVG() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
    </svg>`;
  }
}

customElements.define('favorite-button', FavoriteButton);
