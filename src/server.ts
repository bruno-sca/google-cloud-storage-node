import { app } from "./app";

const httpPort = process.env.HTTP_PORT || 3333;

app.listen(httpPort, () =>
  console.log(`Server is running! Listening on port ${httpPort}`)
);
