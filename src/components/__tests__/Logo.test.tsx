import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Logo from '../Logo';

describe('logo component', () => {
  it('should render', () => {
    render(<Logo />);
    const linkElement = screen.getByTitle('GitHub');
    expect(linkElement).toBeInTheDocument();
  });
});
