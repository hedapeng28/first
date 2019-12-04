/**
 * Map地图类
 * @row 行属性，设置的地图的行数
 * @col 列属性，设置的地图的列数
 */
function Map(row,col){
    this.row = row;
    this.col = col;

    // 创建容器属性
    this.wrap = document.createElement("div");
    // 创建一个二维数组属性  存储的是创建的行和列
    this.arr = [];
}

// 渲染地图的方法
Map.prototype.fill = function () {
    for(var i = 0; i < this.row; i++){//外层循环控制行 根据传递的参数决定
        // 创建行
        var row = document.createElement("div");
        // 存储行
        this.arr[i] = row;
        this.arr[i] = [];
        // 给行添加类名
        row.className = "row";
        for(var j = 0; j < this.col; j++){//内层循环控制列 根据传递的参数决定
            // 创建单元格
            var grid = document.createElement("span");
            // 存储单元格
            this.arr[i][j] = grid;
            // 给单元格设置类名
            grid.className = "grid";
            // 将单元格追加到行中
            row.appendChild(grid);
        }
        // 将行追加到容器上
        this.wrap.appendChild(row);
    }
    // 给容器添加类名 通过类名控制样式
    this.wrap.className = "wrap";

    // 将容器添加到页面
    document.body.appendChild(this.wrap);
}

// 清屏方法
Map.prototype.clear = function(){
    // 遍历二维数组 [[1,2],[2,3],[1,3]]
    for(var i = 0; i < this.arr.length; i++){//先遍历外层数组
        for(var j = 0; j < this.arr[i].length; j++){
            // this.arr[i][j].style.backgroundColor = "";
            this.arr[i][j].style.backgroundImage = "";
        }
    }
}