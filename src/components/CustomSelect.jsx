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
  const wrapperRef = useRef(null);

  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!wrapperRef.current?.contains(event.target)) {
        setOpen(false);
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

      <input id={id} name={name} type="hidden" value={value} required={required} />

      <button
        type="button"
        className={`custom-select-button ${open ? "is-open" : ""}`}
        onClick={() => setOpen((current) => !current)}
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
              }}
              role="option"
              aria-selected={value === option.value}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;