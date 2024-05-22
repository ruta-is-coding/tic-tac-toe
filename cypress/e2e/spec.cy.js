describe('Header Test', () => {
  it('should have a header with text "Hello"', () => {
    cy.visit('http://localhost:5173'); // Visit the page you want to test
    cy.contains('div', 'Next player: X').should('exist'); // Check for headers with text "Hello"
  });
});