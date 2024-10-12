import type { NextApiRequest, NextApiResponse } from "next";

import { kv } from "@vercel/kv";

import { groupKey, itemKey } from "@/lib/keys";
import { messageImage } from "@/response/message-image";

let visit = 0;

export const config = {
  runtime: "edge",
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // @ts-ignore
  const { searchParams } = new URL(req.url);
  const group = searchParams.get("group");
  const item = searchParams.get("item");

  if (group == null) {
    return messageImage("Error: Missing parameter [group]");
  }
  if (item == null) {
    return messageImage("Error: Missing parameter [name]");
  }

  const result = await kv.hincrby(groupKey(group), itemKey(item), 1);

  return messageImage(
    `Successfully voted for [${item}], current score is [${result}]`,
  );
}
