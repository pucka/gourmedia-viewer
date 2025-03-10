import type { NextApiRequest, NextApiResponse } from "next";
import { FoodData } from "../../../types/Menu";

const CACHE_TIME = 60 * 10;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<FoodData[]>
) {
  try {
    const response = await fetch(
      "https://eu1-easy-pug-35727.upstash.io/get/week_menu",
      {
        headers: {
          Authorization:
            "Bearer AouPASQgMzhhZGI1OWYtODAyZS00NTA2LWEwNzQtMjZiNWJkYjA5MzAxuVAD3CxKLXX580QQnED7hT9ed86kRv2KD1wlx1V3iBA=",
        },
      }
    );
    const data = await response.json();
    
    res.setHeader('Cache-Control', `s-maxage=${CACHE_TIME}`)
    res.status(200).json(JSON.parse(data.result));
  } catch (err: any) {
    console.log("err", err);
    res.status(500).send(err.message);
  }
}
