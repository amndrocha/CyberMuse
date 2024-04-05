import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { switchTheme } from "../../features/sharedSlice";

export default function Header() {
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const [language, setLanguage] = useState(i18n.resolvedLanguage);

    useEffect(() => {
        setLanguage(i18n.resolvedLanguage);
    }, [i18n.resolvedLanguage]);

    const theme = useSelector(state => state.shared.theme);
    return (
        <div className={theme} 
        style={{width: '100%', backgroundColor: 'var(--color-background)'}}
        >
            <div className="header max-width d-flex justify-end g-1 py-1 px-3">
                <Link to="/">{t('header.home')}</Link>
                <Link to="/about">{t('header.about')}</Link>
                <div className="d-flex hug-width g-0">
                    <div onClick={() => i18n.changeLanguage('pt')}
                    className={language === 'pt' ? '' : 'cursor-pointer disabled-text'}
                    >PT</div>
                    <span className="no-selection">|</span>
                    <div onClick={() => i18n.changeLanguage('en')}
                    className={language === 'en' ? '' : 'cursor-pointer disabled-text'}
                    >EN</div>
                </div>
                <div className="no-selection center"
                style={{lineHeight: theme == 'dark-theme' ? '' : '10px', width: '1rem'}}
                onClick={() => dispatch(switchTheme())}>
                    {theme === 'dark-theme' ? '☼' : '☾'}
                </div>
            </div>            
        </div>
        
    )
}