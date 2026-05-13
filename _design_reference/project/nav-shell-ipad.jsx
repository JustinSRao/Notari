// iPad nav shell — left sidebar + main Decks content.
// Sidebar collapses to icons-only when `collapsed=true` (driven by device width).

function IPadFrame({ width, height, dark, children, label }) {
  const bezel = dark ? '#0c0c0d' : '#0e0e10';
  const screenBg = dark ? '#000' : '#F2F1EC';
  const time = '9:41';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
      <div style={{
        width, height, borderRadius: 52,
        background: bezel, padding: 14,
        boxShadow: dark
          ? '0 40px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04)'
          : '0 40px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.12)',
        position: 'relative',
        fontFamily: '-apple-system, system-ui, sans-serif',
        WebkitFontSmoothing: 'antialiased',
        boxSizing: 'border-box',
      }}>
        {/* Front camera (landscape: top-center long edge; portrait: top-center short edge — top center works for both) */}
        <div style={{
          position: 'absolute', top: 6, left: '50%', transform: 'translateX(-50%)',
          width: 8, height: 8, borderRadius: 99,
          background: '#1a1a1c',
          boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.04)',
          zIndex: 50,
        }} />
        {/* Inner screen */}
        <div style={{
          width: '100%', height: '100%', borderRadius: 38,
          background: screenBg, color: dark ? '#fff' : '#1F1B16',
          overflow: 'hidden', position: 'relative',
        }}>
          {/* Status bar (iPadOS) */}
          <IPadStatusBar dark={dark} time={time} />
          {/* Content */}
          <div style={{ position: 'absolute', top: 28, left: 0, right: 0, bottom: 0 }}>
            {children}
          </div>
          {/* Home indicator */}
          <div style={{
            position: 'absolute', bottom: 7, left: 0, right: 0,
            display: 'flex', justifyContent: 'center', pointerEvents: 'none',
          }}>
            <div style={{
              width: 200, height: 5, borderRadius: 99,
              background: dark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.22)',
            }} />
          </div>
        </div>
      </div>
      {label && (
        <div style={{
          font: 'italic 400 22px/1 "Instrument Serif", serif',
          color: dark ? 'rgba(244,241,234,0.5)' : 'rgba(31,27,22,0.55)',
        }}>{label}</div>
      )}
    </div>
  );
}

function IPadStatusBar({ dark, time }) {
  const c = dark ? '#fff' : '#000';
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, height: 28,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 22px', zIndex: 20,
      font: '600 13px/1 -apple-system,"SF Pro Text",system-ui,sans-serif',
      color: c,
    }}>
      <span>{time}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <svg width="16" height="10" viewBox="0 0 19 12">
          <rect x="0" y="7.5" width="3.2" height="4.5" rx="0.7" fill={c}/>
          <rect x="4.8" y="5" width="3.2" height="7" rx="0.7" fill={c}/>
          <rect x="9.6" y="2.5" width="3.2" height="9.5" rx="0.7" fill={c}/>
          <rect x="14.4" y="0" width="3.2" height="12" rx="0.7" fill={c}/>
        </svg>
        <svg width="14" height="10" viewBox="0 0 17 12">
          <path d="M8.5 3.2C10.8 3.2 12.9 4.1 14.4 5.6L15.5 4.5C13.7 2.7 11.2 1.5 8.5 1.5C5.8 1.5 3.3 2.7 1.5 4.5L2.6 5.6C4.1 4.1 6.2 3.2 8.5 3.2Z" fill={c}/>
          <path d="M8.5 6.8C9.9 6.8 11.1 7.3 12 8.2L13.1 7.1C11.8 5.9 10.2 5.1 8.5 5.1C6.8 5.1 5.2 5.9 3.9 7.1L5 8.2C5.9 7.3 7.1 6.8 8.5 6.8Z" fill={c}/>
          <circle cx="8.5" cy="10.5" r="1.5" fill={c}/>
        </svg>
        <svg width="22" height="11" viewBox="0 0 27 13">
          <rect x="0.5" y="0.5" width="23" height="12" rx="3.5" stroke={c} strokeOpacity="0.35" fill="none"/>
          <rect x="2" y="2" width="20" height="9" rx="2" fill={c}/>
          <path d="M25 4.5V8.5C25.8 8.2 26.5 7.2 26.5 6.5C26.5 5.8 25.8 4.8 25 4.5Z" fill={c} fillOpacity="0.4"/>
        </svg>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Main shell
// ─────────────────────────────────────────────────────────────
function IPadNavShell({ dark, accent, appName, collapsed }) {
  const text = dark ? '#fff' : '#1F1B16';
  const sec = dark ? 'rgba(235,235,245,0.6)' : 'rgba(60,60,67,0.6)';
  const ter = dark ? 'rgba(235,235,245,0.4)' : 'rgba(60,60,67,0.45)';
  const bg = dark ? '#000' : '#F2F1EC';
  const sidebarBg = dark ? '#111113' : '#EAE3D2';
  const sidebarBorder = dark ? 'rgba(255,255,255,0.06)' : 'rgba(31,27,22,0.06)';
  const card = dark ? '#1C1C1E' : '#fff';
  const hairline = dark ? 'rgba(84,84,88,0.5)' : 'rgba(60,60,67,0.12)';

  const sidebarW = collapsed ? 76 : 240;

  return (
    <div style={{
      display: 'flex', height: '100%', width: '100%',
      background: bg, color: text,
      paddingTop: 12, // status bar offset
    }}>
      {/* ── Sidebar ──────────────────────────────────────── */}
      <aside style={{
        width: sidebarW, flex: `0 0 ${sidebarW}px`,
        background: sidebarBg,
        borderRight: `0.5px solid ${sidebarBorder}`,
        display: 'flex', flexDirection: 'column',
        padding: collapsed ? '20px 12px' : '20px 14px',
        gap: 18,
        transition: 'width 220ms ease',
      }}>
        {/* Brand */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: collapsed ? '0' : '4px 6px',
          justifyContent: collapsed ? 'center' : 'flex-start',
          marginBottom: 4,
        }}>
          <div style={{
            width: 32, height: 32, borderRadius: 9,
            background: accent, color: '#fff',
            display: 'grid', placeItems: 'center',
            font: '700 14px/1 -apple-system,system-ui,sans-serif',
            boxShadow: `0 2px 8px ${accent}55`,
          }}>{(appName || 'A').trim().charAt(0).toUpperCase()}</div>
          {!collapsed && (
            <div style={{
              font: '600 16px/1 -apple-system,"SF Pro Text",system-ui,sans-serif',
              color: text, letterSpacing: '-0.01em',
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>{appName}</div>
          )}
        </div>

        {/* Search (only when expanded — collapses to its icon in nav row) */}
        {!collapsed && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            height: 34, borderRadius: 9, padding: '0 10px',
            background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(31,27,22,0.05)',
          }}>
            <SearchIcon color={ter} />
            <span style={{
              flex: 1,
              font: '400 14px/1 -apple-system,system-ui,sans-serif',
              color: ter,
            }}>Search</span>
            <span style={{
              font: '500 11px/1 -apple-system,system-ui,sans-serif',
              color: ter,
              padding: '2px 5px', borderRadius: 4,
              border: `0.5px solid ${ter}`,
            }}>⌘K</span>
          </div>
        )}

        {/* Nav */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 2 }}>
          <SideItem dark={dark} accent={accent} collapsed={collapsed} active label="Decks"   icon={<TabDecksIcon />}    badge="18" />
          <SideItem dark={dark} accent={accent} collapsed={collapsed}        label="Notes"   icon={<TabNotesIcon />} />
          <SideItem dark={dark} accent={accent} collapsed={collapsed}        label="AI Chat" icon={<TabAIIcon />} />
          <SideItem dark={dark} accent={accent} collapsed={collapsed}        label="Messages" icon={<TabMessagesIcon />} badge="3" />
          <SideItem dark={dark} accent={accent} collapsed={collapsed}        label="Profile" icon={<TabProfileIcon />} />
        </nav>

        <div style={{ flex: 1 }} />

        {/* Footer: streak chip + settings */}
        {!collapsed ? (
          <>
            <div style={{
              padding: 12, borderRadius: 14,
              background: dark ? 'rgba(255,255,255,0.04)' : 'rgba(31,27,22,0.04)',
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: 9,
                background: tint(accent, 0.18), color: accent,
                display: 'grid', placeItems: 'center',
              }}><FlameIcon2 /></div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ font: '600 13px/1.1 -apple-system,system-ui,sans-serif', color: text }}>14-day streak</div>
                <div style={{ font: '400 11px/1.2 -apple-system,system-ui,sans-serif', color: sec, marginTop: 2 }}>6 cards to today's goal</div>
              </div>
            </div>
            <button aria-label="Settings" style={{
              appearance: 'none', border: 0, padding: '10px 12px',
              background: 'transparent', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 12,
              color: sec, borderRadius: 10,
              font: '500 14px/1 -apple-system,system-ui,sans-serif',
            }}>
              <GearIcon />
              <span>Settings</span>
            </button>
          </>
        ) : (
          <button aria-label="Settings" style={{
            appearance: 'none', border: 0, padding: 10,
            background: 'transparent', cursor: 'pointer',
            display: 'grid', placeItems: 'center',
            color: sec, borderRadius: 10,
          }}>
            <GearIcon />
          </button>
        )}
      </aside>

      {/* ── Main content ─────────────────────────────────── */}
      <main style={{
        flex: 1, minWidth: 0, height: '100%',
        overflowY: 'auto',
        padding: collapsed ? '14px 28px 40px' : '14px 36px 40px',
      }}>
        {/* Top toolbar */}
        <div style={{
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          gap: 16, padding: '6px 0 18px',
        }}>
          <div>
            <div style={{
              font: '500 12px/1 -apple-system,system-ui,sans-serif',
              color: sec, letterSpacing: '0.06em', textTransform: 'uppercase',
              marginBottom: 6,
            }}>Friday, May 8</div>
            <div style={{
              font: '700 32px/1.1 -apple-system,"SF Pro Display",system-ui,sans-serif',
              letterSpacing: '-0.015em', color: text,
            }}>Decks</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <ToolPill dark={dark}>
              <FilterIcon /> <span>Filter</span>
            </ToolPill>
            <ToolPill dark={dark}>
              <SortIcon /> <span>Sort</span>
            </ToolPill>
            <button style={{
              appearance: 'none', border: 0, cursor: 'pointer',
              height: 36, padding: '0 14px', borderRadius: 999,
              background: accent, color: '#fff',
              font: '600 13px/1 -apple-system,system-ui,sans-serif',
              display: 'flex', alignItems: 'center', gap: 6,
              boxShadow: `0 2px 8px ${accent}55`,
            }}>
              <PlusIcon2 /> <span>New deck</span>
            </button>
          </div>
        </div>

        {/* Continue hero */}
        <div style={{
          background: card, borderRadius: 20,
          padding: 20, marginBottom: 24,
          display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 18, alignItems: 'center',
          boxShadow: dark ? 'none' : '0 1px 2px rgba(20,14,4,0.04)',
        }}>
          <div style={{
            width: 76, height: 76, borderRadius: 18,
            background: tint(accent, 0.18),
            color: accent,
            display: 'grid', placeItems: 'center',
          }}>
            <ProgressDonut pct={0.62} accent={accent} size={64} />
          </div>
          <div>
            <div style={{
              font: '500 11px/1 -apple-system,system-ui,sans-serif',
              color: sec, letterSpacing: '0.08em', textTransform: 'uppercase',
              marginBottom: 6,
            }}>Pick up where you left off</div>
            <div style={{
              font: '600 22px/1.15 -apple-system,"SF Pro Display",system-ui,sans-serif',
              color: text, letterSpacing: '-0.01em',
            }}>Spanish — A2 vocab</div>
            <div style={{
              font: '400 14px/1.3 -apple-system,system-ui,sans-serif',
              color: sec, marginTop: 4,
            }}>12 of 62 cards remaining · about 8 minutes</div>
          </div>
          <button style={{
            appearance: 'none', border: 0, cursor: 'pointer',
            height: 44, padding: '0 18px 0 18px', borderRadius: 999,
            background: accent, color: '#fff',
            font: '600 15px/1 -apple-system,system-ui,sans-serif',
            display: 'flex', alignItems: 'center', gap: 8,
            boxShadow: `0 4px 12px ${accent}55`,
          }}>
            <span>Continue</span>
            <PlayIcon size={12} />
          </button>
        </div>

        {/* Filter chips */}
        <div style={{
          display: 'flex', gap: 8, marginBottom: 18, flexWrap: 'wrap',
        }}>
          <Chip2 active accent={accent} dark={dark}>All decks</Chip2>
          <Chip2 accent={accent} dark={dark}>Due today · 18</Chip2>
          <Chip2 accent={accent} dark={dark}>Languages</Chip2>
          <Chip2 accent={accent} dark={dark}>Science</Chip2>
          <Chip2 accent={accent} dark={dark}>Mastered</Chip2>
        </div>

        {/* Decks grid */}
        <SectionLabel dark={dark}>Recent</SectionLabel>
        <div style={{
          display: 'grid',
          gridTemplateColumns: collapsed ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
          gap: 14, marginBottom: 24,
        }}>
          <DeckCard dark={dark} accent={accent} card={card}
            emoji="🇪🇸" title="Spanish — A2 vocab" sub="62 cards" due={12} pct={0.62} />
          <DeckCard dark={dark} accent={accent} card={card}
            emoji="⚗︎" title="Organic chemistry" sub="118 cards" due={6} pct={0.34} />
          <DeckCard dark={dark} accent={accent} card={card}
            emoji="📚" title="SAT vocabulary" sub="94 cards" due={0} pct={1} done />
        </div>

        <SectionLabel dark={dark}>All decks</SectionLabel>
        <div style={{
          display: 'grid',
          gridTemplateColumns: collapsed ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
          gap: 14,
        }}>
          <DeckCard dark={dark} accent={accent} card={card}
            emoji="🦴" title="Anatomy: skeletal" sub="46 cards · new" due={0} pct={0.08} />
          <DeckCard dark={dark} accent={accent} card={card}
            emoji="🧮" title="Calculus II" sub="84 cards" due={0} pct={0.55} />
          <DeckCard dark={dark} accent={accent} card={card}
            emoji="🏛︎" title="World history: 19c" sub="73 cards" due={0} pct={0.42} />
          {!collapsed && (
            <>
              <DeckCard dark={dark} accent={accent} card={card}
                emoji="🧬" title="Genetics basics" sub="38 cards" due={0} pct={0.7} />
              <DeckCard dark={dark} accent={accent} card={card}
                emoji="🇫🇷" title="French — irregular verbs" sub="52 cards" due={0} pct={0.28} />
              <DeckCard dark={dark} accent={accent} card={card}
                emoji="⚖︎" title="Constitutional law" sub="61 cards" due={0} pct={0.18} />
            </>
          )}
        </div>
      </main>
    </div>
  );
}

// ── Sidebar item ────────────────────────────────────────────
function SideItem({ dark, accent, collapsed, active, label, icon, badge }) {
  const text = dark ? '#fff' : '#1F1B16';
  const idle = dark ? 'rgba(235,235,245,0.65)' : 'rgba(60,60,67,0.7)';
  const activeBg = tint(accent, dark ? 0.22 : 0.18);
  const activeColor = accent;

  if (collapsed) {
    return (
      <div title={label} style={{
        height: 44, borderRadius: 10,
        background: active ? activeBg : 'transparent',
        color: active ? activeColor : idle,
        display: 'grid', placeItems: 'center',
        cursor: 'pointer',
        position: 'relative',
      }}>
        <div style={{ width: 22, height: 22, display: 'grid', placeItems: 'center' }}>{icon}</div>
        {badge && (
          <div style={{
            position: 'absolute', top: 6, right: 6,
            minWidth: 14, height: 14, padding: '0 4px',
            borderRadius: 999, background: accent, color: '#fff',
            font: '700 9px/14px -apple-system,system-ui,sans-serif',
            textAlign: 'center',
          }}>{badge}</div>
        )}
      </div>
    );
  }
  return (
    <div style={{
      height: 38, borderRadius: 10, padding: '0 10px',
      display: 'flex', alignItems: 'center', gap: 12,
      background: active ? activeBg : 'transparent',
      color: active ? activeColor : idle,
      cursor: 'pointer',
      font: `${active ? 600 : 500} 14px/1 -apple-system,system-ui,sans-serif`,
    }}>
      <div style={{ width: 20, height: 20, display: 'grid', placeItems: 'center', flex: '0 0 20px' }}>{icon}</div>
      <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{label}</span>
      {badge && (
        <span style={{
          minWidth: 20, height: 18, padding: '0 6px',
          borderRadius: 999,
          background: active ? accent : (dark ? 'rgba(255,255,255,0.10)' : 'rgba(31,27,22,0.08)'),
          color: active ? '#fff' : (dark ? '#fff' : text),
          font: '600 11px/18px -apple-system,system-ui,sans-serif',
          textAlign: 'center',
        }}>{badge}</span>
      )}
    </div>
  );
}

// ── Bits ────────────────────────────────────────────────────
function ToolPill({ dark, children }) {
  return (
    <button style={{
      appearance: 'none', border: 0, cursor: 'pointer',
      height: 36, padding: '0 12px', borderRadius: 999,
      background: dark ? 'rgba(255,255,255,0.08)' : 'rgba(31,27,22,0.05)',
      color: dark ? '#fff' : '#1F1B16',
      font: '500 13px/1 -apple-system,system-ui,sans-serif',
      display: 'flex', alignItems: 'center', gap: 6,
    }}>{children}</button>
  );
}

function SectionLabel({ dark, children }) {
  return (
    <div style={{
      font: '600 12px/1 -apple-system,system-ui,sans-serif',
      letterSpacing: '0.08em', textTransform: 'uppercase',
      color: dark ? 'rgba(235,235,245,0.55)' : 'rgba(60,60,67,0.55)',
      padding: '4px 2px 12px',
    }}>{children}</div>
  );
}

function Chip2({ active, accent, dark, children }) {
  return (
    <div style={{
      padding: '8px 14px', borderRadius: 999,
      background: active ? accent : (dark ? 'rgba(255,255,255,0.08)' : 'rgba(31,27,22,0.05)'),
      color: active ? '#fff' : (dark ? '#fff' : '#1F1B16'),
      font: `${active ? '600' : '500'} 13px/1 -apple-system,system-ui,sans-serif`,
      boxShadow: active ? `0 2px 6px ${accent}55` : 'none',
      cursor: 'pointer', whiteSpace: 'nowrap',
    }}>{children}</div>
  );
}

function DeckCard({ dark, accent, card, emoji, title, sub, due, pct, done }) {
  const text = dark ? '#fff' : '#1F1B16';
  const sec = dark ? 'rgba(235,235,245,0.6)' : 'rgba(60,60,67,0.6)';
  const trackBg = dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';
  return (
    <div style={{
      background: card, borderRadius: 18,
      padding: 16, display: 'flex', flexDirection: 'column', gap: 12,
      boxShadow: dark ? 'none' : '0 1px 2px rgba(20,14,4,0.04)',
      cursor: 'pointer',
      transition: 'transform 200ms ease, box-shadow 200ms ease',
    }}>
      <div style={{
        height: 92, borderRadius: 12,
        background: `linear-gradient(140deg, ${tint(accent, 0.22)} 0%, ${tint(accent, 0.10)} 100%)`,
        display: 'grid', placeItems: 'center',
        font: '40px/1 -apple-system,"Apple Color Emoji",system-ui,sans-serif',
        position: 'relative',
      }}>
        <span>{emoji}</span>
        {due > 0 && (
          <div style={{
            position: 'absolute', top: 10, right: 10,
            font: '600 11px/1 -apple-system,system-ui,sans-serif',
            padding: '4px 8px', borderRadius: 999,
            background: accent, color: '#fff',
          }}>{due} due</div>
        )}
        {done && (
          <div style={{
            position: 'absolute', top: 10, right: 10,
            font: '600 11px/1 -apple-system,system-ui,sans-serif',
            padding: '4px 8px', borderRadius: 999,
            background: '#8DC79B', color: '#fff',
            display: 'flex', alignItems: 'center', gap: 4,
          }}>
            <svg width="10" height="10" viewBox="0 0 14 14"><path d="M2.5 7.2l3 3 6-6.4" stroke="#fff" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span>Mastered</span>
          </div>
        )}
      </div>
      <div>
        <div style={{ font: '600 15px/1.2 -apple-system,system-ui,sans-serif', color: text }}>{title}</div>
        <div style={{ font: '400 12px/1.3 -apple-system,system-ui,sans-serif', color: sec, marginTop: 2 }}>{sub}</div>
      </div>
      <div style={{ height: 4, borderRadius: 2, background: trackBg, overflow: 'hidden' }}>
        <div style={{
          height: '100%', width: `${pct * 100}%`,
          background: done ? '#8DC79B' : accent,
          borderRadius: 2,
        }} />
      </div>
    </div>
  );
}

function ProgressDonut({ pct, accent, size = 64 }) {
  const r = (size / 2) - 5;
  const c = 2 * Math.PI * r;
  const off = c * (1 - pct);
  return (
    <div style={{ width: size, height: size, position: 'relative' }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={r} stroke={tint(accent, 0.2)} strokeWidth="6" fill="none" />
        <circle cx={size/2} cy={size/2} r={r} stroke={accent} strokeWidth="6" fill="none"
                strokeLinecap="round" strokeDasharray={c} strokeDashoffset={off} />
      </svg>
      <div style={{
        position: 'absolute', inset: 0, display: 'grid', placeItems: 'center',
        font: '700 14px/1 -apple-system,system-ui,sans-serif',
        color: accent,
      }}>{Math.round(pct * 100)}%</div>
    </div>
  );
}

// ── Icons ───────────────────────────────────────────────────
const FilterIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 5h18M6 12h12M10 19h4"/>
  </svg>
);
const SortIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 5v14M3 9l4-4 4 4"/>
    <path d="M17 19V5M13 15l4 4 4-4"/>
  </svg>
);
const PlusIcon2 = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="2.4" strokeLinecap="round">
    <path d="M12 5v14M5 12h14"/>
  </svg>
);
const PlayIcon = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#fff">
    <path d="M7 4.5v15l13-7.5z"/>
  </svg>
);
const FlameIcon2 = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2c0 4-4 5-4 9a4 4 0 0 0 8 0c0-1.4-.5-2.4-1-3 .8.4 2 1.6 2 4a5 5 0 1 1-10 0c0-5 5-6 5-10z"/>
  </svg>
);

Object.assign(window, { IPadFrame, IPadNavShell });
