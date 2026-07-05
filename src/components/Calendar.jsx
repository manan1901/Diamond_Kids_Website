import { useState, useEffect } from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  X, 
  MapPin, 
  AlignLeft, 
  Clock, 
  ExternalLink 
} from "lucide-react";

// --- REPLACE THESE WITH YOUR ACTUAL KEYS ---
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
  const [selectedEvent, setSelectedEvent] = useState(null); // New state for modal
  const today = new Date(); 

  const monthLabel = cursor.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  const cells = getFourWeekGrid(cursor);
  
  useEffect(() => {
    async function fetchEvents() {
      try {
        const timeMin = new Date(today.getFullYear(), today.getMonth() - 2, 1).toISOString();
        const timeMax = new Date(today.getFullYear(), today.getMonth() + 2, 1).toISOString();
        
        const url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}&singleEvents=true&orderBy=startTime&timeMin=${timeMin}&timeMax=${timeMax}`;
        
        const res = await fetch(url);
        const data = await res.json();
        
        if (data.items) {
          const formattedEvents = {};
          
          data.items.forEach(item => {
            const startStr = item.start.dateTime || item.start.date;
            if (!startStr) return;

            const dateObj = new Date(startStr);
            const key = formatKey(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate());
            
            let timeString = "All Day";
            let fullStart = dateObj.toLocaleDateString();
            let fullEnd = "";

            if (item.start.dateTime) {
              timeString = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
              fullStart = dateObj.toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' });
            }
            
            if (item.end?.dateTime) {
              const endObj = new Date(item.end.dateTime);
              fullEnd = endObj.toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' });
            } else if (item.end?.date) {
               // Subtract 1 day from all-day end dates because Google sets them to the day after
               const endObj = new Date(item.end.date);
               endObj.setDate(endObj.getDate() - 1);
               fullEnd = endObj.toLocaleDateString();
            }

            if (!formattedEvents[key]) {
              formattedEvents[key] = [];
            }
            
            // Save extra data for the modal
            formattedEvents[key].push({
              title: item.summary || "Untitled Event",
              time: timeString,
              fullStart,
              fullEnd,
              description: item.description || "",
              location: item.location || "",
              link: item.htmlLink || ""
            });
          });
          
          setEvents(formattedEvents);
        }
      } catch (err) {
        console.error("Failed to fetch Google Calendar events:", err);
      }
    }

    fetchEvents();
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <div className="min-h-screen w-full bg-[#0b0e14] p-6 flex items-center justify-center relative">
      <div className="w-full max-w-6xl rounded-2xl border border-white/10 bg-[#12151d] shadow-2xl overflow-hidden">
        
        {/* Header */}
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

        {/* Days of Week */}
        <div className="grid grid-cols-7 border-b border-white/10">
          {DAY_LABELS.map((d) => (
            <div key={d} className="py-3 text-center text-xs font-medium uppercase tracking-wide text-slate-400">
              {d}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
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

                <div className="flex flex-col gap-1 mt-0.5 overflow-y-auto custom-scrollbar">
                  {dayEvents.map((ev, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => setSelectedEvent(ev)}
                      className="flex items-center justify-between gap-1 rounded-md px-1.5 py-1 text-[11px] leading-tight bg-white/5 hover:bg-white/10 cursor-pointer transition-colors"
                    >
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

      {/* Event Details Modal */}
      {selectedEvent && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" 
          onClick={() => setSelectedEvent(null)}
        >
          <div 
            className="bg-[#1a1d27] border border-white/10 rounded-2xl w-full max-w-md p-6 shadow-2xl relative" 
            onClick={e => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
            
            <h2 className="text-xl font-semibold text-white mb-5 pr-8 leading-tight">
              {selectedEvent.title}
            </h2>
            
            <div className="flex flex-col gap-4 text-sm text-slate-300">
              
              {/* Time */}
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <p>{selectedEvent.fullStart}</p>
                  {selectedEvent.fullEnd && selectedEvent.fullEnd !== selectedEvent.fullStart && (
                    <p className="text-slate-400">to {selectedEvent.fullEnd}</p>
                  )}
                </div>
              </div>
              
              {/* Location */}
              {selectedEvent.location && (
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                  <p>{selectedEvent.location}</p>
                </div>
              )}
              
              {/* Description */}
              {selectedEvent.description && (
                <div className="flex items-start gap-3">
                  <AlignLeft className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                  {/* Dangerously setting HTML because Google Calendar descriptions can contain basic HTML */}
                  <div 
                    className="prose prose-sm prose-invert max-w-none break-words" 
                    dangerouslySetInnerHTML={{ __html: selectedEvent.description }} 
                  />
                </div>
              )}

         
            </div>
          </div>
        </div>
      )}
    </div>
  );
}