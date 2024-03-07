/**  
 * 提供了百度坐标（BD09）、国测局坐标（火星坐标，GCJ02）、WGS84坐标系、Web墨卡托 4类坐标之间的转换
 *  Created by 
 *  传入参数 和 返回结果 均是数组：[经度,纬度]
 *  
 *  var result = pointconvert.jwd2mct([117.220102, 31.834912]); //经纬度    转 Web墨卡托  
 *  var result = pointconvert.mct2jwd([13048882,3741659]);      //Web墨卡托 转 经纬度                     
 *  
 *  var result = pointconvert.wgs2gcj([117.220102, 31.834912]); //加偏：标准WGS84坐标  转 国测局偏移坐标
 *  var result = pointconvert.gcj2wgs([117.225590,31.832916]);  //纠偏：国测局偏移坐标 转 标准WGS84坐标                   
 *  
 *  var result = pointconvert.gcj2bd([117.225590,31.832916]);   //国测局偏移坐标 转 百度经纬度坐标
 *  var result = pointconvert.bd2gcj([117.232039,31.839177]);   //百度经纬度坐标 转 国测局偏移坐标
 *  
 *  var result = pointconvert.bd2wgs([117.232039,31.839177]); //百度经纬度坐标 转 标准WGS84坐标
 *  var result = pointconvert.wgs2bd([117.220102,31.834912]); //标准WGS84坐标  转 百度经纬度坐标      
 *  
 */
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)d[e(c)]=k[c]||e(c);k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1;};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p;}('(g(19,G){E(18 W===\'g\'&&W.1s){W([],G)}K E(18 X===\'1p\'&&X.17){X.17=G()}K{19.1n=G()}}(1t,g(){4 Y=3.15*10.0/e.0;4 9=3.1r;4 a=1i.0;4 w=0.1h;4 C=g C(c){4 16=b(c[0]);4 r=b(c[1]);4 Z=3.15*10.0/e.0;4 x=16-0.1a;4 y=r-0.1b;4 z=8.n(x*x+y*y)-0.14*8.d(y*Z);4 q=8.11(y,x)-0.13*8.s(x*Z);4 Q=z*8.s(q);4 P=z*8.d(q);Q=b(Q.h(6));P=b(P.h(6));f[Q,P]};4 B=g B(c){4 5=b(c[0]);4 7=b(c[1]);4 z=8.n(5*5+7*7)+0.14*8.d(7*Y);4 q=8.11(7,5)+0.13*8.s(5*Y);4 D=z*8.s(q)+0.1a;4 r=z*8.d(q)+0.1b;D=b(D.h(6));r=b(r.h(6));f[D,r]};4 A=g A(c){4 5=b(c[0]);4 7=b(c[1]);E(F(5,7)){f[5,7]}K{4 k=T(5-L.0,7-M.0);4 l=J(5-L.0,7-M.0);4 u=7/e.0*9;4 i=8.d(u);i=1-w*i*i;4 t=8.n(i);k=(k*e.0)/ ((a * (1 - w)) /(i*t)*9);l=(l*e.0)/ (a /t*8.s(u)*9);4 m=7+k;4 p=5+l;p=b(p.h(6));m=b(m.h(6));f[p,m]}};4 v=g v(c){4 5=b(c[0]);4 7=b(c[1]);E(F(5,7)){f[5,7]}K{4 k=T(5-L.0,7-M.0);4 l=J(5-L.0,7-M.0);4 u=7/e.0*9;4 i=8.d(u);i=1-w*i*i;4 t=8.n(i);k=(k*e.0)/ ((a * (1 - w)) /(i*t)*9);l=(l*e.0)/ (a /t*8.s(u)*9);m=7+k;p=5+l;4 V=5*2-p;4 U=7*2-m;V=b(V.h(6));U=b(U.h(6));f[V,U]}};4 O=g O(c){f v(C(c))};4 N=g N(c){f B(A(c))};4 T=g T(5,7){4 j=-1v.0+2.0*5+3.0*7+0.2*7*7+0.1*5*7+0.2*8.n(8.1c(5));j+=(o.0*8.d(6.0*5*9)+o.0*8.d(2.0*5*9))*2.0/3.0;j+=(o.0*8.d(7*9)+1d.0*8.d(7/ 3.0 * 9)) * 2.0 /3.0;j+=(1y.0*8.d(7/ 12.0 * 9) + 1z * 8.d(7 * 9 /1e.0))*2.0/3.0;f j};4 J=g J(5,7){4 j=1f.0+5+2.0*7+0.1*5*5+0.1*5*7+0.1*8.n(8.1c(5));j+=(o.0*8.d(6.0*5*9)+o.0*8.d(2.0*5*9))*2.0/3.0;j+=(o.0*8.d(5*9)+1d.0*8.d(5/ 3.0 * 9)) * 2.0 /3.0;j+=(1A.0*8.d(5/ 12.0 * 9) + 1f.0 * 8.d(5 /1e.0*9))*2.0/3.0;f j};4 F=g F(5,7){f(5<1w.1x||5>1D.1C)||((7<0.1E||7>1B.1u)||1m)};4 I=g I(c){4 5=b(c[0]);4 7=b(c[1]);4 x=5*R.S/e;4 y=8.1j(8.1k((1l+7)*9/ 1g)) /(9/e);y=y*R.S/e;x=b(x.h(2));y=b(y.h(2));f[x,y]};4 H=g H(c){4 5=b(c[0]);4 7=b(c[1]);4 x=5/R.S*e;4 y=7/R.S*e;y=e/ 9 * (2 * 8.1q(8.1o(y * 9 /e))-9/2);x=b(x.h(6));y=b(y.h(6));f[x,y]};f{I:I,H:H,C:C,B:B,O:O,N:N,A:A,v:v}}));',62,103,'||||var|lng||lat|Math|PI||Number|arrdata|sin|180|return|function|toFixed|magic|ret|dlat|dlng|mglat|sqrt|20|mglng|theta|bd_lat|cos|sqrtmagic|radlat|gcj2wgs|ee||||wgs2gcj|gcj2bd|bd2gcj|bd_lng|if|out_of_china|factory|mct2jwd|jwd2mct|transformlng|else|105|35|wgs2bd|bd2wgs|gg_lat|gg_lng|20037508|34|transformlat|wd|jd|define|module|x_PI|x_pi|3000|atan2||000003|00002|14159265358979324|bd_lon|exports|typeof|root|0065|006|abs|40|30|300|360|00669342162296594323|6378245|log|tan|90|false|pointconvert|exp|object|atan|1415926535897932384626|amd|this|8271|100|72|004|160|320|150|55|8347|137|8293'.split('|'),0,{}))

