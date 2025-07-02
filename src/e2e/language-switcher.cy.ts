const SeeFavoritesText = 'See favorites';
const BackButtonText = '← Back to catalogue';
const VerFavoritesText = 'Ver favoritos';
const VolverACatalogoText = '← Volver al catálogo';

describe('Language Switcher', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should switch between English and Spanish languages', () => {
    cy.get('input[placeholder="Search by title or studio..."]').should('exist');
    cy.contains(SeeFavoritesText).should('exist');

    cy.get('button[title="Español"]').click();

    cy.get('input[placeholder="Buscar por título o estudio..."]').should(
      'exist',
    );
    cy.contains(SeeFavoritesText).should('not.exist');
    cy.contains(VerFavoritesText).should('exist');

    cy.get('button[title="English"]').click();

    cy.get('input[placeholder="Search by title or studio..."]').should('exist');
    cy.contains(VerFavoritesText).should('not.exist');
    cy.contains(SeeFavoritesText).should('exist');
  });

  it('should persist language selection across page navigation', () => {
    cy.get('button[title="Español"]').click();

    cy.contains(VerFavoritesText).click();

    cy.contains('Aún no hay juegos favoritos en la lista.').should('exist');

    cy.contains(VolverACatalogoText).click();

    cy.get('input[placeholder="Buscar por título o estudio..."]').should(
      'exist',
    );
  });
});
