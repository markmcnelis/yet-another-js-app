export default function randutil(min, max) {
    return Math.ceil(Math.random() * (max - min) + min);
}