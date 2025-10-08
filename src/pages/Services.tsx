import { useTranslation } from 'react-i18next';
import './Services.scss';

const Services = () => {
  const { t } = useTranslation();

  return (
    <div className="services">
      <div className="services-header">
        <h1>{t('services.title')}</h1>
        <p>{t('services.subtitle')}</p>
      </div>

      <div className="services-grid">
        <div className="service-card">
          <h3>{t('services.haircut.title')}</h3>
          <p className="service-description">{t('services.haircut.description')}</p>
          <div className="service-pricing">
            <p className="service-price">
              {t('services.haircut.priceMen')} <span className="price-details">{t('services.haircut.priceMenDetails')}</span>
            </p>
            <p className="service-price">
              {t('services.haircut.priceWomen')} <span className="price-details">{t('services.haircut.priceWomenDetails')}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services; 