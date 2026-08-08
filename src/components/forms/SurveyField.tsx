"use client";

import type { SurveyQuestion } from "@/lib/waitlist/types";
import { useEffect, useId, useRef, useState } from "react";

function autoCompleteFor(question: SurveyQuestion): string | undefined {
  if (question.id === "email") return "email";
  if (question.id === "firstName") return "given-name";
  if (question.id === "lastName") return "family-name";
  return undefined;
}

function MultiSelectDropdown({
  question,
  value,
  onChange,
  triggerClassName,
}: {
  question: SurveyQuestion;
  value: string | string[];
  onChange: (value: string | string[]) => void;
  triggerClassName: string;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const selected = Array.isArray(value) ? value : [];
  const max = question.maxSelections ?? question.options?.length ?? 20;
  const placeholder = question.hint || "Select up to three";

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  function toggle(option: string) {
    if (selected.includes(option)) {
      onChange(selected.filter((item) => item !== option));
      return;
    }
    if (selected.length >= max) return;
    onChange([...selected, option]);
  }

  const summary =
    selected.length === 0 ? placeholder : selected.join(", ");

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        id={question.id}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((prev) => !prev)}
        className={`${triggerClassName} flex items-center justify-between gap-3 text-left`}
      >
        <span className={selected.length === 0 ? "text-subtext/50" : "text-text"}>
          {summary}
        </span>
        <svg
          className={`h-4 w-4 flex-shrink-0 text-subtext transition-transform ${open ? "rotate-180" : ""}`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open && (
        <div
          id={listId}
          role="listbox"
          aria-multiselectable="true"
          className="absolute z-20 mt-2 w-full rounded-soft border border-accent/30 bg-background shadow-card py-2 max-h-64 overflow-auto"
        >
          <p className="px-4 pb-2 text-xs text-subtext/80">{placeholder}</p>
          {question.options?.map((option) => {
            const checked = selected.includes(option);
            const disabled = !checked && selected.length >= max;

            return (
              <label
                key={option}
                role="option"
                aria-selected={checked}
                className={`flex items-center gap-3 px-4 py-2 ${
                  disabled
                    ? "cursor-not-allowed opacity-50"
                    : "cursor-pointer hover:bg-accent/10"
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  disabled={disabled}
                  onChange={() => toggle(option)}
                  className="accent-accent"
                />
                <span className="text-sm text-text">{option}</span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function SurveyField({
  question,
  value,
  onChange,
}: {
  question: SurveyQuestion;
  value: string | string[];
  onChange: (value: string | string[]) => void;
}) {
  const baseClass =
    "w-full px-4 py-3 rounded-soft border border-accent/30 bg-background text-text placeholder:text-subtext/50 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors duration-300";

  if (question.type === "textarea") {
    return (
      <textarea
        id={question.id}
        name={question.id}
        value={typeof value === "string" ? value : ""}
        onChange={(e) => onChange(e.target.value)}
        required={question.required}
        rows={4}
        className={baseClass}
        placeholder={question.placeholder}
      />
    );
  }

  if (question.type === "select") {
    return (
      <select
        id={question.id}
        name={question.id}
        value={typeof value === "string" ? value : ""}
        onChange={(e) => onChange(e.target.value)}
        required={question.required}
        className={baseClass}
      >
        <option value="">{question.hint || "Select an option"}</option>
        {question.options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }

  if (question.type === "radio") {
    return (
      <div className="space-y-3">
        {question.options?.map((option) => (
          <label key={option} className="flex items-start gap-3 cursor-pointer">
            <input
              type="radio"
              name={question.id}
              value={option}
              checked={value === option}
              onChange={() => onChange(option)}
              required={question.required}
              className="mt-1 accent-accent"
            />
            <span className="text-subtext leading-relaxed">{option}</span>
          </label>
        ))}
      </div>
    );
  }

  if (question.type === "checkbox") {
    return (
      <MultiSelectDropdown
        question={question}
        value={value}
        onChange={onChange}
        triggerClassName={baseClass}
      />
    );
  }

  return (
    <input
      type={question.type === "email" ? "email" : "text"}
      id={question.id}
      name={question.id}
      value={typeof value === "string" ? value : ""}
      onChange={(e) => onChange(e.target.value)}
      required={question.required}
      autoComplete={autoCompleteFor(question)}
      className={baseClass}
      placeholder={question.placeholder}
    />
  );
}
