import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Contact.scss';

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const apiUrl = process.env.NODE_ENV === 'production' 
        ? '/api/contact' 
        : 'http://localhost:5001/api/contact';
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <div className="contact">
      <div className="contact-header">
        <h1>{t('contact.title')}</h1>
      </div>

      <div className="contact-content">
        <div className="contact-form-section">
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">{t('contact.form.name')} *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t('contact.form.namePlaceholder')}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">{t('contact.form.email')} *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t('contact.form.emailPlaceholder')}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">{t('contact.form.phone')}</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder={t('contact.form.phonePlaceholder')}
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">{t('contact.form.message')} *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={t('contact.form.messagePlaceholder')}
                rows={6}
                required
              />
            </div>

            {status === 'success' && (
              <div className="form-message success">
                {t('contact.form.success')}
              </div>
            )}

            {status === 'error' && (
              <div className="form-message error">
                {t('contact.form.error')}
              </div>
            )}

            <button 
              type="submit" 
              className="submit-button"
              disabled={status === 'sending'}
            >
              {status === 'sending' ? t('contact.form.sending') : t('contact.form.submit')}
            </button>
          </form>
        </div>

        <div className="contact-info">
          <div className="info-card">
            <div className="icon">📞</div>
            <h3>{t('contact.info.phone')}</h3>
            <a href="tel:+16049312885" className="contact-link">
              (604) 931-2885
            </a>
            <p className="note">{t('contact.info.callAnytime')}</p>
          </div>

          <div className="info-card">
            <div className="icon">📍</div>
            <h3>{t('contact.info.location')}</h3>
            <p className="address">
              {t('contact.info.address')}
            </p>
            <p className="note">{t('contact.info.byAppt')}</p>
          </div>

          <div className="info-card">
            <div className="icon">🕐</div>
            <h3>{t('contact.info.hours')}</h3>
            <div className="hours">
              <p>{t('contact.info.weekdays')}</p>
              <p>{t('contact.info.saturday')}</p>
              <p>{t('contact.info.sunday')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 