import { Client, Environment } from 'square/legacy';

export const squareClient = new Client({
  environment: process.env.SQUARE_ENVIRONMENT === 'production' ? Environment.Production : Environment.Sandbox,
  accessToken: process.env.SQUARE_ACCESS_TOKEN, // legacy requires 'accessToken'
});
