import ProjectPlaceholder from '../ui/ProjectPlaceholder';

/**
 * Example Component showing different ProjectPlaceholder variants
 * Dapat digunakan sebagai referensi implementasi
 */
const ProjectPlaceholderExample = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">ProjectPlaceholder Examples</h1>
      
      {/* All Variants */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">All Variants</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <p className="text-sm font-medium mb-2 text-center">Code</p>
            <ProjectPlaceholder variant="code" size="full" className="h-48" />
          </div>
          <div>
            <p className="text-sm font-medium mb-2 text-center">Web</p>
            <ProjectPlaceholder variant="web" size="full" className="h-48" />
          </div>
          <div>
            <p className="text-sm font-medium mb-2 text-center">Mobile</p>
            <ProjectPlaceholder variant="mobile" size="full" className="h-48" />
          </div>
          <div>
            <p className="text-sm font-medium mb-2 text-center">Design</p>
            <ProjectPlaceholder variant="design" size="full" className="h-48" />
          </div>
        </div>
      </div>

      {/* Different Sizes */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Different Sizes</h2>
        <div className="flex flex-wrap items-end gap-6 justify-center">
          <div className="text-center">
            <p className="text-sm font-medium mb-2">Small</p>
            <ProjectPlaceholder variant="code" size="sm" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium mb-2">Medium</p>
            <ProjectPlaceholder variant="web" size="md" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium mb-2">Large</p>
            <ProjectPlaceholder variant="mobile" size="lg" />
          </div>
        </div>
      </div>

      {/* Project Card Example */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">In Project Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['code', 'web', 'mobile'].map((variant) => (
            <div key={variant} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="aspect-video">
                <ProjectPlaceholder variant={variant} size="full" />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">Project Title</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  This is a {variant} development project showcasing modern techniques.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* With Image Fallback Example */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Image Fallback Example</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="aspect-video bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <span className="text-gray-500">Image Not Found</span>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">Without Placeholder</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Project without image shows broken state
              </p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="aspect-video">
              <ProjectPlaceholder variant="design" size="full" />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">With Placeholder</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Project with placeholder looks professional
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Variant Example */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">Dynamic Variant Based on Category</h2>
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
          <pre className="text-sm overflow-x-auto">
{`const getVariantFromCategory = (category) => {
  const variantMap = {
    'web': 'web',
    'mobile': 'mobile',
    'uiux': 'design',
    'backend': 'code'
  };
  return variantMap[category] || 'code';
};

// Usage
<ProjectPlaceholder 
  variant={getVariantFromCategory(project.category)}
  size="full"
/>`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ProjectPlaceholderExample;
