import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Plus, ChevronDown, Link } from "lucide-react";

// --- REPLACE THESE WITH YOUR ACTUAL KEYS ---
// Note: Never commit real API keys to GitHub in a production app. 
// Move this to a .env file (e.g., process.env.NEXT_PUBLIC_GOOGLE_API_KEY) later.
const API_KEY = "AIzaSyBfIpE6sd_wmhUvzgKrqih3Y2jVwuFcQ4k";
const CALENDAR_ID = "b5d1ca2d0d1e712870e05950abe88ffe7d884c1e62720ce2ccd1e5a7d94c09ab@group.calendar.google.com";

const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function formatKey(year, month, day) {
  const m = String(month + 1).padStart(2, "0");
  const d = String(day).padStart(2, "0");
  return `${year}-${m}-${d}`;
}

function getFourWeekGrid(targetDate) {
  const dayOfWeek = targetDate.getDay();
  const mondayOffset = (dayOfWeek + 6) % 7; 
  
  const gridStart = new Date(targetDate);
  gridStart.setDate(gridStart.getDate() - mondayOffset);

  const cells = [];
  for (let i = 0; i < 28; i++) {
    const date = new Date(gridStart);
    date.setDate(gridStart.getDate() + i);
    cells.push(date);
  }
  return cells;
}

export default function FourWeekCalendar() {
  const [cursor, setCursor] = useState(new Date());
  const [events, setEvents] = useState({});
  const today = new Date(); 

  const monthLabel = cursor.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  const cells = getFourWeekGrid(cursor);
  
  useEffect(() => {
    async function fetchEvents() {
      try {
        // Fetch events from 2 months back to 2 months forward
        const timeMin = new Date(today.getFullYear(), today.getMonth() - 2, 1).toISOString();
        const timeMax = new Date(today.getFullYear(), today.getMonth() + 2, 1).toISOString();
        
        const url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}&singleEvents=true&orderBy=startTime&timeMin=${timeMin}&timeMax=${timeMax}`;
        
        const res = await fetch(url);
        const data = await res.json();
        console.log("GOOGLE API RESPONSE:", data);  
        if (data.items) {
          const formattedEvents = {};
          
          data.items.forEach(item => {
            const startStr = item.start.dateTime || item.start.date;
            if (!startStr) return;

            const dateObj = new Date(startStr);
            const key = formatKey(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate());
            
            let timeString = "All Day";
            if (item.start.dateTime) {
              timeString = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            }

            if (!formattedEvents[key]) {
              formattedEvents[key] = [];
            }
            
            formattedEvents[key].push({
              title: item.summary || "Untitled Event",
              time: timeString
            });
          });
          
          setEvents(formattedEvents);
        }
      } catch (err) {
        console.error("Failed to fetch Google Calendar events:", err);
      }
    }

    // Unconditionally call fetchEvents to ensure it runs
    fetchEvents();
  }, []); 

  const goToday = () => setCursor(new Date());
  
  const goPrev = () => {
    const newCursor = new Date(cursor);
    newCursor.setDate(cursor.getDate() - 28);
    setCursor(newCursor);
  };
  
  const goNext = () => {
    const newCursor = new Date(cursor);
    newCursor.setDate(cursor.getDate() + 28);
    setCursor(newCursor);
  };

  const isSameDay = (a, b) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  return (
    <div className="min-h-screen w-full bg-[#0b0e14] p-6 flex items-center justify-center">
      <div className="w-full max-w-6xl rounded-2xl border border-white/10 bg-[#12151d] shadow-2xl overflow-hidden">
        
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <h1 className="text-lg font-semibold text-white">{monthLabel}</h1>

          <div className="flex items-center gap-3">
            <div className="flex items-center rounded-lg bg-white/5 border border-white/10 overflow-hidden">
              <button onClick={goPrev} className="p-2 text-slate-400 hover:text-white hover:bg-white/5 transition-colors">
                <ChevronLeft size={16} />
              </button>
              <button onClick={goToday} className="px-3 py-1.5 text-sm font-medium text-slate-200 hover:text-white transition-colors">
                Today
              </button>
              <button onClick={goNext} className="p-2 text-slate-400 hover:text-white hover:bg-white/5 transition-colors">
                <ChevronRight size={16} />
              </button>
            </div>
  
            
            
          </div>
        </div>

        <div className="grid grid-cols-7 border-b border-white/10">
          {DAY_LABELS.map((d) => (
            <div key={d} className="py-3 text-center text-xs font-medium uppercase tracking-wide text-slate-400">
              {d}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 auto-rows-[110px]">
          {cells.map((date, i) => {
            const key = formatKey(date.getFullYear(), date.getMonth(), date.getDate());
            const dayEvents = events[key] || [];
            const isToday = isSameDay(date, today);

            return (
              <div key={i} className="border-b border-r border-white/5 p-2.5 flex flex-col gap-1">
                <div className="flex items-center">
                  {isToday ? (
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500 text-xs font-semibold text-white">
                      {date.getDate()}
                    </span>
                  ) : (
                    <span className="text-sm text-slate-300">
                      {date.getDate()}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1 mt-0.5 overflow-y-auto">
                  {dayEvents.map((ev, idx) => (
                    <div key={idx} className="flex items-center justify-between gap-1 rounded-md px-1.5 py-1 text-[11px] leading-tight bg-white/5">
                      <span className="truncate font-medium text-slate-200" title={ev.title}>
                        {ev.title}
                      </span>
                      <span className="shrink-0 text-slate-400">{ev.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}