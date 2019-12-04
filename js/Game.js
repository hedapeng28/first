/**
 * Game游戏类：
 * @map 地图属性
 * @food 食物属性
 * @snake 蛇属性
 * @block 障碍物属性
 */
function Game(map,food,snake,block){
    this.map = map;
    this.food = food;
    this.snake = snake;
    this.block = block;

    // 声明定时器 一定要初始化方法前面 
    // this.timer = null;
    
    // 初始化方法
    this.init();
}

// 初始化方法
Game.prototype.init = function(){
    // 渲染地图
    this.renderMap();
    // 渲染食物
    this.renderFood();
    // 渲染障碍物
    this.renderBlock();
    // 渲染蛇
    this.renderSnake();
    // 游戏开始
    this.start();
    // 绑定事件
    this.bindEvent();
}

// 渲染地图
Game.prototype.renderMap = function(){
    this.map.fill();
}

// 渲染食物
Game.prototype.renderFood = function(){
    // 获取食物的位置  
    var row = this.food.row;
    var col = this.food.col;

    // 在地图上找到它 并渲染
    // this.map.wrap.children[row].children[col].style.backgroundColor = "orange";
    // this.map.arr[row][col].style.backgroundColor = "orange"
    this.map.arr[row][col].style.backgroundImage = "url(" + this.food.imgUrl + ")";
    this.map.arr[row][col].style.backgroundSize = "cover";
}

// 渲染蛇🐍
Game.prototype.renderSnake = function(){
    // 获取蛇头
    var snakeHead = this.snake.arr[this.snake.arr.length - 1];
    this.map.arr[snakeHead.row][snakeHead.col].style.backgroundImage = "url(" + this.snake.headPics[this.snake.headIdx] + ")";
    this.map.arr[snakeHead.row][snakeHead.col].style.backgroundSize = "cover";

    for(var i = 1; i < this.snake.arr.length - 1; i++){
        // 获取蛇的每一节身体的坐标
        var row = this.snake.arr[i].row;
        var col = this.snake.arr[i].col;
        
        // this.map.arr[row][col].style.backgroundColor = "green";
        this.map.arr[row][col].style.backgroundImage = "url(" + this.snake.bodyPics[0] + ")";
        this.map.arr[row][col].style.backgroundSize = "cover";
    }

    // 获取蛇尾
    var snakeTail = this.snake.arr[0];
    this.map.arr[snakeTail.row][snakeTail.col].style.backgroundImage = "url(" + this.snake.tailPics[this.snake.tailIdx] + ")";
    this.map.arr[snakeTail.row][snakeTail.col].style.backgroundSize = "cover";
}

// 游戏开始的方法
Game.prototype.start = function(){
    // 定义游戏开始的标记
    this.flag = true;

    // 备份this  定时器、事件函数 是普通函数需要备份this，如下；但是下面用的箭头函数，不需要备份也是可以的
    _this = this;
    this.timer = setInterval(function(){
        // 调用蛇的移动方法
        _this.snake.move();
        // 检测是否超出地图边界（撞墙）
        _this.checkMap();
        // 检测是否吃到自己
        _this.checkSnake();
        // 检测是否吃到食物
        _this.checkFood();
        // 检测是否撞到障碍物
        _this.checkBlock();
        
        if(_this.flag){
            // 清屏
            _this.map.clear();
            // 重新渲染蛇
            _this.renderSnake();
            //  渲染食物
            _this.renderFood();
            // 渲染障碍物
            _this.renderBlock();
        }
    }, 300);
}

// 游戏结束的方法
Game.prototype.gameover = function(){
    // 游戏结束
    this.flag = false;

    // 调用遮罩层  显示游戏结束文本

    // 清除计时器 游戏结束
    clearInterval(this.timer);
}

// 绑定事件
Game.prototype.bindEvent = function(){
    // 备份this
    var _this = this;
    document.onkeydown = function(e){
        // 获取兼容性的事件对象
        var ev = e || event;

        // 清除默认事件
        ev.preventDefault();

        // 获取键盘码
        var keycode = ev.keyCode;
        // console.log(keycode)

        // 调用蛇转向方法  上下左右箭头按键再拿
        if(keycode === 37 || keycode === 38 || keycode === 39 || keycode === 40){
            _this.snake.changeDirection(keycode);
        }
    }
}

// 检测边界
Game.prototype.checkMap = function(){
    // 获取蛇头
    var snakeHead = this.snake.arr[this.snake.arr.length - 1];

    // 判断是否超出地图边界
    if(snakeHead.row < 0 || snakeHead.col < 0 || snakeHead.row >= this.map.row || snakeHead.col >= this.map.col){
        console.log("超出边界...Game Over!!");
        // 游戏结束
        this.gameover();
    }
}

// 检测是否吃到自己
Game.prototype.checkSnake = function(){
     // 获取蛇头
     var snakeHead = this.snake.arr[this.snake.arr.length - 1];

     // 判断是否吃到自己 遍历蛇身体每一个部分 但是不包括蛇头
     for(var i = 0; i < this.snake.arr.length - 1; i++){
         if(this.snake.arr[i].row == snakeHead.row && this.snake.arr[i].col == snakeHead.col){
                console.log("吃到自己...Game Over!!");
                // 游戏结束
                this.gameover();
         }
     }
}

// 蛇吃食物的方法
Game.prototype.checkFood = function(){
    // 获取蛇头
    var snakeHead = this.snake.arr[this.snake.arr.length - 1];

    // 比较蛇头和食物
    if(snakeHead.row == this.food.row && snakeHead.col == this.food.col){
        console.log("吃到食物...");
        // 重置食物
        this.resetFood();
        // 蛇长身体
        this.snake.growUp();
    }
}

// 重置食物的方法
Game.prototype.resetFood = function(){
    // 获取地图中的随机单元格  
    var ranRow = parseInt(Math.random() * this.map.row);
    var ranCol = parseInt(Math.random() * this.map.col);

    // 判断食物 是否长到蛇身上 如果长到蛇身上，重新重置食物  遍历蛇全身
    for(var i = 0; i < this.snake.arr.length; i++){
        if(ranRow === this.snake.arr[i].row && ranCol === this.snake.arr[i].col){
            // 打印日志
            console.log("食物长到身上....")
            // 重新调用resetFood方法
            this.resetFood();
            // 结束当前函数
            return;
        }
    }

    // 判断食物 是否长到障碍物上 如果长到障碍物上，重新重置食物  遍历全部障碍物
    for(var i = 0; i < this.block.arr.length; i++){
        if(ranRow === this.block.arr[i].row && ranCol === this.block.arr[i].col){
            // 打印日志
            console.log("食物长到障碍物身上....")
            // 重新调用resetFood方法
            this.resetFood();
            // 结束当前函数
            return;
        }
    }

    // 调用食物自己的重置方法 传入新的坐标
    this.food.resetFood(ranRow,ranCol);
}

// 渲染障碍物
Game.prototype.renderBlock = function(){
    for(var i = 0; i < this.block.arr.length; i++){
        var row = this.block.arr[i].row;
        var col = this.block.arr[i].col;

        this.map.arr[row][col].style.backgroundImage = "url(" + this.block.picUrl + ")";
        this.map.arr[row][col].style.backgroundSize = "cover";
    }
}

// 检测蛇是否碰到障碍物
Game.prototype.checkBlock = function(){
    // 获取蛇头
    var snakeHead = this.snake.arr[this.snake.arr.length - 1];

    // 遍历障碍物
    for(var i = 0; i < this.block.arr.length; i++){
        if(snakeHead.row === this.block.arr[i].row && snakeHead.col === this.block.arr[i].col){
            // 撞到障碍物，游戏结束
            console.log("撞到障碍物....Game over!!!");
            // 游戏结束
            this.gameover();
        }
    }
}
