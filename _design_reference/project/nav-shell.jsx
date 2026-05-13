// Main navigation shell for the study app.
// Top brand bar (app name + settings gear) → large title → Decks home content → 5-tab bar.

function NavShellScreen({ dark, accent, appName }) {
  const text = dark ? '#fff' : '#1F1B16';
  const sec = dark ? 'rgba(235,235,245,0.6)' : 'rgba(60,60,67,0.6)';
  const ter = dark ? 'rgba(235,235,245,0.4)' : 'rgba(60,60,67,0.45)';
  const bg = dark ? '#000' : '#F2F1EC';
  const card = dark ? '#1C1C1E' : '#fff';
  const hairline = dark ? 'rgba(84,84,88,0.5)' : 'rgba(60,60,67,0.12)';

  return (
    <div style={{
      background: bg, color: text, height: '100%', overflowY: 'auto',
      paddingTop: 58, paddingBottom: 110,
      position: 'relative',
    }}>
      {/* ── Top brand bar ───────────────────────────────────── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 20px 6px',
      }}>
        <div style={{
          font: '600 15px/1 -apple-system,"SF Pro Text",system-ui,sans-serif',
          letterSpacing: '-0.01em',
          color: text,
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <span style={{
            width: 22, height: 22, borderRadius: 6,
            background: accent,
            display: 'inline-grid', placeItems: 'center',
            color: '#fff',
            font: '700 12px/1 -apple-system,system-ui,sans-serif',
            letterSpacing: 0,
          }}>{(appName || 'A').trim().charAt(0).toUpperCase()}</span>
          <span style={{ maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {appName}
          </span>
        </div>
        <button aria-label="Settings" style={{
          appearance: 'none', border: 0, padding: 0, cursor: 'pointer',
          width: 34, height: 34, borderRadius: 999,
          background: dark ? 'rgba(118,118,128,0.24)' : 'rgba(120,120,128,0.12)',
          display: 'grid', placeItems: 'center',
          color: dark ? '#fff' : '#1F1B16',
        }}>
          <GearIcon />
        </button>
      </div>

      {/* ── Large title row ─────────────────────────────────── */}
      <div style={{
        padding: '6px 20px 12px',
        display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
      }}>
        <div>
          <div style={{
            font: '700 34px/1.05 -apple-system,"SF Pro Display",system-ui,sans-serif',
            letterSpacing: '-0.015em',
            color: text,
          }}>Decks</div>
          <div style={{
            font: '400 13px/1.2 -apple-system,system-ui,sans-serif',
            color: sec, marginTop: 4, letterSpacing: '0.01em',
          }}>12 decks · 18 due today</div>
        </div>
      </div>

      {/* ── Search field ─────────────────────────────────────── */}
      <div style={{ padding: '0 16px 14px' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          height: 36, borderRadius: 10, padding: '0 10px',
          background: dark ? 'rgba(118,118,128,0.24)' : 'rgba(120,120,128,0.12)',
        }}>
          <SearchIcon color={ter} />
          <span style={{
            flex: 1,
            font: '400 15px/1 -apple-system,system-ui,sans-serif',
            color: ter,
          }}>Search decks</span>
          <MicIcon color={ter} />
        </div>
      </div>

      {/* ── Continue hero card ──────────────────────────────── */}
      <div style={{
        margin: '0 16px 16px',
        background: card,
        borderRadius: 20,
        padding: 16,
        display: 'flex', alignItems: 'center', gap: 14,
        boxShadow: dark ? 'none' : '0 1px 2px rgba(20,14,4,0.04)',
      }}>
        <div style={{
          width: 52, height: 52, borderRadius: 14, flex: '0 0 52px',
          background: tint(accent, 0.18),
          color: accent,
          display: 'grid', placeItems: 'center',
        }}>
          <CardsStackIcon />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            font: '500 11px/1 -apple-system,system-ui,sans-serif',
            color: sec, letterSpacing: '0.08em', textTransform: 'uppercase',
            marginBottom: 4,
          }}>Pick up where you left off</div>
          <div style={{
            font: '600 17px/1.2 -apple-system,"SF Pro Text",system-ui,sans-serif',
            color: text,
          }}>Spanish — A2 vocab</div>
          <div style={{
            font: '400 13px/1.2 -apple-system,system-ui,sans-serif',
            color: sec, marginTop: 2,
          }}>12 cards remaining · 8 min</div>
        </div>
        <button style={{
          appearance: 'none', border: 0, cursor: 'pointer',
          background: accent, color: '#fff',
          width: 40, height: 40, borderRadius: 999,
          display: 'grid', placeItems: 'center',
          boxShadow: `0 4px 10px ${accent}55`,
        }}>
          <PlayIcon />
        </button>
      </div>

      {/* ── Filter chips ─────────────────────────────────────── */}
      <div style={{
        margin: '0 16px 14px', display: 'flex', gap: 8,
        overflowX: 'auto', scrollbarWidth: 'none',
      }}>
        <FilterChip active accent={accent} dark={dark}>All</FilterChip>
        <FilterChip accent={accent} dark={dark}>Due</FilterChip>
        <FilterChip accent={accent} dark={dark}>Languages</FilterChip>
        <FilterChip accent={accent} dark={dark}>Science</FilterChip>
        <FilterChip accent={accent} dark={dark}>Mastered</FilterChip>
      </div>

      {/* ── Decks list ──────────────────────────────────────── */}
      <div style={{
        font: '600 12px/1 -apple-system,system-ui,sans-serif',
        letterSpacing: '0.06em', textTransform: 'uppercase',
        color: sec, padding: '4px 24px 8px',
      }}>Recent</div>

      <div style={{
        margin: '0 16px',
        background: card,
        borderRadius: 18,
        boxShadow: dark ? 'none' : '0 1px 2px rgba(20,14,4,0.04)',
        overflow: 'hidden',
      }}>
        <DeckRow2 dark={dark} accent={accent} hairline={hairline}
          emoji="🇪🇸" title="Spanish — A2 vocab" sub="62 cards" due={12} pct={0.62} />
        <DeckRow2 dark={dark} accent={accent} hairline={hairline}
          emoji="⚗︎"  title="Organic chemistry" sub="118 cards" due={6} pct={0.34} />
        <DeckRow2 dark={dark} accent={accent} hairline={hairline}
          emoji="📚" title="SAT vocabulary" sub="94 cards" due={0} pct={1} done />
        <DeckRow2 dark={dark} accent={accent} hairline={hairline}
          emoji="🦴" title="Anatomy: skeletal" sub="46 cards · new" due={0} pct={0.08} isLast />
      </div>

      {/* ── Bottom tab bar ──────────────────────────────────── */}
      <NavTabBar accent={accent} dark={dark} active="decks" />
    </div>
  );
}

// ── Pieces ──────────────────────────────────────────────────

function FilterChip({ active, accent, dark, children }) {
  return (
    <div style={{
      flex: '0 0 auto',
      padding: '7px 14px', borderRadius: 999,
      background: active ? accent : (dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)'),
      color: active ? '#fff' : (dark ? '#fff' : '#1F1B16'),
      font: `${active ? '600' : '500'} 13px/1 -apple-system,system-ui,sans-serif`,
      boxShadow: active ? `0 2px 6px ${accent}55` : 'none',
      whiteSpace: 'nowrap',
    }}>{children}</div>
  );
}

function DeckRow2({ dark, accent, hairline, emoji, title, sub, due, pct, done, isLast }) {
  const text = dark ? '#fff' : '#1F1B16';
  const sec = dark ? 'rgba(235,235,245,0.6)' : 'rgba(60,60,67,0.6)';
  const trackBg = dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '12px 14px',
      borderBottom: isLast ? 'none' : `0.5px solid ${hairline}`,
    }}>
      <div style={{
        width: 40, height: 40, borderRadius: 10, flex: '0 0 40px',
        background: tint(accent, 0.16),
        display: 'grid', placeItems: 'center',
        font: '20px/1 -apple-system,"Apple Color Emoji",system-ui,sans-serif',
      }}>{emoji}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <div style={{
            font: '500 15px/1.2 -apple-system,system-ui,sans-serif',
            color: text, flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>{title}</div>
          {due > 0 && (
            <div style={{
              font: '600 11px/1 -apple-system,system-ui,sans-serif',
              padding: '4px 7px', borderRadius: 999,
              background: tint(accent, 0.16), color: accent,
            }}>{due} due</div>
          )}
        </div>
        <div style={{
          font: '400 12px/1.3 -apple-system,system-ui,sans-serif',
          color: sec, marginTop: 2,
        }}>{sub}</div>
        <div style={{ marginTop: 7, height: 4, borderRadius: 2, background: trackBg, overflow: 'hidden' }}>
          <div style={{
            height: '100%', width: `${pct * 100}%`,
            background: done ? '#8DC79B' : accent,
            borderRadius: 2,
          }} />
        </div>
      </div>
      <Chev dark={dark} />
    </div>
  );
}

function NavTabBar({ accent, dark, active }) {
  const inactive = dark ? 'rgba(235,235,245,0.5)' : 'rgba(60,60,67,0.55)';
  const bg = dark ? 'rgba(28,28,30,0.78)' : 'rgba(255,255,255,0.78)';
  const tabs = [
    { key: 'decks',    label: 'Decks',    icon: <TabDecksIcon /> },
    { key: 'notes',    label: 'Notes',    icon: <TabNotesIcon /> },
    { key: 'ai',       label: 'AI Chat',  icon: <TabAIIcon /> },
    { key: 'messages', label: 'Messages', icon: <TabMessagesIcon /> },
    { key: 'profile',  label: 'Profile',  icon: <TabProfileIcon /> },
  ];
  return (
    <div style={{
      position: 'absolute', left: 12, right: 12, bottom: 16,
      background: bg,
      borderRadius: 28,
      padding: '8px 4px',
      display: 'flex', justifyContent: 'space-around', alignItems: 'center',
      backdropFilter: 'blur(24px) saturate(180%)',
      WebkitBackdropFilter: 'blur(24px) saturate(180%)',
      border: `0.5px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)'}`,
      boxShadow: dark
        ? '0 8px 24px rgba(0,0,0,0.5)'
        : '0 6px 24px rgba(20,14,4,0.10)',
    }}>
      {tabs.map((t) => {
        const isActive = t.key === active;
        return (
          <div key={t.key} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            color: isActive ? accent : inactive,
            padding: '4px 6px',
            flex: 1,
          }}>
            <div style={{ width: 24, height: 24, display: 'grid', placeItems: 'center' }}>{t.icon}</div>
            <div style={{
              font: `${isActive ? '600' : '500'} 10px/1 -apple-system,system-ui,sans-serif`,
              letterSpacing: '0.01em',
            }}>{t.label}</div>
          </div>
        );
      })}
    </div>
  );
}

// ── Icons ───────────────────────────────────────────────────

const GearIcon = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>
  </svg>
);

const SearchIcon = ({ color }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round">
    <circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>
  </svg>
);

const MicIcon = ({ color }) => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill={color}>
    <rect x="9" y="3" width="6" height="12" rx="3"/>
    <path d="M5 11a7 7 0 0 0 14 0" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M12 18v3" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const PlayIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff">
    <path d="M7 4.5v15l13-7.5z"/>
  </svg>
);

const CardsStackIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="1.8" strokeLinejoin="round">
    <rect x="3" y="6.5" width="13" height="11.5" rx="2.2"/>
    <rect x="7.5" y="3" width="13" height="11.5" rx="2.2" fill="currentColor" fillOpacity="0.18"/>
  </svg>
);

const Chev = ({ dark }) => (
  <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
    <path d="M1 1l5 5-5 5" stroke={dark ? 'rgba(235,235,245,0.3)' : 'rgba(60,60,67,0.28)'}
          strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Tab icons — paired filled/outline. Active tab uses currentColor heavier.
const TabDecksIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" width="24" height="24">
    <rect x="3" y="7" width="13" height="12" rx="2.2" fill="currentColor" fillOpacity="0.16"/>
    <rect x="3" y="7" width="13" height="12" rx="2.2"/>
    <rect x="8" y="3" width="13" height="12" rx="2.2"/>
  </svg>
);
const TabNotesIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" width="24" height="24">
    <path d="M6 3h9l4 4v12.5A1.5 1.5 0 0 1 17.5 21h-11A1.5 1.5 0 0 1 5 19.5v-15A1.5 1.5 0 0 1 6.5 3z"/>
    <path d="M14 3v4h4" />
    <path d="M8 12h8M8 16h6" />
  </svg>
);
const TabAIIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" width="24" height="24">
    <path d="M12 3l1.6 3.8L17.5 8.5l-3.9 1.7L12 14l-1.6-3.8L6.5 8.5l3.9-1.7z" fill="currentColor" fillOpacity="0.16"/>
    <path d="M12 3l1.6 3.8L17.5 8.5l-3.9 1.7L12 14l-1.6-3.8L6.5 8.5l3.9-1.7z"/>
    <path d="M18.5 14.5l.7 1.7 1.7.7-1.7.7-.7 1.7-.7-1.7-1.7-.7 1.7-.7z"/>
  </svg>
);
const TabMessagesIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" width="24" height="24">
    <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v8a2.5 2.5 0 0 1-2.5 2.5H10l-4 3.5v-3.5h-.5A1.5 1.5 0 0 1 4 15.5z"/>
  </svg>
);
const TabProfileIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
    <circle cx="12" cy="9" r="3.7"/>
    <path d="M4.5 20c1.5-3.7 4.4-5.6 7.5-5.6s6 1.9 7.5 5.6"/>
  </svg>
);

Object.assign(window, { NavShellScreen });
