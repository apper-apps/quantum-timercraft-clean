const templates = [
  {
    id: 'minimalist',
    name: 'Minimalist',
    category: 'Modern',
    description: 'Clean, minimal design with subtle elegance',
    icon: 'Minus',
    featured: true,
    preview: 'HH:MM',
    colors: {
      primary: '#000000',
      secondary: '#666666',
      background: '#FFFFFF',
      accent: '#F5F5F5'
    },
    config: {
      showDays: false,
      showHours: true,
      showMinutes: true,
      showSeconds: false,
      fontSize: 32,
      fontFamily: 'Helvetica, sans-serif',
      textColor: '#000000',
      backgroundColor: '#FFFFFF',
      padding: 16,
      borderRadius: 4,
      animationType: 'fade',
      fontWeight: '300',
      letterSpacing: '0.1em'
    },
    style: {
      borderStyle: 'none',
      boxShadow: 'none',
      textTransform: 'none'
    }
  },
  {
    id: 'neon-retro',
    name: 'Neon Retro',
    category: 'Retro',
    description: 'Cyberpunk-inspired neon aesthetics',
    icon: 'Zap',
    featured: true,
    preview: 'DD:HH:MM:SS',
    colors: {
      primary: '#00FFFF',
      secondary: '#FF00FF',
      background: '#0A0A0A',
      accent: '#1A1A2E'
    },
    config: {
      showDays: true,
      showHours: true,
      showMinutes: true,
      showSeconds: true,
      fontSize: 28,
      fontFamily: 'Courier New, monospace',
      textColor: '#00FFFF',
      backgroundColor: '#0A0A0A',
      padding: 24,
      borderRadius: 8,
      animationType: 'slide',
      fontWeight: '700',
      letterSpacing: '0.15em'
    },
    style: {
      borderStyle: 'solid',
      borderColor: '#00FFFF',
      borderWidth: '2px',
      boxShadow: '0 0 20px rgba(0, 255, 255, 0.3), inset 0 0 20px rgba(0, 255, 255, 0.1)',
      textShadow: '0 0 10px #00FFFF',
      background: 'linear-gradient(135deg, #0A0A0A 0%, #1A1A2E 100%)'
    }
  },
  {
    id: 'modern-dark',
    name: 'Modern Dark',
    category: 'Modern',
    description: 'Sleek dark theme with gradient accents',
    icon: 'Moon',
    featured: false,
    preview: 'DD:HH:MM',
    colors: {
      primary: '#FFFFFF',
      secondary: '#A855F7',
      background: '#1F2937',
      accent: '#374151'
    },
    config: {
      showDays: true,
      showHours: true,
      showMinutes: true,
      showSeconds: false,
      fontSize: 26,
      fontFamily: 'Roboto, sans-serif',
      textColor: '#FFFFFF',
      backgroundColor: '#1F2937',
      padding: 20,
      borderRadius: 12,
      animationType: 'scale',
      fontWeight: '500'
    },
    style: {
      borderStyle: 'none',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
      background: 'linear-gradient(135deg, #1F2937 0%, #374151 100%)'
    }
  },
  {
    id: 'vintage',
    name: 'Vintage',
    category: 'Classic',
    description: 'Classic vintage style with warm tones',
    icon: 'Clock',
    featured: false,
    preview: 'HH:MM:SS',
    colors: {
      primary: '#8B4513',
      secondary: '#CD853F',
      background: '#FDF5E6',
      accent: '#DEB887'
    },
    config: {
      showDays: false,
      showHours: true,
      showMinutes: true,
      showSeconds: true,
      fontSize: 24,
      fontFamily: 'Georgia, serif',
      textColor: '#8B4513',
      backgroundColor: '#FDF5E6',
      padding: 18,
      borderRadius: 6,
      animationType: 'bounce',
      fontWeight: '400'
    },
    style: {
      borderStyle: 'solid',
      borderColor: '#CD853F',
      borderWidth: '3px',
      boxShadow: '0 4px 8px rgba(139, 69, 19, 0.2)',
      textShadow: '1px 1px 2px rgba(139, 69, 19, 0.3)'
    }
  },
  {
    id: 'corporate',
    name: 'Corporate',
    category: 'Professional',
    description: 'Professional blue theme for business use',
    icon: 'Building',
    featured: false,
    preview: 'DD:HH:MM',
    colors: {
      primary: '#1E40AF',
      secondary: '#3B82F6',
      background: '#F8FAFC',
      accent: '#E2E8F0'
    },
    config: {
      showDays: true,
      showHours: true,
      showMinutes: true,
      showSeconds: false,
      fontSize: 22,
      fontFamily: 'Arial, sans-serif',
      textColor: '#1E40AF',
      backgroundColor: '#F8FAFC',
      padding: 16,
      borderRadius: 8,
      animationType: 'fade',
      fontWeight: '600'
    },
    style: {
      borderStyle: 'solid',
      borderColor: '#3B82F6',
      borderWidth: '1px',
      boxShadow: '0 2px 4px rgba(30, 64, 175, 0.1)'
    }
  },
  {
    id: 'creative',
    name: 'Creative',
    category: 'Artistic',
    description: 'Colorful gradient design for creative projects',
    icon: 'Palette',
    featured: false,
    preview: 'HH:MM:SS',
    colors: {
      primary: '#EC4899',
      secondary: '#8B5CF6',
      background: '#FFFFFF',
      accent: '#F3E8FF'
    },
    config: {
      showDays: false,
      showHours: true,
      showMinutes: true,
      showSeconds: true,
      fontSize: 30,
      fontFamily: 'Open Sans, sans-serif',
      textColor: '#EC4899',
      backgroundColor: '#FFFFFF',
      padding: 22,
      borderRadius: 16,
      animationType: 'flip',
      fontWeight: '700'
    },
    style: {
      borderStyle: 'none',
      boxShadow: '0 8px 32px rgba(236, 72, 153, 0.2)',
      background: 'linear-gradient(135deg, #FFFFFF 0%, #F3E8FF 100%)',
      textBackground: 'linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)'
    }
  }
];

const getTemplates = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...templates]);
    }, 100);
  });
};

const getTemplateById = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const template = templates.find(t => t.id === id);
      resolve(template ? { ...template } : null);
    }, 100);
  });
};

const getFeaturedTemplates = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const featured = templates.filter(t => t.featured);
      resolve([...featured]);
    }, 100);
  });
};

const getTemplatesByCategory = (category) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filtered = templates.filter(t => t.category === category);
      resolve([...filtered]);
    }, 100);
  });
};

const getCategories = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const categories = [...new Set(templates.map(t => t.category))];
      resolve(categories);
    }, 100);
  });
};

export default {
  getTemplates,
  getTemplateById,
  getFeaturedTemplates,
  getTemplatesByCategory,
  getCategories
};