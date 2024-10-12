import { ImageResponse } from "@vercel/og";

export const messageImage = (errorMessage: string): ImageResponse => {
  const imageResponse = new ImageResponse(
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

  imageResponse.headers.set("Cache-Control", "no-store, max-age=0");
  imageResponse.headers.set("Pragma", "no-cache");
  imageResponse.headers.set("Expires", "0");

  return imageResponse;
};
