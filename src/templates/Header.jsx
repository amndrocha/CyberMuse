import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import './Header.scss';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { switchTheme } from "../features/sharedSlice";

export default function Header() {
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const [language, setLanguage] = useState(i18n.resolvedLanguage);

    useEffect(() => {
        setLanguage(i18n.resolvedLanguage);
    }, [i18n.resolvedLanguage]);

    const theme = useSelector(state => state.shared.theme);
    return (
        <div className={theme} style={{width: '100%'}}>
            <div className="header">
                <div className="header-link"><Link to="/">{t('header.home')}</Link></div>
                <div className="header-link"><Link to="/about">{t('header.about')}</Link></div>
                <div className="language-buttons default-cursor">
                    <div onClick={() => i18n.changeLanguage('pt')}
                    className={language === 'pt' ? 'selected-language' : 'unselected-language'}
                    >PT</div>
                    |
                    <div onClick={() => i18n.changeLanguage('en')}
                    className={language === 'en' ? 'selected-language' : 'unselected-language'}
                    >EN</div>
                </div>
                <div onClick={() => dispatch(switchTheme())}>☼</div>
            </div>            
        </div>
        
    )
}