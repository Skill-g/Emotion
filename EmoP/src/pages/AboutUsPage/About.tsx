import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Footer from "@/shared/Footer";
import Header from "@/shared/Header";
const About = () => {
  return (
    <>
      <Header></Header>
      <div className="container w-screen ques">
        <Accordion type="single" collapsible className="mt-14">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-about">
              В чем цель проекта?
            </AccordionTrigger>
            <AccordionContent className="text-xl">
              Проект создан для помощи студентам, и оказания им помощи со
              стороны психолога и преподовательского коллектива
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible className="mt-14">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-about">
              Какие проблемы он решает?
            </AccordionTrigger>
            <AccordionContent className="text-xl">
              <b>Буллинг</b> — это серьезная проблема, которая может затронуть
              как детей, так и взрослых. В нашем сообществе мы поддерживаем
              жертв буллинга и помогаем им развивать навыки самозащиты и
              уверенности. <br />
              <b>Травля</b> — может иметь различные формы и происходить в разных
              средах. Мы предоставляем ресурсы и советы для тех, кто столкнулся
              с травлей, а также работаем над просветительскими мероприятиями
              для предотвращения травли.
              <br />
              <b>Психологическое благополучие:</b> Мы придаем важное значение
              психологическому здоровью студентов. Наши психологи помогают тем,
              кто столкнулся с буллингом или травлей, развивать стратегии
              управления стрессом и тревожностью.
              <br />
              <b>Социальная адаптация:</b> Для новичков и студентов,
              переживающих сложности в адаптации к новой среде, мы предоставляем
              ресурсы и поддержку, чтобы помочь им интегрироваться и находить
              свое место в обществе.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible className="mt-14">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-about">Как мы помогаем?</AccordionTrigger>
            <AccordionContent className="text-xl">
              <b>Консультации с психологом:</b> Студенты могут обратиться к
              нашиму психологу для получения совета и помощи в решении проблем,
              связанных с буллингом или травлей. <br />
              <b>Семинары и мастер-классы:</b> Мы проводим обучающие семинары и
              мастер-классы, направленные на развитие навыков самозащиты,
              повышение уровня уверенности и разрешение конфликтов. <br />
              <b>Онлайн-ресурсы:</b> На нашем веб-сайте вы найдете полезные
              статьи, видеоматериалы и рекомендации по предотвращению и
              преодолению буллинга и травли.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible className="mt-14">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-about">Присоединяйтесь к нам</AccordionTrigger>
            <AccordionContent className="text-xl">
              Мы приглашаем всех студентов и заинтересованных лиц присоединиться
              к нашему проекту и внести свой вклад в создание безопасной и
              дружелюбной среды для обучения и развития. Вместе мы можем сделать
              мир лучше!
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <Footer></Footer>
    </>
  );
};

export default About;
