import XLSX from 'xlsx'
class ExcelParse {

    constructor(data,config){

        this.config = config;

        try {
            
            this.workbook = XLSX.read(data, {
                type: 'binary'
            }); // 以二进制流方式读取得到整份excel表格对象

            let sheet = this.config.sheet;

            if(!this.workbook.Sheets.hasOwnProperty(sheet)){
                console.log('没有改sheet');
                return;
            }

            this.data = this.sheet2arr(this.workbook.Sheets[sheet]);
            
            this.rowData = [];
                
        } catch (e) {
            console.log(e);
            return;
        }
    }
    //讲sheet数据转化为数组
    sheet2arr(sheet){
        var result = [];
        var row;
        var rowNum;
        var colNum;
        var range = XLSX.utils.decode_range(sheet['!ref']);
        console.log(range);
        for(rowNum = range.s.r; rowNum <= range.e.r; rowNum++){
            row = [];
            for(colNum=range.s.c; colNum<=range.e.c; colNum++){
                var nextCell = sheet[
                    XLSX.utils.encode_cell({r: rowNum, c: colNum})
                    ];
                if( typeof nextCell === 'undefined' ){
                    row.push(void 0);
                } else row.push(nextCell.w);
            }
            result.push(row);
        }
        return result;
    }

    isTitle(row){
        let isTile = true;
        this.config.title.forEach(element => {
            if(row.indexOf(element.name) == -1){
                isTile = false;
            }
        });
        return isTile;
    }

    run(){
        for (const key in this.data) {
            if (this.data.hasOwnProperty(key)) {
                //如果是标题
                console.log(this.data[key]);
                if(this.isTitle(this.data[key])){
                    this.titleRow = this.data[key];
                    continue;
                }

                if(this.titleRow) {
                    let tmpData = [];
                    for (const i in this.titleRow) {
                        if (this.titleRow.hasOwnProperty(i)) {
                            const element = this.data[key][i];
                            const keyname = this.titleRow[i];
                            tmpData[keyname] = element;
                        }
                    }
                    this.rowData.push(tmpData);
                }

            }
        }

    }

    filterRowData(data){
        return data.filter((v,i)=>{
            let bool = true;
             this.config.title.forEach((t)=>{
                 //console.log(v[t.name]);
                if(v[t.name] == undefined){
                    bool = false;
                }
             });
             return bool;
        });
    }

    getTitleRow(){
        return this.titleRow;
    }

    getRowData(){
        let d =  this.filterRowData(this.rowData);
        return d;
    }

}

export default ExcelParse;