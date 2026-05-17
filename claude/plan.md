## Plan: Update Dog Years to 2026/2025

Replace only the Dog Years markdown table content so the page keeps its current structure and rendering, but contains exactly two year sections (2026 and 2025) populated with the provided books. Keep this as a content-only change in the canonical content source to avoid route/component regressions.

**Steps**
1. Confirm the Dog Years source entry in [content/site-content.json](content/site-content.json#L871) and edit only the markdown string for pathname /blog/dog-years, leaving all metadata fields unchanged.
2. Preserve existing intro/header and table shell (title, date/reading-time line, intro copy, table header row), then replace all year rows with exactly two sections in this order: 2026 first, then 2025.
3. Insert 2026 rows with these title/author pairs (one per row, same two-column structure as current table):
   - Playing To The Gallery | Grayson Perry
   - The Psychology of Money | Morgan Housel
   - Tomorrow, and Tomorrow, and Tomorrow | Gabrielle Zevin
   - Ikigai | Francesc Miralles and Hector Garcia
   - A Game of Thrones | George R R Martin
4. Insert 2025 rows with these title/author pairs:
   - One Hundred Years of Solitude | Gabriel García Márquez
   - Cosmos | Carl Sagan
   - Buddhism as Philosophy | Mark Siderits
   - To Kill a Mockingbird | Harper Lee
   - Why Nations Fail | Daron Acemoglu
5. Keep structural separators exactly as today’s table pattern expects (year header row + book rows + separator row), and keep footer links unchanged unless explicitly requested later.
6. Keep link list array untouched for now (it can contain historical URLs not currently present in markdown without affecting page rendering).

**Relevant files**
- /Users/karak/Desktop/krClone/content/site-content.json — update only the Dog Years markdown body in the /blog/dog-years page object.
- /Users/karak/Desktop/krClone/src/app/blog/[slug]/page.tsx — reference only; confirms content is resolved by slug and rendered from markdown without custom Dog Years logic.
- /Users/karak/Desktop/krClone/src/components/page-markdown.tsx — reference only; confirms markdown table rendering goes through remark-gfm and should remain stable if table syntax is preserved.

**Verification**
1. Run project checks/build (for this repo’s standard command) to ensure JSON validity and route generation remains healthy.
2. Open /blog/dog-years and confirm only year sections 2026 and 2025 are present, in that order.
3. Validate table rendering: two columns align, all 10 books are visible, and no broken markdown formatting appears.
4. Verify intro and footer navigation still render as before.

**Decisions**
- Included scope: content update for /blog/dog-years year rows only.
- Excluded scope: route code, markdown renderer behavior, styling/theme, RSS or crawler/normalizer pipeline changes.
- Decision: keep existing structure and footer intact; only replace list content with provided years and books.

**Further Considerations**
1. Normalize title casing optionally after implementation (for example, “SOlitude” to “Solitude”) only if this is desired editorially.
2. If you want author links for any entries later, add them in markdown link format without changing table structure.