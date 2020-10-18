const nearestValue = (arr, num) => {
    let value = arr[0];
    let nearest = Math.abs(num - arr[0]);

    arr.forEach(item => {
        const dif = Math.abs(num - item);

        if (nearest >= dif) {
            value = item
            nearest = dif
        }
    })

    return value;
}

console.log(nearestValue([4, 7, 10, 11, 12, 17], 8));

