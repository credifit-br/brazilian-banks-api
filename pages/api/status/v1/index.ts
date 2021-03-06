import app from "../../../_app";

import type { NextApiRequest, NextApiResponse } from "next";

export default function Status(
  request: NextApiRequest,
  response: NextApiResponse
) {
  response.status(200);
  response.json({
    status: "ok",
    date: new Date(),
    environment: process.env.NODE_ENV,
    aws: {
      region: process.env.AWS_REGION || "local",
      function_version: process.env.AWS_LAMBDA_FUNCTION_VERSION || "local",
    },
  });
}
