import { render, screen } from './utils/test-utils';
import Home from '@/pages/index';

// Mock next/head
jest.mock('next/head', () => {
  return function MockHead({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
  };
});

// Mock next/link
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

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: function MockImage({
    src,
    alt,
    ...props
  }: {
    src: string;
    alt: string;
  }) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} {...props} />;
  },
}));

describe('Home Page', () => {
  beforeEach(() => {
    render(<Home />);
  });

  it('renders the hero section', () => {
    expect(
      screen.getByRole('heading', { name: /record.*transcribe.*organize/i })
    ).toBeInTheDocument();
  });

  it('renders the features section', () => {
    expect(
      screen.getByRole('heading', { name: /everything you need/i })
    ).toBeInTheDocument();
  });

  it('renders the how it works section', () => {
    expect(
      screen.getByRole('heading', { name: /three simple steps/i })
    ).toBeInTheDocument();
  });

  it('renders the pricing section', () => {
    expect(
      screen.getByRole('heading', { name: /start free.*upgrade/i })
    ).toBeInTheDocument();
  });

  it('renders the FAQ section', () => {
    expect(
      screen.getByRole('heading', { name: /frequently asked questions/i })
    ).toBeInTheDocument();
  });

  it('renders the CTA section', () => {
    expect(
      screen.getByRole('heading', { name: /ready to transform/i })
    ).toBeInTheDocument();
  });

  it('has download links', () => {
    const downloadLinks = screen.getAllByRole('link', {
      name: /download|app store/i,
    });
    expect(downloadLinks.length).toBeGreaterThan(0);
  });

  it('renders navigation links', () => {
    // Use getAllByRole since there are multiple Features links (header nav, hero scroll, footer)
    expect(screen.getAllByRole('link', { name: /features/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('link', { name: /pricing/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('link', { name: /faq/i }).length).toBeGreaterThan(0);
  });
});

describe('Accessibility', () => {
  it('has proper heading hierarchy', () => {
    render(<Home />);
    const h1Elements = screen.getAllByRole('heading', { level: 1 });
    expect(h1Elements).toHaveLength(1);
  });

  it('has accessible navigation', () => {
    render(<Home />);
    // Multiple nav elements exist (header nav, footer navs)
    const navElements = screen.getAllByRole('navigation');
    expect(navElements.length).toBeGreaterThanOrEqual(1);
    // Main navigation should exist
    expect(screen.getByRole('navigation', { name: /main navigation/i })).toBeInTheDocument();
  });

  it('has skip to content link', () => {
    render(<Home />);
    const skipLink = document.querySelector('a[href="#main-content"]');
    expect(skipLink).toBeInTheDocument();
  });
});
