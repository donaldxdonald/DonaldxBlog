# Angular实践中的Tips

## 自定义组件设置双向绑定

> 只需要加个以“变量名Change”命名的output就好了

```typescript
// test-component.ts
@Component({
    selector: 'test-component',
})
export class TestComponent {
    @Input() inputData: number
    @Output() inputDataChange(): EventEmitter<number> = new EventEmitter<number>
}
```



```html
<!-- app-component.html -->
<test-component [(value)]="value"></test-component>
```



