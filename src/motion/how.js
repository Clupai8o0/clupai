// /how-it-works: the home page's tower, plus the generic page motion.
import { isPhone } from "./kit";
import { init as initInner } from "./inner";
import { buildHow } from "./tower";

export function init(scope)
{
  buildHow(scope, isPhone());
  initInner(scope);
}
