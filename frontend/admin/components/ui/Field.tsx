import { cn } from "@/lib/utils";

type BaseFieldProps = {
  label: string;
  name: string;
  error?: string;
  required?: boolean;
  className?: string;
};

const controlClasses =
  "w-full rounded-lg border border-line bg-bone-50 px-4 py-3 text-ink placeholder:text-muted-light focus-visible:border-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-600 focus-visible:ring-offset-0";

function FieldShell({
  label,
  name,
  error,
  required,
  className,
  children,
}: BaseFieldProps & { children: React.ReactNode }) {
  const errorId = error ? `${name}-error` : undefined;
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={name} className="text-sm font-semibold text-ink">
        {label}
        {required && (
          <span className="ml-0.5 text-lime-600" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <p id={errorId} className="text-sm text-red-700" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

type InputFieldProps = BaseFieldProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "name" | "className" | "id">;

/** Labelled text input with error message and accessible wiring. */
export function InputField({ label, name, error, required, className, ...rest }: InputFieldProps) {
  return (
    <FieldShell label={label} name={name} error={error} required={required} className={className}>
      <input
        id={name}
        name={name}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        className={controlClasses}
        {...rest}
      />
    </FieldShell>
  );
}

type TextareaFieldProps = BaseFieldProps &
  Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "name" | "className" | "id">;

/** Labelled textarea with error message and accessible wiring. */
export function TextareaField({
  label,
  name,
  error,
  required,
  className,
  rows = 5,
  ...rest
}: TextareaFieldProps) {
  return (
    <FieldShell label={label} name={name} error={error} required={required} className={className}>
      <textarea
        id={name}
        name={name}
        rows={rows}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        className={cn(controlClasses, "resize-y")}
        {...rest}
      />
    </FieldShell>
  );
}
