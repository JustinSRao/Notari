// Settings screen + Today/Study preview screen.
// Reads --accent / --bg / --surface / --text-* from the doc root.

const ACCENTS = [
  { id: 'pink',       name: 'Pink',       hex: '#F4A6BB' },
  { id: 'red',        name: 'Red',        hex: '#EE8C8C' },
  { id: 'orange',     name: 'Orange',     hex: '#F0B07F' },
  { id: 'yellow',     name: 'Yellow',     hex: '#E5C766' },
  { id: 'lime',       name: 'Lime',       hex: '#BFD978' },
  { id: 'green',      name: 'Green',      hex: '#8DC79B' },
  { id: 'cyan',       name: 'Cyan',       hex: '#7FCBCD' },
  { id: 'babyblue',   name: 'Baby blue',  hex: '#9BC6E5' },
  { id: 'blue',       name: 'Blue',       hex: '#7FA4DE' },
  { id: 'navy',       name: 'Navy',       hex: '#566F9F' },
  { id: 'purple',     name: 'Purple',     hex: '#B499DC' },
  { id: 'magenta',    name: 'Magenta',    hex: '#D294C2' },
  { id: 'lightpink',  name: 'Light pink', hex: '#F2C9D6' },
];

window.ACCENTS = ACCENTS;

// Helper: tint with given alpha over a base luminance — used for soft fills.
function tint(hex, a) {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!m) return hex;
  const r = parseInt(m[1], 16), g = parseInt(m[2], 16), b = parseInt(m[3], 16);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}
window.tint = tint;

// ── Common iOS-y bits ─────────────────────────────────────────────────────
function Section({ label, dark, children, gap = 8 }) {
  const c = dark ? 'rgba(235,235,245,0.6)' : 'rgba(60,60,67,0.6)';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {label && (
        <div style={{
          font: '600 12px/1 -apple-system, "SF Pro", system-ui, sans-serif',
          letterSpacing: '0.06em', textTransform: 'uppercase',
          color: c, padding: '0 20px',
        }}>{label}</div>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap }}>{children}</div>
    </div>
  );
}

function Card({ dark, children, pad = 0, style = {} }) {
  return (
    <div style={{
      margin: '0 16px',
      background: dark ? '#1C1C1E' : '#fff',
      borderRadius: 18,
      padding: pad,
      boxShadow: dark
        ? '0 1px 0 rgba(255,255,255,0.04) inset'
        : '0 1px 0 rgba(255,255,255,0.6) inset, 0 1px 2px rgba(20,14,4,0.04)',
      ...style,
    }}>{children}</div>
  );
}

function Row({ dark, isLast, children, onClick, style = {} }) {
  const sep = dark ? 'rgba(84,84,88,0.5)' : 'rgba(60,60,67,0.18)';
  return (
    <div onClick={onClick} style={{
      minHeight: 52,
      padding: '0 16px',
      display: 'flex', alignItems: 'center', gap: 12,
      borderBottom: isLast ? 'none' : `0.5px solid ${sep}`,
      cursor: onClick ? 'pointer' : 'default',
      ...style,
    }}>{children}</div>
  );
}

// SF-style icon tile (rounded square w/ fill)
function IconTile({ bg, children, size = 30 }) {
  return (
    <div style={{
      width: size, height: size, flex: `0 0 ${size}px`,
      borderRadius: 7, background: bg,
      display: 'grid', placeItems: 'center',
      color: '#fff',
      boxShadow: '0 0 0 0.5px rgba(0,0,0,0.04) inset',
    }}>
      {children}
    </div>
  );
}

// iOS toggle switch
function Toggle({ on, accent, dark }) {
  const off = dark ? '#39393D' : '#E9E9EA';
  return (
    <div style={{
      width: 51, height: 31, borderRadius: 999,
      background: on ? accent : off,
      position: 'relative',
      transition: 'background 220ms ease',
      flex: '0 0 51px',
    }}>
      <div style={{
        position: 'absolute', top: 2, left: on ? 22 : 2,
        width: 27, height: 27, borderRadius: 999, background: '#fff',
        boxShadow: '0 3px 8px rgba(0,0,0,0.15), 0 1px 1px rgba(0,0,0,0.04)',
        transition: 'left 220ms cubic-bezier(.4,.0,.2,1)',
      }} />
    </div>
  );
}

// Segmented control (iOS)
function Segmented({ options, value, onChange, accent, dark }) {
  const trackBg = dark ? 'rgba(118,118,128,0.24)' : 'rgba(120,120,128,0.12)';
  return (
    <div style={{
      display: 'flex', padding: 2, borderRadius: 9,
      background: trackBg, position: 'relative', gap: 0,
    }}>
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button key={o.value} onClick={() => onChange(o.value)} style={{
            flex: 1, height: 28, border: 0, padding: '0 10px',
            background: active ? (dark ? '#636366' : '#fff') : 'transparent',
            borderRadius: 7,
            font: '500 13px/1 -apple-system,"SF Pro",system-ui,sans-serif',
            color: dark ? '#fff' : '#000',
            cursor: 'pointer',
            boxShadow: active
              ? '0 3px 8px rgba(0,0,0,0.12), 0 0 0 0.5px rgba(0,0,0,0.04)'
              : 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            transition: 'background 160ms ease',
          }}>
            {o.icon}
            <span>{o.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// Mini chevron
const Chev = ({ dark }) => (
  <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
    <path d="M1 1l5 5-5 5" stroke={dark ? 'rgba(235,235,245,0.3)' : 'rgba(60,60,67,0.3)'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// ════════════════════════════════════════════════════════════════════════════
// SETTINGS SCREEN
// ════════════════════════════════════════════════════════════════════════════
function SettingsScreen({ dark, accent, appearance, setAppearance, accentId, setAccentId, appName }) {
  const text = dark ? '#fff' : '#000';
  const sec = dark ? 'rgba(235,235,245,0.6)' : 'rgba(60,60,67,0.6)';
  const bg = dark ? '#000' : '#F2F1EC';

  return (
    <div style={{ background: bg, color: text, height: '100%', overflowY: 'auto', paddingTop: 58, paddingBottom: 60 }}>
      {/* Large title nav */}
      <div style={{ padding: '8px 20px 14px' }}>
        <div style={{
          font: '700 34px/1.1 -apple-system,"SF Pro Display",system-ui,sans-serif',
          letterSpacing: '0.005em',
          color: text,
        }}>Settings</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        {/* Appearance */}
        <Section label="Appearance" dark={dark}>
          <Card dark={dark}>
            <div style={{ padding: '14px 16px 12px' }}>
              <Segmented
                value={appearance}
                onChange={setAppearance}
                accent={accent}
                dark={dark}
                options={[
                  { value: 'light', label: 'Light', icon: <SunIcon dark={dark} /> },
                  { value: 'dark',  label: 'Dark',  icon: <MoonIcon dark={dark} /> },
                  { value: 'auto',  label: 'Auto',  icon: <AutoIcon dark={dark} /> },
                ]}
              />
            </div>
            {/* Mode previews */}
            <div style={{ display: 'flex', gap: 10, padding: '0 16px 16px' }}>
              <ModeChip kind="light" active={appearance === 'light'} accent={accent} />
              <ModeChip kind="dark" active={appearance === 'dark'} accent={accent} />
              <ModeChip kind="auto" active={appearance === 'auto'} accent={accent} />
            </div>
          </Card>
        </Section>

        {/* Accent color */}
        <Section label="Accent color" dark={dark}>
          <Card dark={dark} pad={16}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: 10,
            }}>
              {ACCENTS.map((a) => (
                <Swatch key={a.id} a={a} active={a.id === accentId} dark={dark} onClick={() => setAccentId(a.id)} />
              ))}
            </div>
            <div style={{
              marginTop: 14, paddingTop: 12,
              borderTop: `0.5px solid ${dark ? 'rgba(84,84,88,0.5)' : 'rgba(60,60,67,0.12)'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <div style={{
                font: '500 15px/1 -apple-system,"SF Pro Text",system-ui,sans-serif',
                color: text,
              }}>{ACCENTS.find((x) => x.id === accentId)?.name}</div>
              <div style={{
                font: '400 13px/1 ui-monospace, "SF Mono", monospace',
                color: sec,
              }}>{ACCENTS.find((x) => x.id === accentId)?.hex.toUpperCase()}</div>
            </div>
          </Card>
        </Section>

        {/* General settings — give the page some life */}
        <Section label="General" dark={dark}>
          <Card dark={dark}>
            <Row dark={dark}>
              <IconTile bg={accent}>
                <BellIcon />
              </IconTile>
              <div style={{ flex: 1, font: '400 17px/1.2 -apple-system,system-ui,sans-serif', color: text }}>Notifications</div>
              <Toggle on={true} accent={accent} dark={dark} />
            </Row>
            <Row dark={dark}>
              <IconTile bg={dark ? '#3A3A3C' : '#8E8E93'}>
                <HapticIcon />
              </IconTile>
              <div style={{ flex: 1, font: '400 17px/1.2 -apple-system,system-ui,sans-serif', color: text }}>Haptics</div>
              <Toggle on={true} accent={accent} dark={dark} />
            </Row>
            <Row dark={dark} isLast>
              <IconTile bg={accent}>
                <FlameIcon />
              </IconTile>
              <div style={{ flex: 1, font: '400 17px/1.2 -apple-system,system-ui,sans-serif', color: text }}>Daily streak goal</div>
              <div style={{ font: '400 17px/1.2 -apple-system,system-ui,sans-serif', color: sec }}>20 cards</div>
              <Chev dark={dark} />
            </Row>
          </Card>
        </Section>

        {/* App name footer */}
        <div style={{
          textAlign: 'center', padding: '4px 24px 0',
          font: '400 12px/1.4 -apple-system,system-ui,sans-serif',
          color: sec, letterSpacing: '0.02em',
        }}>{appName} · v1.0.0</div>
      </div>
    </div>
  );
}

// Color swatch in the grid
function Swatch({ a, active, dark, onClick }) {
  return (
    <button onClick={onClick} aria-label={a.name} style={{
      appearance: 'none', border: 0, padding: 0, background: 'transparent',
      cursor: 'pointer', display: 'grid', placeItems: 'center',
      width: '100%', aspectRatio: '1 / 1',
    }}>
      <div style={{
        width: '88%', aspectRatio: '1 / 1', borderRadius: '50%',
        background: a.hex,
        position: 'relative',
        boxShadow: active
          ? `0 0 0 2.5px ${dark ? '#000' : '#fff'}, 0 0 0 4.5px ${a.hex}`
          : `0 0 0 0.5px ${dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}, inset 0 1px 0 rgba(255,255,255,0.25)`,
        transition: 'box-shadow 180ms ease, transform 180ms ease',
        transform: active ? 'scale(1.02)' : 'scale(1)',
        display: 'grid', placeItems: 'center',
      }}>
        {active && (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.18))' }}>
            <path d="M2.5 7.2l3 3 6-6.4" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>
    </button>
  );
}

// Mode chip — small visual mockups under the segmented control
function ModeChip({ kind, active, accent }) {
  const isLight = kind === 'light';
  const isAuto = kind === 'auto';
  const labelMap = { light: 'Light', dark: 'Dark', auto: 'Auto' };

  // bg of the chip
  const chipBg = isLight ? '#F6F2E8' : isAuto ? 'linear-gradient(90deg, #F6F2E8 0% 50%, #1C1C1E 50% 100%)' : '#1C1C1E';
  const chipText = isLight ? '#1F1B16' : isAuto ? '#666' : '#fff';

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center' }}>
      <div style={{
        width: '100%', aspectRatio: '0.92 / 1', borderRadius: 12,
        background: chipBg,
        position: 'relative', overflow: 'hidden',
        border: active ? `2px solid ${accent}` : `1px solid rgba(0,0,0,0.06)`,
        padding: active ? 4 : 5,
        boxShadow: active ? `0 2px 8px ${accent}33` : 'none',
        transition: 'all 200ms ease',
      }}>
        {/* Page miniature */}
        <div style={{ position: 'absolute', inset: 8, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ height: 4, width: '60%', background: isLight ? '#1F1B16' : '#fff', borderRadius: 2, opacity: isAuto ? 0.5 : 0.85 }} />
          <div style={{ height: 14, borderRadius: 4, background: accent, opacity: 0.9 }} />
          <div style={{ height: 3, width: '85%', background: isLight ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.25)', borderRadius: 2 }} />
          <div style={{ height: 3, width: '70%', background: isLight ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.25)', borderRadius: 2 }} />
        </div>
      </div>
      <div style={{
        font: `${active ? '600' : '400'} 11px/1 -apple-system,system-ui,sans-serif`,
        color: active ? '#000' : 'rgba(60,60,67,0.6)',
      }}>{labelMap[kind]}</div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// PREVIEW SCREEN — "Today" home of the study app, showing accent applied
// ════════════════════════════════════════════════════════════════════════════
function PreviewScreen({ dark, accent, appName }) {
  const text = dark ? '#fff' : '#1F1B16';
  const sec = dark ? 'rgba(235,235,245,0.6)' : 'rgba(60,60,67,0.6)';
  const bg = dark ? '#000' : '#F2F1EC';
  const card = dark ? '#1C1C1E' : '#fff';
  const subSurface = dark ? '#2C2C2E' : '#FBF7ED';

  // Progress ring values
  const goal = 20, done = 14;
  const pct = done / goal;

  return (
    <div style={{ background: bg, color: text, height: '100%', overflowY: 'auto', paddingTop: 58, paddingBottom: 100 }}>
      {/* Big nav title */}
      <div style={{ padding: '8px 20px 14px', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <div>
          <div style={{
            font: '500 13px/1 -apple-system,"SF Pro Text",system-ui,sans-serif',
            color: sec, marginBottom: 4, letterSpacing: '0.02em',
          }}>Friday, May 8</div>
          <div style={{
            font: '700 34px/1.1 -apple-system,"SF Pro Display",system-ui,sans-serif',
            color: text,
          }}>Today</div>
        </div>
        <div style={{
          width: 36, height: 36, borderRadius: 999,
          background: tint(accent, 0.22),
          display: 'grid', placeItems: 'center',
          color: accent,
          font: '600 14px/1 -apple-system,system-ui,sans-serif',
        }}>JM</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Hero progress card */}
        <div style={{
          margin: '0 16px',
          background: card,
          borderRadius: 22,
          padding: 18,
          display: 'flex', gap: 16, alignItems: 'center',
          boxShadow: dark ? 'none' : '0 1px 2px rgba(20,14,4,0.04)',
        }}>
          <ProgressRing pct={pct} accent={accent} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              font: '400 13px/1 -apple-system,system-ui,sans-serif',
              color: sec, marginBottom: 6, letterSpacing: '0.02em',
            }}>DAILY GOAL</div>
            <div style={{
              font: '600 22px/1.1 -apple-system,"SF Pro Display",system-ui,sans-serif',
              color: text, marginBottom: 8,
            }}>{done} of {goal} cards</div>
            <button style={{
              appearance: 'none', border: 0, cursor: 'pointer',
              background: accent, color: '#fff',
              borderRadius: 999, padding: '8px 16px',
              font: '600 14px/1 -apple-system,system-ui,sans-serif',
              boxShadow: `0 2px 6px ${accent}55`,
            }}>Continue →</button>
          </div>
        </div>

        {/* Quick stats row */}
        <div style={{ margin: '0 16px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
          <Stat label="Streak" value="14" suffix="days" iconBg={accent} icon={<FlameIcon />} dark={dark} text={text} sec={sec} card={card} />
          <Stat label="Mastered" value="248" suffix="cards" iconBg={tint(accent, 0.22)} iconColor={accent} icon={<StarIcon />} dark={dark} text={text} sec={sec} card={card} />
          <Stat label="Due today" value="6" suffix="decks" iconBg={tint(accent, 0.22)} iconColor={accent} icon={<ClockIcon />} dark={dark} text={text} sec={sec} card={card} />
        </div>

        {/* Decks list */}
        <Section label="Your decks" dark={dark}>
          <Card dark={dark}>
            <DeckRow accent={accent} dark={dark} title="Spanish — A2 vocab" sub="62 cards · due 12" pct={0.62} />
            <DeckRow accent={accent} dark={dark} title="Organic chemistry" sub="118 cards · due 6" pct={0.34} />
            <DeckRow accent={accent} dark={dark} title="SAT vocabulary" sub="94 cards · due 0" pct={1} done />
            <DeckRow accent={accent} dark={dark} title="Anatomy: skeletal" sub="46 cards · new" pct={0.08} isLast />
          </Card>
        </Section>

        {/* Filter chips — show "active" accent state */}
        <div style={{ margin: '0 16px', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Chip active accent={accent} dark={dark}>All</Chip>
          <Chip accent={accent} dark={dark}>Due</Chip>
          <Chip accent={accent} dark={dark}>New</Chip>
          <Chip accent={accent} dark={dark}>Mastered</Chip>
        </div>
      </div>

      {/* Tab bar */}
      <TabBar accent={accent} dark={dark} />
    </div>
  );
}

function ProgressRing({ pct, accent }) {
  const r = 30, c = 2 * Math.PI * r;
  const off = c * (1 - pct);
  return (
    <div style={{ width: 78, height: 78, position: 'relative', flex: '0 0 78px' }}>
      <svg width="78" height="78" viewBox="0 0 78 78" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="39" cy="39" r={r} stroke={tint(accent, 0.18)} strokeWidth="7" fill="none" />
        <circle cx="39" cy="39" r={r} stroke={accent} strokeWidth="7" fill="none"
                strokeLinecap="round" strokeDasharray={c} strokeDashoffset={off} />
      </svg>
      <div style={{
        position: 'absolute', inset: 0, display: 'grid', placeItems: 'center',
        font: '600 18px/1 -apple-system,"SF Pro Display",system-ui,sans-serif',
        color: accent,
      }}>{Math.round(pct * 100)}%</div>
    </div>
  );
}

function Stat({ label, value, suffix, iconBg, iconColor, icon, dark, text, sec, card }) {
  return (
    <div style={{
      background: card, borderRadius: 16, padding: 12,
      boxShadow: dark ? 'none' : '0 1px 2px rgba(20,14,4,0.04)',
      display: 'flex', flexDirection: 'column', gap: 6,
    }}>
      <div style={{
        width: 26, height: 26, borderRadius: 7, background: iconBg,
        display: 'grid', placeItems: 'center',
        color: iconColor || '#fff',
      }}>{icon}</div>
      <div style={{
        font: '700 22px/1.1 -apple-system,"SF Pro Display",system-ui,sans-serif',
        color: text, marginTop: 2,
      }}>{value}</div>
      <div style={{ font: '400 11px/1.1 -apple-system,system-ui,sans-serif', color: sec }}>
        {suffix} · {label.toLowerCase()}
      </div>
    </div>
  );
}

function DeckRow({ accent, dark, title, sub, pct, done, isLast }) {
  const text = dark ? '#fff' : '#1F1B16';
  const sec = dark ? 'rgba(235,235,245,0.6)' : 'rgba(60,60,67,0.6)';
  const trackBg = dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';
  return (
    <Row dark={dark} isLast={isLast}>
      <div style={{
        width: 34, height: 34, borderRadius: 9,
        background: tint(accent, 0.22), color: accent,
        display: 'grid', placeItems: 'center', flex: '0 0 34px',
      }}>
        {done
          ? <svg width="16" height="16" viewBox="0 0 16 16"><path d="M3 8.5l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
          : <BookIcon />}
      </div>
      <div style={{ flex: 1, minWidth: 0, padding: '10px 0' }}>
        <div style={{ font: '500 15px/1.2 -apple-system,system-ui,sans-serif', color: text }}>{title}</div>
        <div style={{ font: '400 12px/1.3 -apple-system,system-ui,sans-serif', color: sec, marginTop: 2 }}>{sub}</div>
        <div style={{ marginTop: 6, height: 4, borderRadius: 2, background: trackBg, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${pct * 100}%`, background: accent, borderRadius: 2, transition: 'width 320ms ease' }} />
        </div>
      </div>
      <Chev dark={dark} />
    </Row>
  );
}

function Chip({ active, accent, dark, children }) {
  return (
    <div style={{
      padding: '7px 14px', borderRadius: 999,
      background: active ? accent : (dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)'),
      color: active ? '#fff' : (dark ? '#fff' : '#1F1B16'),
      font: `${active ? '600' : '500'} 13px/1 -apple-system,system-ui,sans-serif`,
      boxShadow: active ? `0 2px 6px ${accent}55` : 'none',
      transition: 'background 220ms ease',
    }}>{children}</div>
  );
}

function TabBar({ accent, dark }) {
  const inactive = dark ? 'rgba(235,235,245,0.5)' : 'rgba(60,60,67,0.5)';
  const bg = dark ? 'rgba(28,28,30,0.85)' : 'rgba(255,255,255,0.85)';
  const tabs = [
    { key: 'today', label: 'Today',   icon: <HomeIcon />,   active: true },
    { key: 'study', label: 'Study',   icon: <CardsIcon /> },
    { key: 'add',   label: 'Add',     icon: <PlusIcon /> },
    { key: 'stats', label: 'Stats',   icon: <BarsIcon /> },
    { key: 'me',    label: 'Profile', icon: <UserIcon /> },
  ];
  return (
    <div style={{
      position: 'absolute', left: 12, right: 12, bottom: 16,
      background: bg,
      borderRadius: 28,
      padding: '8px 6px',
      display: 'flex', justifyContent: 'space-around', alignItems: 'center',
      backdropFilter: 'blur(24px) saturate(160%)',
      WebkitBackdropFilter: 'blur(24px) saturate(160%)',
      border: `0.5px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)'}`,
      boxShadow: dark
        ? '0 8px 24px rgba(0,0,0,0.5)'
        : '0 6px 24px rgba(20,14,4,0.10)',
    }}>
      {tabs.map((t) => (
        <div key={t.key} style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
          color: t.active ? accent : inactive,
          padding: '4px 10px',
        }}>
          <div style={{ width: 22, height: 22 }}>{t.icon}</div>
          <div style={{
            font: `${t.active ? '600' : '500'} 10px/1 -apple-system,system-ui,sans-serif`,
          }}>{t.label}</div>
        </div>
      ))}
    </div>
  );
}

// ── Inline icons (simple stroke SVGs) ─────────────────────────────────────
const SunIcon = ({ dark }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={dark ? '#fff' : '#000'} strokeWidth="1.8" strokeLinecap="round">
    <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>
  </svg>
);
const MoonIcon = ({ dark }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={dark ? '#fff' : '#000'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>
  </svg>
);
const AutoIcon = ({ dark }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={dark ? '#fff' : '#000'} strokeWidth="1.8" strokeLinecap="round">
    <circle cx="12" cy="12" r="9"/>
    <path d="M12 3v18" /><path d="M12 3a9 9 0 0 1 0 18z" fill={dark ? '#fff' : '#000'} stroke="none"/>
  </svg>
);
const BellIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
  </svg>
);
const HapticIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4"/>
    <circle cx="12" cy="12" r="3.5" fill="currentColor" stroke="none"/>
  </svg>
);
const FlameIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2c0 4-4 5-4 9a4 4 0 0 0 8 0c0-1.4-.5-2.4-1-3 .8.4 2 1.6 2 4a5 5 0 1 1-10 0c0-5 5-6 5-10z"/>
  </svg>
);
const StarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l2.9 6.5 7.1.8-5.3 4.9 1.5 7L12 17.8 5.8 21.2l1.5-7L2 9.3l7.1-.8z"/>
  </svg>
);
const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>
  </svg>
);
const BookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v18H6.5A2.5 2.5 0 0 0 4 22.5"/><path d="M4 4.5v18"/>
  </svg>
);
const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 11l9-8 9 8v9a2 2 0 0 1-2 2h-4v-7h-6v7H5a2 2 0 0 1-2-2z"/></svg>
);
const CardsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
    <rect x="3" y="6" width="14" height="12" rx="2"/><rect x="7" y="3" width="14" height="12" rx="2" fill="currentColor" fillOpacity="0.18"/>
  </svg>
);
const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/>
  </svg>
);
const BarsIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <rect x="4" y="12" width="3.5" height="8" rx="1"/><rect x="10.25" y="7" width="3.5" height="13" rx="1"/><rect x="16.5" y="3" width="3.5" height="17" rx="1"/>
  </svg>
);
const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <circle cx="12" cy="9" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>
  </svg>
);

Object.assign(window, {
  ACCENTS, tint,
  SettingsScreen, PreviewScreen,
});
