import ideas from "./data/ideas.json";
import { ArrowDownRight, Asterisk, Database, ScanSearch } from "lucide-react";
import IdeaDirectory, { type Idea } from "./idea-directory";

export default function Home() {
  const topIdeas = ideas.slice(0, 6);
  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="IdeaBucket home"><span className="wordmark-mark">IB/</span><span>IDEABUCKET</span></a>
        <div className="header-meta"><span>VENTURE SIGNAL ARCHIVE</span><span>EST. 2026</span></div>
      </header>
      <section className="hero" id="top">
        <div className="hero-kicker"><Asterisk size={16} /> 1,697 IDEAS. ONE RANKING.</div>
        <h1>THE INTERNET<br />HAD IDEAS.<br /><em>WE JUDGED THEM.</em></h1>
        <div className="hero-bottom">
          <p>A brutally honest directory of AI ventures, scored for urgency, buyer budget, feasibility, defensibility, distribution, and risk.</p>
          <a href="#directory" className="enter-link">ENTER THE BUCKET <ArrowDownRight size={22} /></a>
        </div>
        <div className="hero-index" aria-hidden="true">1697</div>
      </section>
      <section className="signal-strip" aria-label="Dataset summary">
        <div><Database size={18} /><strong>1,697</strong><span>RANKED CONCEPTS</span></div>
        <div><ScanSearch size={18} /><strong>36</strong><span>MARKET CATEGORIES</span></div>
        <div><span className="pulse-dot" /><strong>30</strong><span>HUMAN REVIEWED</span></div>
        <div><strong>94.0</strong><span>HIGHEST SIGNAL</span></div>
      </section>
      <section className="first-cut" id="directory">
        <div className="section-label"><span>01 / THE FIRST CUT</span><span>HIGHEST CONVICTION</span></div>
        <div className="top-grid">
          {topIdeas.map((idea) => (
            <article className="signal-card" key={idea.rank}>
              <div className="rank">{String(idea.rank).padStart(2, "0")}</div>
              <div className="card-body">
                <span className="category">{idea.category}</span><h2>{idea.name}</h2><p>{idea.concept}</p>
                <div className="score-line"><span>SIGNAL SCORE</span><strong>{Number(idea.score).toFixed(1)}</strong></div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <IdeaDirectory ideas={ideas as Idea[]} />
      <footer className="site-footer"><div><span className="wordmark-mark">IB/</span> IDEABUCKET</div><p>1,697 IDEAS IN. NO VIBES-ONLY RANKINGS OUT.</p><span>END OF INDEX / 2026</span></footer>
    </main>
  );
}
