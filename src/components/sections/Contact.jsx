import { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Card from '../ui/Card';
import Button from '../ui/Button';
import FadeIn from '../animations/FadeIn';
import ScrollGradientText from '../ui/ScrollGradientText';
import SectionHeading from '../ui/SectionHeading';
import { navNum } from '../../data/navigation';
import Lanyard from '../ui/Lanyard';

/**
 * Contact Section with form and contact information
 */
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    subject: '',
    message: '',
    website: '', // honeypot anti-bot, tidak pernah tampil ke user
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.projectType) {
      newErrors.projectType = 'Please select a project type';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simpan ke Supabase (tabel contact_messages) lewat serverless API —
      // validasi + honeypot + rate limit dilakukan di server (api/contact.js).
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          projectType: formData.projectType,
          subject: formData.subject,
          message: formData.message,
          website: formData.website || '', // honeypot — manusia tidak mengisinya
        }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(body.error || 'Failed to send message');
      }

      toast.success('Message sent successfully! I\'ll get back to you soon.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        projectType: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try again or contact me directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="section-padding">
      <div className="container-custom">
        {/* Section Header */}
        <FadeIn className="text-center mb-16">
          <SectionHeading num={navNum('contact')} title="Contact" />
          <ScrollGradientText
            as="h2"
            className="text-4xl sm:text-5xl lg:text-6xl font-display mb-4 text-light-text dark:text-dark-text"
            scrollColor="#10B981"
          >
            GET IN TOUCH
          </ScrollGradientText>
          <p className="section-subtitle">
            Have a project in mind? Let&apos;s work together to bring your ideas to life
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Information with Lanyard */}
          <div className="lg:col-span-2 space-y-6">
            {/* Lanyard Card */}
            <FadeIn direction="left">
              <Lanyard />
            </FadeIn>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <FadeIn direction="right">
              <Card className="p-8">
                <h3 className="text-2xl font-bold font-display text-gradient mb-6">
                  Send Me a Message
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Honeypot anti-bot: tersembunyi dari manusia, diisi bot */}
                  <input
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    style={{ position: 'absolute', left: '-9999px', height: 0, width: 0, opacity: 0 }}
                  />
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-light-text dark:text-dark-text mb-2"
                    >
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`input ${errors.name ? 'border-red-500' : ''}`}
                      placeholder="Your name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-light-text dark:text-dark-text mb-2"
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`input ${errors.email ? 'border-red-500' : ''}`}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                    )}
                  </div>

                  {/* Project Type */}
                  <div>
                    <label
                      htmlFor="projectType"
                      className="block text-sm font-medium text-light-text dark:text-dark-text mb-2"
                    >
                      Project Type *
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className={`input ${errors.projectType ? 'border-red-500' : ''}`}
                    >
                      <option value="">Select project type</option>
                      <option value="web-development">Web Development</option>
                      <option value="ui-ux-design">UI/UX Design</option>
                      <option value="mobile-responsive">Mobile Responsive</option>
                      <option value="consultation">Consultation</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.projectType && (
                      <p className="mt-1 text-sm text-red-500">{errors.projectType}</p>
                    )}
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-light-text dark:text-dark-text mb-2"
                    >
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`input ${errors.subject ? 'border-red-500' : ''}`}
                      placeholder="What is this about?"
                    />
                    {errors.subject && (
                      <p className="mt-1 text-sm text-red-500">{errors.subject}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-light-text dark:text-dark-text mb-2"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className={`input resize-none ${errors.message ? 'border-red-500' : ''}`}
                      placeholder="Tell me about your project..."
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="gradient"
                    size="lg"
                    fullWidth
                    icon={FaPaperPlane}
                    isLoading={isSubmitting}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </Card>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </div>
  );
};

export default Contact;
