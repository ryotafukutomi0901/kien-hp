"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useId, useState, type FormEvent } from "react";

import { ChevronDownIcon } from "@/components/icons";
import { contactForm, type ContactQuestion, type ContactTypeId } from "@/data/pages/contact";
import { privacyLink } from "@/data/pages/privacy";
import { recruitPage } from "@/data/pages/recruit";
import { site } from "@/data/site";

import styles from "./ContactForm.module.css";

const types = contactForm.types;
const isTypeId = (value: string | null): value is ContactTypeId => types.some((type) => type.id === value);

/** プルダウン1つ。選ぶだけの質問は、すべてこの部品で出す（標準の select なので、スマホでは端末の選択画面が開く） */
function SelectField({
  question,
  defaultValue,
}: {
  question: ContactQuestion;
  defaultValue?: string;
}) {
  const id = useId();
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {question.label}
        {question.required && <span className={styles.required}>必須</span>}
      </label>
      <div className={styles.selectWrap}>
        <select
          id={id}
          name={question.name}
          className={styles.control}
          required={question.required}
          defaultValue={defaultValue ?? ""}
        >
          <option value="" disabled={question.required}>
            選択してください
          </option>
          {question.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDownIcon size={18} strokeWidth={2.4} className={styles.chevron} />
      </div>
    </div>
  );
}

/** 文字を入れる欄1つ（お名前・電話番号など） */
function TextField({
  name,
  label,
  type = "text",
  required,
  autoComplete,
  inputMode,
  placeholder,
}: {
  name: string;
  label: string;
  type?: "text" | "tel" | "email";
  required?: boolean;
  autoComplete?: string;
  inputMode?: "text" | "tel" | "email";
  placeholder?: string;
}) {
  const id = useId();
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {required && <span className={styles.required}>必須</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        className={styles.control}
        required={required}
        autoComplete={autoComplete}
        inputMode={inputMode}
        placeholder={placeholder}
      />
    </div>
  );
}

/**
 * お問い合わせフォーム（2026-11-17 CEO指示「空でいいからフォームを埋め込んで。選ぶ質問はタブ・プルダウンで、喜援に合うものに」）。
 * - 先頭の「ご相談の種類」をタブ（ラジオボタンをタブの見た目にしたもの）で選ぶと、続くプルダウンの質問が種類に合わせて変わる
 * - 質問と選択肢は data/pages/contact.ts の contactForm が出どころ
 * - /contact?type=recruit&position=position-helper#form のように開くと、種類と職種を選んだ状態で開く（採用ページの職種タブから来る）
 * - 送信先が未定のため、送信ボタンは入力の確認だけして「準備中」と案内する。送信先が決まったら onSubmit で送る
 */
export function ContactForm() {
  const params = useSearchParams();
  const queryType = params.get("type");
  const queryPosition = params.get("position");
  const [typeId, setTypeId] = useState<ContactTypeId>(isTypeId(queryType) ? queryType : "home-visit");
  const [pending, setPending] = useState(false);
  const legendId = useId();
  const type = types.find((t) => t.id === typeId) ?? types[0];
  const positionTitle = recruitPage.positions.find((position) => position.id === queryPosition)?.title;

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
  };

  return (
    <form className={styles.form} onSubmit={onSubmit} aria-labelledby={legendId}>
      <fieldset className={styles.fieldset}>
        <legend id={legendId} className={styles.legend}>
          {contactForm.typeLegend}
        </legend>
        <div className={styles.tabs}>
          {types.map((t) => (
            <label key={t.id} className={`${styles.tab} ${styles[t.tone]}`} data-selected={t.id === typeId || undefined}>
              <input
                type="radio"
                name="type"
                value={t.id}
                checked={t.id === typeId}
                onChange={() => {
                  setTypeId(t.id);
                  setPending(false);
                }}
                className={styles.radio}
              />
              <span className={styles.tabLabel}>{t.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* 種類を変えたら質問も入れ替わる（key で作り直す）。前の種類で選んだ答えは持ち越さない */}
      <div className={styles.questions} key={type.id}>
        {type.questions.map((question) => (
          <SelectField
            key={question.name}
            question={question}
            defaultValue={type.id === "recruit" && question.name === "position" ? positionTitle : undefined}
          />
        ))}
      </div>

      <div className={styles.questions}>
        {contactForm.commonQuestions.map((question) => (
          <SelectField key={question.name} question={question} />
        ))}
      </div>

      <div className={styles.pair}>
        <TextField name="name" label="お名前" required autoComplete="name" placeholder="例）喜援 太郎" />
        <TextField name="kana" label="ふりがな" autoComplete="off" placeholder="例）きえん たろう" />
        <TextField name="tel" label="電話番号" type="tel" inputMode="tel" required autoComplete="tel" placeholder="例）0545-00-0000" />
        <TextField name="email" label="メールアドレス" type="email" inputMode="email" autoComplete="email" placeholder="例）example@mail.com" />
      </div>

      <div className={styles.field}>
        <label htmlFor="contact-message" className={styles.label}>
          ご相談の内容（ご自由にお書きください）
        </label>
        <textarea id="contact-message" name="message" rows={5} className={`${styles.control} ${styles.textarea}`} />
      </div>

      <label className={styles.consent}>
        <input type="checkbox" name="consent" required className={styles.check} />
        <span>
          <Link href={privacyLink.href} className={styles.consentLink}>
            {privacyLink.label}
          </Link>
          に同意します
          <span className={styles.required}>必須</span>
        </span>
      </label>

      <div className={styles.submitArea}>
        <button type="submit" className={styles.submit}>
          {contactForm.submitLabel}
        </button>
        <p className={styles.status} role="status" data-show={pending || undefined}>
          {pending && (
            <>
              {contactForm.pendingNotice}
              <br />
              TEL {site.company.tel}
            </>
          )}
        </p>
      </div>
    </form>
  );
}
