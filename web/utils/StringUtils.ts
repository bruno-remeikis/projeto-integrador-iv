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

export function formatGrade(grade: number | string): string {
    try {
        grade = Number(grade);

        let value: string = !Number.isInteger(grade)
            ? grade.toFixed(2)
            : grade.toString();

        return value + '%';
    }
    catch (err) {
        return 'Erro';
    }
}