import { ABOUT_ROUTE, TICKET_ROUTE } from "@/app/consts";
import {
  ArrowRight,
  Award,
  Gem,
  GraduationCap,
  Heart,
  HeartHandshake,
  ShieldCheck,
  Star,
  ThumbsUp,
  User,
} from "lucide-react";

const HomeBody = () => {
  return (
    <div className="containers">
      
      <div className="top">
        <div className="topimg">
          <div className="textdiv">
            <div>
              <div className="helptb">
                <h1>
                  <p className="toptext">
                    Проблемы с эмоциональным состоянием?
                  </p>
                </h1>
                <div className="sub">
                  <p>Если у вас имеются проблемы, обратитесь к нам</p>
                  <a className="buttonhelp mt-2" href={TICKET_ROUTE}>
                    Получить помощь
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="Bullying">
        <div className="BullyingText">
          <h1 className="fontb">Что такое травля?</h1>
          <h4 className="fontbsub">
            Травля - агрессивное преследование и издевательство над одним из
            <br />
            членов коллектива со стороны другого, но также часто группы лиц
          </h4>
          <div className="fontcards">
            <a href={ABOUT_ROUTE}>
              <button className="Parents btn-card">
                <Heart size={38} className="fill-cyan-700" />
                Родителям <ArrowRight size={38} />
              </button>
            </a>
            <a href={ABOUT_ROUTE}>
              <button className="Students btn-card">
                <User size={38} className="fill-cyan-700" />
                Абитурентам
                <ArrowRight size={38} />
              </button>
            </a>
            <a href={ABOUT_ROUTE}>
              <button className="Students btn-card">
                <GraduationCap size={38} className="fill-cyan-700" />
                Студентам
                <ArrowRight size={38} />
              </button>
            </a>
          </div>
        </div>
      </div>
      <div className="HelpFriend">
        <div className="background-svg">
          <div className="block center">
            <h2 className="blockh2">
              <p className="phelpfr">
                Психологическая поддержка — ключ к преодолению любых трудностей
                и внутреннему росту.
              </p>
            </h2>
            <div className="cards left">
              <div className="card">
                <Gem
                  strokeWidth="0"
                  size={32}
                  className="fill-white blocksvg"
                />{" "}
                <span className="title">Будьте дружелюбны</span>
                <span className="text">
                  <br />
                  Это поможет другому чувствовать себя лучше!
                </span>
              </div>
              <div className="card">
                <Award
                  strokeWidth="0"
                  size={32}
                  className="fill-white blocksvg"
                />{" "}
                <span className="title">Будьте дружелюбны</span>
                <span className="text">
                  <br />
                  Это поможет другому чувствовать себя лучше!
                </span>
              </div>
              <div className="card">
                <ShieldCheck
                  strokeWidth="0"
                  size={32}
                  className="fill-white blocksvg"
                />{" "}
                <span className="title">Будьте дружелюбны</span>
                <span className="text">
                  <br />
                  Это поможет другому чувствовать себя лучше!
                </span>
              </div>
            </div>
            <div className="centerhelpfr"></div>
            <div className="cards right">
              <div className="card">
                <HeartHandshake
                  strokeWidth="0"
                  size={32}
                  className="fill-white blocksvg"
                />{" "}
                <span className="title">Будьте дружелюбны</span>
                <span className="text">
                  <br />
                  Это поможет другому чувствовать себя лучше!
                </span>
              </div>
              <div className="card">
                <Star
                  strokeWidth="0"
                  size={32}
                  className="fill-white blocksvg"
                />{" "}
                <span className="title">Будьте дружелюбны</span>
                <span className="text">
                  <br />
                  Это поможет другому чувствовать себя лучше!
                </span>
              </div>
              <div className="card">
                <ThumbsUp
                  strokeWidth="0"
                  size={32}
                  className="fill-white blocksvg"
                />{" "}
                <span className="title">Будьте дружелюбны</span>
                <span className="text">
                  <br />
                  Это поможет другому чувствовать себя лучше!
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeBody;
