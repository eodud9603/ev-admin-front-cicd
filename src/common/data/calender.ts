const date = new Date();
const d = date.getDate();
const m = date.getMonth();
const y = date.getFullYear();

interface CalendarEventProps {
  id: number;
  title: string;
  start: any;
  end?: any;
  url?: any;
  className: string;
}

interface CalendarCategoriesProps {
  id: number;
  title: string;
  type: string;
  text: string;
}

const events: Array<CalendarEventProps> = [
  {
    id: 1,
    title: 'All Day Event',
    start: new Date(y, m, 1),
    className: 'bg-primary text-white'
  },
  {
    id: 2,
    title: 'Long Event',
    start: new Date(y, m, d - 5),
    end: new Date(y, m, d - 2),
    className: 'bg-warning text-white'
  },
  {
    id: 3,
    title: 'Repeating Event',
    start: new Date(y, m, d - 3, 16, 0),
    className: 'bg-info text-white'
  },
  {
    id: 4,
    title: 'Repeating Event',
    start: new Date(y, m, d + 4, 16, 0),
    className: 'bg-primary text-white'
  },
  {
    id: 5,
    title: 'Meeting',
    start: new Date(y, m, d, 10, 30),
    className: 'bg-success text-white'
  },
  {
    id: 6,
    title: 'Lunch',
    start: new Date(y, m, d, 12, 0),
    end: new Date(y, m, d, 14, 0),
    className: 'bg-danger text-white'
  },
  {
    id: 7,
    title: 'Birthday Party',
    start: new Date(y, m, d + 1, 19, 0),
    end: new Date(y, m, d + 1, 22, 30),
    className: 'bg-success text-white'
  },
  {
    id: 8,
    title: 'Click for Google',
    start: new Date(y, m, 28),
    end: new Date(y, m, 29),
    url: 'http://google.com/',
    className: 'bg-dark text-white'
  }
];

const calenderDefaultCategories: Array<CalendarCategoriesProps> = [
  {
    id: 1,
    title: "New Theme Release",
    type: "bg-success-subtle",
    text: "text-success"
  },
  {
    id: 2,
    title: "Meeting",
    type: "bg-info-subtle",
    text: "text-info"
  },
  {
    id: 3,
    title: "Generating Reports",
    type: "bg-warning-subtle",
    text: "text-warning"
  },
  {
    id: 4,
    title: "Create New theme",
    type: "bg-danger-subtle",
    text: "text-danger"
  },
  {
    id: 5,
    title: "Team Meeting",
    type: "bg-dark-subtle",
    text: "text-dark"
  }
];

export { calenderDefaultCategories, events };
