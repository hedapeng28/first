/**
 * Snake 蛇类
 */
function Snake(picObj){
    // 存储的是蛇初始的位置 row 和 col
    this.arr = [
        {row:5,col:2},
        {row:5,col:3},
        {row:5,col:4},
        {row:5,col:5},
        {row:5,col:6}
    ];
 
    // 方向属性  ← 37    ↑ 38   → 39  ↓ 40
    this.direction = 39;

    // 定义锁
    this.flag = true;

    // 定义蛇头
    this.headPics = picObj.headArr;
    // 定义蛇身
    this.bodyPics = picObj.bodyArr;
    // 定义蛇尾
    this.tailPics = picObj.tailArr;
    // 定义蛇头索引
    this.headIdx = 2;
    // 定义蛇尾索引
    this.tailIdx = 0;
}

// 声明蛇移动的方法
Snake.prototype.move = function(){
    // 获取蛇原来的头部，设置新的头部  不能直接获取引用对象，引用对象之间，一个改变，另外一个也会改变
    var newHead = {
        row:this.arr[this.arr.length - 1].row,
        col:this.arr[this.arr.length - 1].col
    }

    // 根据方向，改变蛇的移动，设置新的头部
    if(this.direction === 37){
        newHead.col--;
    }else if(this.direction === 38){
        newHead.row--;
    }else if(this.direction === 39){
        newHead.col++;
    }else if(this.direction === 40){
        newHead.row++;
    }

    // 将新的蛇头添加到数组中
    this.arr.push(newHead);

    // 删除蛇尾
    this.arr.shift();

    // 开锁
    this.flag = true;

    // 获取蛇尾 和 蛇尾前面的那一节身体
    var tail = this.arr[0];
    var tailPrev = this.arr[1];

    // 判断是否在同一行
    if(tail.row === tailPrev.row){
        // 判断蛇尾方向
        // if(tail.col > tailPrev.col){
        //     this.tailIdx = 2
        // }else{
        //     this.tailIdx = 0
        // }

        // 三目简化
        this.tailIdx = (tail.col > tailPrev.col) ? 2 : 0;
    }else{
        // if(tail.row > tailPrev.row){
        //     this.tailIdx = 3
        // }else{
        //     this.tailIdx = 1
        // }

        this.tailIdx = (tail.row > tailPrev.row) ? 3 : 1;
    }
}

// 蛇转向的方法
Snake.prototype.changeDirection = function(direction){
    // 判断锁
    if(!this.flag){
        return;
    }

    // 关闭锁
    this.flag = false;

    // 传过来的方向值 和 蛇正在移动的方向做比对
    var result = Math.abs(this.direction - direction);
    if(result === 0 || result === 2){
        return;
    }else{
        this.direction = direction;
    }

    // 判断蛇转向的方向 设置蛇头对应的索引
    if(this.direction === 37){
        this.headIdx = 0;
    }else if(this.direction === 38){
        this.headIdx = 1;
    }else if(this.direction === 39){
        this.headIdx = 2;
    }else if(this.direction === 40){
        this.headIdx = 3;
    }
}


// 定义蛇生长的方法
Snake.prototype.growUp = function(){
    // 获取蛇尾
    var tail = this.arr[0];

    // 添加到蛇尾 数组的起始
    this.arr.unshift(tail);
}