import { ImageResponse } from "@vercel/og";

export const messageImage = (errorMessage: string): ImageResponse => {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff",
          fontSize: 16,
        }}
      >
        <span>{errorMessage}</span>
      </div>
    ),
    {
      width: 640,
      height: 48,
    },
  );
};
