# ClinRoute - Modern Frontend Architecture

## 📁 Project Structure

```
src/
├── components/           # Reusable React components
│   ├── ui/              # Modern UI components (Toast, Button, Card, etc.)
│   └── layout/          # Layout components (Header, Footer, Sidebar)
│
├── pages/               # Page components
│   ├── public/          # Public pages (Home, Login, Register)
│   ├── patient/         # Patient dashboard pages
│   ├── doctor/          # Doctor dashboard pages
│   └── chat/            # RAG-powered chat interface
│
├── lib/                 # Core utilities and configurations
│   ├── groq.js          # Groq AI (Llama 3.3) integration
│   ├── supabase.js      # Supabase client
│   └── utils.js         # Utility functions
│
├── hooks/               # Custom React hooks
│   └── index.js         # useAsync, useDebounce, useForm, etc.
│
├── context/             # React Context providers
│   └── AuthContext.js   # Authentication state management
│
└── styles/              # Global styles
    └── index.css        # Tailwind CSS + custom variables
```

## 🚀 Modern Tech Stack

### Core Technologies
- **React 18** - Latest React with concurrent features
- **React Router v6** - Modern routing with layouts
- **Tailwind CSS v3** - Utility-first CSS framework
- **TypeScript** - Type-safe JavaScript (configured, ready to use)

### UI & Animation
- **Framer Motion** - Production-ready motion library
- **Lucide React** - Beautiful, consistent icons
- **Material-UI** - Component library for complex UIs
- **Custom Toast** - Modern notifications with Framer Motion

### Backend & AI
- **Groq SDK** - Llama 3.3 70B for medical triage
- **Supabase** - PostgreSQL database & authentication
- **RAG Architecture** - Retrieval-Augmented Generation for medical accuracy

## 🎨 Key Features

### Modern Component Patterns
```javascript
// Animated components with Framer Motion
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  whileHover={{ scale: 1.05 }}
>
  Content
</motion.div>

// Custom hooks for reusability
const { data, loading, error } = useAsync(fetchData);
const debouncedSearch = useDebounce(searchTerm, 500);
```

### Modern Utility Usage
```javascript
import { formatDate, truncate, storage } from '@/lib/utils';
import { useForm, useMediaQuery } from '@/hooks';

// Form management
const { values, handleChange, errors } = useForm({ email: '', password: '' });

// Responsive design
const isMobile = useMediaQuery('(max-width: 768px)');
```

## 📦 Component Organization

### UI Components (`components/ui/`)
Reusable, accessible, animated components:
- `Toast.jsx` - Modern toast notifications with Framer Motion
- Future: Button, Card, Modal, Input, etc.

### Page Components (`pages/`)
Feature-complete page components with modern patterns:
- Animated page transitions
- Loading states with Suspense
- Error boundaries
- SEO optimization ready

## 🎯 Best Practices

### 1. Component Structure
```javascript
import { motion } from 'framer-motion';
import { Icon } from 'lucide-react';
import { useAsync } from '@/hooks';
import { utils } from '@/lib/utils';

const Component = () => {
  // 1. Hooks at the top
  const { data } = useAsync(fetchData);
  
  // 2. Event handlers
  const handleClick = () => {};
  
  // 3. Render logic
  return (
    <motion.div>
      <Icon size={20} />
    </motion.div>
  );
};

export default Component;
```

### 2. Animation Patterns
```javascript
// Consistent animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

// Stagger children
const staggerContainer = {
  animate: {
    transition: { staggerChildren: 0.1 }
  }
};
```

### 3. Error Handling
```javascript
const { data, loading, error } = useAsync(fetchData);

if (loading) return <LoadingSpinner />;
if (error) return <ErrorMessage error={error} />;
return <Content data={data} />;
```

## 🔧 Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

## 🎭 Key Differences from Old Stack

### ❌ Old Approach
- react-toastify (heavy, limited customization)
- Inline SVG icons (repetitive, hard to maintain)
- CSS modules without Tailwind utilities
- No TypeScript support
- Limited animation capabilities

### ✅ Modern Approach
- Custom Toast with Framer Motion (lightweight, fully customizable)
- Lucide React icons (tree-shakeable, consistent)
- Tailwind CSS utilities + custom CSS
- TypeScript configured and ready
- Smooth animations everywhere with Framer Motion

## 📚 Learning Resources

- [Framer Motion Docs](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com)
- [Lucide Icons](https://lucide.dev)
- [React 18 Features](https://react.dev)

## 🚨 Migration Notes

If upgrading from old code:
1. Replace `react-toastify` with `useToast()` hook
2. Update imports from `utils/` to `lib/`
3. Replace inline SVG with Lucide icons
4. Add Framer Motion animations to static components
5. Use custom hooks from `hooks/` for common patterns

---

**Built with ❤️ for modern healthcare triage**
