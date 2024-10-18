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

export function formatGrade(grade?: number | string) {
    try {
        let value: number | string = Math.round(Number(grade) * 100);

        if (!Number.isInteger(value)) {
            value = value.toFixed(2);
        }

        return value + '%';
    }
    catch (err) {
        return 'Erro';
    }
}