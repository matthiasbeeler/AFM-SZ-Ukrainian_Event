# AFM-SZ Ukrainian Event Registration

A small Node.js/Express web app that was used to register participants for information events for Ukrainian refugees organised by the Amt für Migration (AFM) of the Canton of Schwyz (2022).

> **Status:** archived. The app is no longer deployed or maintained. The code is published for reference only.

## Features

- Registration forms in three languages: Ukrainian (`uk`), German (`de`) and English (`en`)
- Two events, served under `/16` (16 May 2022, Einsiedeln) and `/18` (18 May 2022)
- Swiss postal-code validation against a bundled list (`public/data/plz_schweiz.json`)
- Confirmation e-mail with a personal cancellation link (signed JWT)
- Cancellation page (`/cancel?token=...`)
- Password-protected admin page (`/data`) to export registrations as an Excel file
- Keep-alive query to the database every 15 minutes

## Tech stack

- Node.js, Express 4, EJS templates
- MySQL (`mysql2`)
- Nodemailer (SMTP), `jsonwebtoken`, `exceljs`, `node-cron`, `dotenv`

## Project structure

```
app.js            Express app setup and routing
bin/www           HTTP server entry point
db.js             MySQL connection (configured via env vars)
send_mail.js      Confirmation e-mail with cancel link
translations.js   UI and e-mail texts (uk / de / en)
plz_schweiz.js    Postal code lookup
routes/           index, 16, 18, data, users
views/            EJS templates
public/           Static assets and postal-code data
```

## Configuration

Copy the variables below into a `.env` file in the project root. Nothing is hardcoded; `.env` is git-ignored.

| Variable | Purpose |
| --- | --- |
| `host`, `user`, `password`, `db`, `portt` | MySQL connection |
| `jwt_secret` | Secret used to sign cancellation tokens |
| `mail_server`, `mail_from`, `mail_pass`, `mail_from_name` | SMTP server, login and sender name |
| `data_pass` | Password for the `/data` export page |

The database schema is not included in this repository. Check the queries in `routes/16.js`, `routes/18.js`, `routes/index.js` and `routes/data.js` for the tables and columns it expects.

## Running locally

```bash
npm install
npm start
```

The server starts via `bin/www` (default port 3000).

## Known limitations

- The `/data` page takes its password as a URL query parameter (`?pass=...`). Don't reuse this pattern.
- The cancellation link in `send_mail.js` points to the original production domain (`https://sz.nyv.ch`). Change it if you run your own instance.
- Event dates and texts are hardcoded for the 2022 events.
- Dependencies are outdated and unpatched. Update them before any real use.

## License and assets

No license has been chosen. The Canton of Schwyz logo and links belong to their respective owners and are not covered by any license of this repository.
