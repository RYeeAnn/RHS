import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Appointment.scss';

const Appointment = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    notes: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const isLocalhost = window.location.hostname === 'localhost' || 
                          window.location.hostname === '127.0.0.1';
      const apiUrl = isLocalhost ? 'http://localhost:5001/api/appointment' : '/api/appointment';
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', phone: '', service: '', date: '', time: '', notes: '' });
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

  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
    '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM'
  ];

  return (
    <div className="appointment-page">
      <div className="appointment-header">
        <h1>{t('appointment.title')}</h1>
        <p className="subtitle">{t('appointment.subtitle')}</p>
      </div>

      <div className="appointment-content">
        <div className="appointment-form-section">
          <form onSubmit={handleSubmit} className="appointment-form">
            <div className="form-group">
              <label htmlFor="name">{t('appointment.form.name')}</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t('appointment.form.namePlaceholder')}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">{t('appointment.form.phone')}</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder={t('appointment.form.phonePlaceholder')}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="service">{t('appointment.form.service')}</label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
              >
                <option value="">{t('appointment.form.servicePlaceholder')}</option>
                <option value="haircut">{t('appointment.form.serviceHaircut')}</option>
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="date">{t('appointment.form.date')}</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="time">{t('appointment.form.time')}</label>
                <select
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                >
                  <option value="">{t('appointment.form.timePlaceholder')}</option>
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="notes">{t('appointment.form.notes')}</label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder={t('appointment.form.notesPlaceholder')}
                rows={4}
              />
            </div>

            {status === 'success' && (
              <div className="form-message success">
                {t('appointment.form.success')}
              </div>
            )}

            {status === 'error' && (
              <div className="form-message error">
                {t('appointment.form.error')}
              </div>
            )}

            <button 
              type="submit" 
              className="submit-button"
              disabled={status === 'sending'}
            >
              {status === 'sending' 
                ? t('appointment.form.sending') 
                : t('appointment.form.submit')}
            </button>
          </form>
        </div>

        <div className="appointment-info">
          <div className="info-card">
            <div className="icon">📞</div>
            <h3>{t('appointment.phoneInfo.title')}</h3>
            <a href="tel:+16049312885" className="contact-link">
              (604) 931-2885
            </a>
            <p className="note">{t('appointment.phoneInfo.description')}</p>
          </div>

          <div className="info-card">
            <div className="icon">ℹ️</div>
            <h3>Note</h3>
            <p className="note">{t('appointment.note')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
