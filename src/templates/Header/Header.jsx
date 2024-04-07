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

    const theme = useSelector(state => state.shared.theme);
    const device = useSelector(state => state.shared.device);
    return (
        <div className={theme+device+home}>
            <div className='overlay pointer-events-none d-flex justify-between'>
                <div className="flex-column justify-end p-3">
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
                <div className="sidebar-wrapper absolute bottom-0 right-0 max-height">
                    <div className="menu-tag">CYBERMUSE™ APRIL, 2024</div>
                </div>
                <div className="sidebar-wrapper absolute bottom-0 right-0 max-height bk-transparent">
                    <div className="sidebar d-flex p-1 max-height g-2">
                        <div className="menu-btn max-height click flex-column align-center justify-end"
                        onClick={() => setMenu(!menu)}>
                            <span className={home ? '' : 'd-none'}><Barcode height={0.5} bars={30}/></span>
                            <div className={home ? "text-darkest center" : "center"} style={{height: '0.5rem', backgroundColor: home ? 'var(--color-lightest)' : 'transparent'}}>MENU</div>
                        </div>                    
                    </div>                
                </div>
        

            </div>

            <div className="overlay flex-column center bk-color" style={{display: menu ? 'flex' : 'none', zIndex: 2}}>
                {/* <div className="click heading3" onClick={() => setMenu(!menu)}>{t('header.return')}</div>
                <NavLink onClick={() => setMenu(!menu)} className={ ( {isActive} ) => isActive ? 'd-none' : 'heading3'} to="/">{t('header.home')}</NavLink>    
                <NavLink onClick={() => setMenu(!menu)} className={ ( {isActive} ) => isActive ? 'd-none' : 'heading3'} to="/about">{t('header.about')}</NavLink>     */}
                <div className='flex-column heading3' style={{width: '300px'}}>
                    <div className="click heading3 ellipsis" onClick={() => setMenu(!menu)}>{t('header.return')}.......................................................................</div>
                    <NavLink onClick={() => setMenu(!menu)} className={ ( {isActive} ) => isActive ? 'd-none' : 'ellipsis heading3'} to="/">{t('header.home')}.......................................................................</NavLink>
                    <NavLink onClick={() => setMenu(!menu)} className={ ( {isActive} ) => isActive ? 'd-none' : 'ellipsis heading3'} to="/about">{t('header.about')}.......................................................................</NavLink>
                </div>
            </div>        
            
            <div className="overlay blur-overlay pointer-events-none"></div>
        </div>        
    )
}