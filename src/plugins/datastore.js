// import Vue from 'vue';
import Datastore from 'nedb-promises';
import { app } from 'electron';
import path from 'path';

const dbpath = path.join(app.getPath('userData'), '/data.db');
console.log('basePath22 :>> ', dbpath);

// https://www.w3cschool.cn/nedbintro/nedbintro-t9z327mh.html
// https://github.com/bajankristof/nedb-promises
const db = new Datastore({
  autoload: true, // 当数据存储被创建时，是否将数据自动从文件中加载到内存
  timestampData: true, // 自动生成时间戳
  filename: dbpath, // 数据存储文件路径
});
// const globalAny: any = global;
// globalAny.collectionsDb = db;

// db.insert({ doc: '阿斯蒂芬3434' })
//   .then((res) => {
//     console.log('res :>> ', res);
//   });
// db.find({ doc: '阿斯蒂芬3434' })
//   .exec()
//   .then((res) => {
//     console.log('resse3 :>> ', res);
//   });

// const path = `${process.cwd()}/path/to/db222.db`;
// console.log('process.cwd() :>> ', path);
// // const datastore = Datastore.create('/path/to/db.db');
// const datastore = Datastore.create(path);
// // datastore.insert({ doc: 'yourdoc' })
// //   .then((res) => {
// //     console.log('res :>> ', res);
// //   });

// datastore.find({ doc: 'yourdoc' })
//   .exec()
//   .then((res) => {
//     console.log('resse3 :>> ', res);
//   });
// Vue.prototype.$db = db;
