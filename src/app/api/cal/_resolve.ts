export async function resolveEventTypeId(): Promise<number> {
  const raw = process.env.CAL_EVENT_TYPE_ID;
  const id = raw ? Number(raw) : NaN;

  if (!Number.isNaN(id) && id > 0) return id;

  throw new Error(
    `CAL_EVENT_TYPE_ID is not set or not a number in .env.local. ` +
    `Go to cal.com/event-types → edit your event → the URL will show the numeric ID.`
  );
}
