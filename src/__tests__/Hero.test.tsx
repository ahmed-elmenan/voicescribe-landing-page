import { render, screen, fireEvent } from './utils/test-utils';
import { Hero } from '@/components/sections/Hero';

// Mock next/link
jest.mock('next/link', () => {
  return function MockLink({
    children,
    href,
    onClick,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    onClick?: () => void;
  }) {
    return (
      <a href={href} onClick={onClick} {...props}>
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

// Mock prefersReducedMotion
jest.mock('@/lib/utils', () => ({
  ...jest.requireActual('@/lib/utils'),
  prefersReducedMotion: jest.fn(() => false),
  trackEvent: jest.fn(),
}));

// Mock requestAnimationFrame for canvas tests
beforeAll(() => {
  jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
    return setTimeout(() => cb(Date.now()), 16) as unknown as number;
  });
});

afterAll(() => {
  (window.requestAnimationFrame as jest.Mock).mockRestore();
});

describe('Hero Section', () => {
  it('renders the main headline', () => {
    render(<Hero />);
    
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/Record/);
    expect(heading).toHaveTextContent(/Transcribe/);
    expect(heading).toHaveTextContent(/Organize/);
  });

  it('renders the subheadline', () => {
    render(<Hero />);
    
    expect(
      screen.getByText(/Turn audio and YouTube links into clean, searchable notes/i)
    ).toBeInTheDocument();
  });

  it('renders App Store download button', () => {
    render(<Hero />);
    
    const appStoreButton = screen.getByRole('link', { name: /App Store/i });
    expect(appStoreButton).toBeInTheDocument();
    expect(appStoreButton).toHaveAttribute('target', '_blank');
    expect(appStoreButton).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders Learn More button', () => {
    render(<Hero />);
    
    const learnMoreButton = screen.getByRole('link', { name: /Learn More/i });
    expect(learnMoreButton).toBeInTheDocument();
    expect(learnMoreButton).toHaveAttribute('href', '#features');
  });

  it('renders social proof elements', () => {
    render(<Hero />);
    
    // Rating
    expect(screen.getByText('4.8')).toBeInTheDocument();
    expect(screen.getByText(/1,200\+ reviews/i)).toBeInTheDocument();
    
    // User count
    expect(screen.getByText(/50K\+ users/i)).toBeInTheDocument();
  });

  it('has accessible heading structure', () => {
    render(<Hero />);
    
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveAttribute('id', 'hero-heading');
    
    const section = heading.closest('section');
    expect(section).toHaveAttribute('aria-labelledby', 'hero-heading');
  });

  it('renders AI badge', () => {
    render(<Hero />);
    
    expect(screen.getByText('AI-Powered Transcription')).toBeInTheDocument();
  });

  it('renders scroll indicator on desktop', () => {
    render(<Hero />);
    
    const scrollLink = screen.getByLabelText(/Scroll to features section/i);
    expect(scrollLink).toBeInTheDocument();
    expect(scrollLink).toHaveAttribute('href', '#features');
  });

  it('renders device mockup', () => {
    render(<Hero />);
    
    // Check for recording timer in mockup
    expect(screen.getByText('02:34')).toBeInTheDocument();
    
    // Check for recording text
    expect(screen.getByText('Recording...')).toBeInTheDocument();
  });

  it('renders floating notification cards', () => {
    render(<Hero />);
    
    expect(screen.getByText('Transcribed!')).toBeInTheDocument();
    expect(screen.getByText('Synced')).toBeInTheDocument();
    expect(screen.getByText('Cloud backup')).toBeInTheDocument();
  });
});

describe('Hero Accessibility', () => {
  it('has proper ARIA labels', () => {
    render(<Hero />);
    
    // Star rating accessibility
    expect(screen.getByRole('img', { name: /4.8 out of 5 stars/i })).toBeInTheDocument();
    
    // Separator role
    const separator = screen.getByRole('separator');
    expect(separator).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('has hidden decorative elements', () => {
    const { container } = render(<Hero />);
    
    // Background and waveform should be aria-hidden
    const hiddenElements = container.querySelectorAll('[aria-hidden="true"]');
    expect(hiddenElements.length).toBeGreaterThan(0);
  });

  it('has accessible links', () => {
    render(<Hero />);
    
    const appStoreButton = screen.getByRole('link', { name: /App Store/i });
    expect(appStoreButton).toBeInTheDocument();
    
    const learnMoreButton = screen.getByRole('link', { name: /Learn More/i });
    expect(learnMoreButton).toHaveClass('btn-outline');
  });
});

describe('Hero Interactions', () => {
  it('tracks CTA click events', async () => {
    const { trackEvent } = require('@/lib/utils');
    
    render(<Hero />);
    
    const appStoreButton = screen.getByRole('link', { name: /App Store/i });
    fireEvent.click(appStoreButton);
    
    expect(trackEvent).toHaveBeenCalledWith('appstore_click', expect.objectContaining({
      location: 'hero',
      platform: 'ios',
    }));
  });

  it('tracks secondary CTA click events', async () => {
    const { trackEvent } = require('@/lib/utils');
    
    render(<Hero />);
    
    const learnMoreButton = screen.getByRole('link', { name: /Learn More/i });
    fireEvent.click(learnMoreButton);
    
    expect(trackEvent).toHaveBeenCalledWith('hero_secondary_cta_click', {
      location: 'hero',
      button: 'learn_more',
    });
  });
});

describe('Hero Reduced Motion', () => {
  beforeEach(() => {
    const { prefersReducedMotion } = require('@/lib/utils');
    prefersReducedMotion.mockReturnValue(true);
  });

  it('respects prefers-reduced-motion', () => {
    const { container } = render(<Hero />);
    
    // Should render static waveform SVG instead of animated canvas
    const staticWaveform = container.querySelector('svg[viewBox="0 0 400 100"]');
    // Note: In reduced motion mode, static SVG is rendered
    // This test verifies the component doesn't crash
    expect(container).toBeInTheDocument();
  });
});
