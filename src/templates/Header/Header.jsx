import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { defineDevice, switchTheme } from "../../features/sharedSlice";

export default function Header() {
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const [language, setLanguage] = useState(i18n.resolvedLanguage);

    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        dispatch(defineDevice());
    }

    useEffect(() => {
        setLanguage(i18n.resolvedLanguage);
    }, [i18n.resolvedLanguage]);

    const switchLanguage = () => {
        if (language === 'pt') {
            i18n.changeLanguage('en')
        } else {
            i18n.changeLanguage('pt')
        }
    }

    const theme = useSelector(state => state.shared.theme);
    const device = useSelector(state => state.shared.device);
    return (
        <div className={theme+' '+device+'header sticky-top max-width d-flex justify-between py-1 px-3'} 
        style={{width: '100%', backgroundColor: 'var(--color-background)'}}
        >
            <div className='d-flex g-1' >
                <div className="d-flex hug-width g-0 cursor-pointer no-selection" onClick={switchLanguage}>
                    <div className={language === 'pt' ? '' : 'disabled-text'}
                    >PT</div>
                    <span>|</span>
                    <div className={language === 'en' ? '' : 'disabled-text'}
                    >EN</div>
                </div>
                <div className="no-selection center cursor-pointer"
                style={{lineHeight: theme == 'dark-theme' ? '' : '10px', width: '1rem'}}
                onClick={() => dispatch(switchTheme())}>
                    {theme === 'dark-theme' ? '☼' : '☾'}
                </div>
            </div>
            <NavLink  className={ ( {isActive} ) => isActive ? 'd-none' : ''} to="/">{t('header.home')}</NavLink>
            <NavLink  className={ ( {isActive} ) => isActive ? 'd-none' : ''} to="/about">{t('header.about')}</NavLink>            
        </div>
        
    )
}