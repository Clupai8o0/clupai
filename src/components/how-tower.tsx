// Scope, sign, click, live, and the payment tower. src/motion/tower.js moves it; without motion it reads as a plain list.
export default function HowTower()
{
  return (
      <section className="how" id="how" aria-label="How it works">
        <div className="how-l">
          <article className="st st1">
            <h3>Scope</h3>
            <p>First we scope it, over one to two weeks. You pay for scoping, and we take that off the build price. You leave with a written scope, a prototype you can click, and a fixed price and date. Keep them even if you build with someone else.</p>
          </article>
          <article className="st st2 pre">
            <h3>Sign</h3>
            <p>Happy with the scope? Sign and pay 50%. From that day the code lives in your own GitHub.</p>
          </article>
          <article className="st st3 pre">
            <h3>Click</h3>
            <p>We send you the first working version. You use it, then pay the next 30%.</p>
          </article>
          <article className="st st4 pre">
            <h3>Live</h3>
            <p>It goes live on the agreed date, and the last 20% is due then.</p>
          </article>
          <article className="st st5 pre">
            <h3>Miss the date?</h3>
            <p className="big">Whatever you haven’t paid is cancelled, and we finish the build for free. What you’ve already paid isn’t refunded.</p>
            <ul>
              <li>You’ve signed the scope.</li>
              <li>You reply to us within 48 hours.</li>
              <li>Scope changes get a new date and price, agreed in writing.</li>
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
            <span className="miss-w">Miss the date</span>
            <span className="miss-k" aria-hidden="true">Press it</span>
          </button>
        </div>
        <div className="how-fall" id="how-fall" />
      </section>
  );
}
