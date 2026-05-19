function normalizePathPrefix(pathPrefix = "") {
  if (!pathPrefix || pathPrefix === "/") {
    return "";
  }

  let normalized = String(pathPrefix).trim();
  if (!normalized.startsWith("/")) {
    normalized = `/${normalized}`;
  }
  normalized = normalized.replace(/\/+$/, "");
  return normalized === "/" ? "" : normalized;
}

function toAbsoluteUrl(url) {
  if (!url) return "";
  let normalized = String(url).trim();
  if (!/^https?:\/\//i.test(normalized)) {
    normalized = `https://${normalized}`;
  }
  return normalized;
}

function getSiteInfo(env = process.env) {
  const configuredBaseUrl = env.SITE_BASE_URL ? toAbsoluteUrl(env.SITE_BASE_URL) : "";
  if (configuredBaseUrl) {
    const parsed = new URL(configuredBaseUrl);
    const pathPrefix = normalizePathPrefix(parsed.pathname);
    return {
      pathPrefix,
      siteBaseUrl: `${parsed.origin}${pathPrefix}`,
    };
  }

  const repository = env.GITHUB_REPOSITORY || "";
  const [owner, repo] = repository.split("/");
  if (owner && repo) {
    const isUserSite = repo.toLowerCase() === `${owner}.github.io`.toLowerCase();
    const pathPrefix = isUserSite ? "" : normalizePathPrefix(repo);
    return {
      pathPrefix,
      siteBaseUrl: `https://${owner}.github.io${pathPrefix}`,
    };
  }

  return {
    pathPrefix: "",
    siteBaseUrl: "",
  };
}

function withPathPrefix(url, pathPrefix = "") {
  if (!url) return url;
  if (/^(?:[a-z]+:)?\/\//i.test(url) || /^(?:mailto|tel|data|javascript):/i.test(url) || url.startsWith("#")) {
    return url;
  }

  const normalizedPrefix = normalizePathPrefix(pathPrefix);
  if (!url.startsWith("/")) {
    return url;
  }
  if (!normalizedPrefix) {
    return url;
  }
  if (url === normalizedPrefix || url.startsWith(`${normalizedPrefix}/`)) {
    return url;
  }
  return `${normalizedPrefix}${url}`;
}

function stripPathPrefix(url, pathPrefix = "") {
  if (!url) return url;
  const normalizedPrefix = normalizePathPrefix(pathPrefix);
  if (!normalizedPrefix) {
    return url;
  }
  if (url === normalizedPrefix) {
    return "/";
  }
  if (url.startsWith(`${normalizedPrefix}/`)) {
    return url.slice(normalizedPrefix.length);
  }
  return url;
}

module.exports = {
  getSiteInfo,
  normalizePathPrefix,
  stripPathPrefix,
  withPathPrefix,
};
