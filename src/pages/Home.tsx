import { useTranslation } from 'react-i18next';
import './Home.scss';

const Home = () => {
  const { t } = useTranslation();
  
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>{t('home.title')}</h1>
          <p className="location">{t('home.location')}</p>
          <a href="tel:+16049312885" className="cta-button">
            <span className="phone-icon">📞</span>
            {t('home.cta')}
          </a>
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