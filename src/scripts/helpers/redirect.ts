/**
 * @description setup DOM and load controller
 * @param path string
 * @param callback function
 */

export const isRedirect = (path: string, replace?: boolean) => {
  if (replace) {
    window.location.replace(path);
  }

  window.location.assign(path)
}
