type SectionHeadingProps = {
  id: string;
  number: string;
  label: string;
  title: string;
  description?: string;
};

export function SectionHeading({
  id,
  number,
  label,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <p className="eyebrow">
        <span className="section-number">{number}</span> / {label}
      </p>
      <h2 id={id}>{title}</h2>
      {description && <p className="section-description">{description}</p>}
    </div>
  );
}
