const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const router = require("./routers/router");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const Sentry = require("@sentry/node");
const { ProfilingIntegration } = require("@sentry/profiling-node");

require("dotenv").config();

Sentry.init({
  dsn: "https://71fed0305ee05eb390534323dbda862f@o4506241576927232.ingest.sentry.io/4506242203779072",
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({ app }),
    new ProfilingIntegration(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0,
  // Set sampling rate for profiling - this is relative to tracesSampleRate
  profilesSampleRate: 1.0,
});
// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

app.use(morgan("combined")); // combined -> all error catch
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json({ strict: false }));
app.set("views", "./views");
app.set("view engine", "ejs");
app.use(router);

// The error handler must be registered before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

app.listen(port, () => console.log(`App is running at PORT ${port}`));
