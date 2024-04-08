import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { defineDevice, switchTheme } from "../../features/sharedSlice";
import { Barcode } from "../../components/Barcode/Barcode";
import './Header.scss'
import { Glare } from "../../components/Glare/Glare";
import { Sparkles } from "../../components/Sparkles/Sparkles";

export default function Header() {
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const [language, setLanguage] = useState(i18n.resolvedLanguage);
    const [menu, setMenu] = useState(false);
    const { pathname } = location;
    let home = pathname == '/' ? ' home' : '';

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
    
    const menuMobile = () => {
        return(
        <div className='menu-btn-mobile bk-none desktop-hide click' onClick={handleMenu}>
            MENU
        </div>
        )
    }

    const sparkles = () => {
        return (
            <span className='heading3'>*✧•｡˖ </span> 
        )
    }

    const controls = () => {
        return (
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
        )
    }

    const empty = () => {
        return (
            <></>
        )
    }

    const theme = useSelector(state => state.shared.theme);
    const device = useSelector(state => state.shared.device);
    return (
        <div className={theme+device+home+' page overlay bk-none pointer-events-none'}>
            <div className="page-content justify-end">
                <Sparkles element1={controls} element2={menuMobile}/>
              
            </div>

            <div className="sidebar-wrapper sidebar-tag center absolute bottom-0 right-0 max-height mobile-hide">
                <div className="menu-tag">CYBERMUSE™ APRIL, 2024</div>
            </div>     
            <div className="sidebar-wrapper sidebar-menu max-height flex-column absolute right-0 mobile-hide">
                <div className="menu-btn-wrapper">
                    <div className="menu-btn click"
                        onClick={() => setMenu(!menu)}>
                            <div className="barcode"></div>
                            <div>MENU</div>
                    </div>                        
                </div>
            </div>                   
            <div className='overlay pointer-events-none d-flex justify-between'>
                <div className="flex-column justify-end m-page">
                                    
                </div>
            </div>

            <div className="overlay flex-column center bk-color" style={{display: menu ? 'flex' : 'none', zIndex: 999}}>
                <div className='flex-column heading3' style={{width: '300px'}}>
                    <div className="click heading3 ellipsis" onClick={() => setMenu(!menu)}>{t('header.return')}.......................................................................</div>
                    <NavLink onClick={() => setMenu(!menu)} className={ ( {isActive} ) => isActive ? 'd-none' : 'click ellipsis heading3'} to="/">{t('header.home')}.......................................................................</NavLink>
                    <NavLink onClick={() => setMenu(!menu)} className={ ( {isActive} ) => isActive ? 'd-none' : 'click ellipsis heading3'} to="/about">{t('header.about')}.......................................................................</NavLink>
                </div>
            </div>         
            
            <div className="overlay blur-overlay pointer-events-none"></div>
        </div>        
    )
}