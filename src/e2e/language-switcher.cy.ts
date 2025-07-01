describe('Language Switcher', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should switch between English and Spanish languages', () => {
    cy.get('input[placeholder="Search by title or studio..."]').should('exist');
    cy.contains('See favorites').should('exist');

    cy.get('button[title="Español"]').click();

    cy.get('input[placeholder="Buscar por título o estudio..."]').should(
      'exist',
    );
    cy.contains('See favorites').should('not.exist');
    cy.contains('Ver favoritos').should('exist');

    cy.get('button[title="English"]').click();

    cy.get('input[placeholder="Search by title or studio..."]').should('exist');
    cy.contains('Ver favoritos').should('not.exist');
    cy.contains('See favorites').should('exist');
  });

  it('should persist language selection across page navigation', () => {
    cy.get('button[title="Español"]').click();

    cy.contains('Ver favoritos').click();

    cy.contains('Aún no hay juegos favoritos en la lista.').should('exist');

    cy.contains('← Volver al catálogo').click();

    cy.get('input[placeholder="Buscar por título o estudio..."]').should(
      'exist',
    );
  });
});
