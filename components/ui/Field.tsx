import { cn } from "@/lib/utils";

type BaseFieldProps = {
  label: string;
  name: string;
  error?: string;
  required?: boolean;
  className?: string;
};

const controlClasses =
  "w-full rounded-lg border border-line bg-white px-4 py-3 text-ink placeholder:text-muted-light focus-visible:border-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-600 focus-visible:ring-offset-0";

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
      <label htmlFor={name} className="text-eyebrow font-semibold uppercase text-muted">
        {label}
        {required && <span className="ml-0.5 text-lime-700" aria-hidden="true">*</span>}
      </label>
      {children}
      {error && (
        <p id={errorId} className="text-small text-red-700" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

type InputFieldProps = BaseFieldProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "name" | "className" | "id">;

/** Labelled text input with error message and accessible wiring. */
export function InputField({
  label,
  name,
  error,
  required,
  className,
  ...rest
}: InputFieldProps) {
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

type SelectFieldProps = BaseFieldProps & {
  /** Plain strings use the same text for value and label. */
  options: (string | { value: string; label: string })[];
  placeholder?: string;
} & Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "name" | "className" | "id">;

/** Labelled select with error message and accessible wiring. */
export function SelectField({
  label,
  name,
  error,
  required,
  className,
  options,
  placeholder = "Select…",
  ...rest
}: SelectFieldProps) {
  return (
    <FieldShell label={label} name={name} error={error} required={required} className={className}>
      <select
        id={name}
        name={name}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        className={cn(controlClasses, "appearance-none bg-[right_1rem_center] bg-no-repeat pr-10")}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='%236B6C5F' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M4 6l4 4 4-4'/%3E%3C/svg%3E\")",
        }}
        {...rest}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => {
          const { value, label } = typeof opt === "string" ? { value: opt, label: opt } : opt;
          return (
            <option key={value} value={value}>
              {label}
            </option>
          );
        })}
      </select>
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
