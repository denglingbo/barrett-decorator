## 埋点组件

### 初始化
```
  BarrettInit([{
    name: 'sensors',
    uid: cookie.get('uid'),
    config: {
      send_type: 'ajax',
      server_url: process.env.VUE_APP_SENSORS_API,
      heatmap_url: 'https://static.sensorsdata.cn/sdk/1.14.2/sensorsdata.min.js',
      use_client_time: true,
    }
  }]);

  // vue
  // meta 支持 字符串 or object，第三个参数对应 object 的 key
  router.afterEach((to, from) => {
    BarrettPageView(to.fullPath, to.meta, null, {
      $url_path: to.path,
    });
  });
```

### BarrettMaterialAutoReport
```
  <element>
    :bt-data="JSON.stringify({
      card_type: 'set_flow_banner',
      material_order: index,
      material_id: image.id,
      link: image.link,
      material_position: plate.id,
      ...,
    })"
  </element>
```

#### 使用方式一，用于某些回调执行的上报，例如 swipe
```
  @BarrettMaterialAutoReport([
    {
      targetSelector: '.home-xxxx',
      offset: {
        top: 46,
        bottom: 50,
      },
      params: {
        xxxx: 1
      }
    },
  ])
  private sendBarrettSwipe(data: any) {
    return data;
  }
```

#### 使用方式二，用于产品列表图之类的滚动到可视区域的上报功能，scrollSelector 必填
```
  @BarrettMaterialAutoReport([
    {
      scrollSelector: '.page-content_main',
      targetSelector: '.home-goods-item',
      offset: {
        top: 46,
        bottom: 50,
      }
    },
  ])
  private async mounted() {
    await this.onRefresh();
  }
```

```
  1. 注：params 的附加数据，会被合并到 上报数据中，用于一些固定参数，避免在 element 上写过多
  2. 方法一，仅仅进行简单的判定触发的时候是否在视区来判定上报
  3. 方法二，会判定视区的数据是否需要上报，上报规则见 util.ts -> isReportAndSetART
  4. 注意 当使用该方法在 mounted 的时候，请确保元素加载完毕，可以使用 async await
```

### BarrettPageView，通过路由进入的 pageview 埋点

```
  router.afterEach((to, from) => {
    ...
    BarrettPageView(to);
  });
```


### BarrettMaterialReport，主动上报
```
  @BarrettMaterialReport({ event: 'btn_download_safari' }, event, filterFunction)
  private onClick() {
    console.log('clicked');
  }

  // 仅在 xxx 情况下才进行上报
  @BarrettMaterialReport({ event: 'btn_download_safari' }, 'event_xxx', function() {
    return this.$route.query.from === 'xxx';
  })
  private onClick() {
    console.log('clicked');
  }

  // fn 返回不为 false 的时候进行上报
  @BarrettMaterialReport((event: any) => {
    // this, ...args
    try {
      return JSON.parse(event.target.getAttribute('bt-data'));
    } catch (ex) {
      return {};
    }
  })
  private fn() {
    return true;
  }

  // 同上，如果存在异步，使用 async / await
  @BarrettMaterialReport((event: any) => {
    return {};
  })
  private async fn() {
    const res = await xxx();
    return res.status === 1;
  }
```

## 重写 report 实例方法， middleware/BarrettSensors.ts, ...

```
  import BarrettSensors from 'barrett-decorator/lib/middleware/BarrettSensors';

  BarrettSensors.prototype.sendPageview = (data: any) => {
    console.log('sendPageview', data);
  };
  BarrettSensors.prototype.sendMaterial = (event: string, data: any) => {
    console.log('sendMaterial', event, data);
  };
```
