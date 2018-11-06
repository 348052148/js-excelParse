<template>
    <div>
        <h2>{{name}}</h2>
        <input type="file" @change="uploadExcel" id="excel-file">


        <!-- Table -->
        <el-button type="text" @click="dialogTableVisible = true">添加规则</el-button>

        <el-dialog title="规则信息" :visible.sync="dialogTableVisible">
        </el-dialog>
        <h3>Excel数据</h3>
        <el-table :data="gridData" size="mini">
            <el-table-column v-for="title in tableTitle" :property="title" :label="title" ></el-table-column>
        </el-table>
    </div>
</template>

<style>

</style>

<script>
import XLSX from 'xlsx'
import ExcelParse from '../libs/ExcelParse.js'
export default {
    name: 'app',
    data(){
        return {
            name: '上传excel',
            dialogTableVisible: false,
            gridData:[],
            tableTitle:[]
        };
    },
    methods: {
        uploadExcel(e){
            var files = e.target.files;

            var fileReader = new FileReader();
            fileReader.onload = (ev) => {
               
                let data = ev.target.result;
                let excelParse = new ExcelParse(data,{
                    sheet: 'Sheet1',
                    title: [
                        {name:'科目代码',type: 'String'},
                        {name:'科目名称',type: 'String'},
                        {name:'币种',type: 'String'},
                        {name:'市值-本币',type: 'Number'},
                    ]
                });
                excelParse.run();
                this.tableTitle = excelParse.getTitleRow();
                this.gridData = excelParse.getRowData();
            };

            // 以二进制方式打开文件
            fileReader.readAsBinaryString(files[0]);
        },
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
    }
}
</script>

