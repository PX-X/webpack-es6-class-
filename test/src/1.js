import {change,total,radioArr,list} from './3.js';
export default class Mt{

    constructor(title='',total=0,status=0,list=[]){
        // title ==> input change
        this.title=title;
        // 总数==>N个目标
        this.total=total;
        // 状态
        this.status=status;
        // 数据
        this.list=list;
    }
    
    // input输入框绑定事件
    change(){
        // console.log('按下事件');
        // console.log(this);
        // console.log(event.target.value);
        // event.target.value 
        // this ==>(标签) ==>mt
        if(event.keyCode==13){
            this.title=event.target.value;
            event.target.value='';
            // 0 全部
            // 1 完成
            // 2 未完成
            // 在this.list数组里放下面的数据和status状态
            this.list.push({
               el: `<p class="box">
                    <div index=${this.list.length} onclick="mt.upStatus()" 
                    style="width:20px;height:20px;display:inline-block;
                    background:black;" status="2"></div>
                    <p>${this.title}</p>
                    <b onclick='mt.delList()' index=${this.list.length}>X</b>
                </p>`,
                // 存放小黑块的状态
                status:2
            } );
            // 添加完数据之后 render
            this.render(this.list);
        }
    }
    // 刷新页面，相当于重新铺一下页面，删除和回车时需要刷新页面，改变页面的id
    // 如果不刷新，删除一条list，id不会变，条数是根据id写的，所以会不准确
    render(l){
        // 页面更新
        // list
        // list.innerHTML=this.list.join("");
        
        // 递归 ===>条件  什么时候结束 i>length
        // 相当于调用自身函数，循环执行这个函数
        // 当i>length时结束，返回str
        function listStr(i,arr,str){
            if(typeof arr[i]==="undefined"){
                return str;
            }else{
            // 把arr数组的el放进str
              str += arr[i].el;
              i++;
            //   返回函数，相当于重新执行函数，直到i>length
              return  listStr(i,arr,str);
            }
        }
        // 将listStr返回的字符串str赋给list.innerHtml
        list.innerHTML=listStr(0,l,'');

        // console.log(this.list.join(""));
        // for(let i=0,len=this.list.length;i<len;i++){
            
        // }
    }
    // 更新status状态
    upStatus(){
        // console.log('我被触发了');
        // console.log(this);
        // console.log(event.target);
        // 点击的块的status
      let s=  event.target.getAttribute('status');
    //   点击块的下标
      let index=  event.target.getAttribute('index');
    //   console.log()
    // 改变this.list数组的status状态
      this.list[Number(index)].status= s == 2?1:2;

      let status =s ==2 ? 1:2;

      event.target.style.backgroundColor=s ==1 ? 'black':'red';
    //   改变点击的status
      event.target.setAttribute('status',status);
    }
    
    // 删除按钮
     delList(){
         let index = event.target.getAttribute('index');
        //  console.log(index);
        // 让删除的那条数据为空
        this.list[Number(index)].el='';
        // 刷新页面，更新页面
        this.render(this.list);
        
    }
    
    // 单选按钮
    radioChange(){
        // 1、获取value
        let val=event.target.value;
        // 2、通过value过滤list    value ==> list
        // filter
        // 过滤list，筛选出和点击的value一样的出来
       let arr= this.list.filter(
           (value)=>{
               return val== 0 || val == value.status;
           }
       )
        console.log(arr);

        // list ===> render
        //    刷新页面
        this.render(arr);
    }

}

