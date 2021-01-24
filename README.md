## Quick way to load all csv data in folder to a database  
Kindly note Linux is used and for windows you might have to do a small change so your path is comaptible ie in linux path is usually "./abc/dat" format while in windows its "C:\\abc\data".
#### First clone this dir and cd into it then   
  **install:**  
  
     npm install

 Provide sql.js  path of your data folder where all csv are pesent
 it will  create a sqlite database with all data which can be sorted by date in sqlite or any other dataframe loader run using npm start or node sql.js  

**This repo will suffice for basic usage but for Further processing it Requires some looking into sequelize and data-forge documentation** 
