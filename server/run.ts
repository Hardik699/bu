import "dotenv/config";
import { createServer } from "./index";

const port = Number(process.env.SERVER_PORT || 3000);

async function start() {
  const app = createServer();
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Backend running on http://localhost:${port}`);
  });
}

start().catch((err) => {
  // eslint-disable-next-line no-console
  console.error("Failed to start backend:", err);
  process.exit(1);
});
