/**
 * Food 食物类
 * @row 食物在地图中的行数
 * @col 食物在地图中的列数
 * 描述：最终可以通过行和列确定食物的位置
 */
function Food(row,col,imgUrl){
    this.row = row;
    this.col = col;

    this.imgUrl = imgUrl;
}

// 重置食物坐标
Food.prototype.resetFood = function(row,col){
    this.row = row;
    this.col = col;
}