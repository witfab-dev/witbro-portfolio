import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter ,Instagram,Facebook} from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Simple contact info - NO href that could cause startsWith error
  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'witnessfabrice@gmail.com' },
    { icon: Phone, label: 'Phone', value: '+250 788 123 456' },
    { icon: MapPin, label: 'Location', value: 'Kigali, Rwanda' }
  ];

  // Social links - SAFE with proper href
  const socialLinks = [
    { icon: Github, href: 'https://github.com/witfab-dev', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/witnessfabrice', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com/witnessfabrice', label: 'Twitter' },
    { icon: Instagram ,href: 'https://instagram.com/witbr1' ,label: 'Instagram'},
     { icon: Facebook ,href: 'https://facebook.com/witbrice' ,label: 'Facebook'}
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitStatus('success');
      setIsSubmitting(false);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitStatus(null), 3000);
    }, 1000);
  };

  return (
    <section id="contact" className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">
            Get In <span className="text-blue-600 dark:text-blue-400">Touch</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Have a question or want to work together? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg"
              >
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold mb-2">{info.label}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{info.value}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Your Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your message here..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 mx-auto"
            >
              {isSubmitting ? (
                <>Sending...</>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Message
                </>
              )}
            </button>

            {submitStatus === 'success' && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-green-600"
              >
                Message sent successfully! I'll get back to you soon.
              </motion.p>
            )}
          </form>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center gap-4 mt-8"
        >
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              <social.icon className="w-5 h-5" />
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;