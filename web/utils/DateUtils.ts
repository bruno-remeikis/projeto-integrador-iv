'use client';

export const dateTimeFormatter = new Intl.DateTimeFormat(
    'pt', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    });