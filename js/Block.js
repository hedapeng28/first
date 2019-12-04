/**
 *  Block 障碍物类
 */
function Block(picUrl){
    this.arr = [
        {row:8,col:3},
        {row:9,col:3},
        {row:10,col:3},
        {row:11,col:3},
        {row:3,col:9},
        {row:3,col:10},
        {row:3,col:11},
        {row:4,col:11},
        {row:5,col:11},
        {row:6,col:11},
        {row:3,col:12},
        {row:12,col:12},
        {row:13,col:12},
    ];

    // 图片路径属性
    this.picUrl = picUrl;
}