import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { defineDevice, switchTheme } from "../../features/sharedSlice";
import { Barcode } from "../../components/Barcode/Barcode";
import './Header.scss'
import { Glare } from "../../components/Glare/Glare";

export default function Header() {
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const [language, setLanguage] = useState(i18n.resolvedLanguage);
    const [menu, setMenu] = useState(false);
    const { pathname } = location;

    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        dispatch(defineDevice());
    }

    const handleMenu = () => {
        setMenu(!menu);
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
        <div className={theme+' '+device}>
            <div className='overlay pointer-events-none d-flex justify-between p-3'>
                <div className="d-flex flex-column justify-end">
                    <div className='d-flex g-1 hug-height pointer-events-auto'>
                        <div className="d-flex hug-width g-0 click no-selection" onClick={switchLanguage}>
                            <div className={language === 'pt' ? '' : 'disabled-text'}
                            >PT</div>
                            <span>|</span>
                            <div className={language === 'en' ? '' : 'disabled-text'}
                            >EN</div>
                        </div>
                        <div className="no-selection center click"
                        style={{lineHeight: theme == 'dark-theme' ? '' : '10px', width: '1rem'}}
                        onClick={() => dispatch(switchTheme())}>
                            {theme === 'dark-theme' ? '☼' : '☾'}
                        </div>
                    </div>                
                </div>             
                <div className="menu-btn hug-height click flex-column align-center justify-end" onClick={() => setMenu(!menu)}>
                    <Barcode height={0.8} bars={25}/>
                    <div className="bk-lightest text-darkest center" style={{height: '0.8rem'}}>MENU</div>
                </div>
            </div>

            <div className="overlay center flex-column bk-color" style={{display: menu ? 'flex' : 'none'}}>
                <div className="click" onClick={() => setMenu(!menu)}>{t('header.return')}</div>
                <NavLink onClick={() => setMenu(!menu)} className={ ( {isActive} ) => isActive ? 'd-none' : ''} to="/">{t('header.home')}</NavLink>    
                <NavLink onClick={() => setMenu(!menu)} className={ ( {isActive} ) => isActive ? 'd-none' : ''} to="/about">{t('header.about')}</NavLink>    
            </div>        
        </div>        
    )
}