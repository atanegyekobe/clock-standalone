import { useEffect, useRef, useState } from 'react'
import './clock.css'

const location = 'Kumasi, Ghana'
const timeZone = 'Africa/Accra'

const timeFormatter = new Intl.DateTimeFormat('en-GH', {
  timeZone,
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hourCycle: 'h23',
})

const dateFormatter = new Intl.DateTimeFormat('en-GH', {
  timeZone,
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})

const programLineup = [
  { time: '6:00 AM – 6:30 AM', program: 'PAPA PROMO // GOSPEL VIDEOS' },
  { time: '6:30 AM – 7:00 AM', program: 'VICTORY HERBAL // HOUSE FOR SALE // AGAEEN TONIC // STATION ADVERT' },
  { time: '7:00 AM – 9:00 AM', program: 'ADANE BO MPAE (LIVE IN STUDIO)' },
  { time: '9:00 AM – 9:10 AM', program: 'SPIRITUAL PAPA PROMO' },
  { time: '9:10 AM – 9:40 AM', program: 'MOVIE (GHANAIAN MOVIE)' },
  { time: '9:40 AM – 10:00 AM', program: 'SPANISH HERBAL // KIDDIE TRAIN // HOUSE FOR SALE // SEMSEMS HERBAL // BIOGAS // TRUE FAITH' },
  { time: '10:00 AM – 11:00 AM', program: 'KIDDIE TRAIN (1 HOUR)' },
  { time: '12:00 PM – 12:30 PM', program: 'SEMENS HERBAL // KIDDIE TRAIN // AMUZU HERBAL // HOUSE FOR SALE // TRUE FAITH // PREKESE // MALAMIX' },
  { time: '12:30 PM – 1:00 PM', program: 'MOVIE CONTINUED (PLAY PAPA PROMO ONCE WITHIN THE MOVIE)' },
  { time: '1:00 PM – 3:00 PM', program: '{GLW} GHANAMAN LIVE WORSHIP (LIVE IN STUDIO)' },
  { time: '3:00 PM – 3:20 PM', program: 'SPIRITUAL PAPA PROMO' },
  { time: '3:20 PM – 3:50 PM', program: 'MOVIE CONTINUE' },
  { time: '3:50 PM – 4:00 PM', program: 'SPARNIS HERBAL // KETIMA // MALAMIX' },
  { time: '4:00 PM – 4:40 PM', program: 'MOVIE CONTINUE' },
  { time: '4:40 PM – 5:00 PM', program: 'SEMENS HERBAL // KB // VICTORY HERBAL' },
  { time: '5:00 PM – 5:30 PM', program: 'KIDDIE TRAIN (30 MINS)' },
  { time: '5:30 PM – 6:00 PM', program: 'MOVIE CONTINUED' },
  { time: '6:00 PM – 6:15 PM', program: 'MALAMIX // KETIMA // AGAEEN TONIC // HOUSE FOR SALE' },
  { time: '6:15 PM – 6:30 PM', program: 'MOVIE CONTINUED' },
  { time: '6:30 PM – 7:00 PM', program: 'VICTORY // AMUZU // TRUE FAITH // PREKESE' },
  { time: '7:00 PM – 7:20 PM', program: 'MOVIE CONTINUED' },
  { time: '7:20 PM – 7:30 PM', program: 'SPARNIS HERBAL // KIDDIE TRAIN' },
  { time: '8:00 PM – 9:30 PM', program: 'SPIRITUAL PAPA PROGRAM (LIVE)' },
  { time: '9:30 PM – 10:00 PM', program: 'GOSPEL VIDEOS' },
  { time: '10:00 PM – 12:00 AM', program: 'OGYE3 MMERE3' },
  { time: '12:00 AM – 2:00 AM', program: 'KIDDIE TRAIN (2 HOURS)' },
  { time: '2:00 AM – 3:00 AM', program: 'NIGERIA MOVIES' },
  { time: '3:00 AM – 4:00 AM', program: 'KIDDIE TRAIN (1 HOUR)' },
  { time: '4:00 AM – 4:50 AM', program: 'DEEP WORSHIP SONGS FOR MORNING PRAYERS' },
  { time: '4:50 AM – 6:00 AM', program: 'SPIRITUAL PAPA PROGRAM (LIVE)' },
]

const tabs = [
  { id: 'clock', label: 'Clock' },
  { id: 'lineup', label: 'Program lineup' },
]

function ClockApp() {
  const [now, setNow] = useState(() => new Date())
  const [activeTab, setActiveTab] = useState('clock')
  const tabRefs = useRef([])

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  const handleTabKeyDown = (event, currentIndex) => {
    let nextIndex
    if (event.key === 'ArrowRight') nextIndex = (currentIndex + 1) % tabs.length
    if (event.key === 'ArrowLeft') nextIndex = (currentIndex - 1 + tabs.length) % tabs.length
    if (event.key === 'Home') nextIndex = 0
    if (event.key === 'End') nextIndex = tabs.length - 1
    if (nextIndex === undefined) return

    event.preventDefault()
    setActiveTab(tabs[nextIndex].id)
    tabRefs.current[nextIndex]?.focus()
  }

  return (
    <div className="clock-app">
      <section className="clock-page" aria-label="Kumasi clock and program lineup">
        <div className="clock-tabs" role="tablist" aria-label="Clock and program schedule">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              ref={(element) => { tabRefs.current[index] = element }}
              id={`clock-tab-${tab.id}`}
              className="clock-tab"
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`clock-panel-${tab.id}`}
              tabIndex={activeTab === tab.id ? 0 : -1}
              onClick={() => setActiveTab(tab.id)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div
          className="clock-panel clock-time-panel"
          id="clock-panel-clock"
          role="tabpanel"
          aria-labelledby="clock-tab-clock"
          hidden={activeTab !== 'clock'}
          tabIndex={0}
        >
          <h1>Time in {location}</h1>
          <time
            dateTime={now.toISOString()}
            aria-label={`${timeFormatter.format(now)} in ${location}`}
            className="clock-digital-time"
          >
            {timeFormatter.format(now)}
          </time>
          <p className="clock-date">{dateFormatter.format(now)}</p>
          <p className="clock-timezone">Local time zone: {timeZone}</p>
        </div>

        <div
          className="clock-panel clock-lineup-panel"
          id="clock-panel-lineup"
          role="tabpanel"
          aria-labelledby="clock-tab-lineup"
          hidden={activeTab !== 'lineup'}
          tabIndex={0}
        >
          <header className="clock-lineup-header">
            <p className="clock-eyebrow">GHANAMAN TV · SATELLITE PLATFORM</p>
            <h1>Program lineup</h1>
            <p>Weekday schedule · Monday to Friday</p>
          </header>

          <ol className="clock-lineup-list">
            {programLineup.map(({ time, program }) => (
              <li className="clock-lineup-item" key={time}>
                <time>{time}</time>
                <span>{program}</span>
              </li>
            ))}
          </ol>

          <aside className="clock-lineup-note">
            <h2>Thursday note</h2>
            <p>THURSDAYS 20 MINS AFTER SOUL WINNERS PROGRAM (KIDDIE TRAIN) EXCEPT THE DAYS PAPA WILL BE GOING TO ACCRA</p>
          </aside>
          <p className="clock-lineup-gap-note">
            The supplied timetable does not list a program for 11:00 AM–12:00 PM or 7:30 PM–8:00 PM.
          </p>
        </div>
      </section>
    </div>
  )
}

export default ClockApp
