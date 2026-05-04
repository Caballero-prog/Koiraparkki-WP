import { useEffect, useRef, useState } from "react";

const CustomSelect = ({
  id,
  name,
  label,
  placeholder = "Valitse",
  options = [],
  required = false,
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [touched, setTouched] = useState(false);
  const wrapperRef = useRef(null);

  const selectedOption = options.find((option) => option.value === value);
  const showError = required && touched && !value;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!wrapperRef.current?.contains(event.target)) {
        setOpen(false);
        setTouched(true);
      }
    };

    document.addEventListener("pointerdown", handleClickOutside);

    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, []);

  return (
    <div className="custom-select" ref={wrapperRef}>
      <label className="custom-select-label" htmlFor={id}>
        {label}
      </label>

      <input name={name} type="hidden" value={value} />

      <button
        id={id}
        type="button"
        className={`custom-select-button ${open ? "is-open" : ""} ${
          showError ? "has-error" : ""
        }`}
        onClick={() => {
          setOpen((current) => !current);
          setTouched(true);
        }}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={value ? "" : "custom-select-placeholder"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>

        <span className="custom-select-arrow" aria-hidden="true" />
      </button>

      {open && (
        <div className="custom-select-menu" role="listbox">
          {options.map((option) => (
            <button
              type="button"
              className="custom-select-option"
              key={option.value}
              onClick={() => {
                setValue(option.value);
                setOpen(false);
                setTouched(true);
              }}
              role="option"
              aria-selected={value === option.value}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}

      {showError && (
        <p className="custom-select-error">Valitse vaihtoehto.</p>
      )}
    </div>
  );
};

export default CustomSelect;