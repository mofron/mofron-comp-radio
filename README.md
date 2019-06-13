# mofron-comp-radio
[mofron](https://mofron.github.io/mofron/) is module based frontend framework.

radio button component for [mofron](https://mofron.github.io/mofron/).

## feature
text size is automatically changed when the height is changed.

# Install

```:bash
npm install mofron mofron-comp-radio
```

# Sample
```html
<require>
    <tag module="mofron-comp-radio">Radio</tag>
</require>
<script run=init>
let chg_evt = (p1,p2,p3) => { console.log(p2); }
</script>

<Radio changeEvent=chg_evt>radio</Radio>
```
# Parameter

| Simple<br>Param | Parameter Name     | Type                               |    Description                         |
|:---------------:|:-------------------|:-----------------------------------|:---------------------------------------|
|                 | value              | boolean                            | the function same as 'check'           |
|                 | select             | boolean                            | true: select                           |
|                 |                    |                                    | false: unselect (default)              |
|        ◯        | text               | string/mofron-comp-text            | text contents                          |
|                 | size               | string (size)                      | radio button size (both height and width) |
