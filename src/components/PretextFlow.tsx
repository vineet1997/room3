import { useEffect, useRef, useState } from 'react';
import {
  prepareWithSegments,
  layoutNextLineRange,
  materializeLineRange,
  type LayoutCursor,
  type LayoutLine,
} from '@chenglou/pretext';
import { makeMaxWidthFn } from '../lib/floorPlanSilhouette';

/**
 * PretextFlow — desktop-only text-around-shape layout for Section 2.
 *
 * Lays out the body paragraph as positioned <span> elements, where each line's
 * width is computed against the floor plan's silhouette. The plan sits floated
 * to the right of the column; text wraps around its left edge.
 *
 * Triggers a Room 3 highlight via callback when the "Room 3 is the one being
 * offered" line enters view (line-precise trigger, per spec decision).
 *
 * Renders DOM (not canvas) so screen readers, copy/paste, and translation work.
 */

interface PretextFlowProps {
  /** The full body text to lay out */
  text: string;
  /** Width of the text column in pixels */
  columnWidth: number;
  /** Position and size of the floor plan SVG within the column */
  planLayout: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  /** Font shorthand string matching the rendered CSS, e.g. '20px "Inter Tight"' */
  font: string;
  /** Line height in px for vertical spacing */
  lineHeight: number;
  /** A substring within `text` whose line, when entering view, triggers `onTriggerLineInView` */
  triggerSubstring: string;
  /** Called once when the trigger line enters view */
  onTriggerLineInView: () => void;
  /** A render function for the final word (e.g. dusk-blue "open"). The word should appear at the very end of `text`. */
  finalWord: string;
  finalWordRender: (word: string) => React.ReactNode;
  /** Optional: called whenever the layout's total height changes. */
  onHeightChange?: (height: number) => void;
}

interface RenderedLine {
  text: string;
  y: number;
  isTriggerLine: boolean;
  isFinalLine: boolean;
}

export default function PretextFlow({
  text,
  columnWidth,
  planLayout,
  font,
  lineHeight,
  triggerSubstring,
  onTriggerLineInView,
  finalWord,
  finalWordRender,
  onHeightChange,
}: PretextFlowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerLineRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<RenderedLine[]>([]);
  const [totalHeight, setTotalHeight] = useState(0);
  const [fontReady, setFontReady] = useState(false);

  // Wait for the body font to load before measuring. Pretext uses the canvas
  // font engine for measurement, which falls back to system fonts if the web
  // font hasn't loaded yet — and that produces wrong line breaks.
  useEffect(() => {
    if (typeof document === 'undefined' || !document.fonts) {
      setFontReady(true);
      return;
    }
    document.fonts.ready.then(() => setFontReady(true));
  }, []);

  // Lay out the text whenever inputs change
  useEffect(() => {
    if (!fontReady) return;

    const prepared = prepareWithSegments(text, font);
    const maxWidthAt = makeMaxWidthFn({
      columnWidth,
      planX: planLayout.x,
      planY: planLayout.y,
      planW: planLayout.width,
      planH: planLayout.height,
      padding: 24,
    });

    const out: RenderedLine[] = [];
    let cursor: LayoutCursor = { segmentIndex: 0, graphemeIndex: 0 };
    let y = 0;

    // Bound the loop — even very long paragraphs won't exceed 200 lines.
    for (let i = 0; i < 200; i++) {
      const widthForThisLine = maxWidthAt(y);
      const range = layoutNextLineRange(prepared, cursor, widthForThisLine);
      if (range === null) break;

      const line: LayoutLine = materializeLineRange(prepared, range);
      const lineText = line.text;
      const isTriggerLine = lineText.includes(triggerSubstring);
      const isFinalLine = lineText.includes(finalWord);

      out.push({
        text: lineText,
        y,
        isTriggerLine,
        isFinalLine,
      });

      cursor = range.end;
      y += lineHeight;
    }

    setLines(out);
    setTotalHeight(y);
    if (onHeightChange) onHeightChange(y);
  }, [text, font, lineHeight, columnWidth, planLayout.x, planLayout.y, planLayout.width, planLayout.height, fontReady, triggerSubstring, finalWord, onHeightChange]);

  // IntersectionObserver on the trigger line — fires the highlight when the
  // reader's eye reaches "Room 3 is the one being offered."
  useEffect(() => {
    const el = triggerLineRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onTriggerLineInView();
          observer.disconnect();
        }
      },
      {
        threshold: 0.6,
        // No rootMargin — we want it to fire exactly when the line is in view.
      }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [lines, onTriggerLineInView]);

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{
        height: totalHeight,
        // Keep the same line-height in CSS so any browser-rendered fallback
        // matches Pretext's measurement.
        lineHeight: `${lineHeight}px`,
      }}
      // Fallback content for screen readers and no-JS — the full paragraph in
      // its natural reading order. The visual spans below are aria-hidden.
    >
      <span className="sr-only">
        {text.replace(finalWord, '')}
        {finalWordRender(finalWord)}
      </span>

      {lines.map((line, i) => {
        const isLast = i === lines.length - 1;
        // The final line gets the dusk-blue word treatment. The substring
        // approach is robust: even if Pretext breaks "open" onto its own line,
        // it'll still be detected.
        const idx = isLast ? line.text.lastIndexOf(finalWord) : -1;
        const before = idx >= 0 ? line.text.slice(0, idx) : line.text;
        const finalPart = idx >= 0 ? line.text.slice(idx, idx + finalWord.length) : '';
        const after = idx >= 0 ? line.text.slice(idx + finalWord.length) : '';

        return (
          <div
            key={i}
            ref={line.isTriggerLine ? triggerLineRef : undefined}
            aria-hidden="true"
            className="absolute left-0 text-ink"
            style={{
              top: line.y,
              fontFamily: 'inherit',
              fontSize: 'inherit',
              lineHeight: 'inherit',
              whiteSpace: 'pre',
            }}
          >
            {idx >= 0 ? (
              <>
                {before}
                {finalWordRender(finalPart)}
                {after}
              </>
            ) : (
              line.text
            )}
          </div>
        );
      })}
    </div>
  );
}
