import { useState, type FormEvent, type ReactNode } from "react";

type Screen =
  | "home"
  | "search"
  | "property"
  | "schedule"
  | "chat"
  | "verify"
  | "landlord"
  | "tenant"
  | "login";

const photos = {
  main: "https://images.unsplash.com/photo-1665249934445-1de680641f50?auto=format&fit=crop&w=1400&q=85",
  second: "https://images.unsplash.com/photo-1564078516393-cf04bd966897?auto=format&fit=crop&w=1200&q=85",
  third: "https://images.unsplash.com/photo-1631510390389-c1e4fb20ff31?auto=format&fit=crop&w=1200&q=85",
  fourth: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85",
  fifth: "https://images.unsplash.com/photo-1682184805271-11671b7ecf4c?auto=format&fit=crop&w=1200&q=85",
};

const listings = [
  { image: photos.main, price: "₹32,000", name: "Sunlit home by Cubbon Park", meta: "2 BHK · 1,240 sq ft", place: "Ashok Nagar, Bengaluru" },
  { image: photos.second, price: "₹28,500", name: "Quiet corner apartment", meta: "2 BHK · 980 sq ft", place: "Indiranagar, Bengaluru" },
  { image: photos.third, price: "₹42,000", name: "Modern terrace residence", meta: "3 BHK · 1,560 sq ft", place: "Koramangala, Bengaluru" },
  { image: photos.fourth, price: "₹24,000", name: "Warm studio near the metro", meta: "1 BHK · 720 sq ft", place: "Jayanagar, Bengaluru" },
  { image: photos.fifth, price: "₹36,500", name: "Calm lakeside apartment", meta: "2 BHK · 1,180 sq ft", place: "Ulsoor, Bengaluru" },
  { image: photos.main, price: "₹39,000", name: "Garden-facing family home", meta: "3 BHK · 1,440 sq ft", place: "HSR Layout, Bengaluru" },
];

const navItems: { key: Screen; label: string }[] = [
  { key: "home", label: "Home" },
  { key: "search", label: "Explore" },
  { key: "landlord", label: "Landlord" },
  { key: "tenant", label: "Tenant" },
];

const paths: Record<string, ReactNode> = {
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
  pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
  heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />,
  arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-4" /></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></>,
  message: <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z" />,
  upload: <><path d="M12 16V4m0 0L7 9m5-5 5 5" /><path d="M4 15v5h16v-5" /></>,
  menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
  close: <><path d="m6 6 12 12M18 6 6 18" /></>,
  map: <><path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3Z" /><path d="M9 3v15m6-12v15" /></>,
  home: <><path d="m3 11 9-8 9 8" /><path d="M5 10v11h14V10M9 21v-7h6v7" /></>,
  building: <><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 7h2m4 0h2M8 11h2m4 0h2M8 15h2m4 0h2M10 21v-3h4v3" /></>,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
  filter: <><path d="M4 6h16M7 12h10M10 18h4" /></>,
  chevron: <path d="m9 18 6-6-6-6" />,
  plus: <path d="M12 5v14M5 12h14" />,
};

function Icon({ name, size = 20 }: { name: keyof typeof paths; size?: number }) {
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

function Button({ children, onClick, variant = "primary", className = "", type = "button" }: {
  children: ReactNode; onClick?: () => void; variant?: "primary" | "secondary" | "ghost"; className?: string; type?: "button" | "submit";
}) {
  return <button type={type} onClick={onClick} className={`button button-${variant} ${className}`}>{children}</button>;
}

function Badge({ children, tone = "teal" }: { children: ReactNode; tone?: "teal" | "sand" | "gray" | "coral" }) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
}

function Header({ screen, navigate }: { screen: Screen; navigate: (s: Screen) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <button className="brand" onClick={() => navigate("home")} aria-label="DwellDirect home">
        <span className="brand-mark"><Icon name="home" size={18} /></span>
        <span>Dwell<span>Direct</span></span>
      </button>
      <nav className={`main-nav ${open ? "nav-open" : ""}`}>
        {navItems.map((item) => <button className={screen === item.key ? "active" : ""} key={item.key} onClick={() => { navigate(item.key); setOpen(false); }}>{item.label}</button>)}
        <button className={screen === "verify" ? "active" : ""} onClick={() => { navigate("verify"); setOpen(false); }}>Verify</button>
      </nav>
      <div className="header-actions">
        <Button variant="ghost" onClick={() => navigate("chat")}><Icon name="message" size={18} /> Messages</Button>
        <Button onClick={() => navigate("login")}>Sign in</Button>
      </div>
      <button className="menu-button" onClick={() => setOpen(!open)} aria-label="Toggle navigation"><Icon name={open ? "close" : "menu"} /></button>
    </header>
  );
}

function SearchBar({ navigate, compact = false }: { navigate: (s: Screen) => void; compact?: boolean }) {
  const [query, setQuery] = useState("");
  const submit = (event: FormEvent) => { event.preventDefault(); navigate("search"); };
  return (
    <form className={`search-bar ${compact ? "search-compact" : ""}`} onSubmit={submit}>
      <Icon name="search" size={compact ? 20 : 24} />
      <input value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Search properties" placeholder="Search e.g. quiet 2BHK near metro" />
      <Button type="submit">{compact ? <Icon name="search" /> : <>Find a home <Icon name="arrow" /></>}</Button>
    </form>
  );
}

function ListingCard({ item, navigate, compact = false }: { item: typeof listings[0]; navigate: (s: Screen) => void; compact?: boolean }) {
  const [saved, setSaved] = useState(false);
  return (
    <article className={`listing-card ${compact ? "listing-compact" : ""}`}>
      <div className="listing-image" onClick={() => navigate("property")}>
        <img src={item.image} alt={item.name} />
        <button className={`save-button ${saved ? "saved" : ""}`} aria-label="Save property" onClick={(e) => { e.stopPropagation(); setSaved(!saved); }}><Icon name="heart" size={18} /></button>
        <Badge tone="sand">Verified</Badge>
      </div>
      <button className="listing-copy" onClick={() => navigate("property")}>
        <div className="listing-top"><strong>{item.name}</strong><b>{item.price}<small>/mo</small></b></div>
        <p>{item.meta}</p>
        <span><Icon name="pin" size={15} /> {item.place}</span>
      </button>
    </article>
  );
}

function Home({ navigate }: { navigate: (s: Screen) => void }) {
  return (
    <main>
      <section className="hero">
        <div className="hero-art hero-art-left"><img src={photos.second} alt="" /></div>
        <div className="hero-copy">
          <Badge tone="sand">Zero brokerage. Real connections.</Badge>
          <h1>Find a place that<br /><em>feels like yours.</em></h1>
          <p>Rent smarter and connect directly with verified landlords. No brokers, no hidden fees, just a simpler way home.</p>
          <SearchBar navigate={navigate} />
          <div className="hero-trust">
            <span><Icon name="check" size={16} /> Verified owners</span>
            <span><Icon name="check" size={16} /> No brokerage</span>
            <span><Icon name="check" size={16} /> Secure visits</span>
          </div>
        </div>
        <div className="hero-art hero-art-right"><img src={photos.fourth} alt="" /></div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div><span className="eyebrow">Homes worth discovering</span><h2>Featured near you</h2></div>
          <Button variant="secondary" onClick={() => navigate("search")}>View all homes <Icon name="arrow" /></Button>
        </div>
        <div className="listing-grid">{listings.slice(0, 4).map((item) => <ListingCard key={item.name} item={item} navigate={navigate} />)}</div>
      </section>

      <section className="direct-section">
        <div><span className="eyebrow light">The direct way to rent</span><h2>Less friction.<br />More trust.</h2></div>
        <div className="steps">
          {[
            ["01", "Discover", "Search homes with the details that truly matter."],
            ["02", "Connect", "Message verified landlords directly and openly."],
            ["03", "Move in", "Schedule a visit, verify, and make it yours."],
          ].map(([n, title, copy]) => <div className="step" key={n}><span>{n}</span><h3>{title}</h3><p>{copy}</p></div>)}
        </div>
      </section>
    </main>
  );
}

function SearchResults({ navigate }: { navigate: (s: Screen) => void }) {
  const [map, setMap] = useState(false);
  const [mobileFilters, setMobileFilters] = useState(false);
  return (
    <main className="page-shell">
      <div className="search-page-top"><SearchBar navigate={navigate} compact /><Button variant="secondary" onClick={() => setMap(!map)}><Icon name="map" /> {map ? "Hide map" : "Show map"}</Button></div>
      <div className="results-heading"><div><span className="eyebrow">Bengaluru, Karnataka</span><h1>Homes that fit your life</h1><p>126 verified properties · No brokerage</p></div><Button className="mobile-filter" variant="secondary" onClick={() => setMobileFilters(!mobileFilters)}><Icon name="filter" /> Filters</Button></div>
      <div className={`results-layout ${map ? "with-map" : ""}`}>
        <aside className={`filters ${mobileFilters ? "filters-open" : ""}`}>
          <div className="filter-title"><h3>Filters</h3><button>Clear all</button></div>
          <label>Monthly rent</label>
          <div className="range-track"><span /></div>
          <div className="range-values"><span>₹10k</span><span>₹80k+</span></div>
          <label>Bedrooms</label>
          <div className="chip-row">{["1 BHK", "2 BHK", "3 BHK", "4+"].map((x, i) => <button className={i === 1 ? "selected" : ""} key={x}>{x}</button>)}</div>
          <label>Location</label>
          <div className="field"><Icon name="pin" size={17} /><input defaultValue="Bengaluru" /></div>
          <label>Amenities</label>
          <div className="checks">{["Furnished", "Parking", "Pet friendly", "Power backup"].map((x, i) => <label key={x}><input type="checkbox" defaultChecked={i < 2} /><span>{x}</span></label>)}</div>
          <Button className="full-button" onClick={() => setMobileFilters(false)}>Show 126 homes</Button>
        </aside>
        <div className="results-grid">{listings.map((item) => <ListingCard key={item.name} item={item} navigate={navigate} compact />)}</div>
        {map && <div className="map-panel"><div className="map-roads" /><span className="map-water" />{["₹28.5k", "₹32k", "₹42k", "₹24k", "₹36.5k"].map((x, i) => <button key={x} className={`map-pin pin-${i}`}>{x}</button>)}</div>}
      </div>
    </main>
  );
}

function Property({ navigate }: { navigate: (s: Screen) => void }) {
  return (
    <main className="page-shell property-page">
      <button className="back-link" onClick={() => navigate("search")}>← Back to search</button>
      <div className="gallery">
        <img className="gallery-main" src={photos.main} alt="Sunlit living room" />
        <img src={photos.second} alt="Bedroom" />
        <img src={photos.third} alt="Sitting room" />
        <img src={photos.fourth} alt="Dining room" />
        <div className="gallery-last"><img src={photos.fifth} alt="Balcony" /><Button variant="secondary">View all 18 photos</Button></div>
      </div>
      <div className="property-layout">
        <div className="property-content">
          <div className="property-title"><div><Badge>Verified property</Badge><h1>Sunlit home by Cubbon Park</h1><p><Icon name="pin" size={17} /> Ashok Nagar, Bengaluru</p></div><button className="round-button"><Icon name="heart" /></button></div>
          <div className="quick-facts">{[["2", "Bedrooms"], ["2", "Bathrooms"], ["1,240", "Sq. ft."], ["3rd", "Floor"]].map(([x, y]) => <div key={y}><strong>{x}</strong><span>{y}</span></div>)}</div>
          <div className="content-block"><h2>A calm home in the heart of the city</h2><p>Bright, thoughtfully maintained, and tucked into a quiet lane just minutes from Cubbon Park. The home comes semi-furnished with generous natural light, a leafy balcony, and a welcoming community.</p></div>
          <div className="content-block"><h2>What this home offers</h2><div className="amenities">{["Semi-furnished", "Covered parking", "Pet friendly", "Power backup", "Balcony", "24/7 security"].map(x => <span key={x}><Icon name="check" size={17} />{x}</span>)}</div></div>
        </div>
        <aside className="booking-card">
          <div className="price-line"><strong>₹32,000</strong><span>/ month</span></div>
          <p>₹96,000 refundable deposit</p>
          <div className="owner">
            <div className="avatar">AS</div>
            <div><span>Listed by owner</span><strong>Arjun Sharma <Icon name="shield" size={16} /></strong><small>Responds in about 1 hour</small></div>
          </div>
          <Button className="full-button" onClick={() => navigate("schedule")}><Icon name="calendar" /> Schedule a visit</Button>
          <Button className="full-button" variant="secondary" onClick={() => navigate("chat")}><Icon name="message" /> Message landlord</Button>
          <small className="booking-note">No payment required to schedule</small>
        </aside>
      </div>
    </main>
  );
}

function Schedule({ navigate }: { navigate: (s: Screen) => void }) {
  const [date, setDate] = useState(16);
  const [time, setTime] = useState("11:30 AM");
  const [confirmed, setConfirmed] = useState(false);
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  return (
    <main className="focused-page">
      <div className="focused-heading"><Badge tone="sand">Schedule a visit</Badge><h1>See it in person</h1><p>Pick a time that works for you. Arjun usually confirms within an hour.</p></div>
      <div className="schedule-grid">
        <section className="calendar-card">
          <div className="calendar-head"><button>←</button><h3>June 2025</h3><button>→</button></div>
          <div className="calendar-days">{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(x => <span key={x}>{x}</span>)}{[...Array(3)].map((_, i) => <span key={`e${i}`} />)}{days.map(d => <button onClick={() => setDate(d)} className={d === date ? "selected" : ""} key={d}>{d}</button>)}</div>
        </section>
        <section className="times-card">
          <span className="eyebrow">Monday, June {date}</span><h2>Available times</h2>
          <div className="time-slots">{["10:00 AM", "11:30 AM", "1:00 PM", "3:30 PM", "5:00 PM", "6:30 PM"].map(x => <button className={x === time ? "selected" : ""} onClick={() => setTime(x)} key={x}>{x}</button>)}</div>
          <div className="visit-summary"><img src={photos.main} alt="" /><div><strong>Sunlit home by Cubbon Park</strong><span>Mon, June {date} · {time}</span></div></div>
          <Button className="full-button" onClick={() => setConfirmed(true)}>{confirmed ? <><Icon name="check" /> Visit requested</> : "Request this time"}</Button>
          <button className="text-button" onClick={() => navigate("property")}>Back to property</button>
        </section>
      </div>
    </main>
  );
}

function Chat() {
  const [messages, setMessages] = useState(["Hi Maya! Yes, it is. Happy to answer any questions.", "The home is available from July 1. Would you like to schedule a visit?"]);
  const [draft, setDraft] = useState("");
  const send = (e: FormEvent) => { e.preventDefault(); if (draft.trim()) { setMessages([...messages, draft]); setDraft(""); } };
  return (
    <main className="chat-shell">
      <aside className="conversations">
        <div className="chat-title"><h2>Messages</h2><button><Icon name="plus" /></button></div>
        <div className="field conversation-search"><Icon name="search" size={17} /><input placeholder="Search conversations" /></div>
        {[["AS", "Arjun Sharma", "The home is available from…", "2m"], ["NP", "Neha Patel", "Perfect, see you on Saturday.", "1d"], ["RK", "Rohan Khanna", "Thanks for your interest!", "3d"]].map((x, i) => <button className={`conversation ${i === 0 ? "selected" : ""}`} key={x[1]}><span className="avatar">{x[0]}</span><span><strong>{x[1]}</strong><small>{x[2]}</small></span><time>{x[3]}</time></button>)}
      </aside>
      <section className="chat-area">
        <div className="chat-person"><div className="avatar">AS</div><div><strong>Arjun Sharma <Icon name="shield" size={15} /></strong><span>Online · Verified landlord</span></div><Button variant="secondary"><Icon name="calendar" size={17} /> Schedule visit</Button></div>
        <div className="messages">
          <div className="message-day">Today</div>
          <div className="bubble sent">Hi Arjun, is the Cubbon Park apartment still available?</div>
          {messages.map((m, i) => <div className={`bubble ${i === messages.length - 1 && messages.length > 2 ? "sent" : "received"}`} key={`${m}-${i}`}>{m}</div>)}
          <div className="property-message"><img src={photos.main} alt="" /><div><strong>Sunlit home by Cubbon Park</strong><span>₹32,000/mo · 2 BHK</span></div></div>
        </div>
        <form className="message-form" onSubmit={send}><button type="button"><Icon name="plus" /></button><input value={draft} onChange={e => setDraft(e.target.value)} placeholder="Write a message…" /><Button type="submit">Send <Icon name="arrow" size={17} /></Button></form>
      </section>
    </main>
  );
}

function Verify() {
  const [uploaded, setUploaded] = useState(false);
  return (
    <main className="focused-page verification">
      <div className="focused-heading"><Badge tone="sand">Trust & safety</Badge><h1>Verify your identity</h1><p>Help keep DwellDirect safe. Your documents are encrypted and never shared publicly.</p></div>
      <div className="progress-line">{[["1", "Identity", "verified"], ["2", "Address", uploaded ? "verified" : "active"], ["3", "Review", ""]].map(([n, t, s]) => <div className={s} key={n}><span>{s === "verified" ? <Icon name="check" size={16} /> : n}</span><strong>{t}</strong><small>{s === "verified" ? "Verified" : s === "active" ? "Under review" : "Not submitted"}</small></div>)}</div>
      <section className="upload-card">
        <div><span className="eyebrow">Step 2 of 3</span><h2>Proof of address</h2><p>Upload a recent utility bill, bank statement, or rental agreement.</p></div>
        <label className={`drop-zone ${uploaded ? "uploaded" : ""}`}>
          <input type="file" onChange={() => setUploaded(true)} />
          <span className="upload-icon"><Icon name={uploaded ? "check" : "upload"} /></span>
          <strong>{uploaded ? "Document submitted" : "Drop your document here"}</strong>
          <span>{uploaded ? "address-proof.pdf · Under review" : "or browse from your device"}</span>
          {!uploaded && <small>PDF, JPG or PNG · Max 10 MB</small>}
        </label>
        <div className="privacy-note"><Icon name="shield" /><div><strong>Your privacy matters</strong><p>Documents are securely encrypted and deleted after verification.</p></div></div>
        <Button className="full-button" onClick={() => setUploaded(true)}>{uploaded ? "Continue to review" : "Submit document"}</Button>
      </section>
    </main>
  );
}

function StatCard({ icon, value, label, note }: { icon: keyof typeof paths; value: string; label: string; note: string }) {
  return <div className="stat-card"><span><Icon name={icon} /></span><div><small>{label}</small><strong>{value}</strong><p>{note}</p></div></div>;
}

function Landlord({ navigate }: { navigate: (s: Screen) => void }) {
  return (
    <main className="dashboard page-shell">
      <div className="dashboard-head"><div><span className="eyebrow">Landlord workspace</span><h1>Good morning, Arjun</h1><p>Here’s what’s happening with your properties.</p></div><Button><Icon name="plus" /> Add new listing</Button></div>
      <div className="stats"><StatCard icon="building" value="3" label="Active listings" note="+1 this month" /><StatCard icon="calendar" value="5" label="Visit requests" note="2 need a response" /><StatCard icon="message" value="8" label="New messages" note="Across 4 conversations" /></div>
      <div className="dashboard-grid">
        <section className="panel wide"><div className="panel-head"><div><h2>Your listings</h2><p>Manage and track your live properties</p></div><button>View all <Icon name="arrow" size={16} /></button></div>{listings.slice(0, 3).map((x, i) => <div className="dashboard-listing" key={x.name}><img src={x.image} alt="" /><div><strong>{x.name}</strong><span>{x.place}</span><small>{[18, 11, 7][i]} inquiries this week</small></div><Badge tone={i === 2 ? "sand" : "teal"}>{i === 2 ? "Draft" : "Active"}</Badge><b>{x.price}<small>/mo</small></b><button>•••</button></div>)}</section>
        <section className="panel"><div className="panel-head"><div><h2>Visit requests</h2><p>Upcoming this week</p></div></div>{[["MT", "Maya Thomas", "Today · 5:00 PM"], ["VS", "Vikram Singh", "Tomorrow · 11:30 AM"], ["AK", "Ananya Kumar", "Sat · 10:00 AM"]].map((x, i) => <div className="request" key={x[1]}><div className="avatar">{x[0]}</div><div><strong>{x[1]}</strong><span>{x[2]}</span></div>{i === 0 ? <div className="request-actions"><button><Icon name="check" /></button><button>×</button></div> : <Badge tone="gray">Confirmed</Badge>}</div>)}</section>
      </div>
      <button className="verification-banner" onClick={() => navigate("verify")}><span><Icon name="shield" /></span><div><strong>Identity verified</strong><p>Your profile has earned the landlord trust badge.</p></div><Icon name="chevron" /></button>
    </main>
  );
}

function Tenant({ navigate }: { navigate: (s: Screen) => void }) {
  return (
    <main className="dashboard page-shell">
      <div className="dashboard-head"><div><span className="eyebrow">Your home search</span><h1>Welcome back, Maya</h1><p>Pick up where you left off.</p></div><Button onClick={() => navigate("search")}><Icon name="search" /> Explore homes</Button></div>
      <div className="tenant-highlight">
        <div><Badge tone="sand">Upcoming visit</Badge><h2>Sunlit home by Cubbon Park</h2><p><Icon name="calendar" size={17} /> Monday, June 16 · 11:30 AM</p><p><Icon name="pin" size={17} /> Ashok Nagar, Bengaluru</p><div><Button onClick={() => navigate("chat")}>Message landlord</Button><Button variant="secondary">View details</Button></div></div>
        <img src={photos.main} alt="Sunlit home by Cubbon Park" />
      </div>
      <section className="saved-section"><div className="section-heading"><div><span className="eyebrow">Your shortlist</span><h2>Saved homes</h2></div><Button variant="secondary" onClick={() => navigate("search")}>See all 12 <Icon name="arrow" /></Button></div><div className="listing-grid three">{listings.slice(1, 4).map(x => <ListingCard key={x.name} item={x} navigate={navigate} />)}</div></section>
      <section className="panel threads"><div className="panel-head"><div><h2>Recent conversations</h2><p>Stay in touch with landlords</p></div><button onClick={() => navigate("chat")}>Open messages <Icon name="arrow" size={16} /></button></div>{[["AS", "Arjun Sharma", "The home is available from July 1.", "2 min"], ["NP", "Neha Patel", "Perfect, see you on Saturday.", "1 day"]].map(x => <button onClick={() => navigate("chat")} className="thread" key={x[1]}><div className="avatar">{x[0]}</div><div><strong>{x[1]}</strong><span>{x[2]}</span></div><time>{x[3]}</time><Icon name="chevron" size={17} /></button>)}</section>
    </main>
  );
}

function Login({ navigate }: { navigate: (s: Screen) => void }) {
  const [role, setRole] = useState<"tenant" | "landlord">("tenant");
  return (
    <main className="login-page">
      <div className="login-art"><img src={photos.fourth} alt="A warm, modern home" /><div><span className="brand-mark"><Icon name="home" /></span><blockquote>“Home isn’t a place you find.<br />It’s a feeling you recognize.”</blockquote><p>Rent smarter. Connect directly.</p></div></div>
      <section className="login-card">
        <button className="brand login-brand" onClick={() => navigate("home")}><span className="brand-mark"><Icon name="home" size={18} /></span><span>Dwell<span>Direct</span></span></button>
        <div><span className="eyebrow">Welcome to DwellDirect</span><h1>Find your way home</h1><p>Choose how you’d like to use DwellDirect.</p></div>
        <div className="role-cards">
          <button className={role === "tenant" ? "selected" : ""} onClick={() => setRole("tenant")}><span><Icon name="user" /></span><strong>I’m a tenant</strong><small>Find and rent your next home</small></button>
          <button className={role === "landlord" ? "selected" : ""} onClick={() => setRole("landlord")}><span><Icon name="building" /></span><strong>I’m a landlord</strong><small>List and manage properties</small></button>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); navigate(role); }} className="login-form">
          <label>Email address<input type="email" placeholder="you@example.com" required /></label>
          <label>Password<input type="password" placeholder="Enter your password" required /></label>
          <div className="login-options"><label><input type="checkbox" /> Remember me</label><button type="button">Forgot password?</button></div>
          <Button className="full-button" type="submit">Continue as {role === "tenant" ? "tenant" : "landlord"} <Icon name="arrow" /></Button>
        </form>
        <p className="signup-copy">New to DwellDirect? <button>Create an account</button></p>
      </section>
    </main>
  );
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const navigate = (next: Screen) => { setScreen(next); window.scrollTo({ top: 0, behavior: "smooth" }); };
  return (
    <div className="app">
      {screen !== "login" && <Header screen={screen} navigate={navigate} />}
      {screen === "home" && <Home navigate={navigate} />}
      {screen === "search" && <SearchResults navigate={navigate} />}
      {screen === "property" && <Property navigate={navigate} />}
      {screen === "schedule" && <Schedule navigate={navigate} />}
      {screen === "chat" && <Chat />}
      {screen === "verify" && <Verify />}
      {screen === "landlord" && <Landlord navigate={navigate} />}
      {screen === "tenant" && <Tenant navigate={navigate} />}
      {screen === "login" && <Login navigate={navigate} />}
    </div>
  );
}
