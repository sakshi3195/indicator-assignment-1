var fs = require('fs');
var readline = require('readline');
var stream = require('stream');
var heading=true;
var instream = fs.createReadStream('../Indicators.csv');
var outstream = new stream;
var rl = readline.createInterface(instream, outstream);
var head;
var count=0;
var sum=0;
var sumavg=0;
var count2=0;
var sum2=0;
var sumavg2=0;
var life={};
var result=[];
var obj1=[];
var count1=[];
var c=0;
var BirthRate;
for(var i=0;i<54;i++){
  count1[i]=0;
}
/*life.name1="LifeExpectancyOfMale";
life.value1=[];
life.name2="LifeExpectancyOfFemale"
life.value2=[];*/
var result2=[];
result2.name1="DeathRate";
result2.value1=[];
result2.name2="BirthRate";
result2.value2=[];
   var obj1 = [] ;
rl.on('line', function(line) {
 if(heading){
head=line.split( /,(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/ );
heading=false;
 }
 
 
 var countries = ["AFG","ARM","AZE","BHR","BGD","BTN","BRN","KHM","CHN",
           "CXR","CCK","IOT","GEO","HKG","IND","IDN","IRN","IRQ",
            "ISR","JPN","JQR","KAZ","KWT","KGZ","LAO","LBN",
             "MAC","MYS","MDV","MNG","MMR","NPL","PRK","OMN","PAK",
              "PSE","PHL","QAT","SAU","SGP","KOR","LKA","SYR","TWN",
               "TJK","THA","TUR","TKM","ARE","UZB","VNM","YEM"] ;
 for(var i=0,len=countries.length ; i<len; i++){
 if(line.indexOf(countries[i])>-1) {
if((line.indexOf("SP.DYN.LE00.MA.IN")>-1)||(line.indexOf("SP.DYN.LE00.FE.IN")>-1)) {
    var obj = {} ;
    var currentline=line.split( /,(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/ );
      for(var j=0;j<head.length;j++){
   if(head[j]=="Year"||head[j]=="Value"){
    if(head[j]=="Year"){
      year=currentline[j];
    
    }
    
    if(head[j]=="Value"){
      if(line.indexOf("SP.DYN.LE00.MA.IN")>-1){
      count++;
      val=parseFloat(currentline[j]);
      sum=sum+val;
      
    }else{
      count2++;
      val=parseFloat(currentline[j]);
      sum2=sum2+val;
    }
      if(count==52){
        sumavg=sum/52;
        sumavg2=sum2/52;
        obj.Year=year;
        obj.Male = sumavg;
        obj.FeMale= sumavg2;

         count=0;
         sum=0;
         sum2=0;
          result.push(obj);
                 
  
         
      }
    }
  
     
  
    }
    }
  }
 
    }
    
}
      if((line.indexOf("IND")>-1)&&((line.indexOf("SP.DYN.CDRT.IN")>-1)||(line.indexOf("SP.DYN.CBRT.IN")>-1))) {
 
                            var obj = {} ;
                            var currentline=line.split(/,(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/);
                             for(var j=0;j<head.length;j++){
                              if(head[j]=="Year"){
                                var Year=currentline[j];
                              }
                                if(head[j]=="Value"){
                                 
                                if(line.indexOf("SP.DYN.CDRT.IN")>-1)
                                {
                                 c++;
                                 var DeathRate = currentline[j];
                                 }
                                 
                                 else{ c++;
                                   BirthRate = currentline[j];
                                  
                                 }
                                 }
                                  if(c==2){
                                obj.Year=+Year;
                                obj.DeathRate= +DeathRate;
                                obj.BirthRate= +BirthRate;
                              
                                result2.push(obj);
                                c=0;
                               } 
                               }
                              
                              
                             
     }
      
    
});
rl.on('close', function() {
 
 
 var p1=JSON.stringify(result);
 p1=p1.replace("[","[\n\t");
 p1= p1.replace(/},/g,"},\n\t");
 p1= p1.replace(/\\"/g,"");
 p1=p1.replace(/,/g,",\n\t");
 //consconsole.log(p1);
 fs.writeFile("text1.JSON",p1,function(err) {
if(err){
    throw err;
}

});
 var p2=JSON.stringify(result2);
 p2=p2.replace("[","[\n\t");
 p2= p2.replace(/},/g,"},\n\t");
 p2= p2.replace(/\\"/g,"");
 p2=p2.replace(/,/g,",\n\t");
 
 
 fs.writeFile("text2.JSON",p2,function(err) {
if(err){
    throw err;
}

});
 var obj3=obj1.splice(0,5);
 var p3=JSON.stringify(obj3);
 p3=p3.replace("[","[\n\t");
 p3= p3.replace(/},/g,"},\n\t");
 p3= p3.replace(/\\"/g,"");

 console.log(p3);
 
 fs.writeFile("text3.JSON",p3,function(err) {
if(err){
    throw err;
}
//file.close();
});
 
//file.close();
});