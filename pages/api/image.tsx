import type { NextApiRequest, NextApiResponse } from "next";

import { ImageResponse } from "@vercel/og";

let visit = 0;

export const config = {
  runtime: "edge",
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // @ts-ignore
  const isVotoDomain = req.headers.get("host") === "voto.vercel.app";

  visit++;
  // @ts-ignore
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name") || "Vote Result";

  return new ImageResponse(
    (
      <div
        style={{
          width: "640px",
          height: "48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: !isVotoDomain ? "#E8F5E9" : "white",
          padding: "0 16px",
        }}
      >
        <span style={{ width: "80%", fontSize: "18px", fontWeight: "bold" }}>
          {name}
        </span>
        <div
          style={{
            width: "80%",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <div
            style={{
              display: "flex",
              height: "24px",
              backgroundColor: "#e0e0e0",
              borderRadius: "12px",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <div
              style={{
                width: "80%",
                height: "100%",
                backgroundColor: "#4caf50",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{ color: "white", fontSize: "14px", fontWeight: "bold" }}
              >
                {visit}
              </span>
            </div>
          </div>
          <span style={{ fontSize: "16px", fontWeight: "bold" }}>80%</span>
        </div>
      </div>
    ),
    {
      width: 640,
      height: 48,
    },
  );
}
