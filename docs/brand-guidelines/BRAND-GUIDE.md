# dopamine™ Brand Guidelines

> Source: Figma Brand Guide designed by HOCHDREI, Germany
> Figma: https://www.figma.com/proto/hQOGQdpJHZuYW7GezlGoRr/DOPAMINE?page-id=760%3A5&node-id=760-6

---

## Brand Story

dopamine™ was born from the idea that friendships are built through shared effort, sweat, and movement. The question was simple: what if there was a space designed entirely around that feeling? A space where fitness wasn't just about performance, but about people?

What started as a raw and real studio tucked into a parking lot in Berlin's Kurfürstenstraße — surrounded by a chaotic mix of nightlife and urban grit — quickly grew into something bigger. A space where movement, mindset, and connection could come together.

**Brand essence:** dopamine™ is driven by momentum, creativity and impact.

**Full mission statement:** dopamine™ begins with movement, intention and shared collective energy. We create spaces where people connect, grow and progress together. Balance builds lasting strength in both body and mind. Progress feels more powerful when it is experienced collectively. Real moments matter more than digital validation ever could. Together, individual effort turns into energy that multiplies.

---

## Typography

**Font Family:** Ease SemiDisplay

| Role | Weight | Usage |
|------|--------|-------|
| Headline | Bold | Primary headlines, hero text |
| Subline | Medium | Secondary headlines, taglines |
| Body Copy | Regular | Paragraph text, descriptions |
| Annotation | Medium | Captions, social handles, small labels |
| Tag | Semi Bold | Tags, badges, category labels |

### Type Alignment Rules
- Center-aligned headlines are acceptable
- Left-aligned is also used
- Smaller text when there is more to say
- These are guiding principles, not strict rules
- Every application should prioritize clarity, consistency, and legibility

### Type Color Usage
- **Black** (#141514) for primary typography on light backgrounds
- **White** (#FFFFFF) on images, dark and gradient backgrounds
- If white type isn't clearly legible, darken the image until adequate contrast is achieved
- **Dark Grey**, **Grey**, and **Light Grey** are supporting type colors for hierarchy — annotations, labels, and secondary information

### Typography Don'ts
- Don't adjust letterspacing
- Don't alter the defined line heights
- Don't use ALL CAPS
- Don't use Title Case
- Don't use unsupported fonts
- Don't apply decorative effects (bold italic, etc.)
- Don't color individual words or full sentences
- Don't apply strokes or underlines

**"Our typography is a core expression of the brand. Please use it with clarity, consistency, and intention."**

---

## Color System

The dopamine™ color system is built on clarity, contrast, and hierarchy. Each color has a defined role.

### Core Colors

| Color | Hex | RGB | CMYK | Role |
|-------|-----|-----|------|------|
| Black | #141514 | 20, 21, 20 | 78, 68, 62, 87 | Primary backgrounds and typography |
| White | #FFFFFF | 255, 255, 255 | 0, 0, 0, 0 | Primary backgrounds and typography |

### Supporting Colors

| Color | Hex | RGB | CMYK | Role |
|-------|-----|-----|------|------|
| Dark Grey | #707070 | 112, 112, 112 | 53, 43, 42, 28 | Functional type color for hierarchy |
| Grey | #D0D0D0 | 208, 208, 208 | 22, 16, 17, 1 | Functional type color for hierarchy |
| Light Grey | #EFEFEF | 239, 239, 239 | 7, 5, 6, 0 | Digital background color (UI/web) |

### Accent Colors

| Color | Hex | RGB | CMYK | Role |
|-------|-----|-----|------|------|
| Blue | #185BC5 | 24, 91, 197 | 88, 64, 0, 0 | Accent — brand mark and icon language |
| Pink | #F78DB9 | 247, 141, 185 | 0, 58, 0, 0 | Accent — brand mark and icon language |

### Color Usage Rules
- **Black and White** are the core colors — visual foundation for backgrounds and typography
- **Gradient** (blue-to-purple-to-pink) complements them — adds energy and depth, used as background. Always use the original gradient files — do not recreate
- **Light Grey** is used primarily as a background color in digital environments (UI/web), introducing structure and separation while remaining close to white
- **Dark Grey and Grey** are NOT background colors — they are functional type colors for annotations, labels, and secondary information
- **Blue and Pink** are accent colors — primarily used within the brand mark and icon language. They activate the system — not dominate it

### CSS Variables (recommended)
```css
:root {
  --color-black: #141514;
  --color-white: #FFFFFF;
  --color-dark-grey: #707070;
  --color-grey: #D0D0D0;
  --color-light-grey: #EFEFEF;
  --color-blue: #185BC5;
  --color-pink: #F78DB9;
}
```

---

## Logo

The dopamine™ logo uses the word "dopamine" in lowercase with a ™ superscript, set in the brand typeface (Ease SemiDisplay Bold).

### Logo Variants
- **White on gradient** (primary)
- **White on black**
- **Black on white**
- Sub-brand lockups: dopamine + Mud, dopamine + ADE, dopamine + additional brand extensions

### Logo Symbol
The brand symbol is an abstract heart/checkmark shape — imperfect, hand-drawn aesthetic. It appears in:
- White on gradient backgrounds
- White on black backgrounds
- Blue and pink accent versions

### Logo Rules
- "Our logo is our most sacred asset."
- "Please treat it with the utmost respect & Thank you."

---

## Icons

### Icon System
- Iconography is integral to the dopamine™ brand
- Communicates information clearly, guides orientation, supports intuitive interaction
- Functional at its core — expressive by design
- Icons carry forward the imperfect, hand-drawn aesthetic of the logo symbol
- Combined with a distinctive sticker style — they move beyond traditional UI symbols
- Used exclusively in **blue and pink** — color becomes part of their meaning
- **Blue** brings clarity and focus
- **Pink** adds energy and emotion

### Icon Style
- Custom hand-drawn line-art style
- Sticker-like appearance with white outline/border
- Displayed on gradient, black, or white backgrounds
- Categories include: fitness, community, events, lifestyle, location, wellness

---

## Image Style (Photography)

The dopamine™ imagery captures momentum. Not perfection.

- It feels real, physical, present
- Sweat, light, texture, movement
- dopamine™ shows performance without over-polishing it
- Energy without artificial hype
- Close crops create intensity
- Blur communicates speed
- Natural light keeps it honest
- The camera feels embedded, not observing from distance
- Moments are dynamic, but never chaotic

### Photography Themes
- Athletic movement and training
- Community and togetherness
- Urban/street culture
- Natural, unposed moments
- Diverse, inclusive representation

---

## Visual Language

The brand's visual language combines:
- The signature blue-to-pink gradient as a backdrop
- Tilted/rotated photo frames layered on the gradient
- The hand-drawn icon system as sticker overlays
- Bold typography in Ease SemiDisplay

---

## Quick Reference for Development

### Font Stack
```css
font-family: 'Ease SemiDisplay', sans-serif;
```

### Key Hex Codes
- Background: `#141514` (dark) or `#FFFFFF` / `#EFEFEF` (light)
- Primary text: `#141514` (on light) or `#FFFFFF` (on dark)
- Secondary text: `#707070` or `#D0D0D0`
- Accent blue: `#185BC5`
- Accent pink: `#F78DB9`

### Design Principles
1. Black and white first — color is accent only
2. Typography is lowercase, never ALL CAPS or Title Case
3. Gradient is image-based — use provided files, don't recreate with CSS
4. Icons always in blue or pink, never black/grey
5. Photography should feel real, not stock — motion, natural light, close crops

---

## Dopamine Games Icon Set

Custom hand-drawn illustrative icons in a bold, Keith Haring-inspired silhouette style. All icons are PNGs with transparent backgrounds. Most come in black and white variants for use on dark and light backgrounds.

Location: `public/images/icons/`

### Icon Inventory

| Filename | Description | Style | Best Used For |
|----------|-------------|-------|---------------|
| `games-wordmark-black.png` | "GAMES" in hand-drawn, rough-cut lettering | Black on transparent | Headers, section titles, dark text on light backgrounds |
| `games-wordmark-white.png` | "GAMES" in hand-drawn, rough-cut lettering | White on transparent | Overlays on dark photos, hero sections |
| `community-hearts-black.png` | Two figures (woman + man) standing side by side, each making a heart shape with their outer arm | Black on transparent | Community / togetherness sections, about page, team areas |
| `community-hearts-white.png` | Same community figures | White on transparent | Dark backgrounds, photo overlays |
| `hearts-pattern-black.png` | Grid of 8 hand-drawn hearts in 2 rows — mix of outline and filled styles | Black on transparent | Decorative pattern, backgrounds, texture, love/community theme |
| `runners-speed-black.png` | Two figures running together with speed lines trailing behind them | Black on transparent | Running / competition sections, event descriptions |
| `runners-speed-white.png` | Same running figures with speed lines | White on transparent | Dark backgrounds, photo overlays |
| `duo-running-hearts-black.png` | Two figures running together, arms raised making heart shapes above their heads | Black on transparent | Hero accent, key brand moment — combines movement + love |
| `duo-running-hearts-white.png` | Same running hearts duo | White on transparent | Dark backgrounds, hero overlays |
| `weightlifter-hearts-white.png` | Figure in a squat position pressing a barbell overhead, with heart shapes at each end of the bar instead of plates | White on transparent | Strength / lifting sections, workout features |

### Icon Usage Notes
- These are **brand illustrations**, not UI icons — use them as visual accents, section markers, or decorative elements
- They pair perfectly with the hand-drawn energy of the dopamine™ brand
- On dark backgrounds → use the `-white.png` variants
- On light backgrounds → use the `-black.png` variants
- Can be tinted with brand accent colors (blue `#185BC5` or pink `#F78DB9`) via CSS filter
- The `duo-running-hearts` icon is the most iconic — it captures the full brand story (movement + community + heart) and works as a signature graphic
- The `hearts-pattern` works well as a repeating texture or subtle background element
