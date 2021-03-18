console.log("now")
setTimeout(() => {
    console.log("liiu");
}, 1000);


test('test adding scores', function(){
    expect(testfns.testForAdd(4,5)).toBe(9);
});