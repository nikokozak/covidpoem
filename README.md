## Covid-19 in Chile

A simple, lightweight SPA rendering data from [Chile's Ministry of Science and
Technology](https://github.com/MinCiencia) in a text-based format. I get a bit overwhelmed by charts, and
wanted to make something cleaner, and hopefully somewhat more interesting than
the typical numerical-only counters. That said, charts are still available as
modals.

### Details

The site is written in vanilla JS, and uses a few lightweight libraries:

- **MicroModal** for modal functionality.
- **Chart.js** for chart rendering.
- **PapParser** for CSV parsing.
- **Axios** for http requests.
- **Bootstrap.css** for basic grid styling.

At the moment, the site is hosted on an azure vm running nginx.

