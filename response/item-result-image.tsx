import { ImageResponse } from "@vercel/og";

export const itemResultImage = (
  item: string,
  score: number,
  percentage: number,
  isVote: boolean,
): ImageResponse => {
  const imageResponse = new ImageResponse(
    (
      <div
        style={{
          width: "640px",
          height: "48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: isVote ? "#E8F5E9" : "white",
          padding: "0 16px",
        }}
      >
        <span style={{ width: "80%", fontSize: "18px", fontWeight: "bold" }}>
          {item}
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
              width: "80%",
              height: "24px",
              backgroundColor: "#e0e0e0",
              borderRadius: "12px",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <div
              style={{
                width: `${percentage}%`,
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
                {score}
              </span>
            </div>
          </div>
          <span style={{ fontSize: "16px", fontWeight: "bold" }}>
            {percentage}%
          </span>
        </div>
      </div>
    ),
    {
      width: 640,
      height: 48,
    },
  );

  imageResponse.headers.set("Cache-Control", "no-store, max-age=0");
  imageResponse.headers.set("Pragma", "no-cache");
  imageResponse.headers.set("Expires", "0");

  return imageResponse;
};
