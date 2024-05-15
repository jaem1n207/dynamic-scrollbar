import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Title } from '~/shared/ui/typography';

describe('typography component', () => {
  it('should render title', () => {
    render(<Title size="h1">Hello World</Title>);
    const titleElement = screen.getByText('Hello World');
    expect(titleElement).toBeInTheDocument();
  });
  it('should render h2 element', () => {
    render(
      <Title asChild size="h2">
        <h2>Hello World</h2>
      </Title>,
    );
    const titleElement = screen.getByText('Hello World');
    expect(titleElement.tagName).toBe('H2');
  });
});
