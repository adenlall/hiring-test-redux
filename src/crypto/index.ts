const cipher: { [key: string]: string } = {
    'a': 'z', 'b': 'y', 'c': 'x', 'd': 'w', 'e': 'v',
    'f': 'u', 'g': 't', 'h': 's', 'i': 'r', 'j': 'q',
    'k': 'p', 'l': 'o', 'm': 'n', 'n': 'm', 'o': 'l',
    'p': 'k', 'q': 'j', 'r': 'i', 's': 'h', 't': 'g',
    'u': 'f', 'v': 'e', 'w': 'd', 'x': 'c', 'y': 'b',
    'z': 'a'
};

export function hashString(input: string): string {
    return input.toLowerCase().split('').map(char => {
        return cipher[char] || char;
    }).join('');
}

export function decodeString(input: string): string {
    const decodeCipher: { [key: string]: string } = Object.fromEntries(
        Object.entries(cipher).map(([key, value]) => [value, key])
    );
    return input.toLowerCase().split('').map(char => {
        return decodeCipher[char] || char;
    }).join('');
}