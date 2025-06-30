// src/custom-elements.d.ts
declare namespace JSX {
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
