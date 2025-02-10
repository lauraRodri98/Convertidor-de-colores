"use strict";

let colorCian = '#00ddff';

let value_background_hex = document.getElementById('div--background--hex');
let value_background_rgb = document.getElementById('div--background--rgb');
let value_background_hsl = document.getElementById('div--background--hsl');

let mostrar_hex = document.getElementById('hex');
let mostrar_rgb = document.getElementById('rgb');
let mostrar_hsl = document.getElementById('hsl');

let input_hex = document.getElementById('input__hex');
let input_rgb = document.getElementById('input__rgb');
let input_hsl = document.getElementById('input__hsl');

actualizarColores(colorCian);

input_hex.addEventListener('input', function () {
    let value = this.value.trim();
    if (!/^#?[0-9A-Fa-f]{6}$/.test(value)) {
        actualizarColores(colorCian);
        return;
    }
    if (value[0] !== "#") value = "#" + value;
    actualizarColores(value);
});

// Escuchar cambios en RGB
input_rgb.addEventListener('input', function () {
    let value = this.value.trim();
    if (!/^rgb\(\d{1,3},\s*\d{1,3},\s*\d{1,3}\)$/.test(value)) {
        actualizarColores(colorCian);
        return;
    }
    let hex = rgbToHex(value);
    actualizarColores(hex);
});


input_hsl.addEventListener('input', function () {
    let value = this.value.trim();
    if (!/^hsl\(\d{1,3},\s*\d{1,3}%,\s*\d{1,3}%\)$/.test(value)) {
        actualizarColores(colorCian);
        return;
    }
    let hex = hslToHex(value);
    actualizarColores(hex);
});


function actualizarColores(hex) {
    let rgb = hexToRGB(hex);
    let hsl = hexToHSL(hex);

    value_background_hex.style.background = hex;
    value_background_rgb.style.background = hex;
    value_background_hsl.style.background = hex;

    mostrar_hex.innerHTML = hex;
    mostrar_rgb.innerHTML = rgb;
    mostrar_hsl.innerHTML = hsl;
}
function hexToRGB(hex) {
    hex = hex.replace(/^#/, '');
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);
    return `${r}, ${g}, ${b}`;
}

// Función para convertir HEX a HSL
function hexToHSL(hex) {
    hex = hex.replace(/^#/, '');
    let r = parseInt(hex.substring(0, 2), 16) / 255;
    let g = parseInt(hex.substring(2, 4), 16) / 255;
    let b = parseInt(hex.substring(4, 6), 16) / 255;

    let max = Math.max(r, g, b),
        min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h = Math.round(h * 60);
    }

    s = Math.round(s * 100);
    l = Math.round(l * 100);

    return `${h}, ${s}%, ${l}%`;
}

function rgbToHex(rgb) {
    let values = rgb.match(/\d+/g).map(Number);
    return `#${values.map(v => v.toString(16).padStart(2, '0')).join('')}`;
}

function hslToHex(hsl) {
    let values = hsl.match(/\d+/g).map(Number);
    let h = values[0] / 360;
    let s = values[1] / 100;
    let l = values[2] / 100;

    function hueToRGB(p, q, t) {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
    }

    let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    let p = 2 * l - q;
    let r = hueToRGB(p, q, h + 1 / 3);
    let g = hueToRGB(p, q, h);
    let b = hueToRGB(p, q, h - 1 / 3);

    return `#${[r, g, b].map(v => Math.round(v * 255).toString(16).padStart(2, '0')).join('')}`;
}


function copiarTexto(valor) {
    navigator.clipboard.writeText(valor)
        .then(() => alert("Copiado"))
        .catch(err => console.error("Error al copiar: ", err));
}

document.getElementById('div--background--rgb').addEventListener('click', () => {
    copiarTexto(input_rgb.value);
});

document.getElementById('div--background--hex').addEventListener('click', () => {
    copiarTexto(input_hex.value);
});

document.getElementById('div--background--hsl').addEventListener('click', () => {
    copiarTexto(input_hsl.value);
});