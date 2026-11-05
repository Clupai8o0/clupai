// Scope, sign, click, live, and the payment tower. src/motion/tower.js moves it; without motion it reads as a plain list.
export default function HowTower()
{
  return (
      <section className="how" id="how" aria-label="How it works">
        <div className="how-l">
          <article className="st st1">
            <h3>Scope</h3>
            <p>Scoping comes first and takes one to two weeks. It’s paid, and it comes off the build. You get a written scope, a clickable prototype, and a fixed price and date. They’re yours to keep, even if you go elsewhere.</p>
          </article>
          <article className="st st2 pre">
            <h3>Sign</h3>
            <p>You have a scope, a prototype, a price and a date. You sign and pay 50%. Your code sits in your GitHub from day one.</p>
          </article>
          <article className="st st3 pre">
            <h3>Click</h3>
            <p>First working version. You click it before you pay the next 30%.</p>
          </article>
          <article className="st st4 pre">
            <h3>Live</h3>
            <p>Live, by the date we agreed. That’s when the last 20% is due.</p>
          </article>
          <article className="st st5 pre">
            <h3>Miss the date?</h3>
            <p className="big">Everything unpaid is cancelled. We finish it free, you keep what’s built, and money already paid stays paid.</p>
            <ul>
              <li>It needs a signed scope.</li>
              <li>It needs replies from you within 48 hours.</li>
              <li>Any change to the scope resets the date and price, in writing.</li>
            </ul>
            <p className="small">No client has used this guarantee yet.</p>
          </article>
        </div>
        <div className="how-r" id="how-r">
          <div className="twr" id="twr">
            <div className="tw tw-20 pre">
              <div className="tw-i i-20">
                <b>20%</b>
                <span className="tw-t">Live</span>
                <div className="flag" id="flag">
                  <i>Live</i>
                </div>
                <div className="stick">Cancelled</div>
              </div>
            </div>
            <div className="tw tw-30 pre">
              <div className="tw-i i-30">
                <b>30%</b>
                <span className="tw-t">You’ve clicked it</span>
                <div className="stick">Cancelled</div>
              </div>
            </div>
            <div className="tw tw-50 pre">
              <div className="tw-i">
                <b>50%</b>
                <span className="tw-t">You sign</span>
                <div className="stick st-a" id="stick-paid">
                  Paid stays paid
                </div>
                <div className="stick st-b" id="stick-free">
                  We finish it free
                </div>
              </div>
            </div>
            <div className="tw-pad">Scoping comes off the build</div>
          </div>
          <button className="miss pre" id="miss" type="button" disabled>
            Miss the date
          </button>
        </div>
        <div className="how-fall" id="how-fall" />
      </section>
  );
}
