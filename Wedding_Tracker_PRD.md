# Wedding Tracker
## Product Requirements Document

---

## 1. What Is This?

**Product:** Wedding Tracker

**Purpose:** One central place to manage everything for your wedding — guests, hotel rooms, events, vendors, budget, shopping, and gifts. No more juggling spreadsheets, WhatsApp groups, and scattered notes.

**Wedding Date:** April 23–24, 2025

**Venue:** Taj Ambad, Nashik

**Primary User:** Prerna (full control)

**Other Users:** Family members and coordinators you invite (with limited access)

---

## 2. What Does Success Look Like?

| Goal | How We'll Know It's Working |
|------|------------------------------|
| Everything in one place | No more switching between apps and spreadsheets |
| Always know who's coming | RSVPs flow in automatically from your wedding website |
| No missed deadlines | WhatsApp reminders ping you before important dates |
| Family can help without breaking things | People only see and edit what you allow them to |

---

## 3. Who Can Access What?

You'll invite people via their Google account (no new passwords to remember).

| Role | What They Can Do |
|------|------------------|
| **Admin (You)** | Everything — add/edit/delete anything, invite users, change settings |
| **Editor** | Add and edit in specific sections you assign (e.g., "Cousin Neha manages gifts") |
| **Viewer** | Can only look, not touch — useful for people who just need visibility |

---

## 4. Main Sections of the Tracker

### 4.1 Guest List

Track all ~200 guests (150 staying at the hotel + ~50 joining for meals only). Each guest is listed individually — no plus-ones.

**What you'll track for each guest:**

- Name
- Phone and email
- Guest type — Single / Part of a Couple / Part of a Family
- Group name (to link couples and family members together)
- Adult or Child
- Child's age (if applicable)
- Stay status: Checking in 23rd / Checking in 24th / Not staying (meals only)
- RSVP status — Waiting / Confirmed / Can't Make It (synced from wedding website)
- Food preferences — Regular Veg / Jain / Allergies (with notes)
- Any notes

**RSVP from wedding website:**

When someone RSVPs on the wedding website, they can enter multiple guest names in one go. For each name, they'll specify if the person is Single, part of a Couple, or part of a Family. This data flows into the tracker automatically.

---

### 4.2 Hotel Rooms & Check-In

Manage the 150 guests staying 2 nights at Taj Ambad. Maximum 3 adults per room (children are additional).

**What you'll track for each room:**

- Room number or name
- Room type (Suite, Deluxe, etc.)
- Capacity (max adults)
- Assigned guests
- Current adult count / child count
- Expected check-in date
- Check-in status — Not Arrived / Checked In / Checked Out
- Special requests (wheelchair access, baby crib, etc.)

**Room allocation logic:**

- Couples are automatically grouped together
- Families are automatically grouped together
- Singles are left unassigned for you to manually allocate
- System flags if a group exceeds 3 adults (needs multiple rooms)

**Helpful views:**

- See all rooms at a glance with who's in each
- Look up any guest and see their room
- See which rooms are still empty
- See unassigned singles waiting for room allocation

---

### 4.3 Event Schedule & Venues

Your 4 events over 2 days.

| Event | Date & Time | Venue |
|-------|-------------|-------|
| Bhaat, Matki Pooja, Mehendi | 23rd April, Noon | Residency Ball Room |
| Engagement Party | 23rd April, Night | Grand Ball Room Hall |
| Haldi | 24th April, Morning | Poolside Lawn |
| Baarat | 24th April, 6 PM | Internal Main Road |
| Jaimala & Reception | 24th April, Evening | Grand Ball Room Hall |
| Pheras | 24th April, Evening | Grand Ball Room Lawns |

**What you'll track for each event:**

- Event name
- Date and time (start to end)
- Location
- Expected headcount
- Dress code (optional)
- Notes (schedule of activities, vendor assignments)

---

### 4.4 Budget & Expenses

Track what you planned to spend vs. what you actually spend.

**What you'll track for each expense:**

- Category — Venue, Food, Decoration, Photography, Outfits, etc.
- Description — what exactly is this cost for
- Estimated cost — what you budgeted (in ₹)
- Actual cost — what you ended up paying (in ₹)
- Which vendor it's for
- Payment status — Not Paid / Partially Paid / Fully Paid
- Payment due date
- Notes — invoice numbers, payment terms

**Dashboard will show:**

- Total budget vs. total spent so far
- Breakdown by category
- Upcoming payments due

---

### 4.5 Vendors

Keep all vendor info in one place.

**What you'll track for each vendor:**

- Business name
- What they do — Catering, Decor, Photography, etc.
- Contact person's name
- Phone and email
- Total contract amount (in ₹)
- Payments made (linked to your expense records)
- Contract PDF (uploaded)
- Notes

---

### 4.6 Shopping & To-Do List

Track everything you need to buy or get done before the wedding.

**What you'll track for each item:**

- Item or task name — "Bride's lehenga", "Book pandit", "Finalise playlist"
- Category — Attire, Jewellery, Rituals, Logistics, etc.
- Status — To Do / In Progress / Done
- Who's handling it (optional — assign to a family member)
- Deadline
- Cost if applicable (in ₹)
- Notes — shop links, measurements, etc.

---

### 4.7 Gifts

Track what you receive and whether you've said thank you.

**What you'll track for each gift:**

- Which guest gave it
- What the gift was
- Approximate value (optional, in ₹)
- When/where you received it
- Thank you sent? — Yes / No
- Notes

---

### 4.8 Menus

Plan what food is served at each event. All food is vegetarian.

**What you'll track:**

- Which event
- Meal type — Breakfast / Lunch / Dinner / Snacks
- List of dishes
- Dietary coverage — Regular / Jain options
- Which caterer is handling it
- Expected number of people eating
- Notes — tasting dates, menu revisions

---

### 4.9 Decoration

Track decoration plans for each event or area.

| Venue | Event(s) | Notes |
|-------|----------|-------|
| Residency Ball Room | Bhaat, Matki Pooja, Mehendi | General festive decoration |
| Grand Ball Room Hall | Engagement (23rd), Jaimala & Reception (24th) | Used twice — check if decor needs refresh |
| Poolside Lawn | Haldi | Bright, outdoor Haldi vibe |
| Internal Main Road | Baarat | Pathway, lighting, band/welcome setup |
| Grand Ball Room Lawns | Pheras | Mandap setup |

**What you'll track:**

- Which event or area
- Theme or concept — description or link to inspiration images
- Which decorator vendor
- Status — Planning / Confirmed / Being Set Up / Done
- Budget (in ₹)
- Notes — reference photos, change requests

---

## 5. Reminders

You'll get WhatsApp messages to remind you about:

- Tasks approaching their deadline (e.g., 3 days before, 1 day before)
- Vendor payments coming due
- RSVP deadline approaching (reminder for you to follow up with guests)
- Any custom reminders you set manually

You can turn specific reminder types on or off based on what's useful.

---

## 6. How It Will Be Built

Technical details for whoever builds this:

| What | Plain English |
|------|---------------|
| The screens you'll use | A website that works well on both computer and phone browsers (built with React) |
| Where your data is stored | A secure database called MongoDB (think of it as a smart digital filing cabinet) |
| How you'll log in | Using your Google account — no new password needed |
| How you'll get reminders | Through a WhatsApp messaging service |
| Wedding website | Hosted on GitHub Pages — RSVP data will sync to the tracker via a connection between the two systems |

---

## 7. What to Build First

Since the wedding is in April, here's the order of priority:

| Priority | Section | Why |
|----------|---------|-----|
| **Must have first** | Guest List + RSVP sync | Core of everything — need to know who's coming |
| **Must have first** | Hotel Rooms & Check-In | 150 people need room assignments |
| **Must have first** | Event Schedule | 4 events need to be organised |
| **Should have before wedding** | Budget & Expenses | Track spending and payments |
| **Should have before wedding** | Vendors | Keep vendor contacts and contracts handy |
| **Should have before wedding** | Shopping & To-Do List | Don't miss any tasks |
| Nice to have | Gifts | Can start simple, flesh out later |
| Nice to have | Menus | Useful but lower urgency |
| Nice to have | Decoration | Useful but lower urgency |
| Nice to have | WhatsApp Reminders | Helpful but can manage without initially |

---

## 8. Still Need to Figure Out

- **Wedding website RSVP form update:** The RSVP form needs to be updated to allow entering multiple guest names, with each marked as Single / Couple / Family. This will be handled by Arpit.

- **WhatsApp setup:** Do you have a WhatsApp Business account, or should the developer set up a messaging service?

---

> **Note:** Grand Ball Room Hall is used on both days (Engagement on 23rd, Jaimala & Reception on 24th). Worth checking with the decorator if the same setup can stay up overnight, or if it needs a refresh.

---

*Version 2.0 — Updated with guest grouping and room allocation logic*
