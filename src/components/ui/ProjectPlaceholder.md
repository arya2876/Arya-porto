# ProjectPlaceholder Component

Komponen logo SVG modern untuk project showcase ketika tidak ada gambar yang tersedia.

## Features

- 🎨 4 Variant berbeda: `code`, `web`, `mobile`, `design`
- 📱 Responsive dengan 4 ukuran: `sm`, `md`, `lg`, `full`
- 🌓 Support dark/light mode
- ✨ Animasi hover interaktif
- 🎯 Gradient background yang modern
- 🔄 Dot pattern overlay
- 💫 Corner accents untuk detail

## Variants

### 1. Code (`variant="code"`)
- Tampilan: Code brackets `< >` dan slash `/`
- Cocok untuk: Web development, coding projects
- Warna: Primary & Secondary gradient

### 2. Web (`variant="web"`)
- Tampilan: Browser window dengan top bar dan content lines
- Cocok untuk: Website projects, web apps
- Warna: Purple & Pink gradient

### 3. Mobile (`variant="mobile"`)
- Tampilan: Mobile phone frame dengan app icons
- Cocok untuk: Mobile apps, responsive designs
- Warna: Pink & Cyan gradient

### 4. Design (`variant="design"`)
- Tampilan: Pen tool dengan bezier curves
- Cocok untuk: UI/UX designs, graphics
- Warna: Orange & Purple gradient

## Usage

### Basic

```jsx
import ProjectPlaceholder from '../ui/ProjectPlaceholder';

<ProjectPlaceholder 
  variant="code" 
  size="full" 
/>
```

### Dalam Project Card

```jsx
<div className="project-card">
  {project.image ? (
    <img src={project.image} alt={project.title} />
  ) : (
    <ProjectPlaceholder 
      variant="web" 
      size="full"
      className="min-h-[300px]" 
    />
  )}
</div>
```

### Grid dengan berbagai variant

```jsx
<div className="grid grid-cols-2 gap-4">
  <ProjectPlaceholder variant="code" size="md" />
  <ProjectPlaceholder variant="web" size="md" />
  <ProjectPlaceholder variant="mobile" size="md" />
  <ProjectPlaceholder variant="design" size="md" />
</div>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'code' \| 'web' \| 'mobile' \| 'design'` | `'code'` | Jenis icon yang ditampilkan |
| `size` | `'sm' \| 'md' \| 'lg' \| 'full'` | `'full'` | Ukuran komponen |
| `className` | `string` | `''` | Additional CSS classes |

## Sizes

- `sm`: 128px × 128px (w-32 h-32)
- `md`: 192px × 192px (w-48 h-48)
- `lg`: 256px × 256px (w-64 h-64)
- `full`: 100% × 100% (w-full h-full)

## Examples

### Portfolio Section

```jsx
const projects = [
  {
    title: "E-Commerce Platform",
    image: null,
    type: "web"
  },
  {
    title: "Mobile Banking App",
    image: null,
    type: "mobile"
  }
];

{projects.map(project => (
  <div key={project.title} className="aspect-video">
    <ProjectPlaceholder 
      variant={project.type}
      size="full"
    />
  </div>
))}
```

### Dynamic Variant

```jsx
const getVariantFromCategory = (category) => {
  const variantMap = {
    'frontend': 'web',
    'backend': 'code',
    'mobile': 'mobile',
    'uiux': 'design'
  };
  return variantMap[category] || 'code';
};

<ProjectPlaceholder 
  variant={getVariantFromCategory(project.category)}
  size="full"
/>
```

## Styling

Komponen menggunakan Tailwind classes dan dapat dikustomisasi:

```jsx
<ProjectPlaceholder 
  variant="code"
  size="full"
  className="min-h-[400px] rounded-2xl shadow-xl"
/>
```

## Dark Mode

Komponen otomatis menyesuaikan dengan theme (light/dark mode) menggunakan Tailwind dark: prefix.

## Animation

- Icon memiliki `hover:scale-110` transform
- Smooth transition dengan `duration-300`
- Text overlay muncul saat hover

## Browser Compatibility

✅ Modern browsers dengan SVG support
✅ Chrome, Firefox, Safari, Edge
✅ Mobile browsers
