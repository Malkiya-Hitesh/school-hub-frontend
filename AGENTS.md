<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.



# Gujarat School Hub — Project Context

## Project Overview

Gujarat School Hub is a large-scale school discovery and information platform focused on Gujarat schools.

The platform helps students and parents:
- discover schools
- compare schools
- search schools using advanced filters
- explore detailed school profiles
- access admission-related information

The long-term goal is to become the largest school discovery and admission platform for Gujarat.

---

# Core Features

## School Discovery
- List all Gujarat schools
- School detail pages
- District-based browsing
- SEO-friendly school pages

---

## Advanced Search & Filters

Users can search/filter schools using:
- district
- village
- medium
- school type
- government/private
- category
- facilities
- classes
- keywords
- infrastructure
- and other filters

---

## School Profile Pages

Each school page contains:
- school information
- academics
- facilities
- infrastructure
- teachers & students data
- government information
- geo location
- media/photos
- contact details

---

## School Claim System

School administrators can:
- claim school profiles
- verify ownership
- update school information
- manage inquiries
- upload media

---

# Technology Stack

## Frontend
- Next.js App Router
- React
- Tailwind CSS
- TanStack Query
- Framer Motion

---

## Backend
- Node.js
- Express.js
- JWT Authentication
- Mongoose

---

## Database
- MongoDB Atlas

MongoDB is the primary source of truth.

---

## Search Engine
- Typesense

Typesense handles:
- search
- filtering
- autocomplete
- typo tolerance
- faceted search

MongoDB should NOT handle heavy search/filter traffic directly.

---

## Media Storage
- Cloudinary

Images should NOT be stored in MongoDB.

Only URLs should be stored.

---

# Architecture

```txt
Frontend (Next.js)
        ↓
Backend API (Express)
        ↓
Typesense (Search & Filters)
        ↓
MongoDB (Main Database)



<!-- END:nextjs-agent-rules -->
