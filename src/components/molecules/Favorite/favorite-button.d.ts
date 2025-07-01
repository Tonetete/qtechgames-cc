declare module './favorite-button.js' {
  class FavoriteButton extends HTMLElement {}

  interface HTMLElementTagNameMap {
    'favorite-button': FavoriteButton;
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'favorite-button': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        'game-id'?: string;
        'is-favorite'?: string;
      };
    }
  }
}

export {};
