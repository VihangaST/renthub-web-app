import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const PropertyAvailabilityCalendar = ({ events }) => {
  return (
    <div className="bg-gray-400 p-4 shadow-lg rounded-lg w-full max-w-4xl">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        views={["month"]}
        defaultView="month"
        className="rounded-lg border"
      />
    </div>
  );
};

export default PropertyAvailabilityCalendar;
