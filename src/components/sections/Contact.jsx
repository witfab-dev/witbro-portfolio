import React, { useState, useRef } from 'react'; 
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser'; 
import { 
  Mail, Phone, MapPin, Send, Github, Linkedin, 
  Twitter, Instagram, Facebook, Check, Copy, AlertCircle 
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const Contact = () => {
  const { t } = useLanguage();
  const formRef = useRef(); 
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [copiedField, setCopiedField] = useState(null);

  const contactInfo = [
    { id: 'email', icon: Mail, label: t('emailLabel'), value: 'witnessfabrice@gmail.com', copyable: true },
    { id: 'phone', icon: Phone, label: t('phoneLabel'), value: '+250 783568337', copyable: true },
    { id: 'location', icon: MapPin, label: t('locationLabel'), value: 'Kigali, Rwanda', copyable: false }
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/witfab-dev', color: 'hover:text-white hover:bg-gray-800' },
    { icon: Linkedin, href: 'https://linkedin.com/in/witnessfabrice', color: 'hover:text-white hover:bg-blue-600' },
    { icon: Twitter, href: 'https://twitter.com/wit-fab', color: 'hover:text-white hover:bg-sky-500' },
    { icon: Instagram, href: 'https://instagram.com/witbri1', color: 'hover:text-white hover:bg-pink-600' },
    { icon: Facebook, href: 'https://facebook.com/witbrice', color: 'hover:text-white hover:bg-blue-700' }
  ];

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedField(id);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Keys provided from your dashboard
    const SERVICE_ID = "service_r4cj7xg";
    const TEMPLATE_ID = "template_mn5geej";
    const PUBLIC_KEY = "vNc8MXvN5Xl0NLVsy";

    try {
      // Explicitly initialize with your public key to prevent 422 errors
      emailjs.init(PUBLIC_KEY);

      await emailjs.sendForm(
        SERVICE_ID,
        TEMPLATE_ID,
        formRef.current,
        PUBLIC_KEY
      );

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Submission Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <section id="contact" className="relative py-24 px-4 overflow-hidden bg-slate-50 dark:bg-[#030712]">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            {t('letsCreate') || "Let's Create"} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Something Great</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            {t('contactSubtitle')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group flex items-center p-4 bg-white dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-2xl transition-all hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                    <info.icon size={20} />
                  </div>
                  <div className="ml-4 flex-grow">
                    <p className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">{info.label}</p>
                    <p className="text-gray-900 dark:text-gray-100 font-medium">{info.value}</p>
                  </div>
                  {info.copyable && (
                    <button 
                      type="button"
                      onClick={() => copyToClipboard(info.value, info.id)}
                      className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
                    >
                      {copiedField === info.id ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                    </button>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="p-6 bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl text-white shadow-2xl">
              <h3 className="text-xl font-bold mb-4">{t('followMe') || 'Follow Me'}</h3>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 bg-white/10 backdrop-blur-md rounded-xl transition-all duration-300 transform hover:scale-110 ${social.color}`}
                  >
                    <social.icon size={22} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="lg:col-span-3 bg-white dark:bg-gray-800/40 backdrop-blur-xl border border-gray-200 dark:border-gray-700 p-8 rounded-3xl shadow-2xl"
          >
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-semibold ml-1">{t('nameLabel')}</label>
                  <input
                    name="from_name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-5 py-4 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    placeholder={t('nameLabel')}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold ml-1">{t('emailLabel')}</label>
                  <input
                    name="reply_to"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-5 py-4 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold ml-1">{t('messageLabel')}</label>
                <textarea
                  name="message"
                  required
                  rows="4"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-5 py-4 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
                  placeholder={t('messageLabel')}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`group relative w-full py-4 font-bold rounded-2xl overflow-hidden transition-all shadow-lg shadow-blue-500/25 
                  ${submitStatus === 'error' ? 'bg-red-500' : 'bg-blue-600 hover:bg-blue-700'} text-white disabled:opacity-70`}
              >
                <AnimatePresence mode="wait">
                  {isSubmitting ? (
                    <motion.div key="loading" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {t('loading')}
                    </motion.div>
                  ) : submitStatus === 'success' ? (
                    <motion.div key="success" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex items-center justify-center gap-2">
                      <Check size={20} /> {t('sendSuccess')}
                    </motion.div>
                  ) : submitStatus === 'error' ? (
                    <motion.div key="error" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex items-center justify-center gap-2">
                      <AlertCircle size={20} /> {t('sendError')}
                    </motion.div>
                  ) : (
                    <motion.div key="default" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center gap-2">
                      <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      {t('sendMessage')}
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;