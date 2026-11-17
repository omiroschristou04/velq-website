/**
 * Public pilot requests are only a contact route. They never grant or prove access.
 * Approval and any membership grant must happen privately, one person at a time.
 */
export const PILOT_REQUEST_EMAIL = "velqfinance@gmail.com";
export const PILOT_REQUEST_HREF =
  `mailto:${PILOT_REQUEST_EMAIL}?subject=VELQ%20pilot%20access%20request&body=Hello%2C%20I%27d%20like%20to%20request%20a%20free%20VELQ%20pilot%20place.%20Please%20let%20me%20know%20whether%20a%20place%20is%20available%20and%20how%20approval%20works.`;

export function inviteRequestHref(): string {
  return PILOT_REQUEST_HREF;
}
