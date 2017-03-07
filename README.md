# mofron-comp-radio
Radio Button Component for [mofron](https://github.com/simpart/mofron).

# Sample
```javascript
require('mofron');
let Radio = require('mofron-comp-radio');

var chk = new Radio({
    param       : ['test 1', 'test 2', 'test 3'],
    selectEvent : function (idx) {                 // select event function
                      alert("chenged to " + idx);
                  },
    visible     : true
});

chk.select(1);   // set selected radio
chk.select();    // get selected radio
```
