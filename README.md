# 4DigitalHealth.io — Website Package

## Files Included

| File | Purpose |
|------|---------|
| `index.html` | Main public-facing website |
| `portal.html` | Login page + Parent & Student portals |
| `README.md` | This file |

---

## How to Launch

### Quickest option — drag and drop
1. Go to https://tiiny.host (free) or https://netlify.com (free)
2. Drag the entire folder and drop it — your site goes live instantly with a URL
3. To use your own domain (4digitalhealth.io), connect it in the host's DNS settings

### Recommended option — Framer or Webflow
- Import `index.html` as a starting point
- Rebuild pages using the visual editor for full drag-and-drop editing
- Use Memberstack (Webflow) or Framer Auth for real login functionality on the portal

---

## Customizing Content

### Text & copy
Open `index.html` or `portal.html` in any text editor (VS Code, Notepad++, etc.)
Search for placeholder text like "Student Name", "YOUR_VIDEO_ID", "[School]" and replace with real content.

### Colors
All colors are defined at the top of each file inside `:root { }`:
```css
--teal: #2f695b;    /* primary green */
--gold: #f8b300;    /* gold accent */
--offwhite: #f4f6fc; /* page background */
```
Change any hex value to update the color sitewide.

### Logo
The logo is built in HTML/CSS to match your brand exactly:
- `4` = white
- `Digital` = gold (#f8b300)
- `Health.io` = white
- Font: Montserrat 800

---

## Adding Testimonial Videos

1. Upload your video to YouTube or Vimeo
2. Click Share → Embed on the video page
3. Copy the video ID from the embed URL
   - YouTube: `https://www.youtube.com/embed/VIDEO_ID_HERE`
   - Vimeo: `https://player.vimeo.com/video/VIDEO_ID_HERE`
4. In `index.html`, find `YOUR_VIDEO_ID_1` (etc.) and replace with your real ID
5. Update the name/description in the `.video-meta` div below each video

---

## Embedding a Google Form (Intake Form)

1. Create your form at forms.google.com
2. Click Send → Embed → copy the `<iframe>` code
3. In `index.html`, find the comment that says:
   ```
   <!-- TO USE GOOGLE FORMS INSTEAD: delete everything between form-wrap div and replace with: -->
   ```
4. Replace the form HTML with your Google Form iframe

---

## Making the Portal Login Real

The current login uses demo credentials for preview only.
To add real authentication, you have two options:

### Option A — No-code (recommended)
- **Memberstack** (memberstack.com): paste one script tag into portal.html, define two member types (Parent, Student), gate content by role. ~$25/mo
- **Outseta** (outseta.com): similar, includes billing/invoicing built in. Free tier available.

### Option B — Custom backend
Replace the `doLogin()` function in portal.html with a real API call to your backend (Node.js, Firebase, Supabase, etc.)

---

## Real Billing & Invoices
For live invoice generation and payment processing, connect:
- **Stripe** — for payment processing and invoice PDFs
- **Outseta** — all-in-one: auth + billing + CRM

---

## Contact
info@4digitalhealth.io
Powered by Green Medical — greenmedicalonline.com
