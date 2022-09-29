function randomN() {
    // return (Math.random() * 100000000000000000)
    var result = '';
    var words = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
    var max_position = words.length - 1;
    for (let i = 0; i < 7; ++i) {
        let position = Math.floor(Math.random() * max_position);
        result = result + words.substring(position, position + 1);
    }
    return result;

}


function str_randLen(long) {
    var result = '';
    // var words = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
    var words = '0123456789QWERTYUIOPASDFGHJKLZXCVBNM';
    var max_position = words.length - 1;
    for (let i = 0; i < long; ++i) {
        let position = Math.floor(Math.random() * max_position);
        result = result + words.substring(position, position + 1);
    }
    return result;
}



export { randomN, str_randLen }