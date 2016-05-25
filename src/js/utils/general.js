export function createReactKey() {
    return Math.random().toString(16).substr(2, 9);
}

export function removeSelected(selected, src) {
    return selected.filter(selectedSrc => selectedSrc !== src);
}

export function containsSelected(selected, src) {
    return ~selected.indexOf(src);
}