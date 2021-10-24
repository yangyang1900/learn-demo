资料来源 
https://www.imooc.com/learn/1152 《axios在vue中的使用》
https://github.com/web-gm/axios-learn
https://github.com/web-gm/axios_node_api

### 1.axios的各种方法

axios请求方法：
1. get
2. post 提交数据（表单提交+文件上传）
3. put 更新数据（所有数据推送到后端）
4. patch 更新数据（只将修改的数据推送到后端）
5. delete 删除数据 

axios.get()方法

```
axios.get('/data.json',{
  params:{
      id:12
  }
}).then((res)=>{
console.log(res)
})

axios({
  method:'get',
  url:'/data.json',
  params:{
      id:12
  }
}).then(res=>{
  console.log(res)
})

 axios.get(`/api/index.json?city=${this.city}`)
        .then()
```

axios.post()方法

```
//post请求的两种数据格式 1.form-data 表单提交（图片上传，文件上传）2.applicition/json
//1.appliciton/json格式数据： 
 let data ={
     id:12
 }
 axios.post('/post',data).then(res=>{
     console.log(res)
 })
 axios({
     method:'post',
     url:'/post',
     data:data
 }).then(res=>{
     console.log(res)
 })
 //2.form-data请求
 let formData = new FormData()
 for(let key in data){
     formData.append(key,data[key])
 }
 axios.post('/post',formData).then(res=>{
     console.log(res)
 })
```

axios的put patch delete方法
```
// put请求
 axios.put('/put',data).then(res=>{
     console.log(res)
 })

 // patch请求
 axios.patch('/patch',data).then(res=>{
     console.log(res)
 })
 
 // delete请求
 axios.delete('/delete',{
     params:{
         id:12
     }
 }).then(res=>{
     console.log(res)
 })

 axios.delete('/delete',{
     data:{
         id:12
     }
 }).then(res=>{
     console.log(res)
 })

 axios({
     method:'delete',
     url:'/delete',
     params:{},
     data:{}
 }).then(res=>{
     console.log(res)
 })
```

#### 同时携带params和data

```
const data = {
    name: 'qq',
}
const params = {
    id: 'value'
}
axios.put('api/detail.json', data, { params })
```

#### axios并发请求

```
//并发请求：同时处理多个请求并统一处理返回值
//axios.all()    参数数据
//axios.spread()  分割不同请求的返回值

axios.all(
    [
        axios.get('/data.json'),
        axios.get('/city.json')
    ]
).then(
    axios.spread((dataRes,cityRes)=>{
        console.log(dataRes,cityRes)
    })
)
```

### 2.axios实例

创建axios实例

使用场景：当接口地址多个时候（端口号之前的域名可能是多个时候），并且超时时长不一样时。

此时就可以通过axios实例，在axios实例中设置这两种参数，然后通过实例去请求接口。

```
let instance = axios.create({
    baseURL:'http://localhost:8080',
    timeout:1000
})

let axios2 = axios.create({
    baseURL:'http://localhost:9090',
    timeout: 5000
})

instance.get('/data.json').then(res=>{
  console.log(res)
})
```

### 3.axios基本配置参数

1. baseURL 请求域名，或者是基本地址（默认配置http://localhost:8080，就像通过axios的get('/data.json'）访问时，前面添加了默认的域名。
2. timeout 超时时长，默认1000毫秒（超时时长作用：一般它由后端定义，例如：请求一个接口，接口的数据量比较大，需要处理时间比较长，如果超过了这个时间，后端就会返回401，这样做的好处是，一旦请求时间较长，使这个请求不会阻塞后端的内容，减少服务器的压力，它就会及时释放超时的这些内容，超时时长不止后端需要设置，前端也需要设置一下，当超时时，请求就取消了）。
3. url 请求路径
4. method 请求方法
5. headers 请求头，可以在请求头里添加一些参数（比如登录时可能需要从请求头里获取token，去鉴权获取登录人信息，此时就需要在这里配置）。
6. params 请求参数拼接在url中
7. data 请求参数放置在请求体中

#### axios定义配置参数的位置

1. axios全局配置
   
   ```
    //相当于在import的axios的vue页面中对所有创建的axios进行全局配置
    axios.defaults：表示指向axios库的默认配置，defaults后面就可以.出来配置参数。
    axios.defaults.timeout=2000,此时就表示全局配置。
    axios.defaults.baseURL='http://localhost:8080'。
   ```

2. axios实例配置（相当于局部的）

    ```
    let instance=axios.create()，如果不传配置参数，如果定义了全局，就是用全局，否则使用默认的。
    instance.defaults.timeout=3000，这种方式是创建完实例之后去设置参数。

    let instance = axios.create({
        baseURL: 'http:localhost:9091',
        timeout: 3000
    })
    ```

3. axios请求配置（发送请求时）

    ```
    instance.get('/data.json',{
        timeout:5000
    }）
    ```

### 4.axios拦截器

请求拦截器使用场景：在请求被处理前拦截，做一些操作（例如：登录状态，通常登录成功后，后端会返回一个token，这个token会存储一些信息，这样前端每次发请求时带token才可以访问一些资源）。

请求拦截器使用方法（use方法有两个参数，第一个是请求前的回调函数，请求配置，也就是在发送请求前做一些操作。第二个是请求错误的回调函数）

响应拦截器使用场景：在响应被处理前拦截，做一些操作。

响应拦截器使用方法：（use方法有两个参数，第一个是请求前的回调函数，请求配置，也就是在发送请求前做一些操作。第二个是请求错误的回调函数）

请求拦截器：
```
axios.interceptors.request.use(config => {
    //在发送请求前做些什么
    return config
}, err => {
    //在请求错误的时候做些什么
    return Promise.reject(err)
})
```

响应拦截器：
```
axios.interceptors.use(res => {
    //请求成功对相应数据做处理
    return res
}, err => {
    //响应错误做些什么
    return Promise.reject(err)
})
```

一般使用拦截器时，都是声明一个变量，给实例添加拦截器，给实例添加属性，一般不会给axios添加内容，避免造成全局污染。
```
let instance = axios.create({})
instance.interceptors.request.use(config => {
    config.headers.token = ''
    return config
})
```

axios.get().then(res=>{})中的then相当于发送请求成功后的回调函数，而axios.get().catch(err=>{})相当于请求成功，对响应失败的处理，也就是reject的err会触发catch方法。
```
axios.get()
    .then((res) => {

    })
    .catch((error) => {

    })
```

请求错误和响应错误区别：请求错误表示请求没有到达后端，浏览器会报一些错误，比如请求接口没有，就会报404。例如：从数据库查询某一条记录，但是没有，后台返回一个状态码和错误信息，此时就是响应错误（请求到达后端，返回错误称为响应错误。没到达后端，成为请求错误）。

**扩展**
当在请求拦截器中，对headers的属性进行赋值时，通常使用config.headers.token='',而不是config.headers={token:‘’},因为第二种方式会把headers里的其他属性覆盖掉。
```
let instance = axios.create({})
instance.interceptors.request.use(config => {
    config.headers.token = ''
})
```

不同axios实例访问不同接口，不同axios实例有不同拦截器，从而实现有需要拦截，有不需要拦截的。
```
//需要拦截器
let instance = axios.create({})
instance.interceptors.request.use(config => {
    config.headers.token = ''
    return config
})

//不需要拦截器
let newInstance = axios.create({})
```

```
<template>
  <div class="home">
  </div>
</template>

<script>
// 错误处理：请求错误时进行的处理
import axios from 'axios'
export default {
  name: 'axios3-4',
  created() {
    axios.interceptors.request.use(config=>{
        return config
    },err=>{
        return Promise.reject(err)
    })
    axios.interceptors.response.use(res=>{
        return res
    },err=>{
        return Promise.reject(err)
    })
    axios.get('/data.json').then((res)=>{
      console.log(res)
    }).catch(err=>{
        console.log(err)
    })
    // 例子：实际开发过程中，一般添加统一错误处理
    let instance = axios.create({})
    instance.interceptors.request(config=>{
        return config
    },err=>{
        // 请求错误 一般http状态码以4开头，常见：401超时，404 not found
        $('#modal').show()
        setTimeout(()=>{
            $('#modal').hide()
        },2000)
        return Promise.reject(err)
    })
    instance.interceptors.response.use(res=>{
        return res
    },err=>{
        // 响应错误处理 一般http状态码以5开头，500 系统错误，502, 系统重启
        $('#modal').show()
        setTimeout(()=>{
            $('#modal').hide()
        },2000)
        return Promise.reject(err)
    })
    instance.get('/data.json').then(res=>{
        console.log(res)
    }).catch(err=>{
        console.log(err)
    })
  },
}
</script>
```

### 5.axios错误处理


### 6.axios取消请求

