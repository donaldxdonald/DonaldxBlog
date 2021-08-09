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



## 懒加载Libraries

### 通用做法

``` javascript
const colorThief = () => import('color-thief').then(p => p.default)
```



### 依赖注入

```typescript
// 定义InjectionToken
type LazyColorThief = ReturnType<typeof color-thief>
const COLORTHIEF = new InjectionToken<LazyColorThief>('Lazily loaded colorThief', { provideIn: 'root', factory: color-thief })

// 使用token
constructor(@Inject(COLORTHIEF) private colorThief: LazyColorThief) {
	this.colorThief.then(colorThief => {
        // use it
    })
}
```

