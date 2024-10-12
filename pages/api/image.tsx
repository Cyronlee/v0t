import type { NextApiRequest, NextApiResponse } from "next";

import { kv } from "@vercel/kv";

import { messageImage } from "@/response/message-image";
import { itemResultImage } from "@/response/item-result-image";
import { groupKey, itemKey } from "@/lib/keys";

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

  const items = (await kv.hgetall(groupKey(group))) || [];
  const totalScore: number = Object.values(items).reduce(
    // @ts-ignore
    (acc, value) => acc + value,
    0,
  ) as number;

  const score: number = (await kv.hget(groupKey(group), itemKey(item))) || 0;

  const percentage = totalScore == 0 ? 0 : score / totalScore;

  return itemResultImage(item, score, percentage * 100, true);
}
