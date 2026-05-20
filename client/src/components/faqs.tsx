import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

export default function FAQs() {
  return (
    <section
      id="faqs"
      className="container flex flex-col gap-8 items-center p-8 py-20 mx-auto max-w-7xl"
    >
      <div className="flex flex-col gap-2 items-center max-w-2xl">
        <p className="text-lg font-medium uppercase text-primary">Our FAQs</p>
        <h2 className="text-2xl font-semibold text-center md:text-3xl">
          Got questions? We&apos;ve already got answers ready
        </h2>
      </div>
      <Accordion type="multiple" className="max-w-3xl">
        <AccordionItem value="free plan">
          <AccordionTrigger className="text-lg md:text-xl">
            Is there a free plan?
          </AccordionTrigger>
          <AccordionContent className="text-base md:text-lg">
            Yes. You can create and manage projects for free with access to core
            collaboration features.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="collaboration">
          <AccordionTrigger className="text-lg md:text-xl">
            Does the app support real-time collaboration?
          </AccordionTrigger>
          <AccordionContent className="text-base md:text-lg">
            Yes. Team updates, task changes, and project activity can sync in
            real time to keep everyone aligned.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="organization">
          <AccordionTrigger className="text-lg md:text-xl">
            Can I organize multiple projects?
          </AccordionTrigger>
          <AccordionContent className="text-base md:text-lg">
            Yes. Create multiple workspaces and boards to organize projects for
            teams, clients, or personal workflows.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="responsive design">
          <AccordionTrigger className="text-lg md:text-xl">
            Is the platform mobile-friendly?
          </AccordionTrigger>
          <AccordionContent className="text-base md:text-lg">
            Yes. the interface is fully responsive and designed to work accross
            desktop and mobile devices.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}
