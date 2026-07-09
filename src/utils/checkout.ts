const POST_LOGIN_REDIRECT_KEY = "nexora_post_login_redirect";

export function setPostLoginRedirect(path: string) {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(POST_LOGIN_REDIRECT_KEY, path);
  }
}

export function getPostLoginRedirect(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(POST_LOGIN_REDIRECT_KEY);
}

export function clearPostLoginRedirect() {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(POST_LOGIN_REDIRECT_KEY);
  }
}

export function consumePostLoginRedirect(fallback = "/"): string {
  const redirect = getPostLoginRedirect() ?? fallback;
  clearPostLoginRedirect();
  return redirect;
}
