import { useEffect, useState } from "react";
import { EnigmaCarousel, EnigmaDoor } from "./EnigmaCarousel";
import { track } from "../lib/track";

// THE GATE FLOW — the first thing visitors meet:
//   choice (G1) → Curious Path (the ENIGMA carousel) OR Answer the Riddle (G2)
//   riddle → correct → Access Granted (G3) → enter the site
// The riddle points at Christie's "And Then There Were None" (preceded by the
// counting-rhyme titles). Accepted answers are the sanitized ones — Indians /
// Soldiers — never the erased slur, which is treated as simply incorrect.
type Step = "choice" | "curious" | "riddle" | "granted";

function riddleAccepts(raw: string): boolean {
  const n = raw.toLowerCase().replace(/[^a-z]/g, "");
  return n.includes("indian") || n.includes("soldier");
}

export function EnigmaGate({
  doors,
  onEnterSite,
  onMark,
}: {
  doors: EnigmaDoor[];
  onEnterSite: () => void;
  onMark: () => void;
}) {
  const [step, setStep] = useState<Step>("choice");
  const [answer, setAnswer] = useState("");
  const [wrong, setWrong] = useState(false);

  useEffect(() => {
    track("gate_choice_view");
  }, []);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    track("riddle_submit");
    if (riddleAccepts(answer)) {
      track("riddle_correct");
      setStep("granted");
    } else {
      track("riddle_incorrect");
      setWrong(true);
    }
  }

  // Curious path — the existing ENIGMA carousel. Mark returns to the choice.
  if (step === "curious") {
    return <EnigmaCarousel doors={doors} onMark={() => setStep("choice")} onSkip={onEnterSite} />;
  }

  return (
    <div className="gate gate-flow">
      <div className="gate-top gx-top">
        {step === "choice" ? (
          <button className="gx-brand" onClick={onMark}>
            YOUNGBLESSER<span className="red">.com</span>
          </button>
        ) : step === "riddle" ? (
          <span className="gx-eyebrow red">The Riddle</span>
        ) : (
          <span />
        )}
        <span className="gx-enigma">ENIGMA</span>
      </div>

      <div className="gx-stage">
        {step === "choice" && (
          <div className="gx-screen gx-choice">
            <span className="gx-num">01</span>
            <h1 className="gx-h">
              Every mystery <span className="red">has a choice.</span>
            </h1>
            <p className="gx-sub">You can take the direct path, or the curious one.</p>
            <div className="gx-options">
              <button
                className="gx-option"
                onClick={() => {
                  track("gate_choice_curious");
                  setStep("curious");
                }}
              >
                <span className="gx-option-ic" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="10.5" cy="10.5" r="6.5" />
                    <line x1="15.5" y1="15.5" x2="21" y2="21" strokeLinecap="round" />
                  </svg>
                </span>
                <span className="gx-option-txt">
                  <b>Take the curious path</b>
                  <small>Follow the investigation. Uncover the connections.</small>
                </span>
                <span className="gx-option-go red">→</span>
              </button>
              <button
                className="gx-option"
                onClick={() => {
                  track("gate_choice_riddle");
                  setStep("riddle");
                }}
              >
                <span className="gx-option-ic gx-q" aria-hidden="true">?</span>
                <span className="gx-option-txt">
                  <b>Answer the riddle</b>
                  <small>Think you know the answer? Prove it.</small>
                </span>
                <span className="gx-option-go">→</span>
              </button>
            </div>
            <p className="gx-foot">
              Either way, the journey begins. <span className="red">Choose wisely.</span>
            </p>
          </div>
        )}

        {step === "riddle" && (
          <div className="gx-screen gx-riddle">
            <span className="gx-num">02</span>
            <h1 className="gx-h gx-riddle-h">
              Before there were none, what were there <span className="red">10 little of?</span>
            </h1>
            <form className="gx-form" onSubmit={submit}>
              <input
                className="gx-input"
                value={answer}
                onChange={(e) => {
                  setAnswer(e.target.value);
                  setWrong(false);
                }}
                placeholder="Type your answer…"
                autoFocus
                autoComplete="off"
                spellCheck={false}
                aria-label="Your answer"
              />
              <button className="gx-submit" type="submit">
                Submit answer <span className="arr">→</span>
              </button>
            </form>
            <p className={`gx-hint${wrong ? " gx-wrong" : ""}`}>
              {wrong ? (
                "Not quite. Look again — it's hidden in plain sight."
              ) : (
                <>
                  <span className="red">Hint:</span> It's hidden in plain sight.
                </>
              )}
            </p>
            <button
              className="gx-alt"
              onClick={() => {
                track("gate_choice_curious", { from: "riddle" });
                setStep("curious");
              }}
            >
              Or take the curious path →
            </button>
          </div>
        )}

        {step === "granted" && (
          <div className="gx-screen gx-granted">
            <p className="gx-correct red">Correct answer.</p>
            <p className="gx-correct-sub">You saw what others missed.</p>
            <span className="gx-rule" aria-hidden="true" />
            <h1 className="gx-granted-h">Access granted</h1>
            <span className="gx-x" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </svg>
            </span>
            <p className="gx-welcome">
              You think like a connector.
              <br />
              Welcome to <span className="red">YoungBlesser</span>.
            </p>
            <button
              className="gx-enter"
              onClick={() => {
                track("access_granted_enter");
                onEnterSite();
              }}
            >
              Enter the site <span className="arr">→</span>
            </button>
            <p className="gx-lock">The investigation continues inside.</p>
          </div>
        )}
      </div>
    </div>
  );
}
