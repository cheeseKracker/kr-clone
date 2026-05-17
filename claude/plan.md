# Plan: Remove Teaching Pages from Website

**Project**: krClone Website
**Date**: 2026-05-17
**Status**: Ready for Implementation
**Authored by**: Senior SDE

---

## Executive Summary

Complete removal of all teaching-related content, navigation elements, PDF resources, and associated images from the website. This involves cleaning up 14 asset files, updating 2 source files, and ensuring the site build remains stable post-removal.

**Impact**: The `/blog/teaching` URL will naturally return 404 after content removal. No redirects will be implemented.

---

## Scope Analysis

### Current Teaching Implementation
- **Route Type**: Standard blog post (not a dedicated section)
- **Content Storage**: Centralized in `site-content.json`
- **Rendering**: Uses dynamic catch-all route `/blog/[slug]`
- **Assets**: 13 PDF files (course abstracts) + 1 classroom photo
- **Navigation**: Single link in blog navigation component

### Files Inventory
- **2** source files to modify
- **13** PDF files to delete
- **4** directories to remove
- **1** image file to delete
- **Total**: 20 file system operations

---

## Detailed Implementation Plan

### Phase 1: Content Removal

#### 1.1 Update Site Content
**File**: `content/site-content.json`

**Actions**:
- Locate and remove the teaching page object with `pathname: "/blog/teaching"`
- Verify no references to teaching in the links array
- Ensure JSON remains valid after removal

**Expected Change**:
```diff
- {
-   "pathname": "/blog/teaching",
-   "type": "blog-post",
-   "title": "Teaching",
-   "content": "...",
-   ...
- },
```

**Validation**:
- JSON linter passes
- No dangling commas or syntax errors

---

### Phase 2: Navigation Update

#### 2.1 Remove Navigation Link
**File**: `src/components/exif-blog-nav.tsx`
**Line**: 15

**Actions**:
- Remove the Teaching link element
- Verify component still renders properly
- Ensure no orphaned imports or references

**Expected Change**:
```diff
- <Link href="/blog/teaching">Teaching</Link>
```

**Validation**:
- Component compiles without errors
- TypeScript type checking passes

---

### Phase 3: Asset Deletion

#### 3.1 Delete PDF Files (13 files)

**Root-level PDFs** (5 files):
```
public/files/
├── KR-20180801-Typography01-Abstract.pdf
├── KR-20210307-NIDV-CommunicationBasics-CourseAbstract.pdf
├── KR-20210613-WritingForDesign-CourseProposal.pdf
├── KR-20210806-NIDK-Digital-Colour-CourseProposal.pdf
└── KR-20211129-Typography1-CourseAbstract.pdf
```

**Subdirectory PDFs** (8 files across 4 directories):
```
public/files/layoutdesign/
└── KR-20200116-WSAD-LayoutDesign-CourseAbstract.pdf

public/files/symboldesign/
└── KR-20180910-SymbolDesign-CourseAbstract.pdf

public/files/typography1/
└── KR-20190923-Typography1-CourseAbstract.pdf

public/files/typography2/
├── KR-20190214_Typography2_CourseAbstract.pdf
├── KR-20191105-WSAD-Typography2-CourseAbstract.pdf
├── KR-20200310-NIDV-Typography2-CourseAbstract.pdf
└── KR-20210412-NIDV-Typography2-CourseAbstract.pdf
```

**Actions**:
- Delete individual PDF files first
- Remove empty directories after PDFs are deleted
- Verify no other files exist in these directories before removal

#### 3.2 Delete Teaching Image (1 file)
**File**: `public/blog/bl-content/uploads/Teaching-DSCF1719.jpg`

**Actions**:
- Delete the classroom photo
- Keep the uploads directory intact (may contain other images)

**Validation**:
- Confirm file deletion
- Ensure parent directory still exists if it contains other files

---

### Phase 4: Testing & Validation

#### 4.1 Build Verification
```bash
npm run build
```

**Expected Outcome**:
- Build completes successfully
- No TypeScript errors
- No missing reference warnings
- Static pages generated without the teaching page

#### 4.2 Route Testing
- **Test**: Navigate to `/blog/teaching`
- **Expected**: 404 Not Found page
- **Reason**: Page removed from content manifest

#### 4.3 Navigation Testing
- **Test**: Visit `/blog` and check navigation
- **Expected**: Teaching link is absent from blog nav
- **Reason**: Component updated to remove link

#### 4.4 Blog Index Testing
- **Test**: Visit `/blog` main page
- **Expected**: Teaching post not listed
- **Reason**: Content filtering excludes removed page

#### 4.5 Homepage Testing
- **Test**: Visit `/` homepage
- **Expected**: No broken links related to teaching
- **Reason**: Content links cleaned up

---

## Files Modified Summary

| File | Type | Action | Lines Changed |
|------|------|--------|---------------|
| `content/site-content.json` | Content | Remove teaching object | ~150-200 lines |
| `src/components/exif-blog-nav.tsx` | Component | Remove link | 1 line |
| **13 PDFs** | Static Asset | Delete | N/A |
| **4 directories** | Directory | Remove (after empty) | N/A |
| **1 image** | Static Asset | Delete | N/A |

**Total Impact**: 2 source files modified, 18 file system deletions

---

## Automatic Updates (No Action Required)

The following components will automatically adapt without modifications:

### Dynamic Routing
**File**: `src/app/blog/[slug]/page.tsx`
- `generateStaticParams()` reads from site-content.json
- Will automatically exclude teaching page from static generation
- No code changes needed

### Content Utilities
**File**: `src/lib/content.ts`
- `findPageByPath()` - will return null for `/blog/teaching`
- `getAllPages()` - will exclude teaching from manifest
- `getBlogPosts()` - will filter out teaching from blog list
- Functions are content-driven, no hardcoded references

### Rendering Components
- `PageMarkdown` - generic component, no teaching-specific logic
- `SiteShell` - layout wrapper, no teaching dependencies

---

## Risk Assessment

### Low Risk Factors ✅
- Teaching content is **self-contained** (single blog post)
- No database dependencies
- No API routes or server actions
- No authentication or authorization logic
- No external integrations
- Static site generation adapts automatically

### Potential Issues & Mitigations

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| External links to `/blog/teaching` | Medium | Low | 404 is acceptable; could add redirect later if needed |
| Build failures | Low | Medium | Run `npm run build` before deployment |
| JSON syntax errors | Low | High | Validate JSON after editing |
| Accidental deletion of other files | Low | High | Double-check file paths before deletion |

---

## Rollback Plan

In case of issues, the following rollback steps can restore teaching pages:

1. **Restore from Git**:
   ```bash
   git checkout HEAD -- content/site-content.json
   git checkout HEAD -- src/components/exif-blog-nav.tsx
   git checkout HEAD -- public/files/
   git checkout HEAD -- public/blog/bl-content/uploads/Teaching-DSCF1719.jpg
   ```

2. **Rebuild**:
   ```bash
   npm run build
   ```

3. **Verify**:
   - Visit `/blog/teaching` to confirm page is live
   - Check blog navigation includes Teaching link

**Recovery Time**: < 5 minutes

---

## Implementation Checklist

- [ ] **Phase 1**: Remove teaching object from `site-content.json`
- [ ] **Phase 2**: Remove teaching link from `exif-blog-nav.tsx`
- [ ] **Phase 3a**: Delete 5 root-level PDF files
- [ ] **Phase 3b**: Delete 8 PDF files from subdirectories
- [ ] **Phase 3c**: Remove 4 empty teaching directories
- [ ] **Phase 3d**: Delete teaching classroom image
- [ ] **Phase 4a**: Run `npm run build` successfully
- [ ] **Phase 4b**: Test `/blog/teaching` returns 404
- [ ] **Phase 4c**: Verify blog navigation renders correctly
- [ ] **Phase 4d**: Check blog index excludes teaching
- [ ] **Phase 4e**: Test homepage for broken links
- [ ] **Final**: Commit changes with descriptive message

---

## Post-Implementation Notes

### Expected Behavior After Removal
- `/blog/teaching` → 404 Not Found
- Blog navigation shows fewer links
- PDF files inaccessible (404 on direct URL)
- No broken internal links
- Build time may decrease slightly (less static content)

### Optional Future Enhancements
- Add redirect from `/blog/teaching` to `/blog` (if analytics show traffic)
- Create a redirects file for all teaching PDF URLs
- Add a custom 404 page with navigation suggestions

---

## Sign-off

**Plan Created**: 2026-05-17
**Ready for Implementation**: Yes
**Estimated Time**: 15-20 minutes
**Complexity**: Low
**Reversibility**: High (Git rollback available)

---

## Additional Context

### External Resources Referenced (will break)
The teaching page contains links to:
- 2 Google Docs (course abstracts)
- 2 Google Drive folders (student submissions)
- 8 txti.es notes (daily course notes)
- 1 YouTube video reference
- 13 PDF files hosted on this site

**Note**: External links on Google/YouTube will remain functional. Only local PDF references will break.

### Content Summary Being Removed
- **Teaching Experience**: 2018-2025 chronicle
- **Courses Documented**: 10+ courses across NID campuses
- **Student Projects**: Links to feedback and submissions
- **Philosophy Sections**: "Why" and "How" of teaching
- **Reading Time**: 13 minutes of content

**Content Preservation**: Consider backing up teaching content JSON to a separate archive file before deletion if historical reference is needed.

---

**End of Plan**
