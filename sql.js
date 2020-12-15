const { Sequelize,DataTypes } = require('sequelize');
const sqlite = require('sqlite3');
const dataForge = require('data-forge');
require('data-forge-fs'); 
const path = require("path")
const fs = require("fs")
//this is quick and dirty way to add all stock data to single database for further use 
//Look into data-forge in github for more info on data wrangling
//You can use any database like mysql,postgrees but you will need to read documentation at sequelize github 
const db = new sqlite.Database('database.sqlite');//only required to create file comment it after that
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',logging: false

});
const directoryPath ="YOUR data folder path"
//create a table named  stock
const Stock = sequelize.define('Stock', {
  // Model attributes are defined here I need close only feel free to add OHLV
  symbol: {
    type: DataTypes.STRING,
    allowNull: false
  },
  close: {
    type: DataTypes.FLOAT,
    
  },
    timestamp: {
    type: DataTypes.DATE,
  
  }
}, {  sequelize, // We need to pass the connection instance
  tableName: 'Stock',
   timestamps: false
  
});


(async () => {
    
    await Stock.sync();
    console.log(Stock === sequelize.models.Stock);

   fs.readdir(directoryPath,async function(err, files) {
  if (err) {
    console.log("Error getting directory information.")
  } else {let fo=0,left=0;
        for  (const file of files) {
            left=files.length-++fo
            console.log( "Files to load - "+left)

            //This is where you may want to add field as read in csv to add OHLV and dont forget to add it into sequelize stock model
             let f= await dataForge.readFileSync(directoryPath+file)
    .parseCSV().where(row => row.SERIES=="EQ" ).subset(['SYMBOL','CLOSE','TIMESTAMP']).parseFloats(["CLOSE"])
    
    .parseDates(["TIMESTAMP"]).renameSeries({"SYMBOL": "symbol","CLOSE": "close","TIMESTAMP":"timestamp"}).toArray();

//This is where dataframe gets added to sqlite
         const bulkADD = await Stock.bulkCreate(f)//, { validate: true }
    .catch(function(err) {
        console.log( err)
    });
    
  }
     
  }
})

})();
