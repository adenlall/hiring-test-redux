const cipher = {
    'a': 'z', 'b': '*', 'c': '#', 'd': 'w', 'e': 'v',
    'f': '&', 'g': 't', 'h': 's', 'i': 'r', 'j': 'q',
    'k': 'p', 'l': '_', 'm': 'n', 'n': 'm', 'o': 'l',
    'p': '+', 'q': '-', 'r': 'i', 's': 'h', 't': 'g',
    'u': '0', 'v': 'x', 'w': 'd', 'x': 'c', 'y': 'b',
    'z': '3'
};

export function hashString(name) {
    return name.toLowerCase().split('').map(char => {
        return cipher[char] || char;
    }).join('');
}

export function decodeString(name) {
    const decodeCipher = Object.fromEntries(
        Object.entries(cipher).map(([key, value]) => [value, key])
    );
    return name.toLowerCase().split('').map(char => {
        return decodeCipher[char] || char;
    }).join('');
}