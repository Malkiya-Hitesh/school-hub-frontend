"use client";

import { useState } from "react";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

function Field({ id, label, required = false, children, error }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-[var(--color-text-primary)]">
        {label} {required && <span className="text-[var(--color-error)]">*</span>}
      </label>
      <div className="mt-2">{children}</div>
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-[var(--color-error)]">
          {error}
        </p>
      )}
    </div>
  );
}

export default function StaticForm({ fields, submitLabel = "Submit", note }) {
  const initialValues = Object.fromEntries(fields.map((field) => [field.name, ""]));
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const update = (name, value) => {
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
    setSubmitted(false);
  };

  const validate = () => {
    const nextErrors = {};

    fields.forEach((field) => {
      const value = values[field.name]?.trim();

      if (field.required && !value) {
        nextErrors[field.name] = `${field.label} is required.`;
      }

      if (field.type === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        nextErrors[field.name] = "Enter a valid email address.";
      }

      if (field.name === "phone" && value && !/^[0-9+\-\s()]{7,20}$/.test(value)) {
        nextErrors[field.name] = "Enter a valid phone number.";
      }
    });

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;

    // TODO: Connect this validated form to a real SchoolHub backend endpoint.
    setSubmitted(true);
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-5 shadow-[var(--shadow-sm)] sm:p-6"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {fields.map((field) => {
          const commonProps = {
            id: field.name,
            name: field.name,
            value: values[field.name],
            required: field.required,
            placeholder: field.placeholder,
            onChange: (event) => update(field.name, event.target.value),
            "aria-invalid": Boolean(errors[field.name]),
            "aria-describedby": errors[field.name] ? `${field.name}-error` : undefined,
          };

          return (
            <div key={field.name} className={field.full ? "sm:col-span-2" : ""}>
              <Field id={field.name} label={field.label} required={field.required} error={errors[field.name]}>
                {field.kind === "textarea" ? (
                  <Textarea rows={5} {...commonProps} />
                ) : field.kind === "select" ? (
                  <select
                    {...commonProps}
                    className="h-12 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-4 text-base text-[var(--color-text-primary)] outline-none transition-all duration-200 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-muted)]"
                  >
                    <option value="">Select one</option>
                    {field.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <Input type={field.type || "text"} {...commonProps} />
                )}
              </Field>
            </div>
          );
        })}
      </div>

      {note && <p className="mt-5 text-sm leading-relaxed text-[var(--color-text-secondary)]">{note}</p>}

      {submitted && (
        <div className="mt-5 rounded-lg border border-[var(--color-warning)] bg-[var(--color-warning-light)] p-4 text-sm text-[var(--color-warning-text)]">
          This form is validated on the frontend. A backend submission endpoint still needs to be connected before messages can be delivered.
        </div>
      )}

      <div className="mt-6">
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  );
}
