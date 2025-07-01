namespace FavoriteGameTests {
  const GameListSelector = '#game-list-section';

  const GameCardSelector = '#game-list-section a';
  const SearchInputSelector =
    'input[placeholder="Search by title or studio..."]';
  const LoadingText = 'Loading games...';
  const SampleGameTitle = 'Forecast Talent';
  const SampleStudio1 = 'Studio: Endorphina';
  const SampleStudio2 = 'Studio: Merkur';
  const PlayButtonText = 'Play';

  describe('Game Catalogue List Page', () => {
    const waitForGames = () => {
      cy.wait('@getGames');
    };

    const searchGames = (query: string) => {
      cy.get(SearchInputSelector).type(query);
      cy.intercept('GET', '**/games*').as('getFilteredGames');
      cy.wait('@getFilteredGames');
    };

    beforeEach(() => {
      cy.visit('/');
      cy.intercept('GET', '**/games*').as('getGames');
    });

    it('displays the game catalog with games', () => {
      waitForGames();

      cy.get(GameListSelector).should('be.visible');

      cy.get(GameCardSelector).should('have.length.gt', 0);

      cy.contains(SampleGameTitle).should('be.visible');
      cy.contains(SampleStudio1).should('be.visible');
    });

    it('filters games when using the search box', () => {
      waitForGames();

      searchGames('Endorphina');

      cy.contains(SampleStudio1).should('be.visible');
      cy.contains(SampleStudio2).should('not.exist');
    });

    it('shows loading state while fetching games', () => {
      cy.intercept('GET', '**/games*').as('getGamesDelayed');

      cy.reload();

      cy.contains(LoadingText).should('be.visible');

      cy.wait('@getGamesDelayed');
      cy.contains(SampleGameTitle).should('be.visible');
    });

    it('navigates to game detail when clicking a game', () => {
      waitForGames();

      cy.get(GameCardSelector).first().click();

      cy.url().should('include', '/game/');

      cy.contains(PlayButtonText).scrollIntoView().should('be.visible');
    });
  });
}
