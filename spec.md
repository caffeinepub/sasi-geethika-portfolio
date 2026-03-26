# Sasi Geethika Portfolio

## Current State
Full portfolio with hero, about, skills, achievements, projects, and contact sections. Achievements section has a card titled "Career Guidance Ideathon" with org "Ideathon Competition".

## Requested Changes (Diff)

### Add
- Certificates section (after achievements) where the owner can log in, upload certificate images/PDFs, and display them. Visitors see all uploaded certificates.

### Modify
- ACHIEVEMENTS[2].title: "Career Guidance Ideathon" → "Invenza Ideathon"
- ACHIEVEMENTS[2].org: "Ideathon Competition" → "Geethanjali College of Engineering and Technology"
- NAV_LINKS: add "Certificates" → "#certificates"

### Remove
- Nothing

## Implementation Plan
1. Update ACHIEVEMENTS array in Portfolio.tsx for the renamed ideathon card.
2. Add Certificates section using blob-storage for upload and display.
3. Use authorization (Internet Identity) so only the owner can upload; all visitors can view.
4. Add nav link for Certificates section.
