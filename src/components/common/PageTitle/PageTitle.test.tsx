import { render } from '@testing-library/react';
import { PageTitle } from './PageTitle';

describe('PageTitle', () => {
  test('should update the document title to match its children', () => {
    const expectedTitle = 'My Awesome Movie Title';
    document.title = 'Initial Title';

    render(<PageTitle>{expectedTitle}</PageTitle>);

    expect(document.title).toBe(expectedTitle);
  });

  test('should update the document title on re-render with new children', () => {
    const initialTitle = 'First Title';
    const updatedTitle = 'Second Title';
    const { rerender } = render(<PageTitle>{initialTitle}</PageTitle>);

    expect(document.title).toBe(initialTitle);

    rerender(<PageTitle>{updatedTitle}</PageTitle>);

    expect(document.title).toBe(updatedTitle);
  });
});
