interface FeatureProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function Feature({ title, description, icon }: FeatureProps) {
  return (
    <article className="flex flex-col gap-3 items-center p-8 text-center">
      <div className="p-2 border text-primary bg-primary/10 border-primary/20">
        {icon}
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="font-medium text-foreground/70">{description}</p>
    </article>
  );
}
