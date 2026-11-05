// Motion for /start and /start/result. Piece B builds the full-screen flow here.
// For now the mascot waits in the corner and the page's own React form does the work.
import { INK, YELLOW, isPhone } from "./kit";

export function init(scope, core)
{
  const { dot } = core;
  dot.colour(YELLOW, INK);
  dot.mood("");
  dot.hop(core.rest, { size: isPhone() ? 44 : 72 });
}
