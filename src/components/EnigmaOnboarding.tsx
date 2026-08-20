import { useEffect, useState } from "react";
import { EnigmaGate } from "./EnigmaGate";
import { EnigmaDoor } from "./EnigmaCarousel";
import { track } from "../lib/track";

// First-visit onboarding: the ENIGMA carousel greets visitors on the homepage,
// covering the site until they step through it. Shown once per browser (a flag
// in localStorage), and skippable so no one is trapped. Not a sales pitch — the
// mystery IS the hook.
const SEEN = "yb.enigma.seen.v1";

export function EnigmaOnboarding() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(SEEN)) {
        setShow(true);
        track("enigma_onboarding_view");
      }
    } catch {
      /* ignore */
    }
  }, []);

  // Lock the page behind the overlay while it's up.
  useEffect(() => {
    if (!show) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [show]);

  function markSeen() {
    try {
      localStorage.setItem(SEEN, "1");
    } catch {
      /* ignore */
    }
  }
  function enterSite(evt: string) {
    markSeen();
    track(evt);
    setShow(false);
  }

  if (!show) return null;

  const doors: EnigmaDoor[] = [
    {
      key: "christie",
      label: "Case №1",
      name: "Agatha Christie × DMX",
      desc: "A mystery from 1939 to 1999.",
      to: "/exhibit/christie-dmx",
      lead: true,
      onActivate: () => {
        markSeen();
        track("gate_door_christie", { via: "onboarding" });
      },
    },
    {
      key: "gnx",
      label: "Case №2",
      name: "GNX",
      desc: "Two cars. One Kendrick. Two questions.",
      to: "/work/gnx",
      onActivate: () => {
        markSeen();
        track("gate_door_gnx", { via: "onboarding" });
      },
    },
    {
      key: "site",
      label: "The full body of work",
      name: "Enter the site",
      desc: "Research · Systems · Strategy · Story.",
      onActivate: () => enterSite("enigma_onboarding_enter"),
    },
  ];

  return (
    <div className="enigma-onboard">
      <EnigmaGate
        doors={doors}
        onEnterSite={() => enterSite("enigma_onboarding_enter")}
        onMark={() => enterSite("enigma_onboarding_mark")}
      />
    </div>
  );
}
