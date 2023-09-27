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
      <div className="container w-screen h-screen">
      <Accordion type="single" collapsible className="mt-14">
        <AccordionItem value="item-1">
          <AccordionTrigger>Вопрос</AccordionTrigger>
          <AccordionContent>
            Ответ
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible className="mt-14">
        <AccordionItem value="item-1">
          <AccordionTrigger>Вопрос</AccordionTrigger>
          <AccordionContent>
            Ответ
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible className="mt-14">
        <AccordionItem value="item-1">
          <AccordionTrigger>Вопрос</AccordionTrigger>
          <AccordionContent>
            Ответ
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible className="mt-14">
        <AccordionItem value="item-1">
          <AccordionTrigger>Вопрос</AccordionTrigger>
          <AccordionContent>
            Ответ
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible className="mt-14">
        <AccordionItem value="item-1">
          <AccordionTrigger>Вопрос</AccordionTrigger>
          <AccordionContent>
            Ответ
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible className="mt-14">
        <AccordionItem value="item-1">
          <AccordionTrigger>Вопрос</AccordionTrigger>
          <AccordionContent>
            Ответ
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      </div>
      <Footer></Footer>
      
    </>

  );
};

export default About;
