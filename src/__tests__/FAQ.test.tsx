import { render, screen, fireEvent } from './utils/test-utils';
import { FAQ } from '@/components/sections/FAQ';

jest.mock('next/link', () => {
  return function MockLink({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
  }) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  };
});

jest.mock('next/head', () => {
  return function MockHead({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
  };
});

describe('FAQ Section', () => {
  beforeEach(() => {
    render(<FAQ />);
  });

  it('renders section heading', () => {
    expect(
      screen.getByRole('heading', { name: /frequently asked questions/i })
    ).toBeInTheDocument();
  });

  it('renders first FAQ item as expanded by default', () => {
    const buttons = screen.getAllByRole('button');
    // First item is expanded by default
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'true');
    // Rest are collapsed
    buttons.slice(1).forEach((button) => {
      expect(button).toHaveAttribute('aria-expanded', 'false');
    });
  });

  it('expands FAQ item when clicked', () => {
    const secondQuestion = screen.getByRole('button', {
      name: /storage and transcription quotas/i,
    });
    
    expect(secondQuestion).toHaveAttribute('aria-expanded', 'false');
    
    fireEvent.click(secondQuestion);
    
    expect(secondQuestion).toHaveAttribute('aria-expanded', 'true');
  });

  it('collapses FAQ item when another is clicked (accordion behavior)', () => {
    const firstQuestion = screen.getByRole('button', {
      name: /captions-first/i,
    });
    const secondQuestion = screen.getByRole('button', {
      name: /storage and transcription quotas/i,
    });
    
    // First is open by default
    expect(firstQuestion).toHaveAttribute('aria-expanded', 'true');
    
    // Click second - should close first and open second
    fireEvent.click(secondQuestion);
    expect(firstQuestion).toHaveAttribute('aria-expanded', 'false');
    expect(secondQuestion).toHaveAttribute('aria-expanded', 'true');
  });

  it('can close current item by clicking it', () => {
    const firstQuestion = screen.getByRole('button', {
      name: /captions-first/i,
    });
    
    // First is open by default
    expect(firstQuestion).toHaveAttribute('aria-expanded', 'true');
    
    // Click to close
    fireEvent.click(firstQuestion);
    expect(firstQuestion).toHaveAttribute('aria-expanded', 'false');
  });

  it('has proper accessibility attributes', () => {
    const buttons = screen.getAllByRole('button');
    
    buttons.forEach((button) => {
      expect(button).toHaveAttribute('aria-expanded');
      expect(button).toHaveAttribute('aria-controls');
    });
  });

  it('renders all 10 FAQ items', () => {
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(10);
  });

  it('includes key topics', () => {
    // Check that key topics from the PRD are covered
    expect(screen.getByRole('button', { name: /captions-first/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /storage and transcription quotas/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /languages/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /data protected/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /subscribe.*cancel/i })).toBeInTheDocument();
  });

  it('renders contact support CTA', () => {
    expect(screen.getByRole('link', { name: /contact support/i })).toBeInTheDocument();
  });
});
