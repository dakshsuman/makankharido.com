export function formatPrice(price: number, type: string): string {
    if (type === 'rent' || type === 'lease') {
        if (price >= 100000) {
            return `₹${(price / 100000).toFixed(2)}L/mo`;
        }
        return `₹${price.toLocaleString('en-IN')}/mo`;
    }
    if (price >= 10000000) {
        return `₹${(price / 10000000).toFixed(2)} Cr`;
    }
    if (price >= 100000) {
        return `₹${(price / 100000).toFixed(2)} Lakh`;
    }
    return `₹${price.toLocaleString('en-IN')}`;
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
    return classes.filter(Boolean).join(' ');
}

export function truncate(str: string, length: number): string {
    if (str.length <= length) return str;
    return str.slice(0, length) + '...';
}

export function getPropertyTypeIcon(type: string): string {
    const icons: Record<string, string> = {
        Apartment: '🏢',
        Villa: '🏡',
        House: '🏠',
        Plot: '📐',
        Office: '🏬',
        Penthouse: '🌇',
    };
    return icons[type] || '🏠';
}
