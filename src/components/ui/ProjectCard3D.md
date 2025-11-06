# ProjectCard3D Component

## 🎨 Overview
Komponen kartu 3D carousel untuk menampilkan project portfolio dengan efek rotasi 3D yang smooth. Menggunakan glassmorphism dan warna tema yang selaras dengan portfolio.

## ✨ Features
- ✅ 3D Rotating Carousel Effect
- ✅ Auto-rotate dengan pause on hover
- ✅ Glassmorphism design
- ✅ Responsive untuk semua ukuran layar
- ✅ Smooth animations dengan Framer Motion
- ✅ Theme-aware (Light/Dark mode)
- ✅ Glow effects dan gradient overlays

## 🎯 Usage

### Basic Usage
```jsx
import ProjectCard3D from '../ui/ProjectCard3D';

const MyComponent = () => {
  const projects = [
    {
      title: 'Project 1',
      description: 'Amazing project description',
      image: '/path/to/image.jpg',
      tags: ['React', 'Tailwind']
    },
    // ... more projects
  ];

  return (
    <ProjectCard3D projects={projects} />
  );
};
```

### Advanced Usage
```jsx
<ProjectCard3D 
  projects={filteredProjects}
  autoRotate={true}
  rotationSpeed={25}
/>
```

## 📋 Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `projects` | Array | `[]` | Array of project objects |
| `autoRotate` | Boolean | `true` | Enable/disable auto rotation |
| `rotationSpeed` | Number | `20` | Rotation speed in seconds |

### Project Object Structure
```javascript
{
  title: string,        // Required - Project title
  description: string,  // Optional - Short description
  image: string,        // Optional - Project image URL
  tags: string[]       // Optional - Tech stack tags
}
```

## 🎨 Color Theme
Komponen ini menggunakan warna dari Tailwind config:

### Light Mode
- Primary: `#4a90e2` (Blue)
- Secondary: `#8b5cf6` (Purple)
- Background: Glassmorphism dengan opacity

### Dark Mode
- Primary: `#3B82F6` (Lighter Blue)
- Secondary: `#A855F7` (Lighter Purple)
- Background: Dark glassmorphism

## 🌟 Visual Effects

### Gradient Overlays
- `from-primary-500/20 via-secondary-500/20 to-primary-600/30`
- Dynamic gradient based on theme

### Glassmorphism
- `backdrop-blur-sm`
- Semi-transparent backgrounds
- Border with opacity

### Glow on Hover
- Smooth scale animation
- Gradient glow effect
- Enhanced visibility

## 📱 Responsive Design

| Breakpoint | Width | Height |
|------------|-------|--------|
| Mobile | 128px | 192px |
| Small | 160px | 240px |
| Medium+ | 192px | 288px |

## 🔧 Customization

### Adjust Card Size
Modify the container classes:
```jsx
className="relative w-32 h-48 sm:w-40 sm:h-60 md:w-48 md:h-72"
```

### Change Rotation Angle
Modify the perspective and rotateX:
```jsx
style={{
  transformStyle: 'preserve-3d',
  perspective: '1200px', // Increase for less perspective
}}
```

### Adjust translateZ Distance
```javascript
const translateZ = 100 + (quantity * 10); // Modify multiplier
```

## 💡 Tips
1. Optimal: 6-8 projects untuk visual terbaik
2. Gunakan gambar dengan aspect ratio konsisten
3. Pause on hover untuk memudahkan user melihat detail
4. Tags dibatasi 2 item untuk menjaga layout

## 🎬 Animation Details
- **Rotation**: Linear infinite rotation dengan Framer Motion
- **Hover**: Scale 1.05 dengan spring physics
- **Pause**: Auto-pause saat hover untuk interaksi
- **Smooth**: Hardware-accelerated transforms

## 🌐 Browser Support
- ✅ Chrome/Edge (Latest)
- ✅ Firefox (Latest)
- ✅ Safari (Latest)
- ⚠️ IE11 (Fallback tanpa 3D effects)
