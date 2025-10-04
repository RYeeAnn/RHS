import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './Home.scss';

const Home = () => {
  const { t } = useTranslation();
  
  return (
    <div className="home">
      <section 
        className="hero" 
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/salon.JPG')`
        }}
      >
        <div className="hero-content">
          <h1>{t('home.title')}</h1>
          <p className="location">{t('home.location')}</p>
          <div className="cta-buttons">
            <a href="tel:+16049312885" className="cta-button secondary">
              <span className="phone-icon">📞</span>
              {t('home.cta')}
            </a>
            <a href="sms:+16047280705" className="cta-button secondary">
              <span className="phone-icon">💬</span>
              {t('home.ctaText')}
            </a>
            <Link to="/appointment" className="cta-button secondary">
              <span className="icon">✉️</span>
              {t('home.bookAppointment')}
            </Link>
          </div>
        </div>
      </section>

      <section className="intro">
        <div className="intro-container">
          <h2>{t('home.welcome')}</h2>
          <p className="appointment-note">
            <em>{t('home.appointmentNote')}</em>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
