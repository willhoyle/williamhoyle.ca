---
---
## Css: Adjacent sibling selectors

[https://developer.mozilla.org/en-US/docs/Web/CSS/Adjacent_sibling_combinator](https://developer.mozilla.org/en-US/docs/Web/CSS/Adjacent_sibling_combinator)

I ran into this css selector when adding styles to my markdown content.

If I have content that looks like this:


```md
some long sentence
- list item 1
- list item 2
- list item 
```

It creates the following html:

```html
<p>some long sentence</p>
<ol>
    <li>list item 1</li>
    <li>list item 2</li>
    <li>list item 3</li>
</ol>
```

### Problem
The `<p>` element has `margin-bottom: 16px` applied to it. 

- I want to keep that margin for spacing between paragraphs
- I want a smaller margin between `<p>` and `<ol>`, and other elements like `<pre>` and `<code>`

### Solution
**Adjacent Sibling combinator**!

```css
/* Change to this */
p {
    margin-bottom: 8px;
}


/* 
Add this
former_element + target_element { style properties } */
p + p {
    margin-top: 16px;
}
```

