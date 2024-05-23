describe('Header Test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  it('should have a div with text "Next player: X"', () => {
    cy.contains('div', 'Next player: X').should('exist');
  });

  it('should always have a button with text "Go to game start"', () => {
    cy.contains('button', 'Go to game start').should('exist');
  });

  it('should display an empty board at the start', () => {
    cy.get('.square').each(($square) => {
      expect($square).to.have.text('');
    });
  });

  it('should allow player to make a move', () => {
    cy.get('[data-cy="square-0"]').click().should('have.text', 'X');
  });

  it('should let the computer make a move', () => {
    cy.get('[data-cy="square-0"]').click().should('have.text', 'X');
    cy.wait(1000);

    cy.get('.square').then(($squares) => {
      const texts = [...$squares].map(square => square.innerText);
      expect(texts).to.include('O');
    });
  });

  it('should declare the winner', () => {
    cy.get('[data-cy="square-0"]').click().should('have.text', 'X'); // X
    cy.wait(1000); // wait for computer move
    cy.get('[data-cy="square-1"]').click().should('have.text', 'X'); // X
    cy.wait(1000); // wait for computer move
    cy.get('[data-cy="square-2"]').click().should('have.text', 'X'); // X
    cy.get('[data-cy="game-info"]').contains('Winner: X');
  });

  it('should reset the game', () => {
    cy.get('[data-cy="square-0"]').click().should('have.text', 'X'); // X
    cy.wait(1000); // wait for computer move
    cy.get('[data-cy="move"]').contains('Go to game start').click();

    cy.get('.square').each(($square) => {
      expect($square).to.have.text('');
    });
  });
});