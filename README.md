# Diamond Kids School Website

A modern and responsive school website built with **React** and **Vite**. The project is designed to provide parents, students, and visitors with an easy way to explore the school's information, facilities, admissions, and contact details through a clean and user friendly interface.

Visit the live project here:

**https://diamond-kids-school.vercel.app/**

## Features

* Responsive design for desktop, tablet, and mobile devices
* Modern and clean user interface
* Fast performance powered by Vite
* Easy navigation between pages
* Optimized React component structure
* Ready for future enhancements
* 
## Tech Stack

* React
* Vite
* JavaScript
* HTML5
* CSS3
* 
## Deployment
The website is deployed on **Vercel** and is publicly available at:-
https://diamond-kids-school.vercel.app/
## License
This project is created for educational purpose.

This project is created for educational and portfolio purposes.

## Online Fee Payment (UPI)

* Page: `/online-fee-payment` — details → UPI (ID / QR / apps) → authentication → receipt.
* All payment logic lives in `src/services/upiPayment.js`. Default mode is **demo** (simulated, no money moves).
* Copy `.env.example` to `.env` and set `VITE_SCHOOL_UPI_ID`. For real payments set `VITE_PAYMENT_MODE=live` and implement the three backend endpoints listed at the top of `upiPayment.js` (payment status must be confirmed server-side via your gateway's webhook).

## Gallery

Each event shows as its own carousel. Add photos any of these ways:

1. Drop images into `src/assets/gallery/<event-id>/` (e.g. `src/assets/gallery/sports-day/`) — they appear automatically.
2. Add direct image links in the `photos` array of the event in `src/components/schoolData.js`.
3. Set `albumUrl` — a Google Drive folder link (shared as "Anyone with the link") is embedded on the page; a Google Photos link shows a "View full album" button.

To add a new event, add an object to `galleryEvents` in `schoolData.js` (and a matching folder if you use option 1).

## Notice Board

Edit the `notices` array in `src/components/schoolData.js`. The sample notices there are placeholders.
