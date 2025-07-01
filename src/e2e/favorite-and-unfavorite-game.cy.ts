namespace FavoriteGameTests {
  const GameListSelector = '#game-list-section a';

  const BackButtonText = '← Back to catalogue';
  const SeeFavoritesText = 'See favorites';
  const GameTitleSelector = '#game-list-section a h2';
  const FavoriteListSelector = '#favorite-game-list-section a h2';
  const FavoriteButtonSelector = 'favorite-button';

  describe('Game Catalogue Favorites', () => {
    const toggleFavorite = () => {
      cy.get(FavoriteButtonSelector)
        .shadow()
        .find('button')
        .scrollIntoView()
        .click();
    };

    const navigateToFirstGame = () => {
      cy.get(GameTitleSelector).first().invoke('text').as('gameTitle');
      cy.get(GameListSelector).first().click();
      cy.url().should('include', '/game');
    };

    const navigateBackToCatalog = () => {
      cy.contains('button, a', BackButtonText).click();
      cy.url().should('include', '/');
    };

    const navigateToFavorites = () => {
      cy.contains('button, a', SeeFavoritesText).click();
    };

    beforeEach(() => {
      cy.visit('/');
      cy.intercept('GET', '**/games*').as('getGames');
      cy.wait('@getGames');
    });

    it('should add a game to favorites, display it on favorites page, and remove it', () => {
      navigateToFirstGame();
      toggleFavorite();

      navigateBackToCatalog();
      navigateToFavorites();

      cy.get(FavoriteListSelector).should('have.length.at.least', 1);
      cy.get(FavoriteListSelector).first().invoke('text').as('favoriteTitle');

      cy.get('@favoriteTitle').then((title) => {
        cy.contains(title.toString()).should('be.visible');

        cy.contains(title.toString()).click();
      });

      cy.url().should('include', '/game');
      toggleFavorite();

      navigateBackToCatalog();
      cy.get(FavoriteListSelector).should('have.length', 0);
    });
  });
}
