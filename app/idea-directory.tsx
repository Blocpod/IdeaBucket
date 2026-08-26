"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";

export type Idea = {
  rank: number; name: string; category: string; score: number; modelScore: number;
  curatedOverride: number | null; verdict: string; urgency: number; buyerBudget: number;
  marketSize: number; feasibility: number; defensibility: number; distribution: number;
  strategicFit: number; risk: number; confidence: string; concept: string;
  rationale: string | null; concern: string; videoTime: string; sourceOrder: number;
};

const PAGE_SIZE = 30;

function visiblePages(current: number, total: number) {
  const candidates = [1, current - 1, current, current + 1, total];
  return [...new Set(candidates.filter((n) => n >= 1 && n <= total))].sort((a, b) => a - b);
}

function scoreTone(score: number) {
  if (score >= 75) return "elite";
  if (score >= 67) return "strong";
  if (score >= 59) return "test";
  return "park";
}

export default function IdeaDirectory({ ideas }: { ideas: Idea[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [verdict, setVerdict] = useState("all");
  const [sort, setSort] = useState("rank");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Idea | null>(null);

  const categories = useMemo(() => [...new Set(ideas.map((idea) => idea.category))].sort(), [ideas]);
  const verdicts = useMemo(() => [...new Set(ideas.map((idea) => idea.verdict))], [ideas]);
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const result = ideas.filter((idea) => {
      const matchesText = !needle || `${idea.name} ${idea.category} ${idea.concept}`.toLowerCase().includes(needle);
      return matchesText && (category === "all" || idea.category === category) && (verdict === "all" || idea.verdict === verdict);
    });
    return result.sort((a, b) => sort === "score-low" ? a.score - b.score : sort === "name" ? a.name.localeCompare(b.name) : a.rank - b.rank);
  }, [ideas, query, category, verdict, sort]);

  useEffect(() => setPage(1), [query, category, verdict, sort]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageIdeas = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const clearFilters = () => { setQuery(""); setCategory("all"); setVerdict("all"); setSort("rank"); };

  return (
    <section className="directory" id="complete-index">
      <div className="section-label directory-label"><span>02 / COMPLETE INDEX</span><span>ALL {ideas.length.toLocaleString()} IDEAS</span></div>
      <div className="directory-head">
        <h2>FIND THE<br /><span>SIGNAL.</span></h2>
        <p>Search the complete audit. Filter the noise. Open any record for its full scorecard and strategic read.</p>
      </div>

      <div className="filter-deck">
        <label className="search-box">
          <Search size={18} aria-hidden="true" />
          <span className="sr-only">Search all ideas</span>
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="SEARCH NAME, MARKET, OR PROBLEM..." />
          <kbd>⌘ K</kbd>
        </label>
        <div className="filter-selects">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="brutal-select" aria-label="Filter by category"><SelectValue placeholder="Category" /></SelectTrigger>
            <SelectContent className="brutal-menu"><SelectItem value="all">All categories</SelectItem>{categories.map((item) => <SelectItem value={item} key={item}>{item}</SelectItem>)}</SelectContent>
          </Select>
          <Select value={verdict} onValueChange={setVerdict}>
            <SelectTrigger className="brutal-select" aria-label="Filter by verdict"><SelectValue placeholder="Verdict" /></SelectTrigger>
            <SelectContent className="brutal-menu"><SelectItem value="all">All verdicts</SelectItem>{verdicts.map((item) => <SelectItem value={item} key={item}>{item}</SelectItem>)}</SelectContent>
          </Select>
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="brutal-select sort-select" aria-label="Sort ideas"><SelectValue /></SelectTrigger>
            <SelectContent className="brutal-menu"><SelectItem value="rank">Rank: best first</SelectItem><SelectItem value="score-low">Score: low first</SelectItem><SelectItem value="name">Name: A–Z</SelectItem></SelectContent>
          </Select>
        </div>
      </div>

      <div className="result-bar">
        <span><SlidersHorizontal size={14} /> SHOWING <strong>{filtered.length.toLocaleString()}</strong> SIGNALS</span>
        <button onClick={clearFilters}>RESET FILTERS ×</button>
      </div>

      <div className="idea-list" role="list">
        {pageIdeas.length ? pageIdeas.map((idea) => (
          <button className="idea-row" key={idea.rank} onClick={() => setSelected(idea)} role="listitem">
            <span className="idea-rank">#{String(idea.rank).padStart(4, "0")}</span>
            <span className="idea-name"><strong>{idea.name}</strong><small>{idea.category}</small></span>
            <span className="idea-verdict">{idea.verdict}</span>
            <span className="idea-preview">{idea.concept}</span>
            <span className={`idea-score ${scoreTone(idea.score)}`}><strong>{Number(idea.score).toFixed(1)}</strong><i style={{ width: `${idea.score}%` }} /></span>
            <ArrowUpRight className="row-arrow" size={20} />
          </button>
        )) : (
          <div className="empty-state"><strong>NO SIGNAL FOUND.</strong><span>Try a wider search or reset the filters.</span><Button onClick={clearFilters}>RESET THE INDEX</Button></div>
        )}
      </div>

      <div className="pager" aria-label="Directory pagination">
        <Button variant="outline" disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))}><ArrowLeft /> PREV</Button>
        <div className="page-numbers">
          {visiblePages(page, totalPages).map((item, index, arr) => (
            <span key={item} className="page-cluster">
              {index > 0 && item - arr[index - 1] > 1 && <i>···</i>}
              <button className={item === page ? "active" : ""} onClick={() => setPage(item)} aria-label={`Page ${item}`} aria-current={item === page ? "page" : undefined}>{String(item).padStart(2, "0")}</button>
            </span>
          ))}
        </div>
        <Button variant="outline" disabled={page === totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>NEXT <ArrowRight /></Button>
      </div>
      <div className="page-readout">PAGE {String(page).padStart(2, "0")} / {String(totalPages).padStart(2, "0")}</div>

      <Sheet open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)}>
        <SheetContent className="idea-sheet" side="right">
          {selected && <>
            <SheetHeader className="sheet-head">
              <div className="sheet-index">#{String(selected.rank).padStart(4, "0")} / {selected.category}</div>
              <SheetTitle>{selected.name}</SheetTitle>
              <SheetDescription>{selected.verdict}</SheetDescription>
            </SheetHeader>
            <div className="sheet-scroll">
              <div className="hero-score"><span>FINAL SIGNAL</span><strong>{Number(selected.score).toFixed(1)}</strong><i style={{ width: `${selected.score}%` }} /></div>
              <section className="sheet-section"><span>THE CONCEPT</span><p>{selected.concept}</p></section>
              {selected.rationale && <section className="sheet-section rationale"><span>WHY IT RANKS</span><p>{selected.rationale}</p></section>}
              <section className="score-matrix">
                {[["Urgency", selected.urgency], ["Buyer budget", selected.buyerBudget], ["Market size", selected.marketSize], ["Feasibility", selected.feasibility], ["Defensibility", selected.defensibility], ["Distribution", selected.distribution], ["Strategic fit", selected.strategicFit], ["Risk", selected.risk]].map(([label, value]) => (
                  <div key={String(label)}><span>{label}</span><strong>{Number(value).toFixed(1)}</strong><i><b style={{ width: `${Number(value) * 10}%` }} /></i></div>
                ))}
              </section>
              <section className="sheet-section concern"><span>PRIMARY CONCERN</span><p>{selected.concern}</p></section>
              <footer className="sheet-meta"><span>OCR / {selected.confidence}</span><span>VIDEO / {selected.videoTime}</span><span>SOURCE / {selected.sourceOrder}</span></footer>
            </div>
          </>}
        </SheetContent>
      </Sheet>
    </section>
  );
}
