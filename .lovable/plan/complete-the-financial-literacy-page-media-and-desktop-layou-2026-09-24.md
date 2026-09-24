# Complete the Financial Literacy page media and desktop layout

## Goal
Restore the intended animated experience on `/financial-literacy`, remove the oversized blank area below the footer, and improve readability and registration access without changing the page’s established design.

## Changes
- Add a responsive **Register now** control to the top navigation that links directly to `/register`.
- Replace the displayed “Boston, MA” metadata with “By Aethelis,” including translated page states that currently reuse the Boston label.
- Add the uploaded `loading.mp4`, `footer.mp4`, and doodle videos as managed site assets.
- Connect each doodle video to its existing numbered placeholder, including both supplied versions of doodle 6 where the source expects them.
- Restore the missing footer video band before the footer and re-enable the existing loading animation on page entry for smoother transitions between pages.
- Increase ordinary paragraph and supporting text by 6px while preserving the oversized editorial headlines and title typography.
- Recalculate the desktop decorative/page height around the sections that remain after the book and author areas were removed. This will bring footer content upward and eliminate the roughly 3,000px blank tail currently extending below it.
- Keep mobile spacing intact while ensuring the new top control and larger text fit without overlap.

## Verification
- Check `/financial-literacy` on desktop and mobile for layout, text wrapping, navigation, and no content overlap.
- Confirm the top button opens `/register`.
- Confirm all uploaded videos load, autoplay silently, loop in their intended positions, and pause appropriately off-screen.
- Confirm the loading screen appears and exits cleanly without trapping scrolling.
- Confirm the footer video appears, footer content follows it, and no large blank region remains below the footer.
- Check for broken media requests and browser errors.

## Technical notes
- The page is a compiled static experience, so its existing templates, animation initialization, and height calculations will be adjusted in place rather than rebuilt.
- Registration remains presentation-only; no database or saved submission behavior will be added.
