# 🎨 ProjectPlaceholder - Logo SVG untuk Project Showcase

Komponen modern SVG placeholder untuk project showcase yang elegan dan profesional.

## ✨ Fitur Utama

- **4 Variant Unik**: Code, Web, Mobile, Design
- **Responsive Sizes**: Small, Medium, Large, Full
- **Dark Mode Ready**: Otomatis menyesuaikan dengan theme
- **Smooth Animations**: Hover effects yang halus
- **Modern Design**: Gradient backgrounds & dot patterns
- **Lightweight**: Pure SVG, tidak perlu external assets

---

## 📦 File Structure

```
src/components/
├── ui/
│   ├── ProjectPlaceholder.jsx        # Main component
│   └── ProjectPlaceholder.md         # Documentation
├── examples/
│   └── ProjectPlaceholderExample.jsx # Usage examples
└── data/
    └── projects.js                   # Updated with placeholderVariant
```

---

## 🚀 Quick Start

### 1. Import Component

```jsx
import ProjectPlaceholder from './components/ui/ProjectPlaceholder';
```

### 2. Basic Usage

```jsx
<ProjectPlaceholder 
  variant="code" 
  size="full" 
/>
```

### 3. Dalam Project Card

```jsx
<div className="project-card">
  {project.image ? (
    <img src={project.image} alt={project.title} />
  ) : (
    <ProjectPlaceholder 
      variant={project.placeholderVariant || 'code'}
      size="full"
    />
  )}
</div>
```

---

## 🎯 Variants

### 1. **Code** (`variant="code"`)
```jsx
<ProjectPlaceholder variant="code" size="full" />
```
- **Icon**: Code brackets `< >` dengan slash `/`
- **Best For**: Web development, Programming projects
- **Colors**: Primary (Cyan) & Secondary (Purple)

### 2. **Web** (`variant="web"`)
```jsx
<ProjectPlaceholder variant="web" size="full" />
```
- **Icon**: Browser window dengan content lines
- **Best For**: Websites, Web applications
- **Colors**: Purple & Pink gradient

### 3. **Mobile** (`variant="mobile"`)
```jsx
<ProjectPlaceholder variant="mobile" size="full" />
```
- **Icon**: Mobile phone dengan app icons
- **Best For**: Mobile apps, Responsive designs
- **Colors**: Pink & Cyan gradient

### 4. **Design** (`variant="design"`)
```jsx
<ProjectPlaceholder variant="design" size="full" />
```
- **Icon**: Pen tool dengan bezier curves
- **Best For**: UI/UX designs, Graphics
- **Colors**: Orange & Purple gradient

---

## 📏 Sizes

| Size | Dimensions | Class | Usage |
|------|-----------|-------|-------|
| `sm` | 128×128px | `w-32 h-32` | Thumbnails, Icons |
| `md` | 192×192px | `w-48 h-48` | Small cards |
| `lg` | 256×256px | `w-64 h-64` | Medium cards |
| `full` | 100%×100% | `w-full h-full` | Responsive containers |

```jsx
<ProjectPlaceholder variant="web" size="sm" />   // 128px
<ProjectPlaceholder variant="web" size="md" />   // 192px
<ProjectPlaceholder variant="web" size="lg" />   // 256px
<ProjectPlaceholder variant="web" size="full" /> // 100%
```

---

## 💡 Advanced Usage

### Dynamic Variant Mapping

```jsx
const getVariantFromCategory = (category) => {
  const variantMap = {
    'web': 'web',
    'mobile': 'mobile',
    'uiux': 'design',
    'backend': 'code',
    'frontend': 'code'
  };
  return variantMap[category] || 'code';
};

<ProjectPlaceholder 
  variant={getVariantFromCategory(project.category)}
  size="full"
/>
```

### With Aspect Ratio

```jsx
<div className="aspect-video rounded-lg overflow-hidden">
  <ProjectPlaceholder 
    variant="web" 
    size="full"
  />
</div>
```

### Custom Styling

```jsx
<ProjectPlaceholder 
  variant="design"
  size="full"
  className="min-h-[400px] rounded-2xl shadow-2xl border-2 border-primary-500"
/>
```

### Grid Layout

```jsx
<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
  {['code', 'web', 'mobile', 'design'].map(variant => (
    <ProjectPlaceholder 
      key={variant}
      variant={variant}
      size="full"
      className="h-48"
    />
  ))}
</div>
```

---

## 🎨 Styling & Customization

### Tailwind Classes

```jsx
<ProjectPlaceholder 
  variant="code"
  size="full"
  className="
    min-h-[300px]
    rounded-xl
    shadow-lg
    hover:shadow-2xl
    transition-shadow
    duration-300
  "
/>
```

### Dark Mode

Component otomatis menyesuaikan dengan dark mode:
- Background gradients lebih gelap di dark mode
- Icon colors tetap konsisten
- Dot pattern opacity adjusted

---

## 📝 Integration dengan Data

### Update projects.js

```javascript
export const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    category: 'web',
    image: null, // Jika null, akan gunakan placeholder
    placeholderVariant: 'web',
    // ... other fields
  },
  {
    id: 2,
    title: 'Mobile Banking',
    category: 'mobile',
    image: '/images/project.jpg',
    placeholderVariant: 'mobile',
    // ... other fields
  }
];
```

### Portfolio Component

```jsx
import ProjectPlaceholder from '../ui/ProjectPlaceholder';

const Portfolio = () => {
  return (
    <div className="grid grid-cols-3 gap-6">
      {projects.map(project => (
        <div key={project.id} className="project-card">
          <div className="aspect-video overflow-hidden rounded-lg">
            {project.image ? (
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <ProjectPlaceholder 
                variant={project.placeholderVariant}
                size="full"
              />
            )}
          </div>
          <h3>{project.title}</h3>
        </div>
      ))}
    </div>
  );
};
```

---

## 🎬 Examples

Lihat contoh lengkap di:
```
src/components/examples/ProjectPlaceholderExample.jsx
```

Untuk melihat semua variant dan usage examples:

```jsx
import ProjectPlaceholderExample from './components/examples/ProjectPlaceholderExample';

<ProjectPlaceholderExample />
```

---

## 🔧 Props Reference

```typescript
interface ProjectPlaceholderProps {
  variant?: 'code' | 'web' | 'mobile' | 'design';
  size?: 'sm' | 'md' | 'lg' | 'full';
  className?: string;
}
```

### Default Values

```jsx
<ProjectPlaceholder 
  variant="code"      // default
  size="full"         // default
  className=""        // default
/>
```

---

## ✅ Best Practices

1. **Gunakan variant yang sesuai**
   ```jsx
   // ✅ Good
   <ProjectPlaceholder variant="mobile" /> // untuk mobile app project
   
   // ❌ Avoid
   <ProjectPlaceholder variant="code" />   // untuk mobile app project
   ```

2. **Set container aspect ratio**
   ```jsx
   // ✅ Good
   <div className="aspect-video">
     <ProjectPlaceholder variant="web" size="full" />
   </div>
   
   // ❌ Avoid
   <ProjectPlaceholder variant="web" size="full" /> // tanpa container
   ```

3. **Fallback untuk missing images**
   ```jsx
   // ✅ Good
   {project.image ? <img /> : <ProjectPlaceholder />}
   
   // ❌ Avoid
   <img src={project.image} /> // bisa broken image
   ```

---

## 🎯 Use Cases

### 1. Portfolio Showcase
```jsx
<ProjectPlaceholder variant="web" size="full" className="min-h-[400px]" />
```

### 2. Loading State
```jsx
{isLoading ? (
  <ProjectPlaceholder variant="code" size="full" />
) : (
  <img src={project.image} />
)}
```

### 3. Empty State
```jsx
{projects.length === 0 && (
  <div className="text-center">
    <ProjectPlaceholder variant="design" size="lg" className="mx-auto mb-4" />
    <p>No projects yet</p>
  </div>
)}
```

### 4. Image Error Handling
```jsx
<img 
  src={project.image}
  onError={(e) => {
    e.target.style.display = 'none';
    e.target.nextSibling.style.display = 'block';
  }}
/>
<ProjectPlaceholder 
  variant="web" 
  size="full"
  className="hidden"
/>
```

---

## 🌈 Color Palette

### Light Mode
- Primary: `#06B6D4` (Cyan)
- Secondary: `#8B5CF6` (Purple)
- Accent: `#EC4899` (Pink)

### Dark Mode
- Gradients otomatis lebih gelap
- Icons tetap vibrant
- Background opacity adjusted

---

## 📱 Responsive Design

```jsx
<div className="
  w-full 
  h-48 sm:h-64 md:h-80 lg:h-96
">
  <ProjectPlaceholder variant="web" size="full" />
</div>
```

---

## 🚀 Performance

- **SVG-based**: Scalable tanpa loss quality
- **No external dependencies**: Pure React component
- **Small bundle size**: ~3KB
- **CSS animations**: Hardware accelerated

---

## 📄 License

Free to use dalam project Porto Arya Winata.

---

## 🤝 Support

Jika ada pertanyaan atau issue:
1. Lihat dokumentasi di `ProjectPlaceholder.md`
2. Cek examples di `ProjectPlaceholderExample.jsx`
3. Review implementasi di komponen Portfolio

---

**Created with ❤️ for New Porto Project**
