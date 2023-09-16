import { ABOUT_ROUTE, ADMIN_ROUTE, HOME_ROUTE, REG_ROUTE, TICKET_ROUTE } from '@/app/consts';
import { Shield, User } from 'lucide-react';

const Header = () => {
  const storedIsAuth = localStorage.getItem("isAuth");
  
  return (
    <header>
      <div className="brandname">
        <a href={HOME_ROUTE}>Emotion</a>
      </div>
      <div className="menu">
        <ul>
          <li>
            <a href={HOME_ROUTE} className='mobile'>Главная страница</a>
          </li>
          <li>
            <a href={ABOUT_ROUTE}>О нас </a>
          </li>
          <li>
            <a href={TICKET_ROUTE}>Заявки</a>
          </li>
          <li>
            <a href="/contacts">Контакты</a>
          </li>
        </ul>
      </div>
      <div className="loginh">
        {storedIsAuth === "true" ? (
          <a href={ADMIN_ROUTE}>
            Админ панель  <Shield  />{" "}
          </a>
        ) : (
          <a href={REG_ROUTE}>
            Войти  <User />{" "}
          </a>
        )}
      </div>
    </header>
  );
};

export default Header;
