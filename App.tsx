import { useState } from "react"

const asset = (name: string) => `/assets/${name}`

const navItems = [
  ["Dashboard", "ea666.svg"],
  ["Courses", "7d5d1.svg"],
  ["Library", "33ff3.svg"],
  ["Support", "15d15.svg"],
] as const

const stats = [
  ["2h 40m", "Time Studied", "21%", true],
  ["3", "Modules Finished", "14%", false],
  ["48", "Mins Video Watched", "19%", true],
  ["32", "Quiz Completed", "26%", false],
] as const

const calendarRows = [
  ["1 Aug - 7 Aug", "0000001"],
  ["8 Aug - 14 Aug", "0011110"],
  ["15 Aug - 21 Aug", "0011001"],
  ["22 Aug - 28 Aug", "0011010"],
  ["29 Aug - 31 Aug", "0000000"],
] as const

type AppButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline" | "ghost"
}

function AppButton({
  variant = "primary",
  className = "",
  ...props
}: AppButtonProps) {
  return (
    <button
      className={`button button--${variant} ${className}`}
      type="button"
      {...props}
    />
  )
}

function Icon({
  src,
  alt = "",
  className = "",
}: {
  src: string
  alt?: string
  className?: string
}) {
  return <img className={`icon ${className}`} src={asset(src)} alt={alt} />
}

function SectionTitle({
  children,
  info,
}: {
  children: React.ReactNode
  info?: () => void
}) {
  return (
    <div className="section-title">
      <div className="section-title__text">{children}</div>
      {info && (
        <AppButton
          aria-label={`About ${children}`}
          className="icon-button icon-button--small"
          onClick={info}
          variant="ghost"
        >
          <Icon src="991c8.svg" />
        </AppButton>
      )}
    </div>
  )
}

function Sidebar({
  active,
  onNavigate,
  open,
  onClose,
  notify,
}: {
  active: string
  onNavigate: (label: string) => void
  open: boolean
  onClose: () => void
  notify: (message: string) => void
}) {
  return (
    <>
      {open && (
        <AppButton
          aria-label="Close menu"
          className="sidebar-backdrop"
          onClick={onClose}
          variant="ghost"
        />
      )}
      <aside className={`sidebar ${open ? "sidebar--open" : ""}`}>
        <div className="brand">
          <img
            src={asset("b7844.png")}
            alt="Digital University by Physics Wallah"
          />
        </div>
        <div className="sidebar__body">
          <nav aria-label="Main navigation" className="nav">
            {navItems.map(([label, icon]) => (
              <AppButton
                aria-current={active === label ? "page" : undefined}
                className={`nav__item ${
                  active === label ? "nav__item--active" : ""
                }`}
                key={label}
                onClick={() => {
                  onNavigate(label)
                  onClose()
                }}
                variant="ghost"
              >
                <Icon src={icon} />
                <span>{label}</span>
              </AppButton>
            ))}
          </nav>
          <div className="help-card">
            <div className="help-card__illustration">
              <Icon src="0ece9.svg" alt="Support agent" />
            </div>
            <p>
              Got questions? We&apos;re always here for you! Feel free to reach
              out.
            </p>
            <AppButton
              onClick={() => notify("Support request opened")}
              variant="outline"
            >
              <Icon src="7c064.svg" />
              Get Support
            </AppButton>
          </div>
        </div>
      </aside>
    </>
  )
}

function Topbar({
  onMenu,
  notify,
}: {
  onMenu: () => void
  notify: (message: string) => void
}) {
  const [profileOpen, setProfileOpen] = useState(false)
  return (
    <header className="topbar">
      <div className="topbar__inner">
        <AppButton
          aria-label="Open menu"
          className="mobile-menu"
          onClick={onMenu}
          variant="ghost"
        >
          <span />
          <span />
          <span />
        </AppButton>
        <div className="streak">
          <Icon src="2abc8.svg" />
          <strong>7</strong>
          <span>Days Streak</span>
        </div>
        <div className="account-actions">
          <AppButton
            aria-label="Notifications"
            className="icon-button"
            onClick={() => notify("You have 1 new notification")}
            variant="ghost"
          >
            <Icon src="86511.svg" />
          </AppButton>
          <div className="profile">
            <AppButton
              aria-expanded={profileOpen}
              aria-label="Open profile menu"
              className="avatar-button"
              onClick={() => setProfileOpen((value) => !value)}
              variant="ghost"
            >
              <img src={asset("1238e.png")} alt="Profile" />
            </AppButton>
            {profileOpen && (
              <div className="profile-menu">
                <strong>Alex Morgan</strong>
                <span>MBA · Year 1</span>
                <AppButton
                  onClick={() => notify("Profile opened")}
                  variant="ghost"
                >
                  View profile
                </AppButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

function StatCard({ stat }: { stat: typeof stats[number] }) {
  const [value, label, change, positive] = stat
  return (
    <article className="stat-card">
      <strong>{value}</strong>
      <span>{label}</span>
      <small>
        <Icon
          className={positive ? "" : "icon--down"}
          src={positive ? "e5ef1.svg" : "cc67c.svg"}
        />
        {change} from previous week
      </small>
    </article>
  )
}

function CourseCard({ onContinue }: { onContinue: () => void }) {
  return (
    <article className="course-card">
      <img
        className="course-card__image"
        src={asset("2b450.png")}
        alt="Digital Marketing with AI and SMM course"
      />
      <div className="course-card__copy">
        <strong>Digital Marketing with AI + SMM</strong>
        <span>Lecture: AI Tools for Marketers</span>
        <small>MBA · Year 1 · Semester 1 · 4/12 modules</small>
      </div>
      <div className="course-card__actions">
        <div className="course-progress">
          <Icon src="a8d67.svg" />
          <strong>12%</strong>
        </div>
        <AppButton onClick={onContinue}>
          Continue Learning
          <Icon src="39366.svg" />
        </AppButton>
      </div>
    </article>
  )
}

function WeeklyProgress({ onInfo }: { onInfo: () => void }) {
  return (
    <section className="progress-section">
      <SectionTitle info={onInfo}>Weekly Progress</SectionTitle>
      <div className="panel weekly-panel">
        <Icon className="weekly-panel__info" src="bed99.svg" />
        <div className="ring-stat ring-stat--video">
          <div className="ring-stat__art">
            <Icon className="ring-track" src="80e62.svg" />
          </div>
          <strong>10</strong>
          <span>
            Mins Video
            <br />
            Watched
          </span>
        </div>
        <Icon className="chart-divider" src="db87f.svg" />
        <div className="ring-stat ring-stat--questions">
          <div className="ring-stat__art">
            <Icon className="ring-track" src="471af.svg" />
          </div>
          <strong>2</strong>
          <span>
            Questions
            <br />
            Attempted
          </span>
        </div>
      </div>
    </section>
  )
}

function MonthlyProgress({ onInfo }: { onInfo: () => void }) {
  const months = ["July 2024", "August 2024", "September 2024"]
  const [monthIndex, setMonthIndex] = useState(1)
  return (
    <section className="progress-section progress-section--monthly">
      <SectionTitle info={onInfo}>Monthly Progress</SectionTitle>
      <div className="panel calendar">
        <div className="calendar__toolbar">
          <AppButton
            aria-label="Previous month"
            className="calendar__arrow"
            disabled={monthIndex === 0}
            onClick={() => setMonthIndex((index) => Math.max(0, index - 1))}
            variant="ghost"
          >
            <Icon src="43922.svg" />
            <Icon
              className="calendar__arrow-symbol calendar__arrow-symbol--previous"
              src="3132b.svg"
            />
          </AppButton>
          <strong>{months[monthIndex]}</strong>
          <AppButton
            aria-label="Next month"
            className="calendar__arrow"
            disabled={monthIndex === months.length - 1}
            onClick={() =>
              setMonthIndex((index) => Math.min(months.length - 1, index + 1))
            }
            variant="ghost"
          >
            <Icon className="calendar__arrow-bg--next" src="43922.svg" />
            <Icon className="calendar__arrow-symbol" src="95040.svg" />
          </AppButton>
        </div>
        <div className="calendar__weekdays">
          <span />
          {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
            <strong key={`${day}-${index}`}>{day}</strong>
          ))}
        </div>
        <div className="calendar__rows">
          {calendarRows.map(([label, completed], rowIndex) => (
            <div className="calendar__row" key={label}>
              <span>{label}</span>
              {completed.split("").map((done, dayIndex) => {
                const special = rowIndex === 1 && dayIndex === 2
                const faded = rowIndex === 4
                return (
                  <Icon
                    className={faded ? "calendar__day--faded" : ""}
                    key={`${label}-${dayIndex}`}
                    src={
                      special
                        ? "f244f.svg"
                        : faded
                          ? "1ab62.svg"
                          : done === "1"
                            ? "0de65.svg"
                            : "ad429.svg"
                    }
                  />
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function EventCard({ notify }: { notify: (message: string) => void }) {
  return (
    <section className="events">
      <div className="events__title">
        <SectionTitle>Upcoming Events</SectionTitle>
        <span>This Week</span>
      </div>
      <div className="panel events__panel">
        <article className="event">
          <div className="event__meta">
            <span>
              <Icon src="a0dbb.svg" />
              Live class
            </span>
            <span className="live-badge">
              Live Now
              <Icon src="38f7f.svg" />
            </span>
          </div>
          <strong>Motivation Theories — Live Session</strong>
          <AppButton onClick={() => notify("Joining live class…")}>
            Join Now
          </AppButton>
        </article>
        <Icon className="event-divider" src="2a0fa.svg" />
        <article className="event">
          <div className="event__meta">
            <span>
              <Icon src="6ec1d.svg" />
              Exam
            </span>
            <small>Tomorrow, 11:00 AM</small>
          </div>
          <strong>Perception &amp; Attribution Exam</strong>
          <AppButton
            onClick={() => notify("Exam instructions opened")}
            variant="outline"
          >
            Go To Exam
          </AppButton>
        </article>
        <Icon className="event-divider" src="2a0fa.svg" />
        <article className="event">
          <div className="event__meta">
            <span>
              <Icon src="dc7c6.svg" />
              Assignment
            </span>
            <small>Due 5 Jul &apos;26</small>
          </div>
          <strong>Leadership Case Study Submission</strong>
          <AppButton
            onClick={() => notify("Assignment opened")}
            variant="outline"
          >
            View
          </AppButton>
        </article>
      </div>
    </section>
  )
}

export default function App() {
  const [activeNav, setActiveNav] = useState("Dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [toast, setToast] = useState("")
  const notify = (message: string) => {
    setToast(message)
    window.setTimeout(() => setToast(""), 2400)
  }

  return (
    <div className="app-shell">
      <Sidebar
        active={activeNav}
        notify={notify}
        onClose={() => setSidebarOpen(false)}
        onNavigate={(label) => {
          setActiveNav(label)
          if (label !== "Dashboard") notify(`${label} section selected`)
        }}
        open={sidebarOpen}
      />
      <Topbar notify={notify} onMenu={() => setSidebarOpen(true)} />
      <main className="dashboard">
        <section className="overview">
          <div className="display-heading">
            Progress is made in the hours you show up for
          </div>
          <p>One module today keeps the semester comfortably within reach.</p>
          <div className="stats-grid">
            {stats.map((stat) => (
              <StatCard key={stat[1]} stat={stat} />
            ))}
          </div>
        </section>
        <div className="workspace">
          <div className="learning-column">
            <section>
              <SectionTitle>Pick where you left off</SectionTitle>
              <CourseCard
                onContinue={() => notify("Opening AI Tools for Marketers…")}
              />
            </section>
            <div className="progress-grid">
              <WeeklyProgress
                onInfo={() =>
                  notify(
                    "Progress is based on lectures viewed and quizzes attempted.",
                  )
                }
              />
              <MonthlyProgress
                onInfo={() =>
                  notify("Your study activity for the selected month.")
                }
              />
            </div>
          </div>
          <EventCard notify={notify} />
        </div>
      </main>
      {toast && (
        <div className="toast" role="status">
          {toast}
        </div>
      )}
    </div>
  )
}
