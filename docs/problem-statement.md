# Problem Statement: Church Family House Management System

## The Current Reality

Within our Church Family House (Apostolic church), a community of residents lives, fellowships, and serves together daily. However, the administrative backbone of this community—responsible for finances, chores, and communication—currently relies on outdated, manual, and highly fragmented tools.

The primary victims of this inefficiency are the House Leaders and the Treasurer, who spend an inordinate amount of time on repetitive administrative work rather than focusing on pastoral care and community building.

## The Core Problems

### 1. Fragmented Financial Management

Tracking monthly house subscriptions (dues) is a manual headache. The Treasurer relies on handwritten notes, WhatsApp messages, or siloed Excel spreadsheets to track who has paid. This leads to:

- **Inconsistent Records:** It is nearly impossible to instantly tell the total outstanding balance for a given month.
- **No Digital Audit Trail:** Members rarely receive formal receipts for their payments, leading to trust deficits and disputes.
- **Forced Manual Calculations:** Generating monthly financial reports requires manually adding up figures, which is tedious and prone to human error.

### 2. Unfair and Cumbersome Roster Generation

Duties like cooking, worship leading, prayer leading, and sharing devotions must be assigned weekly or monthly. Currently, this is done manually:

- **The "Copy-Paste" Trap:** Leaders copy last month's roster and paste it into WhatsApp, often forgetting to account for absent members or new joiners.
- **Double-Booking:** The same person is frequently asked to handle two different duties on the exact same day because no system tracks their existing assignments.
- **Unfair Distribution:** Without a tracking mechanism, some eager members serve 4 times a month, while quieter members serve only once, breeding silent resentment.

### 3. Inefficient Mass Communication

Important announcements—such as general cleaning, prayer walks, or special programmes—are sent via WhatsApp broadcasts.

- Important messages get buried under casual chat conversations.
- Leaders have to manually copy-paste the same message into multiple groups or send it repeatedly to different members.

### 4. No Centralized Member Repository

Member information (rooms, phone numbers, join dates) is scattered across various WhatsApp chats and private phone contacts. When a new member joins, updating the "master list" for everyone is nearly impossible without a centralized database.

## The Impact of These Problems

The combination of these inefficiencies leads to:

- **Admin Burnout:** Leaders and the Treasurer spend 2–3 hours every week managing spreadsheets and WhatsApp threads.
- **Financial Leakage:** Due to opaque tracking, the house occasionally runs deficits because outstanding subscriptions are not chased in a timely manner.
- **Community Friction:** Arguments break out over who is responsible for cooking or praying on a given week, eroding the unity of the house.

## The Solution

I propose building a **centralized, web-based Church Family House Management System**.

This system will:

- **Automate Finances:** Provide a single dashboard for tracking paid/unpaid subscriptions, instantly generate digital receipts, and export financial reports.
- **Intelligently Generate Rosters:** Use a "Round-Robin" algorithm to ensure fair, conflict-free scheduling of duties (Cooking, Worship, Prayer, Devotion) with no double-booking.
- **Streamline Communication:** Integrate with the WhatsApp Business API to automatically send payment confirmations, roster PDFs, and deadline reminders to the entire house group.
- **Centralize Data:** House all Member data, roles, and historical records in a secure, queryable PostgreSQL database.

By solving these problems, I aim to empower the Church Family House leaders to focus on what truly matters: **discipling the residents and building a vibrant fellowship.**
