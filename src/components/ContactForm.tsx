"use client";

import { useRef, useState, type FormEvent } from "react";
import { FIELDS, HONEYPOT, MESSAGES, validate, type Values } from "@/lib/contact-form";

const initialValues = (): Values =>
  Object.fromEntries(
    FIELDS.map((f) => [f.name, f.type === "checklist" ? [] : "defaultValue" in f && f.defaultValue ? f.defaultValue : ""]),
  );

/** Re-implementation of the old flo-forms contact form (same markup and classes, no Vue/jQuery). */
export function ContactForm() {
  const [values, setValues] = useState<Values>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [response, setResponse] = useState<{ ok: boolean; text: string } | null>(null);
  const [responseMode, setResponseMode] = useState(false);
  const honeypot = useRef<HTMLInputElement>(null);
  const responseRef = useRef<HTMLDivElement>(null);

  const set = (name: string, value: string | string[]) => setValues((v) => ({ ...v, [name]: value }));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) return;
    setSending(true);
    setResponse(null);
    try {
      const res = await fetch("/api/kontakt/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ values, [HONEYPOT]: honeypot.current?.value ?? "" }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string; errors?: Record<string, string> };
      if (!res.ok) {
        if (data.errors) setErrors(data.errors);
        setResponse({ ok: false, text: data.error ?? MESSAGES.error });
        return;
      }
      setValues(initialValues());
      setResponse({ ok: true, text: MESSAGES.success });
      setResponseMode(true);
      requestAnimationFrame(() => responseRef.current?.scrollIntoView({ behavior: "smooth" }));
      setTimeout(() => {
        setResponseMode(false);
        setResponse(null);
      }, 7000);
    } catch {
      setResponse({ ok: false, text: MESSAGES.error });
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="app-flo-forms app-flo-forms_447 flo-initialized-form" data-form_id="447">
      <form className="flo-form" noValidate onSubmit={onSubmit}>
        <div className={"panel-body" + (responseMode ? " response-mode" : "")}>
          <div className="form-preview topLabel ">
            <div
              className="vue-form-generator btn-position--auto"
              style={{
                "--data-btn-color": "#ffffff",
                "--data-btn-bgcolor": "#000000",
                "--data-btn-border-color": "#000000",
                "--data-btn-color-hover": "#ffffff",
                "--data-btn-bgcolor-hover": "#000000",
                "--data-btn-border-color-hover": "#000000",
              }}
            >
              <section className="valid form-group-section form-group-one">
                {FIELDS.map((f) => {
                  const error = errors[f.name];
                  const value = values[f.name];
                  const cls = [
                    "form-group",
                    error ? "error" : "valid",
                    f.required && "required",
                    "width-100",
                    `fid_${f.id}`,
                    f.required && "required",
                    `field-${f.type === "text" ? "input" : f.type === "textarea" ? "textArea" : f.type}`,
                  ]
                    .filter(Boolean)
                    .join(" ");
                  return (
                    <div key={f.id} className={cls}>
                      <label htmlFor={f.name}>{f.label}</label>
                      <div className="field-wrap">
                        {f.type === "text" && (
                          <div className="wrapper">
                            <input
                              id={f.name}
                              name={f.name}
                              type="text"
                              inputMode={f.email ? "email" : undefined}
                              autoComplete={f.email ? "email" : f.name === "name" ? "name" : "off"}
                              placeholder=""
                              required={f.required}
                              className={"form-control" + (value ? "" : " empty")}
                              value={value as string}
                              onChange={(e) => set(f.name, e.target.value)}
                            />
                          </div>
                        )}
                        {f.type === "textarea" && (
                          <textarea
                            id={f.name}
                            name={f.name}
                            placeholder=""
                            rows={f.rows}
                            required={f.required}
                            className={"form-control" + (value ? "" : " empty")}
                            value={value as string}
                            onChange={(e) => set(f.name, e.target.value)}
                          />
                        )}
                        {f.type === "select" && (
                          <select id={f.name} name={f.name} className="form-control" value={value as string} onChange={(e) => set(f.name, e.target.value)}>
                            <option disabled value="">
                              –
                            </option>
                            {f.options.map((o) => (
                              <option key={o} value={o}>
                                {o}
                              </option>
                            ))}
                          </select>
                        )}
                        {f.type === "checklist" && (
                          <div className="wrapper">
                            <div className="listbox form-control" id={f.name}>
                              {f.options.map((o) => {
                                const list = value as string[];
                                return (
                                  <div key={o} className="list-row">
                                    <label>
                                      <input
                                        type="checkbox"
                                        name={o.replace(/\s+/g, "-")}
                                        checked={list.includes(o)}
                                        onChange={(e) => set(f.name, e.target.checked ? [...list, o] : list.filter((x) => x !== o))}
                                      />
                                      {o}
                                    </label>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                      {f.type === "text" && f.hint && <div className="hint">{f.hint}</div>}
                      {error && (
                        <div className="errors help-block">
                          <span>{error}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
                <div className="form-group valid flohp field-input" aria-hidden="true">
                  <label htmlFor={HONEYPOT}>Flo contact phone</label>
                  <div className="field-wrap">
                    <div className="wrapper">
                      <input id={HONEYPOT} ref={honeypot} type="text" tabIndex={-1} autoComplete="off" placeholder="" className="form-control empty" />
                    </div>
                  </div>
                </div>
              </section>
              <section className="valid form-group-submit">
                <div className="form-group valid width-100 fid_8979152 submit-btn field-submit">
                  <div className="field-wrap">
                    <input id="field-8979152" type="submit" value="ABSENDEN" disabled={sending} />
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
        <div className="flo overlay-loader" style={{ display: sending ? "block" : "none" }}>
          <div className="loader">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <div className="flo-response" ref={responseRef} role="status" style={response?.ok ? { display: "block" } : undefined}>
          {response?.ok ? response.text : null}
        </div>
        <div className="flo-response-error" role="alert">
          {response && !response.ok ? response.text : null}
        </div>
      </form>
    </div>
  );
}
