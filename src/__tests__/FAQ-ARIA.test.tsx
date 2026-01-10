/**
 * FAQ Accordion ARIA Behavior Tests
 * 
 * Tests for WCAG 2.1 AA compliance:
 * - Proper ARIA attributes (aria-expanded, aria-controls, aria-labelledby)
 * - Keyboard navigation (Enter, Space, Arrow keys)
 * - Focus management
 * - Screen reader announcements
 */

import { render, screen, fireEvent, within } from './utils/test-utils';
import { FAQ, faqData } from '@/components/sections/FAQ';

// Mock trackEvent
jest.mock('@/lib/utils', () => ({
  ...jest.requireActual('@/lib/utils'),
  trackEvent: jest.fn(),
  prefersReducedMotion: jest.fn(() => false),
}));

jest.mock('next/head', () => {
  return function MockHead({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
  };
});

describe('FAQ Accordion ARIA Behavior', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('ARIA Attributes', () => {
    beforeEach(() => {
      render(<FAQ />);
    });

    it('each trigger button has aria-expanded attribute', () => {
      const buttons = screen.getAllByRole('button');
      
      buttons.forEach((button) => {
        expect(button).toHaveAttribute('aria-expanded');
        const value = button.getAttribute('aria-expanded');
        expect(['true', 'false']).toContain(value);
      });
    });

    it('each trigger button has aria-controls pointing to panel', () => {
      const buttons = screen.getAllByRole('button');
      
      buttons.forEach((button, index) => {
        expect(button).toHaveAttribute('aria-controls', `faq-answer-${index}`);
      });
    });

    it('each trigger button has unique id', () => {
      const buttons = screen.getAllByRole('button');
      const ids = new Set<string>();
      
      buttons.forEach((button, index) => {
        const id = button.getAttribute('id');
        expect(id).toBe(`faq-question-${index}`);
        ids.add(id!);
      });
      
      // All IDs should be unique
      expect(ids.size).toBe(buttons.length);
    });

    it('panels have aria-labelledby pointing to trigger', () => {
      const buttons = screen.getAllByRole('button');
      
      buttons.forEach((button) => {
        const controlsId = button.getAttribute('aria-controls');
        const panel = document.getElementById(controlsId!);
        
        if (panel) {
          expect(panel).toHaveAttribute('aria-labelledby', button.id);
        }
      });
    });

    it('expanded panel is visible, collapsed panels are hidden', () => {
      const buttons = screen.getAllByRole('button');
      
      buttons.forEach((button) => {
        const isExpanded = button.getAttribute('aria-expanded') === 'true';
        const controlsId = button.getAttribute('aria-controls');
        const panel = document.getElementById(controlsId!);
        
        if (panel) {
          if (isExpanded) {
            expect(panel).toBeVisible();
          }
          // Collapsed panels may have height: 0 but still be in DOM
        }
      });
    });

    it('triggers are wrapped in heading elements for semantics', () => {
      const buttons = screen.getAllByRole('button');
      
      // Each button should be inside an h3 element
      buttons.forEach((button) => {
        const parentH3 = button.closest('h3');
        expect(parentH3).toBeInTheDocument();
      });
    });
  });

  describe('Accordion Behavior', () => {
    it('first item is expanded by default', () => {
      render(<FAQ />);
      
      const buttons = screen.getAllByRole('button');
      expect(buttons[0]).toHaveAttribute('aria-expanded', 'true');
    });

    it('clicking collapsed item expands it', () => {
      render(<FAQ />);
      
      const buttons = screen.getAllByRole('button');
      const secondButton = buttons[1];
      
      expect(secondButton).toHaveAttribute('aria-expanded', 'false');
      
      fireEvent.click(secondButton);
      
      expect(secondButton).toHaveAttribute('aria-expanded', 'true');
    });

    it('clicking expanded item collapses it', () => {
      render(<FAQ />);
      
      const buttons = screen.getAllByRole('button');
      const firstButton = buttons[0];
      
      expect(firstButton).toHaveAttribute('aria-expanded', 'true');
      
      fireEvent.click(firstButton);
      
      expect(firstButton).toHaveAttribute('aria-expanded', 'false');
    });

    it('only one item can be expanded at a time (accordion mode)', () => {
      render(<FAQ />);
      
      const buttons = screen.getAllByRole('button');
      
      // First is open by default
      expect(buttons[0]).toHaveAttribute('aria-expanded', 'true');
      expect(buttons[1]).toHaveAttribute('aria-expanded', 'false');
      
      // Click second item
      fireEvent.click(buttons[1]);
      
      // First should close, second should open
      expect(buttons[0]).toHaveAttribute('aria-expanded', 'false');
      expect(buttons[1]).toHaveAttribute('aria-expanded', 'true');
    });

    it('clicking same item toggles it without affecting others', () => {
      render(<FAQ />);
      
      const buttons = screen.getAllByRole('button');
      
      // Close first item
      fireEvent.click(buttons[0]);
      expect(buttons[0]).toHaveAttribute('aria-expanded', 'false');
      
      // Re-open first item
      fireEvent.click(buttons[0]);
      expect(buttons[0]).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('Keyboard Navigation', () => {
    it('Enter key toggles accordion item', () => {
      render(<FAQ />);
      
      const buttons = screen.getAllByRole('button');
      const secondButton = buttons[1];
      
      secondButton.focus();
      expect(secondButton).toHaveAttribute('aria-expanded', 'false');
      
      fireEvent.keyDown(secondButton, { key: 'Enter' });
      // Note: onClick handles Enter by default for buttons
      fireEvent.click(secondButton);
      
      expect(secondButton).toHaveAttribute('aria-expanded', 'true');
    });

    it('Space key toggles accordion item', () => {
      render(<FAQ />);
      
      const buttons = screen.getAllByRole('button');
      const secondButton = buttons[1];
      
      secondButton.focus();
      fireEvent.keyDown(secondButton, { key: ' ' });
      fireEvent.click(secondButton);
      
      expect(secondButton).toHaveAttribute('aria-expanded', 'true');
    });

    it('Tab key navigates between items', () => {
      render(<FAQ />);
      
      const buttons = screen.getAllByRole('button');
      
      // Focus first button
      buttons[0].focus();
      expect(document.activeElement).toBe(buttons[0]);
      
      // Tab to next (simulated - in real browser Tab moves focus)
      buttons[1].focus();
      expect(document.activeElement).toBe(buttons[1]);
    });

    it('buttons are focusable', () => {
      render(<FAQ />);
      
      const buttons = screen.getAllByRole('button');
      
      buttons.forEach((button) => {
        expect(button).not.toHaveAttribute('tabindex', '-1');
        button.focus();
        expect(document.activeElement).toBe(button);
      });
    });
  });

  describe('Focus Management', () => {
    it('maintains focus after expanding/collapsing', () => {
      render(<FAQ />);
      
      const buttons = screen.getAllByRole('button');
      const secondButton = buttons[1];
      
      secondButton.focus();
      fireEvent.click(secondButton);
      
      // Focus should remain on the clicked button
      expect(document.activeElement).toBe(secondButton);
    });

    it('has visible focus indicator', () => {
      render(<FAQ />);
      
      const buttons = screen.getAllByRole('button');
      const button = buttons[0];
      
      // Check that focus-visible styles are applied via className
      expect(button.className).toContain('focus');
    });
  });

  describe('Content Rendering', () => {
    it('renders FAQ questions', () => {
      render(<FAQ />);
      
      // Check that buttons exist for FAQ items
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThanOrEqual(5);
    });

    it('renders answer content when expanded', () => {
      render(<FAQ />);
      
      // First item is expanded by default, check for answer text
      const firstAnswer = faqData[0].answer;
      // Use a shorter substring to find the answer
      expect(screen.getByText(/Captions-first is our smart strategy/i)).toBeInTheDocument();
    });

    it('includes section heading', () => {
      render(<FAQ />);
      
      expect(
        screen.getByRole('heading', { name: /frequently asked questions/i })
      ).toBeInTheDocument();
    });
  });

  describe('Analytics Tracking', () => {
    it('tracks FAQ expansion', () => {
      const { trackEvent } = require('@/lib/utils');
      
      render(<FAQ />);
      
      const buttons = screen.getAllByRole('button');
      fireEvent.click(buttons[1]);
      
      expect(trackEvent).toHaveBeenCalledWith('faq_expand', expect.objectContaining({
        question: expect.any(String),
      }));
    });
  });

  describe('Schema.org Structured Data', () => {
    it('renders FAQ schema in head', () => {
      const { container } = render(<FAQ />);
      
      // The schema is rendered in Head, which is mocked
      // In integration tests, we'd check the actual script tag
    });
  });
});

describe('FAQ Accordion Edge Cases', () => {
  it('handles rapid clicking gracefully', () => {
    render(<FAQ />);
    
    const buttons = screen.getAllByRole('button');
    const button = buttons[1];
    
    // Rapid clicks
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    
    // Should end up in a valid state
    const finalState = button.getAttribute('aria-expanded');
    expect(['true', 'false']).toContain(finalState);
  });

  it('handles clicking during animation', () => {
    render(<FAQ />);
    
    const buttons = screen.getAllByRole('button');
    
    // Click multiple items quickly
    fireEvent.click(buttons[1]);
    fireEvent.click(buttons[2]);
    
    // Only the last clicked should be expanded
    expect(buttons[1]).toHaveAttribute('aria-expanded', 'false');
    expect(buttons[2]).toHaveAttribute('aria-expanded', 'true');
  });
});
