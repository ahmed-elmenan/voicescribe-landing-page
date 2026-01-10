import { render, screen, fireEvent } from './utils/test-utils';
import { Header } from '@/components/layout/Header';

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

describe('Header', () => {
  it('renders logo', () => {
    render(<Header />);
    expect(screen.getByText('VoiceScribe')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Header />);
    // Check that links to sections exist
    const featuresLinks = screen.getAllByText(/features/i);
    const pricingLinks = screen.getAllByText(/pricing/i);
    expect(featuresLinks.length).toBeGreaterThanOrEqual(1);
    expect(pricingLinks.length).toBeGreaterThanOrEqual(1);
  });

  it('has mobile menu button', () => {
    render(<Header />);
    const menuButton = screen.getByRole('button', { name: /open navigation menu|close navigation menu/i });
    expect(menuButton).toBeInTheDocument();
  });

  it('toggles mobile menu on button click', () => {
    render(<Header />);
    const menuButton = screen.getByRole('button', { name: /open navigation menu/i });
    
    // Open menu
    fireEvent.click(menuButton);
    
    // After click, menu should be open (dialog should appear)
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /close navigation menu/i })).toBeInTheDocument();
  });

  it('has accessible navigation landmark', () => {
    render(<Header />);
    expect(screen.getByRole('navigation', { name: /main navigation/i })).toBeInTheDocument();
  });
});
