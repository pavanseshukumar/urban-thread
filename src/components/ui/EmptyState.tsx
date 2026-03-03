import Button from "./Button";

type EmptyStateProps = {
  icon: string;
  title: string;
  description: string;
  actionLabel: string;
  actionHref: string;
};

export default function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  actionHref,
}: EmptyStateProps) {
  return (
    <div className="flex min-h-[55vh] flex-col items-center justify-center px-6 text-center">
      <span className="text-4xl opacity-60" role="img" aria-hidden="true">
        {icon}
      </span>
      <h2 className="mt-6 text-lg font-medium text-foreground">
        {title}
      </h2>
      <p className="mt-2 max-w-[280px] text-[13px] leading-relaxed text-muted">
        {description}
      </p>
      <Button href={actionHref} className="mt-10">
        {actionLabel}
      </Button>
    </div>
  );
}
