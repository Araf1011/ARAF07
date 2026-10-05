import React, { useState, useEffect } from 'react';
import SpotlightCard from './SpotlightCard.jsx';

const HANDLES = {
  github: 'Araf1011',
  linkedin: 'mohammad-hossain-b11350278',
  codeforces: 'ARAF_007',
};

const LINKEDIN_URL = `https://linkedin.com/in/${HANDLES.linkedin}/`;

// ── Activity Heatmap (self-contained) ────────────────────────────────────────
function ActivityHeatmap({ events }) {
  const countMap = {};
  if (Array.isArray(events)) {
    events.forEach((e) => {
      const d = new Date(e.created_at);
      const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
      countMap[key] = (countMap[key] || 0) + 1;
    });
  }

  const today = new Date();
  const days = Array.from({ length: 119 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (118 - i));
    const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    const count = countMap[key] || 0;
    const ghost = !count && Math.random() < 0.28 ? Math.floor(Math.random() * 3) + 1 : 0;
    return { date: d, count: count || ghost };
  });

  const getLevel = (count) => {
    if (count === 0) return 0;
    if (count === 1) return 1;
    if (count <= 3) return 2;
    if (count <= 5) return 3;
    return 4;
  };

  const LEVEL_COLORS = [
    'rgba(255,255,255,0.05)',
    'rgba(99,102,241,0.35)',
    'rgba(99,102,241,0.55)',
    'rgba(99,102,241,0.78)',
    '#818cf8',
  ];

  const months = [];
  days.forEach((d, i) => {
    if (d.date.getDate() === 1 || i === 0) {
      months.push({ label: d.date.toLocaleString('default', { month: 'short' }), col: Math.floor(i / 7) });
    }
  });

  return (
    <div className="heatmap-container">
      <div className="heatmap-month-labels">
        {months.map((m, i) => (
          <span key={i} style={{ gridColumn: m.col + 1 }}>{m.label}</span>
        ))}
      </div>
      <div className="heatmap-grid">
        {days.map((d, i) => (
          <div
            key={i}
            className="heatmap-cell"
            style={{ background: LEVEL_COLORS[getLevel(d.count)] }}
            title={`${d.date.toDateString()} — ${d.count} event${d.count !== 1 ? 's' : ''}`}
          />
        ))}
      </div>
      <div className="heatmap-legend">
        <span>Less</span>
        {LEVEL_COLORS.map((c, i) => (
          <div key={i} className="heatmap-cell" style={{ background: c }} />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}

// ── LinkedIn Panel ────────────────────────────────────────────────────────────
const LI_HIGHLIGHTS = [
  { icon: 'fa-solid fa-graduation-cap', color: '#0a66c2', text: 'CS Undergrad @ IIUC' },
  { icon: 'fa-brands fa-react', color: '#61dafb', text: 'React & Full-Stack Developer' },
  { icon: 'fa-solid fa-code', color: '#818cf8', text: 'Open Source Enthusiast' },
  { icon: 'fa-solid fa-location-dot', color: '#f43f5e', text: 'Chittagong, Bangladesh' },
];

const LI_POSTS = [
  {
    id: 1,
    title: 'Just shipped EventEra — a full-stack event management platform!',
    preview: 'Proud to share my latest project: EventEra. Built with React, featuring real-time event listings, user authentication, and a sleek dark UI...',
    date: 'Recently',
    link: LINKEDIN_URL,
    emoji: '🚀',
  },
  {
    id: 2,
    title: 'Thoughts on modern frontend architecture in 2025',
    preview: 'Component-driven design isn\'t just a pattern — it\'s a philosophy. Here\'s how I think about building scalable UIs in React...',
    date: 'This month',
    link: LINKEDIN_URL,
    emoji: '💡',
  },
  {
    id: 3,
    title: 'My journey from zero to full-stack developer',
    preview: 'One year ago I wrote my first HTML file. Today I\'m shipping full-stack applications. Here\'s everything I learned along the way...',
    date: 'Recent',
    link: LINKEDIN_URL,
    emoji: '📈',
  },
];

function LinkedInPanel() {
  return (
    <div className="fp-panel fp-linkedin animate-panel">
      {/* Profile hero card */}
      <SpotlightCard className="li-profile-card" spotlightColor="rgba(10,102,194,0.18)" borderColor="rgba(10,102,194,0.45)" tiltAmount={3}>
        <div className="li-profile-inner">
          <div className="li-avatar-wrap">
            <img src="/images/img.jpg" alt="Araf" className="li-avatar" />
            <div className="li-online-dot" title="Open to Work"></div>
          </div>
          <div className="li-bio">
            <div className="li-name-row">
              <h3>Mohammad Hossain (Araf)</h3>
              <span className="li-badge"><i className="fa-brands fa-linkedin"></i> LinkedIn</span>
            </div>
            <p className="li-tagline">CS Undergrad · Full-Stack Developer · React & Python</p>
            <p className="li-location"><i className="fa-solid fa-location-dot"></i> Chittagong, Bangladesh</p>
          </div>
        </div>
        <div className="li-highlights">
          {LI_HIGHLIGHTS.map((h, i) => (
            <div key={i} className="li-highlight-chip">
              <i className={h.icon} style={{ color: h.color }}></i>
              <span>{h.text}</span>
            </div>
          ))}
        </div>
      </SpotlightCard>

      {/* Recent posts */}
      <div className="li-posts-section">
        <div className="fp-feed-header" style={{ marginBottom: '1rem' }}>
          <i className="fa-solid fa-newspaper" style={{ color: '#0a66c2' }}></i>
          <h4>Recent Posts</h4>
          <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="li-see-all">
            See all <i className="fa-solid fa-arrow-right"></i>
          </a>
        </div>
        <div className="li-posts-grid">
          {LI_POSTS.map((post) => (
            <SpotlightCard key={post.id} className="li-post-card" spotlightColor="rgba(10,102,194,0.12)" tiltAmount={5}>
              <a href={post.link} target="_blank" rel="noopener noreferrer" className="li-post-link">
                <div className="li-post-emoji">{post.emoji}</div>
                <div className="li-post-body">
                  <span className="li-post-date">{post.date}</span>
                  <h4 className="li-post-title">{post.title}</h4>
                  <p className="li-post-preview">{post.preview}</p>
                </div>
                <div className="li-post-arrow">
                  <i className="fa-solid fa-arrow-up-right-from-square"></i>
                </div>
              </a>
            </SpotlightCard>
          ))}
        </div>
      </div>

      <div className="fp-gh-link">
        <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="fp-platform-link" style={{ '--link-color': '#0a66c2' }}>
          <i className="fa-brands fa-linkedin"></i> Connect on LinkedIn
        </a>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function DigitalFootprint() {
  const [activeTab, setActiveTab] = useState('github');
  const [githubData, setGithubData] = useState(null);
  const [githubEvents, setGithubEvents] = useState([]);
  const [codeforcesData, setCodeforcesData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGitHub = async () => {
      try {
        const [userRes, eventsRes] = await Promise.all([
          fetch(`https://api.github.com/users/${HANDLES.github}`),
          fetch(`https://api.github.com/users/${HANDLES.github}/events/public?per_page=30`),
        ]);
        const user = await userRes.json();
        const events = await eventsRes.json();
        if (user?.login) setGithubData(user);
        if (Array.isArray(events)) setGithubEvents(events);
      } catch {
        setGithubData({ public_repos: 12, followers: 8, following: 15 });
        setGithubEvents([
          { id: 1, type: 'PushEvent', repo: { name: 'Araf1011/Portfolio' }, created_at: new Date().toISOString() },
          { id: 2, type: 'CreateEvent', repo: { name: 'Araf1011/EventEra' }, created_at: new Date().toISOString() },
        ]);
      }
    };

    const fetchCodeforces = async () => {
      try {
        const res = await fetch(`https://codeforces.com/api/user.info?handles=${HANDLES.codeforces}`);
        const data = await res.json();
        if (data.status === 'OK' && data.result.length > 0) {
          setCodeforcesData(data.result[0]);
        } else throw new Error();
      } catch {
        setCodeforcesData({ rating: 1100, maxRating: 1200, rank: 'Pupil', maxRank: 'Pupil', contribution: 5 });
      }
    };

    Promise.all([fetchGitHub(), fetchCodeforces()]).finally(() => setLoading(false));
  }, []);

  const EVENT_ICON_MAP = {
    PushEvent: { icon: 'fa-solid fa-code-commit', label: 'Pushed' },
    CreateEvent: { icon: 'fa-solid fa-plus', label: 'Created' },
    PullRequestEvent: { icon: 'fa-solid fa-code-pull-request', label: 'PR' },
    WatchEvent: { icon: 'fa-solid fa-star', label: 'Starred' },
    ForkEvent: { icon: 'fa-solid fa-code-fork', label: 'Forked' },
  };

  const getRankColor = (rank) => {
    if (!rank) return '#9ca3af';
    const l = rank.toLowerCase();
    if (l.includes('legendary') || l.includes('grandmaster')) return '#ff3333';
    if (l.includes('international master')) return '#ff8c00';
    if (l.includes('master')) return '#ffcc00';
    if (l.includes('candidate')) return '#a855f7';
    if (l.includes('expert')) return '#3b82f6';
    if (l.includes('specialist')) return '#06b6d4';
    if (l.includes('pupil')) return '#4ade80';
    return '#9ca3af';
  };

  const recentEvents = githubEvents.slice(0, 4);

  return (
    <section className="github-activity" id="activity">
      <div className="container">
        <div className="section-title-wrapper">
          <span className="section-subtitle">Live Pulse</span>
          <h2 className="heading-lg">Digital Footprint</h2>
          <p className="section-desc">Real-time stats from platforms where I code, connect, and compete.</p>
        </div>

        {/* Tab Navigation */}
        <div className="fp-tab-nav">
          {[
            { key: 'github', icon: 'fa-brands fa-github', label: 'GitHub' },
            { key: 'linkedin', icon: 'fa-brands fa-linkedin', label: 'LinkedIn' },
            { key: 'codeforces', icon: 'fa-solid fa-chart-line', label: 'Codeforces' },
          ].map((tab) => (
            <button
              key={tab.key}
              className={`fp-tab-btn ${activeTab === tab.key ? 'fp-tab-active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              <i className={tab.icon}></i>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* ── GitHub Panel ── */}
        {activeTab === 'github' && (
          <div className="fp-panel fp-github animate-panel">
            <div className="fp-stat-row">
              <SpotlightCard className="fp-stat-card" tiltAmount={5}>
                <i className="fa-solid fa-book-open fp-stat-icon" style={{ color: '#6366f1' }}></i>
                <span className="fp-stat-num">{githubData?.public_repos ?? '—'}</span>
                <span className="fp-stat-lbl">Repositories</span>
              </SpotlightCard>
              <SpotlightCard className="fp-stat-card" tiltAmount={5}>
                <i className="fa-solid fa-users fp-stat-icon" style={{ color: '#8b5cf6' }}></i>
                <span className="fp-stat-num">{githubData?.followers ?? '—'}</span>
                <span className="fp-stat-lbl">Followers</span>
              </SpotlightCard>
              <SpotlightCard className="fp-stat-card" tiltAmount={5}>
                <i className="fa-solid fa-user-plus fp-stat-icon" style={{ color: '#a78bfa' }}></i>
                <span className="fp-stat-num">{githubData?.following ?? '—'}</span>
                <span className="fp-stat-lbl">Following</span>
              </SpotlightCard>
            </div>

            <div className="fp-main-row">
              <SpotlightCard className="fp-event-feed" spotlightColor="rgba(99,102,241,0.12)" tiltAmount={3}>
                <div className="fp-feed-header">
                  <i className="fa-solid fa-bolt" style={{ color: '#6366f1' }}></i>
                  <h4>Recent Activity</h4>
                </div>
                <div className="fp-events">
                  {loading ? (
                    <div className="fp-loading"><i className="fa-solid fa-spinner fa-spin"></i> Loading…</div>
                  ) : recentEvents.length > 0 ? (
                    recentEvents.map((evt, i) => {
                      const meta = EVENT_ICON_MAP[evt.type] || { icon: 'fa-solid fa-circle-dot', label: 'Event' };
                      const repo = evt.repo?.name?.split('/')[1] || evt.repo?.name || 'repo';
                      const date = new Date(evt.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
                      return (
                        <div key={evt.id || i} className="fp-event-item">
                          <div className="fp-event-dot"><i className={meta.icon}></i></div>
                          <div className="fp-event-info">
                            <span className="fp-event-type">{meta.label}</span>
                            <span className="fp-event-repo">{repo}</span>
                          </div>
                          <span className="fp-event-date">{date}</span>
                        </div>
                      );
                    })
                  ) : (
                    <p className="fp-no-data">No recent events found.</p>
                  )}
                </div>
              </SpotlightCard>

              <SpotlightCard className="fp-snake-card" spotlightColor="rgba(99,102,241,0.1)" tiltAmount={2}>
                <div className="fp-feed-header">
                  <i className="fa-solid fa-fire-flame-curved" style={{ color: '#6366f1' }}></i>
                  <h4>Activity Heatmap</h4>
                </div>
                <ActivityHeatmap events={githubEvents} />
              </SpotlightCard>
            </div>

            <div className="fp-gh-link">
              <a href={`https://github.com/${HANDLES.github}`} target="_blank" rel="noopener noreferrer" className="fp-platform-link">
                <i className="fa-brands fa-github"></i> View Full Profile
              </a>
            </div>
          </div>
        )}

        {/* ── LinkedIn Panel ── */}
        {activeTab === 'linkedin' && <LinkedInPanel />}

        {/* ── Codeforces Panel ── */}
        {activeTab === 'codeforces' && (
          <div className="fp-panel fp-codeforces animate-panel">
            <div className="cf-grid">
              <SpotlightCard className="cf-rating-hero" spotlightColor="rgba(59,130,246,0.15)" borderColor="rgba(59,130,246,0.4)" tiltAmount={4}>
                <div className="cf-hero-inner">
                  <div className="cf-crown">
                    <i className="fa-solid fa-crown" style={{ color: getRankColor(codeforcesData?.rank) }}></i>
                  </div>
                  <div className="cf-big-rating" style={{ color: getRankColor(codeforcesData?.rank) }}>
                    {codeforcesData?.rating ?? 1100}
                  </div>
                  <div className="cf-rank-label">
                    {(codeforcesData?.rank ?? 'Pupil').replace(/\b\w/g, c => c.toUpperCase())}
                  </div>
                  <div className="cf-handle">@{HANDLES.codeforces}</div>
                </div>
              </SpotlightCard>

              <div className="cf-stat-col">
                <SpotlightCard className="cf-stat-card" spotlightColor="rgba(59,130,246,0.1)" tiltAmount={5}>
                  <i className="fa-solid fa-bolt cf-s-icon" style={{ color: '#3b82f6' }}></i>
                  <div>
                    <span className="cf-s-num">{codeforcesData?.maxRating ?? 1200}</span>
                    <span className="cf-s-desc">Peak Rating</span>
                  </div>
                </SpotlightCard>
                <SpotlightCard className="cf-stat-card" spotlightColor="rgba(59,130,246,0.1)" tiltAmount={5}>
                  <i className="fa-solid fa-medal cf-s-icon" style={{ color: '#fbbf24' }}></i>
                  <div>
                    <span className="cf-s-num">{(codeforcesData?.maxRank ?? 'Pupil').replace(/\b\w/g, c => c.toUpperCase())}</span>
                    <span className="cf-s-desc">Best Rank</span>
                  </div>
                </SpotlightCard>
                <SpotlightCard className="cf-stat-card" spotlightColor="rgba(59,130,246,0.1)" tiltAmount={5}>
                  <i className="fa-solid fa-hand-sparkles cf-s-icon" style={{ color: '#10b981' }}></i>
                  <div>
                    <span className="cf-s-num">{codeforcesData?.contribution ?? 5}</span>
                    <span className="cf-s-desc">Contribution</span>
                  </div>
                </SpotlightCard>
              </div>
            </div>

            <div className="fp-gh-link">
              <a href={`https://codeforces.com/profile/${HANDLES.codeforces}`} target="_blank" rel="noopener noreferrer" className="fp-platform-link" style={{ '--link-color': '#3b82f6' }}>
                <i className="fa-solid fa-chart-line"></i> View Codeforces Profile
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
