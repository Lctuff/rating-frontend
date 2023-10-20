import * as Sentry from "@sentry/react";

function init() {
  Sentry.init({
    dsn: "https://fec3f93841b8f9b793222ebbb3f915a1@o4505948298412032.ingest.sentry.io/4505948301033472",
  });
}

function log(error) {
  Sentry.captureException(error);
}

export default {
  init,
  log,
};
