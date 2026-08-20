import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { EnigmaGate } from "../components/EnigmaGate";
import { EnigmaDoor } from "../components/EnigmaCarousel";
import { track } from "../lib/track";

// THE GATE — the campaign on-ramp (/enter, /enigma, /christie, /gnx). The
// arriving path reorders the case doors so the matching one leads.
const CASES: Record<string, EnigmaDoor> = {
  christie: {
    key: "christie",
    label: "Case №1",
    name: "Agatha Christie × DMX",
    desc: "A mystery from 1939 to 1999.",
    to: "/exhibit/christie-dmx",
  },
  gnx: {
    key: "gnx",
    label: "Case №2",
    name: "GNX",
    desc: "Two cars. One Kendrick. Two questions.",
    to: "/work/gnx",
  },
};

export function Enter() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "ENIGMA — Just Neal";
    track("gate_view", { via: pathname });
    return () => {
      document.title = "NIL · Just Neal — Name. Image. Likeness.";
    };
  }, [pathname]);

  const order = pathname.startsWith("/gnx") ? ["gnx", "christie"] : ["christie", "gnx"];
  const doors: EnigmaDoor[] = order.map((k, i) => ({
    ...CASES[k],
    lead: i === 0,
    onActivate: () => track(`gate_door_${k}`),
  }));
  doors.push({
    key: "site",
    label: "The full body of work",
    name: "Enter the site",
    desc: "Research · Systems · Strategy · Story.",
    to: "/",
    onActivate: () => track("gate_door_site"),
  });

  return <EnigmaGate doors={doors} onEnterSite={() => navigate("/")} onMark={() => navigate("/")} />;
}
