# Freedom Pro Services Website

Static GitHub Pages-ready website for Freedom Pro Services.

## Pages
- `index.html` — homepage with services, process, and quick inquiry form
- `contact.html` — dedicated Contact Us page
- `terms.html` — Terms & Conditions page

## Logo
- `assets/freedom-pro-logo.svg` — compact header logo
- `assets/freedom-pro-logo-light.svg` — footer version
- `assets/freedom-pro-mark.svg` — icon/favicon mark

## EmailJS
The contact forms use EmailJS Browser v4 and currently reuse the settings found in the uploaded Urban Plus Care website:

- Public key: `BlPTxiPfD9Fg0YW07`
- Service ID: `service_ffn3avr`
- Template ID: `template_1egrq4k`

The template parameter names are intentionally kept compatible with that site:
- `from_name`
- `phone_number`
- `email`
- `subject`
- `message`
- `checked`

If Freedom Pro Services gets its own EmailJS service/template, edit only the `EMAILJS_CONFIG` object near the bottom of `script.js`.

## Deploy on GitHub Pages
Upload the contents of this folder to the repository root, then enable GitHub Pages for the repository. The included `CNAME` file is retained for the custom domain.

## Before launch
Confirm that the EmailJS template routes submissions to the intended Freedom Pro Services inbox. Also have the Terms & Conditions reviewed for the business's actual jurisdiction, contracts, and communication practices.
