---
title: "On Being Able to Tell the Water from the Fountain: A Discussion on the Fonts-Typefaces-Conundrum"
date: "2021-01-26"
displayDate: "January 26, 2021"
readingMinutes: 8
tags: ["design-ed"]
---

My favourite jury-moment of undiluted confusion is when someone attempts to differentiate between a font and a typeface. That is when I extend the chair on its creaky _springloaded_ extenders and stretch out like a variable font on its widest end and stare at the screen while sipping old-, cold-, dark-tea wishing life was simpler.

Here is an attempt at definitions. (Taken from a variety of sources — listed at the end — and validated with usage in a variety of scenarios.)

**LISTICLE-VERSION**

1\. Concept: A font is the source from which the typeface renders itself.

2a. Object: The font (these days) is the font-file. The typeface is what you see rendered on screen or print or anywhere you _set_ type.

2b. Object: In the early days of exclusively metal-and-wood-type, a font was the metallic-slash-wooden object — of a specific size — engraved with glyphs.

3\. Use: The font is what you install and render a typeface with. The typeface is what you use in a poster-brochure-banner-logo to type-set words and other glyphs.

**IN DETAIL**

Think of a TYPEFACE as the _face_ that the font-file helps one make. It speaks of a distinct design (purpose and intent) and a recognisable similarity in appearance across styles and sizes.\[ [1](/blog/fonts-typefaces-etcetera#historytptq)\] So, ‘Domaine Text Regular 10 pt’ is different from ‘Domaine Text Bold 10 pt.’ They are two different type-faces. (Also, if you want to be really pedantic, ‘Domaine Text Bold 10pt’ is a typeface while ‘Domaine Text Bold 50pt’ is another. With digital type that just scales from 10pt to 50pt, this detail doesn’t make much sense anymore. But often, a _text_ or small-size-specific letterform differs in shape from a _display_ or large-size-specific letterform. Look at [_Domaine Text_](https://klim.co.nz/retail-fonts/domaine-text/) and [_Domaine Display_](https://klim.co.nz/retail-fonts/domaine-display/). In the metal-type era, these could both be called _Domaine_, even with all the variations in shapes and contrast. (Think complications in hand-cutting type combined with optical adjustments.) Therefore it would have been necessary to specify the size to really understand what the face looked like. Simply saying ‘Domaine’ would fail to tell us what kind of contrast to expect. The correct — or more pedantic — answer to ‘what typeface?’ in that sense would be ‘Domaine Text Regular 10pt’ and not simply ‘Domaine.’)

If one were less pedantic, ‘Domaine’ is one typeface and ‘Helvetica’ is another, but that fails to specify the appearance well enough. These names could refer very well to complete families of typefaces including versions like regular, semibold, bold, italics, etcetera. So, _Domaine_ is a typeface-family while _Domaine Text Bold 15pt_ is a specific typeface.

That is to say a TYPEFACE FAMILY has a set of typefaces with all kinds of weights and widths and styles (bold, light, regular, condensed, extended, roman, italic, etc.) that share common visual characteristics. For example, the family Helvetica Neue LT contains more than 15 variations (weights, widths, slants). There are SUPERFAMILIES that contain serifs, sans-serifs, slabs, monospaced ones, different scripts, etcetera. (PT Sans, PT Serif, PT Mono, etc., from Google Fonts is an easy-to-find example. The Noto family of typefaces is a good example of a multi-script typeface family.)

A FONT (from fount, as in fount-ain, meaning _source_ in Old English) is the ‘source’ of the information for making a type‘face’ appear on paper or screen (or anywhere). In digital typography, this is the font-file on your computer (as a thing you can cut-copy-paste or upload-download-share). The font (file) has a definite presence (often kilobytes of data) and can be thought of as the software that makes the letters and glyphs appear. All the instructions for making the shapes, spacing the letterforms, replacing specific combinations of letters with a ligature, etcetera, are coded in this file. A variable font lets one change the appearance over defined ranges in addition to letting one pick instances like light or regular or semibold or upright and italic versions of the same. The variable font-file-as-software has set minimum and maximum values for such characteristics. When you license a font, you are paying for the use of such software to make a specific typeface(s) that it helps you make.Websites like Photolettering from House Industries used to let one purchase/license typefaces instead of fonts (words in a specific typeface as outlined shapes) but don’t anymore.

The beauty of this (above) definition of fonts is that it works well for variable fonts as well, by bringing clarity to the sources-origin of the word _font_.

**WHO MAKES THESE THINGS?**

Here is an easy distinction to remember. Type-designers design type-faces and font-designers or -foundries make them into usable fonts. Often, these two are the same person(s). A typographer then sets them (free) by using them well.

**YE OLDE FONDRE**

The other confusing bit comes from the word ‘font’ being a derivative of fondre (French for melt, cast, pour). Font-as-physical-objects matches this definition but doesn’t work that well with digital type. Back in the days of exclusively metal-or-wood-type, the ‘font’ was the metal or wooden blocks of a specific design _and_ size. Not anymore.

**TTF, OTF, ETCETERA.**

TTF and OTF (and WOFF and WOFF2 and many more) are font formats, much like png and psd if one were to oversimplify. Apart from the differences in how they are drawn (quadratic- versus cubic-or-postscript-curves \[ [2](/blog/fonts-typefaces-etcetera#curvescannerlicker)\]) TTF and OTF also often render differently on screens (TTFs can be hinted better but it is finally on the OS-es how they render type on screen). These two started out with different capabilities with respect to features like ligatures, stylistic alternates, etcetera but modern versions of OTFs and TTFs are equally capable formats when it comes to these features.

**IRL**

The correct answer to ‘what font is that?’ could be ‘88FFSeq\_34.ttf’ or ‘download-042.otf’ while the correct answer to ‘what typeface is that?’ could be ‘Domaine Text Regular 12pt’ or ‘Domaine Display 42 pt’ or even ‘Domaine Display.’ Just ‘Domaine’ would work too, as long as you are prepared to be judged. In general, the world will not stop making sense if one were to use ‘font’ and ‘typeface’ interchangeably. Just that in doing so, one eschews clarity for ambiguity and has to depend on the listener to decide whatever it means to them.

**SOURCES**

[_They’re Not Fonts_](http://web.archive.org/web/20150312174441/http://www.aiga.org/theyre-not-fonts/) from AIGA. Alan Haley, 2002. Also, [look at that job-description](https://segd.org/qa-allan-haley-monotype%20)! I am stealing it pronto.

[_Is it a font or a typeface?_](https://thenextweb.com/dd/2012/05/20/is-it-a-font-or-a-typeface/) from TNW has more perspectives. Harison Weber, 2012.

—

PS (Not that kind of Postscript)

The current correct answer to ‘what typeface is _exif-the-blog_ set in?’ is ‘whatever serif your browser defaults to.’ I’ve pared the CSS down to the essentials and the site looks as close to ‘default’ as ever. The only rules are the type size (20px) and the line height (1.5). Since I am a fancy person, the numerals are set to _oldstyle_. Yes; I’m willing to spend some keybees that way.

—

1: A notable exception is the typeface family _History_ from Typotheque. The only easily recognisable (and useful) similarity is the physical size of each glyph. Yet, this is a distinct (as in clearly defined) design choice.

2: A beautiful explanatory post I always link to in classes is [at Scannerlicker](https://learn.scannerlicker.net/2014/04/16/bezier-curves-and-type-design-a-tutorial/). This is almost required-reading for Typography-01, supplemented with discussions.
