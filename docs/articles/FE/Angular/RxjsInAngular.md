---
title: Rxjs实践
date: 2021-08-05 12:13
---



## 取消订阅

> 订阅被建立之后如果没有及时取消订阅，就会容易造成内存泄漏，变成Zombie Subscription

在 Angular 项目中，常用到的订阅以及是否需要调用 unsubscribe() 取消订阅，有以下几种：

- Angular 中通过 HttpClient 执行 Http Request 返回的 Observables，订阅这些 Observables 拿到 API 返回的数据，不需要调用 unsubscribe() 取消订阅。i
- Angular AsyncPipe，不需要调用 unsubscribe()取消订阅。
- 通过 Subject，BehaviorSubject，AsyncSubject，ReplaySubject 在各个 Component 之间通信，需要调用 unsubscribe()取消订阅。
- RxJS 自带的一些操作符：take，takeWhile，first 等等，不需要调用 unsubscribe()取消订阅。



### takeUntil

使用takeUntil可以控制什么时候需要订阅，加入stop$流判断，优化unsubscribe

```typescript
class MyGenericComponent extends SomeFrameworkComponent {

  onMount() {
    const data$ = this.getData();
    const cancelBtn = this.element.querySelector('.cancel-button');
    const rangeSelector = this.element.querySelector('.rangeSelector');
    const cancel$ = Observable.fromEvent(cancelBtn, 'click');
    const range$ = Observable.fromEvent(rangeSelector, 'change')
      .map(e => e.target.value);

    const stop$ = Observable.merge(cancel$, range$.filter(x => x > 500))
    this.subscription = data$.takeUntil(stop$).subscribe(data => this.updateData(data));
  }
    
   getData(data) {
       console.log('test', data)
   }
}
```



### 创建一个DestroyService

> via Twitter@Waterplea

创建一个DestroyService，其他地方需要设置取消订阅时只需注入该服务，加入takeUntil就好了

```typescript
// 实现
@Injectable()
export class DestroyService extends Observable<void> implements OnDestroy {
	private readonly life$ = new Subject<void>()
    
    constructor() {
		super(subscriber => this.life$.subscribe(subscriber))
    }
    
    ngOnDestroy() {
        this.life$.next()
        this.life$.complete()
    }
}
```

```typescript
// 使用
@Directive({
  selector: '[sticky]',
  providers: [DestroyService]
})
export class StickyDirective {

  constructor(
    @Inject(WINDOW) windowRef: Window,
      rd2: Renderer2,
      destroy$: DestroyService,
      { nativeElement }: ElementRef<HTMLElement>
  ) {
    fromEvent(windowRef, 'scroll')
      .pipe(
        map(() => windowRef.scrollY),
        pairwise(),
        map(([prev, next]) => next < THRESHOLD || prev > next),
        distinctUntilChanged(),
        // 使用destroy$判断是否进入OnDestroy了
        takeUntil(destroy$),
        startWith(true)
      )
      .subscribe(stuck => {
        rd2.setAttribute(nativeElement, 'data-stuck', JSON.stringify(stuck))
      })
  }

}
```



## 前后值一起处理

*pairwise* - 将当前值和上一个值放进一个数组里返回

