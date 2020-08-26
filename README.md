# mofron-comp-radio
[mofron](https://mofron.github.io/mofron/) is module based frontend framework.

radio button component for mofron

## Feature
 - text size is automatically changed when the height is changed.

# Install
```
npm install mofron mofron-comp-radio
```

# Sample
```html
<setting>
    <tag load="mofron-comp-radio">Radio</tag>
</setting>

<script run=init>
let chg_evt = (p1,p2,p3) => { console.log(p2); }
</script>

<Radio size=0.5rem changeEvent=@chg_evt>radio button</Radio>
```

# Parameter

| Short<br>Form | Parameter Name | Type | Description |
|:-------------:|:---------------|:-----|:------------|
| ◯  | text | mixed | string: radio text contents |
| | | | mofron-comp-text: radio text contents |
| | | | undefined: call as getter |
| | select | boolean | true: select |
| | | | false: unselect |
| | | | undefined: call as getter |
| | value | boolean | same as 'select' |
| | clear | ||| | size | string(size) | radio button size (both height and width) |
| | | | undefined: call as getter |
| | height | string(size) | radio button height |
| | | | undefined: call as getter |

