import { CancelError } from "../cancelError";

// factory
export function createCancelWrapper() {
  let cancelRequested = false;

  function cancel() {
    cancelRequested = true;
  }

  function cancelWrapper(func, ...args) {
    if (cancelRequested) {
      return Promise.reject(new CancelError());
    }
    return func(...args);
  }

  return { cancelWrapper, cancel };
}
