"use client";
// components/auth/FormInput.js

export default function FormInput({
  label,
  id,
  type = "text",
  placeholder,
  register,
  error,
  disabled,
  autoComplete,
  options = [],
}) {
  const commonStyles = {
    width: "100%",
    borderRadius: "8px",
    border: error ? "1.5px solid #f87171" : "1.5px solid #d1d5db",
    backgroundColor: "#ffffff",
    padding: "10px 14px",
    fontSize: "14px",
    color: "#111827",
    outline: "none",
    boxSizing: "border-box",
    opacity: disabled ? 0.6 : 1,
    cursor: disabled ? "not-allowed" : "text",
  };

  const inputElement = () => {
    if (type === "select") {
      return (
        <select
          id={id}
          disabled={disabled}
          autoComplete={autoComplete}
          {...register}
          style={commonStyles}
        >
          <option value="" disabled hidden>
            {placeholder || "Select an option"}
          </option>
          {options.map((option) => (
            <option key={option.value ?? option} value={option.value ?? option}>
              {option.label ?? option}
            </option>
          ))}
        </select>
      );
    }

    if (type === "radio") {
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {options.map((option) => {
            const value = option.value ?? option;
            const labelText = option.label ?? option;
            return (
              <label
                key={value}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "14px",
                  color: "#111827",
                  cursor: disabled ? "not-allowed" : "pointer",
                }}
              >
                <input
                  type="radio"
                  value={value}
                  disabled={disabled}
                  {...register}
                  style={{
                    width: "16px",
                    height: "16px",
                    accentColor: "#6366f1",
                    cursor: disabled ? "not-allowed" : "pointer",
                  }}
                />
                {labelText}
              </label>
            );
          })}
        </div>
      );
    }

    return (
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete={autoComplete}
        {...register}
        style={commonStyles}
        onFocus={(e) => {
          e.target.style.border = error
            ? "1.5px solid #f87171"
            : "1.5px solid #6366f1";
          e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.15)";
        }}
        onBlur={(e) => {
          e.target.style.border = error
            ? "1.5px solid #f87171"
            : "1.5px solid #d1d5db";
          e.target.style.boxShadow = "none";
        }}
      />
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "4px" }}>
      {label && (
        <label
          htmlFor={id}
          style={{
            fontSize: "14px",
            fontWeight: "500",
            color: "#374151",
            display: "block",
          }}
        >
          {label}
        </label>
      )}

      {inputElement()}

      {error && (
        <p style={{ fontSize: "12px", color: "#ef4444", margin: 0 }}>
          ⚠ {error.message}
        </p>
      )}
    </div>
  );
}


