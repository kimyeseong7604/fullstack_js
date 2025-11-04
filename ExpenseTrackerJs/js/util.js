export function toShow(node) {
  node.className = node.className.replace("v-none", "v-show");
}

export function toHidden(node) {
  node.className = node.className.replace("v-show", "v-none");
}

export function validatePrice(currentFunds, currentAmount) {
  if (typeof currentFunds !== "number" || typeof currentAmount !== "number") {
    return false;
  }

  return currentAmount <= currentFunds;
}

export function validateRequired({ category, description, price }) {
  return (
    Boolean(category) && Boolean(description) && price !== undefined && price !== null
  );
}
