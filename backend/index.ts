import fetch from "node-fetch";

const CLIENT_ID = "ad1e08d3838e4a518096eddf000e1358";
const CLIENT_SECRET = "32f40ff4b17d4c4899f8e6309aff3b4f";
// const REDIRECT_URI = "http://localhost:3000/redirect";

type Request = {
  method: string;
  args: any;
};

export async function handler(event: any, context: any) {
  // console.log("Hello");
  // return {
  //     statusCode: 200,
  //     body: JSON.stringify("OK"),
  //     headers: {
  //         'Content-Type': 'application/json',
  //     },
  // };
  const request: Request = JSON.parse(event.body);

  if (!request || event.headers["Connection"] === "close") {
    return {
      statusCode: 400,
      body: JSON.stringify("Bad request"),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  // console.log(JSON.stringify(context));
  // console.log(JSON.stringify(event));

  const methodHandler = {
    "get-access-token": async ({
      code,
      redirectUri,
    }: {
      code: string;
      redirectUri: string;
    }) => {
      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          Authorization:
            "Basic " +
            new Buffer(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64"),
          "Content-Type": "application/x-www-form-urlencoded",
        },
        // body: `grant_type=authorization_code&code=${code}&redirect_uri=${REDIRECT_URI}`,
        body: new URLSearchParams({
          grant_type: "authorization_code",
          code,
          redirect_uri: redirectUri,
        }),
      });
      return response.json();
    },
  }[request.method];

  if (!methodHandler) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: "Method not found",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  const response = await methodHandler(request.args);
  // console.log(response);
  return {
    statusCode: 200,
    body: JSON.stringify(response),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Headers":
        "Content-Type,X-Amz-Date,Authorization,X-Api-Key",
      "Access-Control-Allow-Methods": "POST, GET, PUT, DELETE",
      "Access-Control-Allow-Origin": "*",
    },
  };
}
