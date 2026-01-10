/** @type {import('tailwindcss').Config} */

// ============================================================================
// VoiceScribe Design Tokens
// Based on app_colors.dart - iOS 17+ Design System
// ============================================================================

// === COLOR TOKENS (swap these placeholders as needed) ===
const colors = {
  // Primary Colors - iOS Blue
  primary: {
    DEFAULT: '#007AFF',
    dark: '#0051D5',
    light: '#66B2FF',
    50: '#E5F2FF',
    100: '#CCE5FF',
    200: '#99CBFF',
    300: '#66B2FF',
    400: '#3399FF',
    500: '#007AFF',
    600: '#0066D6',
    700: '#0051D5',
    800: '#003DA8',
    900: '#002970',
  },

  // Secondary Colors - iOS Purple
  secondary: {
    DEFAULT: '#5856D6',
    dark: '#3634A3',
    light: '#8E8CE8',
    blue: '#597DD1', // secondaryBlue from Dart (0xCC opacity removed)
    50: '#EEEEFF',
    100: '#DDDCFF',
    200: '#BCBAFF',
    300: '#8E8CE8',
    400: '#7270E0',
    500: '#5856D6',
    600: '#4644B8',
    700: '#3634A3',
    800: '#28277A',
    900: '#1A1952',
  },

  // Accent Colors - iOS System Colors
  accent: {
    red: '#FF3B30',
    green: '#34C759',
    orange: '#FF9500',
    yellow: '#FFCC00',
    blue: '#64D2FF',
    pink: '#FF2D92',
    purple: '#BF5AF2',
    teal: '#30D158',
  },

  // Surface Colors (Light Mode)
  surface: {
    primary: '#FFFFFF',
    secondary: '#F2F2F7',
    tertiary: '#FFFFFF',
    quaternary: '#F2F2F7',
    dark: {
      primary: '#000000',
      secondary: '#1C1C1E',
      tertiary: '#2C2C2E',
      quaternary: '#3A3A3C',
    },
  },

  // Background Colors
  background: {
    primary: '#FFFFFF',
    secondary: '#F2F2F7',
    tertiary: '#FFFFFF',
    dark: {
      primary: '#000000',
      secondary: '#1C1C1E',
      tertiary: '#2C2C2E',
    },
  },

  // Text Colors
  text: {
    primary: '#000000',
    secondary: '#3C3C43',
    tertiary: '#8E8E93',
    quaternary: '#AEAEB2',
    dark: {
      primary: '#FFFFFF',
      secondary: '#EBEBF5',
      tertiary: '#8E8E93',
      quaternary: '#636366',
    },
  },

  // Separator Colors
  separator: {
    DEFAULT: '#C6C6C8',
    opaque: '#E5E5EA',
    dark: '#38383A',
    'opaque-dark': '#54545C',
  },

  // Fill Colors (with opacity)
  fill: {
    primary: 'rgba(120, 120, 128, 0.2)',
    secondary: 'rgba(120, 120, 128, 0.16)',
    tertiary: 'rgba(118, 118, 128, 0.12)',
    quaternary: 'rgba(116, 116, 128, 0.08)',
  },

  // Border Colors
  border: {
    DEFAULT: '#E5E5EA',
    primary: '#E5E5EA',
    light: '#F2F2F7',
    dark: '#3A3A3C',
  },

  // Status Colors
  status: {
    error: '#FF3B30',
    warning: '#FF9500',
    success: '#34C759',
    info: '#007AFF',
  },

  // Brand Colors (App-specific)
  brand: {
    recording: '#FF3B30',
    processing: '#FF9500',
    complete: '#34C759',
    waveform: '#007AFF',
    favorite: '#FFCC00',
  },

  // Subscription Tier Colors
  tier: {
    free: '#8E8E93',
    pro: '#007AFF',
    'pro-plus': '#5856D6',
    business: '#FF9500',
  },

  // Category Colors (for tags/labels)
  category: {
    blue: '#007AFF',
    green: '#34C759',
    orange: '#FF9500',
    purple: '#5856D6',
    red: '#FF3B30',
    lightBlue: '#64D2FF',
    pink: '#FF2D92',
    lightGreen: '#30D158',
    yellow: '#FFD60A',
    lightPurple: '#BF5AF2',
  },
};

// === TYPOGRAPHY TOKENS ===
const fontFamily = {
  // Heading font stack - Inter with system fallbacks
  heading: [
    'Inter',
    '-apple-system',
    'BlinkMacSystemFont',
    'SF Pro Display',
    'Segoe UI',
    'Roboto',
    'Helvetica Neue',
    'Arial',
    'sans-serif',
  ],
  // Body font stack - System UI
  body: [
    'Inter',
    '-apple-system',
    'BlinkMacSystemFont',
    'SF Pro Text',
    'Segoe UI',
    'Roboto',
    'Helvetica Neue',
    'Arial',
    'sans-serif',
  ],
  // Default sans - combines both
  sans: [
    'Inter',
    '-apple-system',
    'BlinkMacSystemFont',
    'SF Pro Display',
    'Segoe UI',
    'Roboto',
    'Helvetica Neue',
    'Arial',
    'sans-serif',
  ],
  // Monospace for code
  mono: [
    'SF Mono',
    'Menlo',
    'Monaco',
    'Consolas',
    'Liberation Mono',
    'Courier New',
    'monospace',
  ],
};

// === FONT SIZE TOKENS (Marketing-optimized) ===
const fontSize = {
  // Display sizes for hero sections
  'display-2xl': ['4.5rem', { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '800' }],
  'display-xl': ['3.75rem', { lineHeight: '1.08', letterSpacing: '-0.02em', fontWeight: '700' }],
  'display-lg': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.015em', fontWeight: '700' }],
  'display': ['2.5rem', { lineHeight: '1.15', letterSpacing: '-0.01em', fontWeight: '700' }],
  'display-sm': ['2rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
  
  // Headings
  'headline-lg': ['1.75rem', { lineHeight: '1.25', fontWeight: '600' }],
  'headline': ['1.5rem', { lineHeight: '1.3', fontWeight: '600' }],
  'headline-sm': ['1.25rem', { lineHeight: '1.35', fontWeight: '600' }],
  
  // Titles
  'title-lg': ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }],
  'title': ['1.125rem', { lineHeight: '1.4', fontWeight: '600' }],
  'title-sm': ['1rem', { lineHeight: '1.4', fontWeight: '600' }],
  
  // Body text
  'body-xl': ['1.25rem', { lineHeight: '1.6', fontWeight: '400' }],
  'body-lg': ['1.125rem', { lineHeight: '1.6', fontWeight: '400' }],
  'body': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
  'body-sm': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
  
  // Small text
  'caption-lg': ['0.8125rem', { lineHeight: '1.4', fontWeight: '400' }],
  'caption': ['0.75rem', { lineHeight: '1.4', fontWeight: '400' }],
  'caption-sm': ['0.6875rem', { lineHeight: '1.3', fontWeight: '400' }],
  
  // Overline/Label
  'overline': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.1em', fontWeight: '600' }],
};

// === SPACING SCALE (Marketing site optimized) ===
const spacing = {
  '0': '0',
  'px': '1px',
  '0.5': '0.125rem',   // 2px
  '1': '0.25rem',      // 4px
  '1.5': '0.375rem',   // 6px
  '2': '0.5rem',       // 8px
  '2.5': '0.625rem',   // 10px
  '3': '0.75rem',      // 12px
  '3.5': '0.875rem',   // 14px
  '4': '1rem',         // 16px
  '5': '1.25rem',      // 20px
  '6': '1.5rem',       // 24px
  '7': '1.75rem',      // 28px
  '8': '2rem',         // 32px
  '9': '2.25rem',      // 36px
  '10': '2.5rem',      // 40px
  '11': '2.75rem',     // 44px
  '12': '3rem',        // 48px
  '14': '3.5rem',      // 56px
  '16': '4rem',        // 64px
  '18': '4.5rem',      // 72px
  '20': '5rem',        // 80px
  '22': '5.5rem',      // 88px
  '24': '6rem',        // 96px
  '28': '7rem',        // 112px
  '32': '8rem',        // 128px
  '36': '9rem',        // 144px
  '40': '10rem',       // 160px
  '44': '11rem',       // 176px
  '48': '12rem',       // 192px
  '52': '13rem',       // 208px
  '56': '14rem',       // 224px
  '60': '15rem',       // 240px
  '64': '16rem',       // 256px
  '72': '18rem',       // 288px
  '80': '20rem',       // 320px
  '96': '24rem',       // 384px
  '128': '32rem',      // 512px
  '144': '36rem',      // 576px
};

// === BORDER RADIUS SCALE ===
const borderRadius = {
  'none': '0',
  'sm': '0.25rem',     // 4px - subtle
  'DEFAULT': '0.5rem', // 8px - default
  'md': '0.625rem',    // 10px
  'lg': '0.75rem',     // 12px
  'xl': '1rem',        // 16px - cards
  '2xl': '1.25rem',    // 20px
  '3xl': '1.5rem',     // 24px - large cards
  '4xl': '2rem',       // 32px - hero elements
  '5xl': '2.5rem',     // 40px
  '6xl': '3rem',       // 48px - very large
  'full': '9999px',    // pills/circles
};

// === BOX SHADOW SCALE ===
const boxShadow = {
  'none': 'none',
  
  // Subtle shadows
  'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  'sm': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
  
  // Default shadows
  'DEFAULT': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
  'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
  
  // Soft shadows (iOS style)
  'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
  'soft-lg': '0 4px 20px -4px rgba(0, 0, 0, 0.08), 0 12px 24px -4px rgba(0, 0, 0, 0.05)',
  
  // Medium shadows
  'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 30px -5px rgba(0, 0, 0, 0.04)',
  'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
  
  // Strong shadows
  'strong': '0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 20px 50px -15px rgba(0, 0, 0, 0.1)',
  'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  
  // Card shadows
  'card': '0 2px 8px -2px rgba(0, 0, 0, 0.08), 0 4px 16px -4px rgba(0, 0, 0, 0.06)',
  'card-hover': '0 8px 24px -6px rgba(0, 0, 0, 0.12), 0 12px 32px -8px rgba(0, 0, 0, 0.08)',
  
  // Button shadows
  'button': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
  'button-hover': '0 4px 12px -2px rgba(0, 0, 0, 0.12), 0 2px 4px -2px rgba(0, 0, 0, 0.08)',
  
  // Glow effects (brand colors)
  'glow': '0 0 40px rgba(0, 122, 255, 0.3)',
  'glow-sm': '0 0 20px rgba(0, 122, 255, 0.2)',
  'glow-lg': '0 0 60px rgba(0, 122, 255, 0.4)',
  'glow-purple': '0 0 40px rgba(88, 86, 214, 0.3)',
  'glow-success': '0 0 40px rgba(52, 199, 89, 0.3)',
  'glow-warning': '0 0 40px rgba(255, 149, 0, 0.3)',
  'glow-error': '0 0 40px rgba(255, 59, 48, 0.3)',
  
  // Inner shadows
  'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
  'inner-lg': 'inset 0 4px 8px 0 rgba(0, 0, 0, 0.08)',
};

// === ANIMATION TOKENS ===
const animation = {
  'none': 'none',
  
  // Fade animations
  'fade-in': 'fadeIn 0.5s ease-out',
  'fade-in-up': 'fadeInUp 0.6s ease-out',
  'fade-in-down': 'fadeInDown 0.6s ease-out',
  'fade-in-left': 'fadeInLeft 0.5s ease-out',
  'fade-in-right': 'fadeInRight 0.5s ease-out',
  
  // Scale animations
  'scale-in': 'scaleIn 0.4s ease-out',
  'scale-in-center': 'scaleInCenter 0.3s ease-out',
  
  // Slide animations
  'slide-in-left': 'slideInLeft 0.5s ease-out',
  'slide-in-right': 'slideInRight 0.5s ease-out',
  'slide-in-up': 'slideInUp 0.5s ease-out',
  'slide-in-down': 'slideInDown 0.5s ease-out',
  
  // Continuous animations
  'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
  'pulse-ring': 'pulseRing 1.5s ease-out infinite',
  'waveform': 'waveform 1.5s ease-in-out infinite',
  'float': 'float 3s ease-in-out infinite',
  'bounce-soft': 'bounceSoft 2s ease-in-out infinite',
  'spin-slow': 'spin 3s linear infinite',
  
  // Micro-interactions
  'press': 'press 0.1s ease-out',
  'shake': 'shake 0.5s ease-in-out',
};

const keyframes = {
  // Fade keyframes
  fadeIn: {
    '0%': { opacity: '0' },
    '100%': { opacity: '1' },
  },
  fadeInUp: {
    '0%': { opacity: '0', transform: 'translateY(20px)' },
    '100%': { opacity: '1', transform: 'translateY(0)' },
  },
  fadeInDown: {
    '0%': { opacity: '0', transform: 'translateY(-20px)' },
    '100%': { opacity: '1', transform: 'translateY(0)' },
  },
  fadeInLeft: {
    '0%': { opacity: '0', transform: 'translateX(-20px)' },
    '100%': { opacity: '1', transform: 'translateX(0)' },
  },
  fadeInRight: {
    '0%': { opacity: '0', transform: 'translateX(20px)' },
    '100%': { opacity: '1', transform: 'translateX(0)' },
  },
  
  // Scale keyframes
  scaleIn: {
    '0%': { opacity: '0', transform: 'scale(0.95)' },
    '100%': { opacity: '1', transform: 'scale(1)' },
  },
  scaleInCenter: {
    '0%': { opacity: '0', transform: 'scale(0.9)' },
    '100%': { opacity: '1', transform: 'scale(1)' },
  },
  
  // Slide keyframes
  slideInLeft: {
    '0%': { opacity: '0', transform: 'translateX(-100%)' },
    '100%': { opacity: '1', transform: 'translateX(0)' },
  },
  slideInRight: {
    '0%': { opacity: '0', transform: 'translateX(100%)' },
    '100%': { opacity: '1', transform: 'translateX(0)' },
  },
  slideInUp: {
    '0%': { opacity: '0', transform: 'translateY(100%)' },
    '100%': { opacity: '1', transform: 'translateY(0)' },
  },
  slideInDown: {
    '0%': { opacity: '0', transform: 'translateY(-100%)' },
    '100%': { opacity: '1', transform: 'translateY(0)' },
  },
  
  // Continuous keyframes
  pulseSoft: {
    '0%, 100%': { opacity: '1' },
    '50%': { opacity: '0.8' },
  },
  pulseRing: {
    '0%': { transform: 'scale(1)', opacity: '1' },
    '100%': { transform: 'scale(1.5)', opacity: '0' },
  },
  waveform: {
    '0%, 100%': { transform: 'scaleY(1)' },
    '50%': { transform: 'scaleY(1.5)' },
  },
  float: {
    '0%, 100%': { transform: 'translateY(0)' },
    '50%': { transform: 'translateY(-10px)' },
  },
  bounceSoft: {
    '0%, 100%': { transform: 'translateY(0)' },
    '50%': { transform: 'translateY(-5px)' },
  },
  
  // Micro-interaction keyframes
  press: {
    '0%': { transform: 'scale(1)' },
    '50%': { transform: 'scale(0.97)' },
    '100%': { transform: 'scale(1)' },
  },
  shake: {
    '0%, 100%': { transform: 'translateX(0)' },
    '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-4px)' },
    '20%, 40%, 60%, 80%': { transform: 'translateX(4px)' },
  },
};

// === GRADIENTS ===
const backgroundImage = {
  'none': 'none',
  
  // Primary gradients
  'gradient-primary': 'linear-gradient(135deg, #007AFF 0%, #5856D6 100%)',
  'gradient-primary-vertical': 'linear-gradient(180deg, #007AFF 0%, #5856D6 100%)',
  'gradient-primary-soft': 'linear-gradient(135deg, #66B2FF 0%, #8E8CE8 100%)',
  
  // Secondary gradients
  'gradient-secondary': 'linear-gradient(135deg, #5856D6 0%, #BF5AF2 100%)',
  'gradient-nav': 'linear-gradient(90deg, #597DD1 0%, #9D50FF 100%)',
  
  // Status gradients
  'gradient-success': 'linear-gradient(135deg, #34C759 0%, #30D158 100%)',
  'gradient-warning': 'linear-gradient(135deg, #FF9500 0%, #FFCC00 100%)',
  'gradient-error': 'linear-gradient(135deg, #FF3B30 0%, #FF6B6B 100%)',
  'gradient-recording': 'linear-gradient(180deg, #FF3B30 0%, #FF6B6B 100%)',
  
  // Background gradients
  'gradient-hero': 'linear-gradient(180deg, #F2F2F7 0%, #FFFFFF 100%)',
  'gradient-hero-dark': 'linear-gradient(180deg, #1C1C1E 0%, #000000 100%)',
  'gradient-surface': 'linear-gradient(180deg, #FFFFFF 0%, #F2F2F7 100%)',
  
  // Radial gradients
  'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  'gradient-radial-primary': 'radial-gradient(circle at center, #007AFF 0%, transparent 70%)',
  'gradient-radial-glow': 'radial-gradient(circle at center, rgba(0, 122, 255, 0.15) 0%, transparent 70%)',
  
  // Mesh gradients
  'gradient-mesh': 'linear-gradient(135deg, #007AFF 0%, #5856D6 50%, #BF5AF2 100%)',
};

// === TRANSITION TOKENS ===
const transitionDuration = {
  '0': '0ms',
  '75': '75ms',
  '100': '100ms',
  '150': '150ms',
  '200': '200ms',
  '300': '300ms',
  '400': '400ms',
  '500': '500ms',
  '700': '700ms',
  '1000': '1000ms',
};

const transitionTimingFunction = {
  'DEFAULT': 'cubic-bezier(0.4, 0, 0.2, 1)',
  'linear': 'linear',
  'in': 'cubic-bezier(0.4, 0, 1, 1)',
  'out': 'cubic-bezier(0, 0, 0.2, 1)',
  'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
  'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  'spring': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
};

// ============================================================================
// TAILWIND CONFIG EXPORT
// ============================================================================
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  
  // Dark mode configuration
  darkMode: 'class',
  
  theme: {
    // Override spacing to use our scale
    spacing,
    
    extend: {
      // Colors
      colors,
      
      // Typography
      fontFamily,
      fontSize,
      
      // Border Radius
      borderRadius,
      
      // Shadows
      boxShadow,
      
      // Animations
      animation,
      keyframes,
      
      // Background Images/Gradients
      backgroundImage,
      
      // Transitions
      transitionDuration,
      transitionTimingFunction,
      
      // Z-index scale for layering
      zIndex: {
        '0': '0',
        '10': '10',
        '20': '20',
        '30': '30',
        '40': '40',
        '50': '50',      // Header/Nav
        '60': '60',      // Dropdowns
        '70': '70',      // Modals backdrop
        '80': '80',      // Modals
        '90': '90',      // Notifications
        '100': '100',    // Tooltips
        'max': '9999',   // Maximum
      },
      
      // Aspect ratios
      aspectRatio: {
        'auto': 'auto',
        'square': '1 / 1',
        'video': '16 / 9',
        'portrait': '3 / 4',
        'wide': '21 / 9',
        'phone': '9 / 19.5', // iPhone aspect
      },
      
      // Container sizes
      maxWidth: {
        'xs': '20rem',      // 320px
        'sm': '24rem',      // 384px
        'md': '28rem',      // 448px
        'lg': '32rem',      // 512px
        'xl': '36rem',      // 576px
        '2xl': '42rem',     // 672px
        '3xl': '48rem',     // 768px
        '4xl': '56rem',     // 896px
        '5xl': '64rem',     // 1024px
        '6xl': '72rem',     // 1152px
        '7xl': '80rem',     // 1280px
        'prose': '65ch',    // Optimal reading width
        'screen-sm': '640px',
        'screen-md': '768px',
        'screen-lg': '1024px',
        'screen-xl': '1280px',
        'screen-2xl': '1536px',
      },
      
      // Line heights
      lineHeight: {
        'none': '1',
        'tight': '1.15',
        'snug': '1.25',
        'normal': '1.5',
        'relaxed': '1.625',
        'loose': '1.75',
        'extra-loose': '2',
      },
      
      // Letter spacing
      letterSpacing: {
        'tighter': '-0.05em',
        'tight': '-0.025em',
        'normal': '0',
        'wide': '0.025em',
        'wider': '0.05em',
        'widest': '0.1em',
      },
      
      // Backdrop blur
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'DEFAULT': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '40px',
        '3xl': '64px',
      },
      
      // Screen breakpoints
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        // Device-specific
        'mobile': { 'max': '639px' },
        'tablet': { 'min': '640px', 'max': '1023px' },
        'desktop': { 'min': '1024px' },
      },
    },
  },
  
  plugins: [],
  
  // Future flags
  future: {
    respectDefaultRingColorOpacity: true,
    hoverOnlyWhenSupported: true,
  },
};
