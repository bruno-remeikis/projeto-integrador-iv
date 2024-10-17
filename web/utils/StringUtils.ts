export function join(value: string | string[]) {
    if (typeof value === 'string')
        return value;
    return value.join(', ')
}

export function joinOrEmpty(value: string | string[] | null | undefined) {
    if (!value)
        return '';
    return join(value);
}