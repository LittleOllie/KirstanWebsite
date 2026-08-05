import type { SurveyQuestion } from "@/lib/waitlist/types";

function autoCompleteFor(question: SurveyQuestion): string | undefined {
  if (question.id === "email") return "email";
  if (question.id === "firstName") return "given-name";
  if (question.id === "lastName") return "family-name";
  return undefined;
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
        <option value="">Select an option</option>
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
