# Financial Literacy page clone

## Goal
Recreate the Money in Check repository faithfully at `/financial-literacy`, keeping its original visual design, typography, imagery, scrolling behavior, animations, and language selector rather than adapting it to the surrounding Aethelis site.

## Changes
- Bring the repository’s compiled static experience and required local assets into the project without running imported scripts.
- Preserve the original long-form layout, bill/coin visuals, editorial styling, smooth scrolling, transitions, responsive behavior, and five-language selector.
- Replace the “Money in Check” name with “Financial Literacy” everywhere, including translated content and accessibility labels.
- Remove the author section, author navigation, biography, signature, portraits, social links, and all author credits.
- Remove the book section and every book-related element: cover/carousel, synopsis, editions, prices, Amazon/store links, purchase buttons, and book newsletter form.
- Rewrite remaining text only where necessary to eliminate references to a book, novel, author, purchase, or edition while retaining the source page’s structure and tone.
- Keep `/financial-literacy` self-contained so it does not inherit the Aethelis page styling.
- Add page-specific title, description, and social metadata for Financial Literacy.

## Verification
- Check the page at desktop and mobile sizes.
- Confirm the original visual effects, section navigation, and language selector still work.
- Search the rendered page and copied files to ensure no visible “Money in Check,” book, author, Oscar, Amazon, or purchase references remain.
- Confirm there are no broken local assets, browser errors, or broken links.

## Technical notes
- This remains a static experience with no database, login, or persistent form submission.
- Any source PHP newsletter endpoint will not be carried over because the entire book/newsletter area is being removed.
