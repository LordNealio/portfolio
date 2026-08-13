import { useMemo, useState } from "react";
import {
  PEOPLE as DEFAULT_PEOPLE,
  ITEMS,
  CATEGORIES,
  money,
  choice,
  hash,
  ORACLE_ENDINGS,
  ORACLE_TITLES,
  ORACLE_WARNINGS,
  type Person,
  type StoreItem,
  type Category,
  type Prophecy,
} from "../../data/spend";

export type SpendSummary = {
  personName: string;
  personShort: string;
  spent: number;
  remaining: number;
  fortune: number;
  percentage: number;
  count: number;
  units: number;
  lines: { name: string; qty: number; subtotal: number; category: string }[];
  biggest?: { name: string; qty: number; subtotal: number };
};

/**
 * SPEND DAT SHIT — the marketplace experience. Ported from the reference app to
 * the portfolio's stack, scoped under `.spendDatApp`. Reusable: pass `people`
 * (e.g. the eight billionaires at 90% of net worth), lock/allow switching, show
 * a `titheNote` banner, and receive an `onFinish` summary for a wrapper page.
 */
export function SpendDatShit({
  people = DEFAULT_PEOPLE,
  initialPersonId,
  allowSwitch = true,
  titheNote,
  onFinish,
}: {
  people?: Person[];
  initialPersonId?: string;
  allowSwitch?: boolean;
  titheNote?: string;
  onFinish?: (summary: SpendSummary) => void;
}) {
  const [personId, setPersonId] = useState(initialPersonId ?? people[0].id);
  const [category, setCategory] = useState<Category>("All");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [prophecy, setProphecy] = useState<Prophecy | null>(null);

  const person = people.find((entry) => entry.id === personId) ?? people[0];
  const spent = useMemo(() => ITEMS.reduce((sum, item) => sum + item.price * (cart[item.id] ?? 0), 0), [cart]);
  const remaining = person.fortune - spent;
  const percentage = (spent / person.fortune) * 100;
  const normalizedSearch = search.trim().toLowerCase();
  const visibleItems = ITEMS.filter((item) => {
    const inCategory = category === "All" || item.category === category;
    const matchesSearch =
      !normalizedSearch ||
      `${item.name} ${item.note} ${item.detail} ${item.category}`.toLowerCase().includes(normalizedSearch);
    return inCategory && matchesSearch;
  });
  const cartLines = ITEMS.filter((item) => (cart[item.id] ?? 0) > 0);
  const cartUnits = cartLines.reduce((sum, item) => sum + (cart[item.id] ?? 0), 0);

  function choosePerson(nextId: string) {
    if (nextId === personId) return;
    setPersonId(nextId);
    setCart({});
    setProphecy(null);
  }

  function changeQuantity(item: StoreItem, amount: number) {
    setCart((current) => {
      const currentSpent = ITEMS.reduce((sum, entry) => sum + entry.price * (current[entry.id] ?? 0), 0);
      const oldQuantity = current[item.id] ?? 0;
      const affordable = Math.floor((person.fortune - currentSpent) / item.price);
      const addition = amount > 0 ? Math.min(amount, affordable) : amount;
      return { ...current, [item.id]: Math.max(0, oldQuantity + addition) };
    });
    setProphecy(null);
  }

  function buyMax(item: StoreItem) {
    const quantity = Math.floor(remaining / item.price);
    if (quantity > 0) changeQuantity(item, quantity);
  }

  function finishExperiment() {
    if (!onFinish) return;
    const lines = cartLines.map((item) => ({
      name: item.name,
      qty: cart[item.id] ?? 0,
      subtotal: item.price * (cart[item.id] ?? 0),
      category: item.category,
    }));
    const biggest = [...lines].sort((a, b) => b.subtotal - a.subtotal)[0];
    onFinish({
      personName: person.name,
      personShort: person.shortName,
      spent,
      remaining,
      fortune: person.fortune,
      percentage,
      count: cartLines.length,
      units: cartUnits,
      lines,
      biggest,
    });
  }

  function extrapolateFuture() {
    const categoryTotals = CATEGORIES.slice(1)
      .map((name) => ({
        name,
        total: ITEMS.filter((item) => item.category === name).reduce(
          (sum, item) => sum + item.price * (cart[item.id] ?? 0),
          0
        ),
      }))
      .sort((a, b) => b.total - a.total);
    const biggest = [...cartLines].sort((a, b) => b.price * (cart[b.id] ?? 0) - a.price * (cart[a.id] ?? 0))[0];
    if (!biggest) return;
    const quantity = cart[biggest.id] ?? 1;
    const seed = hash(`${personId}-${spent}-${Date.now()}-${biggest.id}`);
    const year = 2034 + (seed % 29);
    const dominant = categoryTotals[0]?.name ?? "Luxury";

    const openings: Record<string, string[]> = {
      "Real life": [
        `You accidentally make ordinary stability so fashionable that celebrities begin posting mortgage-free family homes instead of watches.`,
        `Your suspicious commitment to practical purchases creates a new luxury category called “having enough.” The waiting list is seven years long.`,
      ],
      Luxury: [
        `Your collection of ${quantity.toLocaleString()} ${biggest.name.toLowerCase()}${quantity === 1 ? "" : "s"} becomes self-aware and elects a tiny velvet-rope government.`,
        `A drone films your ${biggest.name.toLowerCase()} from space. The footage is mistaken for a newly discovered sovereign nation.`,
      ],
      Community: [
        `The people helped by your spree form a city where the official currency is the favor returned. Economists pretend they predicted it.`,
        `Your grants multiply into a cooperative empire. Its first act is buying back one of your ridiculous purchases and turning it into a library.`,
      ],
      "Power moves": [
        `Your ${biggest.name.toLowerCase()} develops a board of directors made entirely of retired astronauts, lunch ladies and one extremely persuasive goat.`,
        `You become too institutionally powerful to enter a normal group chat. Every text now requires a municipal bond hearing.`,
      ],
    };

    const headlines = [
      `LOCAL PERSON SPENDS ${money(spent, true)}; ECONOMY NOW “A LITTLE CONFUSED”`,
      `${biggest.name.toUpperCase()} DECLARED SENTIENT AFTER BULK ORDER`,
      `FORTUNE EXPERIMENT ENDS; THREE NEW TIME ZONES DISCOVERED`,
      `ACCOUNTANTS REQUEST EMOTIONAL SUPPORT AFTER VIEWING RECEIPT`,
    ];

    setProphecy({
      year,
      title: choice(ORACLE_TITLES, seed),
      story: `${choice(openings[dominant], seed + 3)} ${choice(ORACLE_ENDINGS(person.shortName, money(remaining, true)), seed + 11)}`,
      headline: choice(headlines, seed + 19),
      warning: choice(ORACLE_WARNINGS, seed + 29),
    });
    setCartOpen(false);
  }

  return (
    <div className="spendDatApp">
      <main className="app-shell" style={{ ["--accent" as string]: person.accent }}>
        {titheNote && (
          <div className="sds-tithe-banner" role="note">
            <span>◔</span> {titheNote}
          </div>
        )}
        <header className="market-header" id="top">
          <div className="market-main">
            <a className="wordmark" href="#top" aria-label="Spend Dat Shit home">
              spend dat <strong>shit</strong>
              <small>dat prime</small>
            </a>
            <a className="delivery" href="#fortune-picker">
              <span>Delivering to</span>
              <strong>THE FUTURE⌄</strong>
            </a>
            <label className="search-box">
              <span className="sr-only">Search ridiculous purchases</span>
              <select aria-label="Search category" value={category} onChange={(e) => setCategory(e.target.value as Category)}>
                {CATEGORIES.map((entry) => (
                  <option key={entry}>{entry}</option>
                ))}
              </select>
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search Lamborghini, mansion, Gucci spree…" />
              <span className="search-button" aria-hidden="true">⌕</span>
            </label>
            <a className="account-link" href="#fortune-picker">
              <span>Hello, spender</span>
              <strong>Choose fortune⌄</strong>
            </a>
            <button className="header-cart" onClick={() => setCartOpen(true)} aria-label={`Open cart with ${cartUnits} items`}>
              <span className="cart-count">{cartUnits > 99 ? "99+" : cartUnits}</span>
              <span className="cart-icon">🛒</span>
              <strong>Cart</strong>
            </button>
          </div>
          <nav className="market-nav" aria-label="Store categories">
            <button onClick={() => setCategory("All")}>☰ All</button>
            {CATEGORIES.slice(1).map((entry) => (
              <button key={entry} onClick={() => setCategory(entry)}>
                {entry}
              </button>
            ))}
            <a href="#oracle">Future Oracle</a>
            <span>Ridiculous deals. Imaginary delivery.</span>
          </nav>
        </header>

        <section className="hero" id="fortune-picker">
          <div className="hero-copy-block">
            <p className="eyebrow">DAT PRIME DAY</p>
            <h1>
              Spend {person.shortName}&apos;s
              <br />
              fortune today.
            </h1>
            <p>Shop real-life relief, obscene luxury and society-sized power moves. Nothing ships. The scale is unfortunately real.</p>
            <a href="#shopping">SHOP TODAY&apos;S DEALS</a>
          </div>
          {allowSwitch && (
            <div className="people-wrap">
              <p>Switch billionaires</p>
              <div className="people-row" aria-label="Choose a rich person">
                {people.map((entry) => (
                  <button
                    className={`person-card ${entry.id === personId ? "selected" : ""}`}
                    key={entry.id}
                    onClick={() => choosePerson(entry.id)}
                    aria-pressed={entry.id === personId}
                    style={{ ["--person-accent" as string]: entry.accent }}
                  >
                    <span className="person-avatar">{entry.initials}</span>
                    <span className="person-meta">
                      <strong>{entry.shortName}</strong>
                      <small>{money(entry.fortune, true)}</small>
                    </span>
                    <span className="check">✓</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </section>

        <section className="balance-panel" aria-live="polite">
          <div>
            <p>{person.name}&apos;s remaining fortune</p>
            <strong>{money(remaining)}</strong>
          </div>
          <div className="balance-side">
            <span>{money(spent)} spent</span>
            <span>{percentage < 0.0001 && spent > 0 ? "<0.0001" : percentage.toFixed(4)}%</span>
          </div>
          <div className="progress-track">
            <span style={{ width: `${Math.min(percentage, 100)}%` }} />
          </div>
        </section>

        <section className="shop-section" id="shopping">
          <div className="section-heading">
            <div>
              <p className="eyebrow">TODAY&apos;S RIDICULOUS DEALS</p>
              <h2>{normalizedSearch ? `Results for “${search.trim()}”` : "Shop every aisle"}</h2>
            </div>
            <p>{visibleItems.length} results · Prices include imagination. Delivery promises are legally meaningless.</p>
          </div>
          <div className="filters" role="group" aria-label="Filter purchases by category">
            {CATEGORIES.map((entry) => (
              <button key={entry} className={category === entry ? "active" : ""} onClick={() => setCategory(entry)}>
                {entry}
              </button>
            ))}
          </div>
          <div className="item-grid">
            {visibleItems.map((item) => {
              const quantity = cart[item.id] ?? 0;
              const canAfford = remaining >= item.price;
              const reviews = (hash(item.id) % 98000) + 417;
              const stars = 4 + ((hash(`${item.id}-stars`) % 9) / 10);
              return (
                <article className={`item-card ${item.featured ? "featured" : ""}`} key={item.id}>
                  <div className={`item-art ${item.image ? "has-image" : ""}`} aria-hidden="true">
                    {item.image ? <img src={item.image} alt="" /> : <span>{item.icon}</span>}
                    {item.featured && <b>#1 MOST WANTED</b>}
                  </div>
                  <div className="item-type">Sponsored · {item.category}</div>
                  <h3>{item.name}</h3>
                  <p>{item.note}</p>
                  <div className="rating" aria-label={`${stars.toFixed(1)} out of 5 stars, ${reviews} reviews`}>
                    <span>{stars.toFixed(1)} ★★★★★</span> <a href="#shopping">{reviews.toLocaleString()}</a>
                  </div>
                  <small className="detail">{item.detail}</small>
                  <strong className="price">{money(item.price)}</strong>
                  <span className="prime-badge">
                    <i>✓</i> dat prime
                  </span>
                  <p className="delivery-date">
                    <strong>FREE delivery Tomorrow</strong>
                    <br />
                    Order within the next 14 imaginary hours
                  </p>
                  {quantity === 0 ? (
                    <button className="add-cart" onClick={() => changeQuantity(item, 1)} disabled={!canAfford}>
                      Add to Cart
                    </button>
                  ) : (
                    <div className="buy-row">
                      <div className="quantity-stepper">
                        <button onClick={() => changeQuantity(item, -1)} aria-label={`Remove one ${item.name}`}>−</button>
                        <span aria-label={`${quantity} purchased`}>{quantity.toLocaleString()}</span>
                        <button onClick={() => changeQuantity(item, 1)} disabled={!canAfford} aria-label={`Buy one ${item.name}`}>+</button>
                      </div>
                      <button onClick={() => changeQuantity(item, 10)} disabled={!canAfford}>+10</button>
                      <button className="max" onClick={() => buyMax(item)} disabled={!canAfford}>MAX</button>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
          {visibleItems.length === 0 && (
            <div className="empty-results">
              <h3>No absurd products found.</h3>
              <p>Try “mansion”, “Gucci”, “car”, or clear the search.</p>
              <button
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                }}
              >
                Clear search
              </button>
            </div>
          )}
        </section>

        <section className="oracle-section" id="oracle">
          <div className="oracle-label">
            <span>03</span>
            <p>
              THE FUTURE ORACLE
              <br />
              <small>CART-BASED GENERATIVE SATIRE</small>
            </p>
          </div>
          <div className="oracle-intro">
            <h2>
              Done spending?
              <br />
              See what happens next.
            </h2>
            <p>The oracle studies the shape of your spree—what you valued, what you bought in bulk, and what survived—and hallucinates a strange future from the evidence.</p>
            <button onClick={extrapolateFuture} disabled={spent === 0}>
              EXTRAPOLATE MY FUTURE ↗
            </button>
          </div>
        </section>

        {prophecy && (
          <div className="oracle-overlay" role="dialog" aria-modal="true" aria-labelledby="oracle-title" onClick={() => setProphecy(null)}>
            <article className="prophecy-card" onClick={(e) => e.stopPropagation()}>
              <button className="oracle-close" onClick={() => setProphecy(null)} aria-label="Close future prediction">×</button>
              <p className="transmission">TRANSMISSION FROM {prophecy.year}</p>
              <h2 id="oracle-title">{prophecy.title}</h2>
              <div className="future-receipt">
                <span>FORTUNE BORROWED</span>
                <strong>{person.name}</strong>
                <span>TOTAL SPENT</span>
                <strong>{money(spent)}</strong>
                <span>CHAOS PURCHASES</span>
                <strong>{cartLines.length}</strong>
              </div>
              <p className="prophecy-story">{prophecy.story}</p>
              <blockquote>{prophecy.headline}</blockquote>
              <p className="oracle-warning">{prophecy.warning}</p>
              <div className="oracle-actions">
                <button onClick={extrapolateFuture}>ASK AGAIN</button>
                {onFinish ? (
                  <button className="inverse" onClick={finishExperiment}>FINISH THE EXPERIMENT →</button>
                ) : (
                  <button className="inverse" onClick={() => setProphecy(null)}>EDIT THE TIMELINE</button>
                )}
              </div>
            </article>
          </div>
        )}

        {cartOpen && (
          <div className="cart-overlay" role="dialog" aria-modal="true" aria-labelledby="cart-title" onClick={() => setCartOpen(false)}>
            <aside className="cart-drawer" onClick={(e) => e.stopPropagation()}>
              <button className="cart-close" onClick={() => setCartOpen(false)} aria-label="Close cart">×</button>
              <h2 id="cart-title">Your Cart</h2>
              <p className="cart-person">Spending {person.name}&apos;s money</p>
              {cartLines.length === 0 ? (
                <div className="empty-cart">
                  <span>🛒</span>
                  <h3>Your cart is empty</h3>
                  <p>Deals this imaginary do not last forever.</p>
                  <button onClick={() => setCartOpen(false)}>Continue shopping</button>
                </div>
              ) : (
                <>
                  <div className="cart-lines">
                    {cartLines.map((item) => (
                      <article key={item.id}>
                        <div className={`cart-thumb ${item.image ? "has-image" : ""}`}>
                          {item.image ? <img src={item.image} alt="" /> : <span>{item.icon}</span>}
                        </div>
                        <div>
                          <h3>{item.name}</h3>
                          <p className="stock">In Stock (conceptually)</p>
                          <strong>{money(item.price * (cart[item.id] ?? 0))}</strong>
                          <div className="cart-line-controls">
                            <button onClick={() => changeQuantity(item, -1)}>−</button>
                            <span>Qty: {(cart[item.id] ?? 0).toLocaleString()}</span>
                            <button onClick={() => changeQuantity(item, 1)} disabled={remaining < item.price}>+</button>
                            <button className="delete" onClick={() => setCart((current) => ({ ...current, [item.id]: 0 }))}>Delete</button>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                  <div className="cart-subtotal">
                    <span>Subtotal ({cartUnits.toLocaleString()} items):</span>
                    <strong>{money(spent)}</strong>
                  </div>
                  <button className="checkout-button" onClick={onFinish ? finishExperiment : extrapolateFuture}>
                    {onFinish ? "Finish the experiment →" : "Finish spree & reveal my future"}
                  </button>
                  <p className="cart-disclaimer">This cart is satire. No actual checkout or purchase occurs.</p>
                </>
              )}
            </aside>
          </div>
        )}

        <aside className="spend-dock" aria-label="Spending summary">
          <div>
            <small>SPENT</small>
            <strong>{money(spent, true)}</strong>
          </div>
          <div className="dock-progress">
            <span style={{ width: `${Math.max(Math.min(percentage, 100), spent ? 1 : 0)}%` }} />
          </div>
          {onFinish ? (
            <button className="finish-button" onClick={finishExperiment} disabled={spent === 0}>
              DONE — SEE RESULTS
            </button>
          ) : (
            <button className="finish-button" onClick={() => setCartOpen(true)}>
              VIEW CART ({cartUnits > 99 ? "99+" : cartUnits})
            </button>
          )}
          <button
            className="reset-button"
            onClick={() => {
              setCart({});
              setProphecy(null);
            }}
            disabled={spent === 0}
          >
            RESET
          </button>
        </aside>

        <footer>
          <p>Net-worth estimates fluctuate and are not cash balances. Purchase prices are intentionally illustrative. The future oracle is absurdist entertainment, not financial advice or a real forecast.</p>
          {person.source && (
            <a href={person.source} target="_blank" rel="noreferrer">
              View {person.shortName}&apos;s Forbes estimate ↗
            </a>
          )}
        </footer>
      </main>
    </div>
  );
}
