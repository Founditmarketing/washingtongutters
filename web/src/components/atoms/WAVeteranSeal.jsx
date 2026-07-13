/**
 * Back-compat re-export.
 *
 * WAVeteranSeal was the original component built for the WA Certified
 * Veteran-Owned seal alone. We've since generalized it into TradeStamp,
 * which handles all third-party credential seals (WA-veteran, generic
 * veteran-owned, Google 5-star, future additions). Keeping this file
 * as a thin shim means the 4+ existing import sites don't need to
 * change immediately; new code should import TradeStamp directly.
 */
import TradeStamp from "./TradeStamp";

export default function WAVeteranSeal(props) {
  return <TradeStamp {...props} name="wa-veteran-certified" />;
}
